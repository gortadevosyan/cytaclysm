module SceneProtos.CoreEngine.GameComponents.Bullet.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Base exposing (Msg(..))
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (rotate, transform, translate)
import Color
import Dict
import Lib.Coordinate.Coordinates exposing (posToReal)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (circle, rect)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text exposing (renderText)
import Lib.Tools.ArrayTools exposing (array2D_flatten, array2D_indexedSlice)
import List exposing (member)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (lengthInCam, posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Bullet.Base exposing (Bullet, BulletInit, BulletType(..), nullBullet)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCBulletInitData bullet) ->
            { uid = id
            , size = bullet.size
            , position = bullet.startPos |> Tuple.mapBoth round round
            , velocity = calcVelocity bullet
            , acceleration = ( 0, 0 )
            , mass = 10
            , hitbox = [ Box ( 0, 0 ) bullet.size ]
            , simpleCheck = nullBox
            , hp = 5
            , lifeStatus = Alive
            , gcModel = GCBulletModel (Bullet bullet.bulletType bullet.atk bullet.delay)
            , extra = Dict.empty
            }

        _ ->
            nullData


calcVelocity : BulletInit -> ( Float, Float )
calcVelocity bullet =
    let
        ( stx, sty ) =
            bullet.startPos

        ( tgx, tgy ) =
            bullet.targetPos

        v =
            bullet.velocity

        pathLen =
            sqrt ((stx - tgx) ^ 2 + (sty - tgy) ^ 2)

        ( dirx, diry ) =
            ( (tgx - stx) / pathLen, (tgy - sty) / pathLen )
    in
    ( dirx * v, diry * v )


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    case env.msg of
        Tick _ ->
            case d.lifeStatus of
                Alive ->
                    let
                        omodel =
                            case d.gcModel of
                                GCBulletModel model ->
                                    model

                                _ ->
                                    nullBullet

                        newBullet =
                            if omodel.delay == 0 then
                                { d | position = ( Tuple.first d.position + (round <| Tuple.first d.velocity), Tuple.second d.position + (round <| Tuple.second d.velocity) ) }

                            else
                                { d | gcModel = GCBulletModel { omodel | delay = omodel.delay - 1 } }
                    in
                    ( newBullet, [], env )

                Dead dt ->
                    let
                        omodel =
                            case d.gcModel of
                                GCBulletModel model ->
                                    model

                                _ ->
                                    nullBullet
                    in
                    if dt == 0 && omodel.bulletType == PlayerBullet 1 then
                        ( { d | lifeStatus = Dead 1 }, [ ( GCParent, GCSplashMsg d.position 155 ), ( GCParent, GCShakeCameraMsg 9 ) ], env )

                    else
                        ( { d | lifeStatus = Dead (dt + 1) }, [], env )

        _ ->
            ( d, [], env )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env msg d =
    if d.lifeStatus /= Alive then
        ( d, [], env )

    else
        case msg of
            GCCollisionBulletMsg str ->
                if str /= "Weapon" then
                    ( { d | lifeStatus = Dead 0 }, [], env )

                else
                    ( { d | lifeStatus = Dead -120, velocity = ( -1 * first d.velocity, -1 * second d.velocity ) }, [], env )

            _ ->
                ( d, [], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env data =
    let
        gd =
            env.globalData

        omodel =
            case data.gcModel of
                GCBulletModel bullet ->
                    bullet

                _ ->
                    nullBullet

        color =
            case omodel.bulletType of
                PlayerBullet _ ->
                    Color.darkYellow

                EnemyBullet eb ->
                    case eb of
                        0 ->
                            Color.red

                        1 ->
                            Color.blue

                        _ ->
                            Color.black

        id =
            case omodel.bulletType of
                PlayerBullet _ ->
                    "bullet_player"

                EnemyBullet eb ->
                    "bullet_enemy" ++ fromInt eb

        angle =
            atan2 (Tuple.second data.velocity) (Tuple.first data.velocity)

        ( posx, posy ) =
            data.position |> posInCam env

        ( sizex, sizey ) =
            data.size |> sizeInCam env

        ( lx, ly ) =
            ( posx - sizex / 2, posy - sizey / 2 )

        ( rx, ry ) =
            ( posx + sizex / 2, posy + sizey / 2 )

        ( rposx, rposy ) =
            ( posx, posy ) |> posToReal gd

        ( rsizex, rsizey ) =
            ( sizex, sizey ) |> posToReal gd

        ( rlx, rly ) =
            ( lx, ly ) |> posToReal gd
    in
    if omodel.delay > 0 then
        []

    else if omodel.bulletType == PlayerBullet 1 && isDead data then
        let
            dead =
                case data.lifeStatus of
                    Dead i ->
                        i

                    _ ->
                        -1
        in
        if dead >= 1 && dead <= 5 then
            [ ( shapes [ fill Color.white ] [ circle gd ( lx, ly ) (lengthInCam env 150) ], 1 ) ]

        else if dead <= 8 then
            [ ( shapes [ fill Color.orange ] [ circle gd ( lx, ly ) (lengthInCam env 150) ], 1 ) ]

        else if dead <= 9 then
            [ ( shapes [ fill Color.red ] [ circle gd ( lx, ly ) (lengthInCam env 150) ], 1 ) ]

        else
            []

    else
        [ ( group
                [ -- fill color ,
                  transform
                    [ translate rposx rposy
                    , rotate angle
                    , translate -rposx -rposy
                    ]
                ]
                [ -- rect gd ( lx, ly ) ( sizex, sizey )
                  renderSprite gd [] ( lx, ly ) ( sizex, sizey ) id
                ]
          , 0
          )
        ]


isDead : Data -> Bool
isDead d =
    case d.lifeStatus of
        Dead _ ->
            True

        _ ->
            False


debug env d =
    let
        omodel =
            case d.gcModel of
                GCBulletModel bullet ->
                    bullet

                _ ->
                    nullBullet

        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position |> Tuple.mapBoth toFloat toFloat

        ( vx, vy ) =
            d.velocity

        line =
            { st = ( x, y ), en = ( x + vx, y + vy ) }

        intline =
            { st = ( x |> round, y |> round ), en = ( round x + round vx, round y + round vy ) }

        -- (stx,sty) = line.st
        -- (enx,eny) = line.en
        stx =
            min (Tuple.first line.st) (Tuple.first line.en)

        sty =
            min (Tuple.second line.st) (Tuple.second line.en)

        enx =
            max (Tuple.first line.st) (Tuple.first line.en)

        eny =
            max (Tuple.second line.st) (Tuple.second line.en)

        xsIndex =
            floor stx // tileSize

        xeIndex =
            floor enx // tileSize

        ysIndex =
            floor sty // tileSize

        yeIndex =
            floor eny // tileSize

        tline =
            array2D_flatten <| array2D_indexedSlice ( xsIndex, ysIndex ) ( xeIndex, yeIndex ) tm
    in
    []
