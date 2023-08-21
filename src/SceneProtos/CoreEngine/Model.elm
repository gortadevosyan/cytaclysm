module SceneProtos.CoreEngine.Model exposing
    ( handleLayerMsg
    , updateModel
    , viewModel
    )

{-| SceneProto update module

@docs handleLayerMsg
@docs updateModel
@docs viewModel

-}

import Array exposing (get)
import Base exposing (GlobalData, Msg(..), State(..))
import Canvas exposing (Renderable, group, shapes)
import Lib.Audio.Base exposing (AudioOption(..))
import Lib.Env.Env exposing (Env, EnvC, addCommonData, noCommonData)
import Lib.Layer.Base exposing (LayerMsg(..))
import Lib.Layer.LayerHandler exposing (updateLayer, viewLayer)
import Lib.Render.Text exposing (renderText)
import Lib.Scene.Base exposing (SceneOutputMsg(..))
import Lib.Tools.KeyCode exposing (escape)
import SceneProtos.CoreEngine.Common exposing (Model)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| handleLayerMsg

Usually you add logic here.

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
    case env.msg of
        Tick _ ->
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
            in
            ( newmodel, newsow, noCommonData newgd2 )

        KeyDown key ->
            let
                ogd =
                    env.globalData

                ngd =
                    { ogd | keyListPre = ogd.keyList, keyList = ogd.keyList |> Array.set key True }
            in
            ( model, [], { env | globalData = ngd } )

        KeyUp key ->
            let
                ogd2 =
                    env.globalData
            in
            ( model, [], { env | globalData = { ogd2 | keyListPre = ogd2.keyList, keyList = ogd2.keyList |> Array.set key False } } )

        MouseMove pos ->
            let
                ogd =
                    env.globalData

                ngd =
                    { ogd | mousePos = pos }
            in
            ( model, [], { env | globalData = ngd } )

        MouseDown _ _ ->
            let
                ogd =
                    env.globalData

                ngd =
                    { ogd | mouseDownAct = True }
            in
            ( model, [], { env | globalData = ngd } )

        _ ->
            ( model, [], env )


{-| Default view function
-}
viewModel : Env -> Model -> Renderable
viewModel env model =
    viewLayer
        (addCommonData model.commonData env)
        model.layers
