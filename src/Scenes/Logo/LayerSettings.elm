module Scenes.Logo.LayerSettings exposing
    ( LayerDataType(..)
    , LayerT
    )

{-| This module is generated by Messenger, don't modify this.

@docs LayerDataType
@docs LayerT

-}

import Lib.Layer.Base exposing (Layer)
import Scenes.Logo.Emp.Export as Emp
import Scenes.Logo.LayerBase exposing (CommonData)


{-| LayerDataType
-}
type LayerDataType
    = EmpData Emp.Data
    | NullLayerData


{-| LayerT
-}
type alias LayerT =
    Layer LayerDataType CommonData
