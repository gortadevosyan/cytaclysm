module SceneProtos.CoreEngine.Export exposing
    ( Data
    , genScene
    )

{-| Export module

Normally you don't need to change this file.

@docs Data
@docs genScene

-}

import Lib.Env.Env exposing (Env)
import Lib.Scene.Base exposing (Scene, SceneInitData(..), SceneTMsg(..))
import SceneProtos.CoreEngine.Common exposing (Model, initModel)
import SceneProtos.CoreEngine.Model exposing (updateModel, viewModel)
import SceneProtos.CoreEngine.SceneInit exposing (CoreEngineInit)


{-| Data
-}
type alias Data =
    Model


{-| genScene
-}
genScene : (Env -> SceneTMsg -> CoreEngineInit) -> Scene Data
genScene im =
    { init =
        \env i ->
            case i of
                SceneTransMsg init ->
                    initModel env <| CoreEngineInitData (im env init)

                _ ->
                    initModel env <| CoreEngineInitData (im env NullSceneMsg)
    , update = updateModel
    , view = viewModel
    }
