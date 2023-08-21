module SceneProtos.CoreEngine.GameComponents.Ender.Export exposing (initGC)

{-|

@docs initGC

-}

import Lib.Env.Env exposing (Env)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentInitData)
import SceneProtos.CoreEngine.GameComponents.Ender.Model exposing (initModel, updateModel, updateModelRec, viewModel)


{-| initGC
-}
initGC : Env -> GameComponentInitData -> GameComponent
initGC env i =
    { name = "Ender"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
