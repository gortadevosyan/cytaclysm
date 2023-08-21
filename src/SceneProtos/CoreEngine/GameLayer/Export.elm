module SceneProtos.CoreEngine.GameLayer.Export exposing
    ( Data
    , initLayer
    )

{-| Export module

@docs Data
@docs initLayer

-}

import Lib.Layer.Base exposing (Layer)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC, Model)
import SceneProtos.CoreEngine.GameLayer.Model exposing (initModel, updateModel, updateModelRec, viewModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import SceneProtos.CoreEngine.SceneInit exposing (CoreEngineInit)


{-| Data
-}
type alias Data =
    Model


{-| initLayer
-}
initLayer : EnvC -> CoreEngineInit -> Layer Data CommonData
initLayer env i =
    { name = "GameLayer"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
