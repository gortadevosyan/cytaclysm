module SceneProtos.CoreEngine.GameComponents.PauseMenu.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
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
import SceneProtos.CoreEngine.GameComponents.PauseMenu.Base exposing (PauseMenuInit, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCPauseMenuInitData d) ->
            Data id ( 0, 0 ) ( 0, 0 ) ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 0 ) ( 0, 0 ) ] nullBox 0 Alive (GCPauseMenuModel nullModel) initExtraData

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
                GCPauseMenuModel pauseMenu ->
                    pauseMenu

                _ ->
                    nullModel

        resumeX =
            (toFloat <| first model.resumePos) - first model.buttonSize / 2

        resumeY =
            (toFloat <| second model.resumePos) - second model.buttonSize / 2

        quitX =
            (toFloat <| first model.quitPos) - first model.buttonSize / 2

        quitY =
            (toFloat <| second model.quitPos) - second model.buttonSize / 2

        ( nmsg, nenv ) =
            if gd.mouseDownAct then
                if judgeMouseRect gd.mousePos ( resumeX, resumeY ) model.buttonSize then
                    ( [ ( GCParent, ResumeMsg ) ], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

                else if judgeMouseRect gd.mousePos ( quitX, quitY ) model.buttonSize then
                    ( [ ( GCParent, QuitMsg ) ], env |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) )

                else
                    ( [], env )

            else
                ( [], env )

        ( pmsg, penv ) =
            if Maybe.withDefault False (get escape env.globalData.keyList) then
                ( [ ( GCParent, ResumeMsg ) ], nenv |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | keyList = env.globalData.keyList |> set escape False }) }) )

            else
                ( [], nenv )
    in
    ( d, nmsg ++ pmsg, penv )


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
    [ ( displayPauseMenuAsRect env d, 100 ) ]


displayPauseMenuAsRect : EnvC CommonData -> Data -> Renderable
displayPauseMenuAsRect env d =
    let
        model =
            case d.gcModel of
                GCPauseMenuModel pauseMenuModel ->
                    pauseMenuModel

                _ ->
                    nullModel

        resumeX =
            (toFloat <| first model.resumePos) - first model.buttonSize / 2

        resumeY =
            (toFloat <| second model.resumePos) - second model.buttonSize / 2

        quitX =
            (toFloat <| first model.quitPos) - first model.buttonSize / 2

        quitY =
            (toFloat <| second model.quitPos) - second model.buttonSize / 2

        idre =
            if judgeMouseRect env.globalData.mousePos ( resumeX, resumeY ) model.buttonSize then
                "button_resume_1"

            else
                "button_resume_0"

        idqt =
            if judgeMouseRect env.globalData.mousePos ( quitX, quitY ) model.buttonSize then
                "button_quit_1"

            else
                "button_quit_0"
    in
    group [ imageSmoothing False ]
        [ shapes
            [ fill Color.black
            , alpha 0.3
            ]
            [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ]
        , renderSprite env.globalData [] ( resumeX, resumeY ) model.buttonSize idre
        , renderSprite env.globalData [] ( quitX, quitY ) model.buttonSize idqt
        ]



-- [ shapes
--     [ fill Color.darkOrange
--     ]
--     [ rect env.globalData ( resumeX, resumeY ) model.buttonSize ]
-- , shapes
--     [ fill Color.darkRed
--     ]
--     [ rect env.globalData ( quitX, quitY ) model.buttonSize ]
-- , renderText env.globalData 40 "Resume the Game" "Arial" ( resumeX, resumeY )
-- , renderText env.globalData 40 "Quit the Game" "Arial" ( quitX, quitY )
-- ]
