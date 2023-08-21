module SceneProtos.CoreEngine.GameComponents.StarterMenu.Export exposing (initGC)

{-|

@docs initGC

-}

import Lib.Env.Env exposing (Env)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentInitData)
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Model exposing (initModel, updateModel, updateModelRec, viewModel)


{-| initGC
-}
initGC : Env -> GameComponentInitData -> GameComponent
initGC env i =
    { name = "StarterMenu"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
