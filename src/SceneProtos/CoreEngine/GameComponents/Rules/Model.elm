module SceneProtos.CoreEngine.GameComponents.Rules.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Coordinate.Coordinates exposing (judgeMouseRect)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite, renderSpriteWithRev)
import Lib.Render.Text exposing (renderText, renderTextWithColor)
import Lib.Tools.KeyCode exposing (escape)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Rules.Base exposing (RulesInit, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCPauseMenuInitData d) ->
            Data id ( 0, 0 ) ( 0, 0 ) ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 0 ) ( 0, 0 ) ] nullBox 0 Alive (GCRulesModel nullModel) initExtraData

        _ ->
            nullData


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        gd =
            env.globalData

        model =
            case d.gcModel of
                GCRulesModel rulesModel ->
                    rulesModel

                _ ->
                    nullModel

        backX =
            (toFloat <| first model.backPos) - first model.buttonSize / 2

        backY =
            (toFloat <| second model.backPos) - second model.buttonSize / 2

        ( nmsg, nenv ) =
            if gd.mouseDownAct then
                if judgeMouseRect gd.mousePos ( backX, backY ) model.buttonSize then
                    ( [ ( GCParent, HideRulesMsg ) ], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

                else
                    ( [], env )

            else
                ( [], env )
    in
    ( d, nmsg, nenv )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env _ d =
    ( d, [], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    let
        model =
            case d.gcModel of
                GCRulesModel rulesModel ->
                    rulesModel

                _ ->
                    nullModel

        backX =
            (toFloat <| first model.backPos) - first model.buttonSize / 2

        backY =
            (toFloat <| second model.backPos) - second model.buttonSize / 2
    in
    [ ( renderSprite
            env.globalData
            []
            ( 0, 0 )
            ( 0, 1080 )
            "rules"
      , 1
      )
    , ( renderSprite
            env.globalData
            []
            ( backX, backY )
            model.buttonSize
            "back"
      , 1
      )
    , ( group []
            [ renderTextWithColor env.globalData 44 "F : swtich the pattern of weapon" "disposabledroid_bbregular" Color.white ( 300, 400 )
            , renderTextWithColor env.globalData 44 "A D : move the character to the left or right" "disposabledroid_bbregular" Color.white ( 300, 480 )
            , renderTextWithColor env.globalData 44 "W Space : jump" "disposabledroid_bbregular" Color.white ( 300, 560 )
            , renderTextWithColor env.globalData 44 "E : open the weapon upgrade menu" "disposabledroid_bbregular" Color.white ( 300, 640 )
            , renderTextWithColor env.globalData 44 "R : enter the portal" "disposabledroid_bbregular" Color.white ( 300, 720 )
            , renderTextWithColor env.globalData 44 "Esc : pause" "disposabledroid_bbregular" Color.white ( 300, 800 )
            , renderTextWithColor env.globalData 44 "When you lose all you HP, you are deaded" "disposabledroid_bbregular" Color.white ( 300, 880 )
            , renderTextWithColor env.globalData 44 "When you gain all the ability and upgrade your weapon to the final stage, you will win" "disposabledroid_bbregular" Color.white ( 300, 960 )
            ]
      , 1000
      )
    ]
