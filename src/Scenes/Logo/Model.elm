module Scenes.Logo.Model exposing
    ( handleLayerMsg
    , updateModel
    , viewModel
    )

{-| Scene update module

@docs handleLayerMsg
@docs updateModel
@docs viewModel

-}

import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
import Color
import Lib.Audio.Base exposing (AudioOption(..))
import Lib.Env.Env exposing (Env, EnvC, addCommonData, noCommonData)
import Lib.Layer.Base exposing (LayerMsg(..))
import Lib.Layer.LayerHandler exposing (updateLayer, viewLayer)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Scene.Base exposing (SceneInitData(..), SceneOutputMsg(..))
import Scenes.Logo.Common exposing (Model)
import Scenes.Logo.LayerBase exposing (CommonData)


{-| handleLayerMsg

Handle Layer Messages

-}
handleLayerMsg : EnvC CommonData -> LayerMsg -> Model -> ( Model, List SceneOutputMsg, EnvC CommonData )
handleLayerMsg env lmsg model =
    case lmsg of
        LayerSoundMsg name path opt ->
            ( model, [ SOMPlayAudio name path opt ], env )

        LayerStopSoundMsg name ->
            ( model, [ SOMStopAudio name ], env )

        _ ->
            ( model, [], env )


{-| updateModel

Default update function. Normally you won't change this function.

-}
updateModel : Env -> Model -> ( Model, List SceneOutputMsg, Env )
updateModel env model =
    let
        ( newdata, msgs, newenv ) =
            updateLayer (addCommonData model.commonData env) model.layers

        nmodel =
            { model | commonData = newenv.commonData, layers = newdata }

        ( newmodel, newsow, newgd2 ) =
            List.foldl
                (\x ( y, lmsg, cgd ) ->
                    let
                        ( model2, msg2, env2 ) =
                            handleLayerMsg cgd x y
                    in
                    ( model2, lmsg ++ msg2, env2 )
                )
                ( nmodel, [], newenv )
                msgs

        changeScene =
            if env.t > 180 then
                [ SOMChangeScene ( NullSceneInitData, "Home", Maybe.Nothing ) ]

            else
                []
    in
    ( newmodel, newsow ++ changeScene, noCommonData newgd2 )


{-| Default view function
-}
viewModel : Env -> Model -> Renderable
viewModel env _ =
    let
        t =
            env.t |> toFloat

        alv =
            (if env.t < 60 then
                t / 60

             else if env.t > 120 then
                (180 - t) / 60

             else
                1
            )
                |> min 1
                |> max 0
    in
    group []
        [ shapes [ fill Color.black ] [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ]
        , renderSprite env.globalData [ imageSmoothing False, alpha alv ] ( 0, 0 ) ( 1920, 1080 ) "logo"
        ]



-- viewLayer (addCommonData model.commonData env) model.layers
