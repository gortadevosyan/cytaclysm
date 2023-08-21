module SceneProtos.CoreEngine.GameComponents.StarterMenu.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (imageSmoothing)
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
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Base exposing (StarterMenuInit, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCStarterMenuInitData d) ->
            Data id ( 0, 0 ) ( 0, 0 ) ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 0 ) ( 0, 0 ) ] nullBox 0 Alive (GCStarterMenuModel nullModel) initExtraData

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
                GCStarterMenuModel starterMenuModel ->
                    starterMenuModel

                _ ->
                    nullModel

        startX =
            (toFloat <| first model.startPos) - first model.buttonSize / 2

        startY =
            (toFloat <| second model.startPos) - second model.buttonSize / 2

        rulesX =
            (toFloat <| first model.rulesPos) - first model.buttonSize / 2

        rulesY =
            (toFloat <| second model.rulesPos) - second model.buttonSize / 2

        ( nmsg, nenv ) =
            if gd.mouseDownAct then
                if judgeMouseRect gd.mousePos ( startX, startY ) model.buttonSize then
                    ( [ ( GCParent, GameStartMsg ), ( GCParent, DisplayInstructionMsg ) ], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

                else if judgeMouseRect gd.mousePos ( rulesX, rulesY ) model.buttonSize then
                    ( [ ( GCParent, ShowRulesMsg ) ], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

                else
                    ( [], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

            else
                ( [], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )
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
    [ ( displayStarterMenuAsRect env d, 100 ) ]


displayStarterMenuAsRect : EnvC CommonData -> Data -> Renderable
displayStarterMenuAsRect env d =
    let
        model =
            case d.gcModel of
                GCStarterMenuModel starterMenuModel ->
                    starterMenuModel

                _ ->
                    nullModel

        startX =
            (toFloat <| first model.startPos) - first model.buttonSize / 2

        startY =
            (toFloat <| second model.startPos) - second model.buttonSize / 2

        rulesX =
            (toFloat <| first model.rulesPos) - first model.buttonSize / 2

        rulesY =
            (toFloat <| second model.rulesPos) - second model.buttonSize / 2

        startID =
            if judgeMouseRect env.globalData.mousePos ( startX, startY ) model.buttonSize then
                "button_start_1"

            else
                "button_start_0"

        rulesID =
            if judgeMouseRect env.globalData.mousePos ( rulesX, rulesY ) model.buttonSize then
                "button_rules_1"

            else
                "button_rules_0"
    in
    group [ imageSmoothing False ]
        [ renderSprite env.globalData [] ( 0, 0 ) ( 1920, 1080 ) "title_bg"
        , renderSprite env.globalData [] ( startX, startY ) model.buttonSize startID
        , renderSprite env.globalData [] ( rulesX, rulesY ) model.buttonSize rulesID

        -- , shapes
        --     [ fill Color.darkOrange
        --     ]
        --     [ rect env.globalData ( startX, startY ) model.buttonSize ]
        -- , shapes
        --     [ fill Color.darkRed
        --     ]
        --     [ rect env.globalData ( rulesX, rulesY ) model.buttonSize ]
        -- , renderText env.globalData 40 "Start the Game" "Arial" ( startX, startY )
        -- , renderText env.globalData 40 "Rules" "Arial" ( rulesX, rulesY )
        ]
