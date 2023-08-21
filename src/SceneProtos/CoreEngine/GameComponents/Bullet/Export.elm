module SceneProtos.CoreEngine.GameComponents.Bullet.Export exposing (initGC)

{-|

@docs initGC

-}

import Lib.Env.Env exposing (Env)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentInitData)
import SceneProtos.CoreEngine.GameComponents.Bullet.Model exposing (initModel, updateModel, updateModelRec, viewModel)


{-| bullet chip initGC
-}
initGC : Env -> GameComponentInitData -> GameComponent
initGC env i =
    { name = "Bullet"
    , data = initModel env i
    , update = updateModel
    , updaterec = updateModelRec
    , view = viewModel
    }
