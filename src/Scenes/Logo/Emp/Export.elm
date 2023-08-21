module Scenes.Logo.Emp.Export exposing
    ( Data
    , initLayer
    )

{-| Export module

The export module for layer.

Although this will not be updated, usually you don't need to change this file.

@docs Data
@docs initLayer

-}

import Lib.Layer.Base exposing (Layer)
import Scenes.Logo.Emp.Common exposing (EnvC, Model)
import Scenes.Logo.Emp.Model exposing (initModel, updateModel, updateModelRec, viewModel)
import Scenes.Logo.LayerBase exposing (CommonData)
import Scenes.Logo.SceneInit exposing (LogoInit)


{-| Data
-}
type alias Data =
    Model


{-| initLayer
-}
initLayer : EnvC -> LogoInit -> Layer Data CommonData
initLayer env i =
    { name = "Emp"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
