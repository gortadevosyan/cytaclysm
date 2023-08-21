module Scenes.Home.Export exposing (game)

{-| Export module

@docs game

-}

import Lib.Env.Env exposing (Env)
import Lib.Scene.Base exposing (SceneTMsg)
import SceneProtos.CoreEngine.SceneInit exposing (CoreEngineInit)
import Scenes.Home.Config exposing (initObjects)


{-| Use the environment and sent init data to change the init data.
-}
game : Env -> SceneTMsg -> CoreEngineInit
game env msg =
    { objects = initObjects env msg
    }
