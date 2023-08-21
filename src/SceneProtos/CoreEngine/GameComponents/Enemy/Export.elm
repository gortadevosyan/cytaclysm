module SceneProtos.CoreEngine.GameComponents.Enemy.Export exposing (initGC)

{-|

@docs initGC

-}

import Lib.Env.Env exposing (Env)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentInitData)
import SceneProtos.CoreEngine.GameComponents.Enemy.Model exposing (initModel, updateModel, updateModelRec, viewModel)


{-| init GC
-}
initGC : Env -> GameComponentInitData -> GameComponent
initGC env i =
    { name = "Enemy"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
