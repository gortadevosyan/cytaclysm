module SceneProtos.CoreEngine.GameLayer.Common exposing (Model, EnvC, nullModel)

{-| Common definitions

@docs Model, EnvC, nullModel

-}

import Lib.Env.Env as Env
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| Model

Add your own model data here.

-}
type alias Model =
    { objects : List GameComponent }


{-| nullModel
-}
nullModel : Model
nullModel =
    { objects = [] }


{-| Convenient type alias for the environment
-}
type alias EnvC =
    Env.EnvC CommonData
