module SceneProtos.CoreEngine.GameComponents.Weapon.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Base exposing (Msg(..))
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (Transform(..), imageSmoothing, rotate, transform, translate)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Coordinate.Coordinates exposing (posToReal)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text
import List exposing (member)
import List.Extra exposing (findIndex)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, posInMap, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Bullet.Base exposing (BulletInit, BulletType(..), nullBullet)
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (Dir(..))
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (AtkType(..), Upgrade(..), WeaponInit, WeaponUpgrade, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (Buff(..), CommonData)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCWeaponInitData d) ->
            let
                gcWeaponNullModelWithAtkI =
                    { nullModel | atkInterval = d.atkInterval, atkType = d.atkType }
            in
            Data id
                d.size
                d.position
                ( 0, 0 )
                ( 0, 1 )
                1
                -- [ Box ( 0, 5 ) ( 64, 118 ) ]
                []
                (Box ( 0, 0 ) d.size)
                100
                Alive
                (GCWeaponModel gcWeaponNullModelWithAtkI)
                initExtraData

        _ ->
            nullData


initModelWithoutEnv : GameComponentInitData -> Data
initModelWithoutEnv initData =
    case initData of
        GCIdData id (GCWeaponInitData d) ->
            let
                gcWeaponNullModelWithAtkI =
                    { nullModel | atkInterval = d.atkInterval, atkType = d.atkType }
            in
            Data id
                d.size
                d.position
                ( 0, 0 )
                ( 0, 1 )
                1
                -- [ Box ( 0, 5 ) ( 64, 118 ) ]
                []
                (Box ( 0, 0 ) d.size)
                100
                Alive
                (GCWeaponModel gcWeaponNullModelWithAtkI)
                initExtraData

        _ ->
            nullData


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


weaponInitData : Data
weaponInitData =
    { uid = 0
    , size = ( 50, 20 )
    , position = ( 500, 400 )
    , velocity = ( 0, 0 )
    , acceleration = ( 0, 0 )
    , mass = 1
    , hitbox = []
    , simpleCheck = nullBox
    , hp = 100
    , lifeStatus = Alive
    , gcModel = NullGCModel
    , extra = initExtraData
    }


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        gd =
            env.globalData

        pos =
            gd.mousePos

        mapPos =
            pos |> Tuple.mapBoth round round |> posInMap env

        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        ( nd, nenv ) =
            case omodel.atkType of
                Shooter ->
                    gcModelAngleUpdate env d pos

                Saber ->
                    if env.t - omodel.lastAtkTime > omodel.atkInterval // 2 then
                        gcModelAngleUpdate env d pos

                    else
                        saberAngleUpdate env d

        model =
            case nd.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        ( gcmsg, nnd ) =
            if gd.mouseDownAct then
                let
                    fltPosition =
                        -- posInCam env d.position
                        ( toFloat <| first d.position, toFloat <| second d.position )

                    shotIntervalPossible =
                        env.t - model.lastAtkTime > model.atkInterval
                in
                if shotIntervalPossible then
                    if model.atkType == Shooter then
                        ( fireBullet env fltPosition mapPos model.weaponUpgrade
                        , { nd | gcModel = GCWeaponModel { model | lastAtkTime = env.t } }
                        )

                    else
                        ( []
                        , { nd | gcModel = GCWeaponModel { model | lastAtkTime = env.t } }
                        )

                else
                    ( [], nd )
                -- let
                --     wp =
                --         case d.gcModel of
                --             GCWeaponModel weapon ->
                --                 weapon
                --             _ ->
                --                 nullModel
                --     fltPosition =
                --         ( toFloat <| first d.position, toFloat <| second d.position )
                --     ngcmsg =
                --         if shotPossible pos fltPosition wp.dir then
                --             [ ( GCParent, GCNewBulletMsg (BulletInit fltPosition pos 20 ( 20, 2 ) (PlayerBullet 0) 30) ) ]
                --             -- [ ( GCByName "Bullet", NewBulletMsg pos env.globalData.mousePos ) ]
                --         else
                --             []
                -- in
                -- ngcmsg

            else
                ( [], nd )

        nnenv =
            { nenv | globalData = { gd | mouseDownAct = False } }

        ( nnnd, ngcmsg, nnnenv ) =
            case env.msg of
                Tick _ ->
                    updateSwitch ( nnd, gcmsg, nnenv )

                _ ->
                    ( nnd, gcmsg, nnenv )
    in
    ( nnnd, ngcmsg, nnnenv )


updateSwitch : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateSwitch ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel model ->
                    model

                _ ->
                    nullModel

        kl =
            env.globalData.keyList

        bk =
            omodel.boundKey

        ( nd, nenv ) =
            if Maybe.withDefault False (get bk.switch kl) == True then
                ( if omodel.atkType == Shooter then
                    { d | gcModel = GCWeaponModel { omodel | atkType = Saber, atkInterval = 20 }, size = ( 140, 20 ), simpleCheck = Box ( 0, 0 ) ( 140, 20 ) }

                  else
                    { d | gcModel = GCWeaponModel { omodel | atkType = Shooter, atkInterval = 15 }, size = ( 70 * 1.6, 24 * 1.6 ) }
                , env |> (\e -> { e | globalData = e.globalData |> (\gd -> { gd | keyList = kl |> set bk.switch False }) })
                )

            else
                ( d, env )

        count : List a -> a -> Int
        count llls x =
            List.filter (\a -> a == x) llls |> List.length

        edMsg =
            if
                (count omodel.weaponUpgrade.upgrades DoubleTrigger >= 1)
                    && (count omodel.weaponUpgrade.upgrades Scatter >= 1)
                    && (count omodel.weaponUpgrade.upgrades Splash >= 1)
                    && (List.filter
                            (\a ->
                                case a of
                                    IncreaseDamage _ ->
                                        True

                                    _ ->
                                        False
                            )
                            env.commonData.buff
                            |> List.length
                       )
                    >= 1
                    && (List.filter
                            (\a ->
                                case a of
                                    SpeedUp _ ->
                                        True

                                    _ ->
                                        False
                            )
                            env.commonData.buff
                            |> List.length
                       )
                    >= 1
            then
                [ ( GCParent, PlayerWinMsg ) ]

            else
                []
    in
    ( nd, ls ++ edMsg, nenv )


scatterTaretPos : ( Float, Float ) -> ( Float, Float ) -> ( ( Float, Float ), ( Float, Float ) )
scatterTaretPos ( sx, sy ) ( ex, ey ) =
    let
        ( dx, dy ) =
            ( ex - sx, ey - sy )
    in
    ( ( ex - dy / 6, ey + dx / 6 ), ( ex + dy / 6, ey - dx / 6 ) )


scatterTaretPos4 :
    ( Float, Float )
    -> ( Float, Float )
    ->
        ( ( ( Float, Float ), ( Float, Float ) )
        , ( ( Float, Float ), ( Float, Float ) )
        )
scatterTaretPos4 ( sx, sy ) ( ex, ey ) =
    let
        ( dx, dy ) =
            ( ex - sx, ey - sy )
    in
    ( ( ( ex - dy / 4, ey + dx / 4 ), ( ex + dy / 4, ey - dx / 4 ) )
    , ( ( ex - dy / 8, ey + dx / 8 ), ( ex + dy / 8, ey - dx / 8 ) )
    )


scatterTaretPos6 :
    ( Float, Float )
    -> ( Float, Float )
    ->
        ( ( ( Float, Float ), ( Float, Float ) )
        , ( ( Float, Float ), ( Float, Float ) )
        , ( ( Float, Float ), ( Float, Float ) )
        )
scatterTaretPos6 ( sx, sy ) ( ex, ey ) =
    let
        ( dx, dy ) =
            ( ex - sx, ey - sy )
    in
    ( ( ( ex - dy / 3, ey + dx / 3 ), ( ex + dy / 3, ey - dx / 3 ) )
    , ( ( ex - dy / 9 * 2, ey + dx / 9 * 2 ), ( ex + dy / 9 * 2, ey - dx / 9 * 2 ) )
    , ( ( ex - dy / 9, ey + dx / 9 ), ( ex + dy / 9, ey - dx / 9 ) )
    )


fireBullet : EnvC CommonData -> ( Float, Float ) -> ( Float, Float ) -> WeaponUpgrade -> List ( GameComponentTarget, GameComponentMsg )
fireBullet env fltPosition mapPos up =
    let
        dmg =
            if
                findIndex
                    (\b ->
                        case b of
                            IncreaseDamage _ ->
                                True

                            _ ->
                                False
                    )
                    env.commonData.buff
                    /= Nothing
            then
                8

            else
                4

        initBullet =
            BulletInit fltPosition mapPos 20 ( 30, 20 ) (PlayerBullet 0) dmg 0

        count : List a -> a -> Int
        count ls x =
            List.filter (\a -> a == x) ls |> List.length

        nBullet =
            case count up.upgrades Scatter of
                1 ->
                    let
                        ( ntarget1, ntarget2 ) =
                            scatterTaretPos fltPosition mapPos
                    in
                    [ initBullet
                    , { initBullet | targetPos = ntarget1 }
                    , { initBullet | targetPos = ntarget2 }
                    ]

                2 ->
                    let
                        ( ( ntarget1, ntarget2 ), ( ntarget3, ntarget4 ) ) =
                            scatterTaretPos4 fltPosition mapPos
                    in
                    [ initBullet
                    , { initBullet | targetPos = ntarget1 }
                    , { initBullet | targetPos = ntarget2 }
                    , { initBullet | targetPos = ntarget3 }
                    , { initBullet | targetPos = ntarget4 }
                    ]

                3 ->
                    let
                        ( ( ntarget1, ntarget2 ), ( ntarget3, ntarget4 ), ( ntarget5, ntarget6 ) ) =
                            scatterTaretPos6 fltPosition mapPos
                    in
                    [ initBullet
                    , { initBullet | targetPos = ntarget1 }
                    , { initBullet | targetPos = ntarget2 }
                    , { initBullet | targetPos = ntarget3 }
                    , { initBullet | targetPos = ntarget4 }
                    , { initBullet | targetPos = ntarget5 }
                    , { initBullet | targetPos = ntarget6 }
                    ]

                _ ->
                    [ initBullet ]

        nBullet2 =
            case count up.upgrades DoubleTrigger of
                1 ->
                    let
                        secondBullets =
                            List.map (\bi -> { bi | delay = 5 }) nBullet
                    in
                    nBullet ++ secondBullets

                2 ->
                    let
                        secondBullets =
                            List.map (\bi -> { bi | delay = 4 }) nBullet

                        thirdBullets =
                            List.map (\bi -> { bi | delay = 8 }) nBullet
                    in
                    nBullet ++ secondBullets ++ thirdBullets

                3 ->
                    let
                        secondBullets =
                            List.map (\bi -> { bi | delay = 3 }) nBullet

                        thirdBullets =
                            List.map (\bi -> { bi | delay = 6 }) nBullet

                        fourthBullets =
                            List.map (\bi -> { bi | delay = 9 }) nBullet
                    in
                    nBullet ++ secondBullets ++ thirdBullets ++ fourthBullets

                _ ->
                    nBullet

        nBullet3 =
            List.map
                (\bi ->
                    if member Splash up.upgrades == True then
                        { bi | bulletType = PlayerBullet 1 }

                    else
                        { bi | bulletType = PlayerBullet 0 }
                )
                nBullet2

        msgs =
            List.map (\bi -> ( GCParent, GCNewBulletMsg bi )) nBullet3
    in
    msgs


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env gcmsg d =
    case gcmsg of
        WeaponUpdateMsg pos dir ->
            ( { d | position = updatePos pos dir, gcModel = gcModelDirUpdate d.gcModel dir }, [], env )

        _ ->
            ( d, [], env )



-- let
--     ( nd, nenv ) =
--         gcModelAngleUpdate env d env.globalData.mousePos
-- in
-- ( nd, [], nenv )
--update this function if the initial position of the weapon and player is modified


shotPossible : ( Float, Float ) -> ( Float, Float ) -> Dir -> Bool
shotPossible ( mx, my ) ( wx, wy ) dir =
    if dir == Left && mx <= wx then
        True

    else if dir == Left && mx >= wx then
        True

    else
        False


updatePos : ( Int, Int ) -> Dir -> ( Int, Int )
updatePos ( x, y ) dir =
    case dir of
        Right ->
            ( x, y )

        Left ->
            ( x, y )


gcModelDirUpdate : GCModel -> Dir -> GCModel
gcModelDirUpdate model newDir =
    case model of
        GCWeaponModel weapon ->
            GCWeaponModel { weapon | dir = newDir }

        _ ->
            GCWeaponModel nullModel


gcModelAngleUpdate : EnvC CommonData -> Data -> ( Float, Float ) -> ( Data, EnvC CommonData )
gcModelAngleUpdate env d ( x, y ) =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        camPos =
            posInCam env d.position

        posx =
            first camPos

        posy =
            second camPos

        ( nx, ny ) =
            posToReal env.globalData ( x, y )

        ( npx, npy ) =
            posToReal env.globalData ( posx, posy )

        nangle =
            calculateAngle ( nx, ny ) ( npx, npy )

        nmodel =
            { omodel | angle = nangle }

        nd =
            { d | gcModel = GCWeaponModel nmodel }
    in
    ( nd, env )


saberAngleUpdate : EnvC CommonData -> Data -> ( Data, EnvC CommonData )
saberAngleUpdate env d =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        camPos =
            posInCam env d.position

        posx =
            first camPos

        posy =
            second camPos

        t =
            (env.t - omodel.lastAtkTime) |> toFloat

        cd =
            (omodel.atkInterval |> toFloat) / 3

        oangle =
            omodel.angle

        eps =
            0.0001

        nangle =
            if abs oangle <= pi / 2 then
                if t < 0.3 * cd then
                    min (oangle + (pi / 3) / (0.3 * cd)) (pi / 2 - eps)

                else if t < cd then
                    max (oangle - (pi * 2 / 3) / (0.7 * cd)) (-pi / 2 + eps)

                else
                    oangle

            else if t < 0.3 * cd then
                oangle
                    - (pi / 3)
                    / (0.3 * cd)
                    |> (\a ->
                            if a < -pi then
                                a + pi * 2

                            else
                                a
                       )
                    |> (\a ->
                            if a > 0 && a < pi / 2 then
                                pi / 2 + eps

                            else
                                a
                       )

            else if t < cd then
                oangle
                    + (pi * 2 / 3)
                    / (0.7 * cd)
                    |> (\a ->
                            if a > pi then
                                a - pi * 2

                            else
                                a
                       )
                    |> (\a ->
                            if a < 0 && a > -pi / 2 then
                                -pi / 2 - eps

                            else
                                a
                       )

            else
                oangle

        nmodel =
            { omodel | angle = nangle }

        nd =
            { d | gcModel = GCWeaponModel nmodel }
    in
    ( nd, env )


calculateAngle : ( Float, Float ) -> ( Float, Float ) -> Float
calculateAngle ( wx, wy ) ( mx, my ) =
    atan2 (my - wy) (mx - wx)


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayWeaponAsRect env d, 2 ) ]



--displayPlayerAsRect : EnvC -> Data -> Renderable


displayWeaponAsRect env d =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        camSize =
            sizeInCam env d.size

        camPos =
            posInCam env d.position

        x =
            first camSize / 2

        y =
            second camSize / 2

        posx =
            first camPos

        posy =
            second camPos

        id =
            case omodel.atkType of
                Saber ->
                    "saber"

                Shooter ->
                    "shooter"
    in
    group [ imageSmoothing False ]
        ([ group [ transformWeapon env d ]
            [ renderSprite env.globalData [] ( posx - 2 * x, posy - y ) camSize id ]

         -- shapes [ transformWeapon env d ]
         -- [ rect env.globalData ( posx - 2 * x, posy - y ) camSize
         -- ]
         ]
            ++ debug env d
        )


transformWeapon : EnvC CommonData -> Data -> Canvas.Settings.Setting
transformWeapon env d =
    let
        {- ( x, y ) =
           getPointofRotation d
        -}
        camPos =
            posInCam env d.position

        x =
            first camPos

        y =
            second camPos

        ( nx, ny ) =
            posToReal env.globalData ( x, y )

        rangle =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon.angle

                _ ->
                    nullModel.angle
    in
    transform
        [ translate nx ny
        , rotate <| rangle
        , translate -nx -ny
        ]


getPointofRotation : Data -> ( Float, Float )
getPointofRotation d =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel

        x =
            toFloat <| first d.position

        y =
            toFloat <| second d.position

        nx =
            case omodel.dir of
                Left ->
                    x + (first d.size / 2)

                Right ->
                    x + (first d.size / 2)
    in
    ( nx, y )



--debug : EnvC -> Data -> List Renderable


debug env d =
    let
        omodel =
            case d.gcModel of
                GCWeaponModel weapon ->
                    weapon

                _ ->
                    nullModel
    in
    []



-- [ Lib.Render.Text.renderTextWithColor env.globalData 40 (Debug.toString (omodel.angle * 180 / pi)) "Times New Roman" Color.white ( 1000, 50 ) ]
-- [ renderText env.globalData 40 (Debug.toString (omodel.angle * 180 / pi)) "Times New Roman" ( 1000, 50 )
-- , renderText env.globalData 40 (Debug.toString d.position) "Times New Roman" ( 1000, 0 )
-- ]
