module SceneProtos.CoreEngine.GameComponents.Player.Display exposing (displayPlayer, displayPlayerAsRect)

{-| display players things.

@docs displayPlayer, displayPlayerAsRect

-}

import Base exposing (State(..))
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
import Color
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite, renderSpriteWithRev)
import Lib.Render.Text exposing (renderText, renderTextWithColor)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), LifeStatus(..))
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (Dir(..), MovementState(..), PositionState(..), nullModel)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)
import String exposing (fromFloat, fromInt)
import Tuple exposing (first, second)


{-| display the player
-}
displayPlayer : EnvC -> Data -> Renderable
displayPlayer env d =
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
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel

        id =
            case omodel.movementState of
                Idle ->
                    "scientist"

                Walking i ->
                    "scientist_walking_" ++ fromInt (modBy 6 (i // 7) + 1)

                JumpingUp i ->
                    "scientist_jumpingup_"
                        ++ (if i <= 4 then
                                "1"

                            else
                                "2"
                           )

                JumpingTop _ ->
                    "scientist_jumpingtop"

                JumpingDown _ ->
                    "scientist_jumpingdown"

                LandingBuffer i ->
                    "scientist_landingbuffer_"
                        ++ (if i <= 5 then
                                "1"

                            else
                                "2"
                           )

        revFlag =
            case omodel.dir of
                Left ->
                    True

                Right ->
                    False

        alv =
            case d.lifeStatus of
                Alive ->
                    1

                Dead dt ->
                    1 - toFloat dt / 250 |> max 0 |> min 1
    in
    group [ imageSmoothing False, alpha alv ]
        (renderSpriteWithRev
            revFlag
            env.globalData
            []
            ( x, y )
            ( w, h )
            id
            -- :: renderText env.globalData 40 (fromInt (round d.hp) ++ "/" ++ fromInt (round omodel.maxHp)) "Arial" ( 0, 1040 )
            :: debug env d
            ++ (if env.commonData.showUI then
                    -- shapes [ fill Color.white ] [ rect env.globalData ( 0, 1040 ) ( 150, 40 ) ] ::
                    displayHP env d ++ displayMoney env d

                else
                    []
               )
        )



-- group [] []


{-| display player as rect
-}
displayPlayerAsRect : EnvC -> Data -> Renderable
displayPlayerAsRect env d =
    let
        x =
            first d.position - round (first d.size / 2)

        y =
            second d.position - round (second d.size / 2)
    in
    group [] ([ shapes [] [ rect env.globalData ( toFloat x, toFloat y ) d.size ] ] ++ debug env d)


debug : EnvC -> Data -> List Renderable
debug env d =
    let
        text =
            case env.globalData.state of
                Paused ->
                    "Paused"

                Active ->
                    "Active"

        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel
    in
    []


displayHP : EnvC -> Data -> List Renderable
displayHP env d =
    let
        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel

        rt =
            d.hp / omodel.maxHp |> max 0 |> min 1
    in
    [ group [ imageSmoothing False ]
        [ shapes [ fill (Color.rgb255 220 103 109), alpha 0.2 ] [ rect env.globalData ( 40 + 28 * 4, 40 + 10 * 4 ) ( 83 * 4, 4 * 4 ) ]
        , shapes [ fill (Color.rgb255 200 46 55) ] [ rect env.globalData ( 40 + 28 * 4, 40 + 10 * 4 ) ( 83 * 4 * rt, 4 * 4 ) ]
        , renderSprite env.globalData [] ( 40, 40 ) ( 528, 112 ) "hp_bar"
        ]
    ]



-- [ renderText env.globalData 40 (fromFloat d.hp ++ "/" ++ fromFloat omodel.maxHp) "Times New Roman" ( 0, 1040 ) ]


displayMoney : EnvC -> Data -> List Renderable
displayMoney env d =
    let
        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel
    in
    [ group []
        [ renderTextWithColor env.globalData 54 (fromInt env.commonData.coin) "disposabledroid_bbregular" Color.white ( 150, 190 - 7 )
        , renderSprite env.globalData [] ( 63, 180 ) ( 64, 64 ) "coin_gold_1"
        ]
    ]



-- [ renderTextWithColor env.globalData 40 ("Money : " ++ fromInt env.commonData.coin) "Times New Roman" Color.white ( 0, 1000 ) ]
-- [ renderText env.globalData 40 (Debug.toString d.position) "Times New Roman" ( 0, 0 )
-- , renderText env.globalData 40 (Debug.toString d.velocity) "Times New Roman" ( 0, 50 )
-- , renderText env.globalData 40 (Debug.toString d.acceleration) "Times New Roman" ( 0, 100 )
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
