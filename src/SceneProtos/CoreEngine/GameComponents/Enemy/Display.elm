module SceneProtos.CoreEngine.GameComponents.Enemy.Display exposing (displayEnemy)

{-|

@docs displayEnemy

-}

import Array2D exposing (Array2D)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill, stroke)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
import Color
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSpriteWithRev)
import Lib.Tools.ArrayTools exposing (array2D_slice)
import Lib.Tools.Queue exposing (Queue)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), LifeStatus(..))
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (Dir(..), EnemyType(..), nullModel)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| display an enemy
-}
displayEnemy : EnvC -> Data -> Renderable
displayEnemy env d =
    let
        ( x_, y_ ) =
            posInCam env d.position

        ( w, h ) =
            sizeInCam env d.size

        x =
            x_ - w / 2

        y =
            y_ - h / 2

        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        id =
            case omodel.typeId of
                EnemyShot 0 ->
                    "enemy_1"

                EnemyShot 1 ->
                    "enemy_2"

                EnemyShot 2 ->
                    "enemy_5"

                EnemyShot 3 ->
                    case d.lifeStatus of
                        Alive ->
                            case modBy 10 (env.t // 15) of
                                0 ->
                                    "elite_1"

                                1 ->
                                    "elite_2"

                                2 ->
                                    "elite_1"

                                3 ->
                                    "elite_2"

                                4 ->
                                    "elite_1"

                                5 ->
                                    "elite_2"

                                6 ->
                                    "elite_3"

                                7 ->
                                    "elite_4"

                                8 ->
                                    "elite_1"

                                9 ->
                                    "elite_2"

                                _ ->
                                    "elite_1"

                        Dead dt ->
                            let
                                idd =
                                    (dt // 10) |> min 8 |> max 1
                            in
                            "elite_d" ++ fromInt idd

                EnemyDash 0 ->
                    "enemy_4"

                _ ->
                    "enemy_5"

        revFlag =
            case omodel.dir of
                Left ->
                    False

                Right ->
                    True

                _ ->
                    False

        ( _, neh ) =
            sizeInCam env
                ( 0
                , if omodel.typeId /= EnemyShot 3 then
                    15

                  else
                    20
                )

        hpBox =
            rect env.globalData ( x, y - neh * 2 ) ( w, neh )

        hpRate =
            max d.hp 0 / omodel.maxHp

        hpShow =
            rect env.globalData ( x + 2, y - (neh - 1) * 2 ) ( (w - 4) * hpRate, neh - 4 )

        alphaVal =
            if omodel.typeId /= EnemyShot 3 then
                case d.lifeStatus of
                    Alive ->
                        1.0

                    Dead dt ->
                        max 0 (1.0 - toFloat dt / 30)

            else
                case d.lifeStatus of
                    Alive ->
                        1.0

                    Dead dt ->
                        max 0 (1.0 - toFloat dt / 180)
    in
    group [ imageSmoothing False, alpha alphaVal ]
        (renderSpriteWithRev
            revFlag
            env.globalData
            []
            ( x, y )
            ( w, h )
            id
            :: shapes [ stroke Color.black, fill Color.white ] [ hpBox ]
            :: shapes [ fill (Color.rgb255 200 46 55) ] [ hpShow ]
            :: debug env d
        )


debug : EnvC -> Data -> List Renderable
debug env d =
    let
        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        ( posx, posy ) =
            d.position

        tileMap =
            env.commonData.tileMap

        odir =
            omodel.dir

        ovel =
            d.velocity

        nvel =
            -- if omodel.movementState == JumpingUp 0 then
            --     ( first ovel, -jumpVel )
            -- else
            ovel

        nxtTile =
            if odir == Right then
                1

            else
                -1

        ( nposx, nposy ) =
            ( first d.position // tileSize + nxtTile, second d.position // tileSize )

        isFacingWall =
            Array2D.get nposx nposy tileMap |> Maybe.withDefault 1 |> (\t -> modBy 2 t == 1)
    in
    []



-- [ shapes [ fill Color.white ] [ rect env.globalData ( 0, 0 ) ( 300, 1080 ) ]
-- , renderText env.globalData 40 (Debug.toString d.position) "Times New Roman" ( 0, 0 )
-- , renderText env.globalData 40 (Debug.toString d.velocity) "Times New Roman" ( 0, 50 )
-- , renderText env.globalData 40 (Debug.toString d.acceleration) "Times New Roman" ( 0, 100 )
-- , renderText env.globalData 40 (Debug.toString omodel.chasingState) "Times New Roman" ( 0, 150 )
-- , renderText env.globalData 40 (Debug.toString omodel.dir) "Times New Roman" ( 0, 200 )
-- , renderText env.globalData 40 (Debug.toString ( posx, posy )) "Times New Roman" ( 0, 250 )
-- , renderText env.globalData 40 (Debug.toString isFacingWall) "Times New Roman" ( 0, 300 )
-- , renderText env.globalData 40 (Debug.toString d.hp) "Times New Roman" ( 0, 350 )
-- , renderText env.globalData 40 (Debug.toString d.lifeStatus) "Times New Roman" ( 0, 400 )
-- , renderText env.globalData 40 (Debug.toString (findPath env (posx - 60,posy - 60) (posx + 100, posy - 60) )) "Times New Roman" ( 0, 300 )
-- , renderText env.globalData 40 (Debug.toString (array2D_slice (posx// tileSize,posy// tileSize - 2) (posx// tileSize + 1,posy// tileSize) env.commonData.tileMap )) "Times New Roman" ( 0, 350 )
-- ]
-- , renderText env.globalData 40 (Debug.toString omodel.positionState) "Times New Roman" ( 0, 150 )
-- , renderText env.globalData 40 (Debug.toString omodel.movementState) "Times New Roman" ( 0, 200 )
-- , renderText env.globalData 40 (Debug.toString omodel.dir) "Times New Roman" ( 0, 250 )
-- , renderText env.globalData 40 (Debug.toString d.uid) "Times New Roman" ( 0, 300 )
-- , renderText env.globalData 20 ("w:" ++ Debug.toString (Array.get 87 env.globalData.keyList)) "Times New Roman" ( 0, 1000 )
-- , renderText env.globalData 20 ("w_pre:" ++ Debug.toString (Array.get 87 env.globalData.keyListPre)) "Times New Roman" ( 150, 1000 )
-- , renderText env.globalData 20 ("a:" ++ Debug.toString (Array.get 65 env.globalData.keyList)) "Times New Roman" ( 0, 1030 )
-- , renderText env.globalData 20 ("a_pre:" ++ Debug.toString (Array.get 65 env.globalData.keyListPre)) "Times New Roman" ( 150, 1030 )
-- , renderText env.globalData 20 ("d:" ++ Debug.toString (Array.get 68 env.globalData.keyList)) "Times New Roman" ( 0, 1060 )
-- , renderText env.globalData 20 ("d_pre:" ++ Debug.toString (Array.get 68 env.globalData.keyListPre)) "Times New Roman" ( 150, 1060 )
-- ]


findPath : EnvC -> ( Int, Int ) -> ( Int, Int ) -> List ( Int, Int )
findPath env ( pposx, pposy ) ( eposx, eposy ) =
    let
        tileMap =
            env.commonData.tileMap

        ( pidx, pidy ) =
            ( pposx // tileSize, pposy // tileSize )

        ( eidx, eidy ) =
            ( eposx // tileSize, eposy // tileSize )

        ( stidx, stidy ) =
            ( min pidx eidx, min pidy eidy )

        ( enidx, enidy ) =
            ( max pidx eidx, max pidy eidy )

        step : ( Int, Int ) -> Queue ( Int, Int )
        step ( x, y ) =
            case Array2D.get x y tileMap of
                Nothing ->
                    []

                Just t ->
                    if t /= 0 || (( x, y ) == ( enidx, enidy )) then
                        []

                    else
                        [ ( x - 1, y ), ( x + 1, y ), ( x, y - 1 ), ( x, y + 1 ) ]

        log : ( Int, Int ) -> ( Int, Int ) -> ( ( Int, Int ), ( Int, Int ) )
        log cur to =
            ( to, cur )

        rec =
            Lib.Tools.Queue.gbfsr 8 ( stidx, stidy ) step log

        cut =
            array2D_slice ( stidx, stidy ) ( enidx, enidy ) tileMap |> Array2D.map (\_ -> ( 0, 0 ))

        recCutF : Queue ( ( Int, Int ), ( Int, Int ) ) -> Array2D ( Int, Int ) -> Array2D ( Int, Int )
        recCutF r c =
            case r of
                [] ->
                    c

                ( ( tox, toy ), cur ) :: rs ->
                    recCutF rs (Array2D.set (tox - stidx) (toy - stidy) cur c)

        recCut =
            recCutF rec cut

        getPath : ( Int, Int ) -> List ( Int, Int ) -> List ( Int, Int )
        getPath ( x, y ) l =
            if ( x, y ) == ( stidx, stidy ) then
                [ ( x, y ) ]

            else
                case Array2D.get x y recCut of
                    Nothing ->
                        l

                    Just fr ->
                        getPath fr (( x, y ) :: l)
    in
    getPath ( enidx, enidy ) []
