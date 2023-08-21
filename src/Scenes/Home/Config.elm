module Scenes.Home.Config exposing (initObjects)

{-|

@docs initObjects

-}

import Lib.Env.Env exposing (Env)
import Lib.Scene.Base exposing (SceneTMsg)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentInitData(..))
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (GameMapInit)
import SceneProtos.CoreEngine.GameComponents.GameMap.Export as GameMap
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (PlayerInit)
import SceneProtos.CoreEngine.GameComponents.Player.Export as Player
import SceneProtos.CoreEngine.GameComponents.Potion.Base exposing (PotionInit)
import SceneProtos.CoreEngine.GameComponents.Potion.Export as Potion
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Base exposing (StarterMenuInit)
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Export as StarterMenu
import SceneProtos.CoreEngine.GameComponents.Store.Base exposing (StoreInit)
import SceneProtos.CoreEngine.GameComponents.Store.Export as Store
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Base exposing (StoreMenuInit)
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Export as StoreMenu
import SceneProtos.CoreEngine.GameComponents.StoryAnimation.Export as StoryAnimation
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (AtkType(..), WeaponInit)
import SceneProtos.CoreEngine.GameComponents.Weapon.Export as Weapon


{-| init all the objects
-}
initObjects : Env -> SceneTMsg -> List GameComponent
initObjects env _ =
    [ --GameMap.initGC env <| GCIdData 1 (GCGameMapInitData <| GameMapInit)
      -- StarterMenu.initGC env <| GCIdData 0 (GCStarterMenuInitData <| StarterMenuInit)
      StoryAnimation.initGC env NullGCInitData

    -- , Player.initGC env <| GCIdData 0 (GCPlayerInitData <| PlayerInit ( 600, 400 ) ( 128, 128 ))
    --, Weapon.initGC env <| GCIdData 2 (GCWeaponInitData <| WeaponInit ( 400, 100 ) ( 70, 20 ) 60)
    --, Store.initGC env <| GCIdData 3 (GCStoreInitData <| StoreInit ( 1100, 1050 ) ( 500, 500 ))
    --, Weapon.initGC env <| GCIdData 2 (GCWeaponInitData <| WeaponInit ( 400, 100 ) ( 140, 20 ) 20 Saber)
    --, Potion.initGC env <| GCIdData 3 (GCPotionInitData <| PotionInit 100 15)
    --, Weapon.initGC env <| GCIdData 2 (GCWeaponInitData <| WeaponInit ( 400, 100 ) ( 70, 20 ) 20 Shooter)
    ]
