module SceneProtos.CoreEngine.GameComponent.Base exposing
    ( GameComponent, GameComponentTarget(..)
    , GameComponentMsg(..)
    , Data, nullData
    , GameComponentInitData(..)
    , Box, GCModel(..), LifeStatus(..), nullBox
    )

{-|


# GameComponent

This is generated by Mesenger.

@docs GameComponent, GameComponentTarget
@docs GameComponentMsg
@docs Data, nullData
@docs GameComponentInitData
@docs Box, GCModel, LifeStatus, nullBox

-}

import Canvas exposing (Renderable)
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes)
import Lib.Env.Env exposing (EnvC)
import Messenger.GeneralModel exposing (GeneralModel)
import SceneProtos.CoreEngine.GameComponents.Bullet.Base as BulletBase exposing (BulletInit)
import SceneProtos.CoreEngine.GameComponents.Chip.Base as ChipBase exposing (ChipInit)
import SceneProtos.CoreEngine.GameComponents.Ender.Base as EnderBase exposing (EnderInit)
import SceneProtos.CoreEngine.GameComponents.Enemy.Base as EnemyBase exposing (EnemyInit, EnemyType)
import SceneProtos.CoreEngine.GameComponents.GameMap.Base as GameMapBase exposing (GameMapInit)
import SceneProtos.CoreEngine.GameComponents.PauseMenu.Base as PauseMenuBase exposing (PauseMenuInit)
import SceneProtos.CoreEngine.GameComponents.Player.Base as PlayerBase exposing (Dir, PlayerInit)
import SceneProtos.CoreEngine.GameComponents.Potion.Base as PotionBase exposing (PotionInit)
import SceneProtos.CoreEngine.GameComponents.Rules.Base as RulesBase exposing (RulesInit)
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Base as StarterMenuBase exposing (StarterMenuInit)
import SceneProtos.CoreEngine.GameComponents.Store.Base as StoreBase exposing (StoreInit)
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Base as StoreMenuBase exposing (StoreMenuInit)
import SceneProtos.CoreEngine.GameComponents.StoryAnimation.Base as StoryAnimationBase exposing (StoryAnimationInit)
import SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Base as UpgradeMenuBase exposing (UpgradeMenuInit)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base as WeaponBase exposing (Upgrade, WeaponInit)
import SceneProtos.CoreEngine.LayerBase exposing (Buff, CommonData)


{-| GameComponent Definitions
-}
type alias GameComponent =
    GeneralModel Data (EnvC CommonData) GameComponentMsg GameComponentTarget (List ( Renderable, Int ))


{-| GameComponent Target
-}
type GameComponentTarget
    = GCParent
    | GCById Int
    | GCByName String


{-| Messages for GameComponent
-}
type GameComponentMsg
    = NullGCMsg
    | WeaponUpdateMsg ( Int, Int ) Dir
    | EnemyUpdateMsg ( Int, Int )
    | GCNewBulletMsg BulletInit
    | GCNewChipMsg ChipInit
    | GCCollisionBulletMsg String
    | GCInitPlayerMsg ( Int, Int )
    | GCInitEnemyMsg (List { pos : ( Int, Int ), typeId : EnemyType })
    | GCHitByBulletMsg GCModel
    | GCPlayerPositionMsg ( Int, Int )
    | GCStoreMenuOpenMsg StoreMenuInit
    | GCStoreMenuCloseMsg Int
    | GCPotionInitMsg PotionInit
    | GCHitByEnemyMsg GCModel
    | GCHitByWeaponMsg GCModel
    | GCAtkPlayerMsg
      -- | UsePotionMsg Int Float
    | GCSplashMsg ( Int, Int ) Float
    | GCShakeCameraMsg Int
    | PauseMsg
    | ResumeMsg
    | QuitMsg
    | GameStartMsg
    | ShowRulesMsg
    | HideRulesMsg
    | UpgradeInitMsg Float
    | Heal Int
    | GCInitStoreMsg StoreInit
    | Transfer ( Int, Int )
    | AddBuffMsg Buff
    | GCStoryMapMsg
    | GCInitStartMenuMsg
    | SetKeyMsg ( Int, Bool )
    | DestroyTileMap
    | StopShakeCameraMsg
    | PlayerDeadMsg
    | PlayerWinMsg
    | DisplayInstructionMsg


{-| Add your data here!
-}
type alias Data =
    { uid : Int
    , size : ( Float, Float )
    , position : ( Int, Int )
    , velocity : ( Float, Float )
    , acceleration : ( Float, Float )
    , mass : Int
    , hitbox : List Box
    , simpleCheck : Box
    , hp : Float
    , lifeStatus : LifeStatus
    , gcModel : GCModel
    , extra : Dict String DefinedTypes
    }


{-| life status
-}
type LifeStatus
    = Alive
    | Dead Int


{-| hit box
-}
type alias Box =
    { offSet : ( Float, Float )
    , size : ( Float, Float )
    }


{-| hit box
-}
nullBox : Box
nullBox =
    { offSet = ( 0, 0 )
    , size = ( 0, 0 )
    }


{-| nullData
-}
nullData : Data
nullData =
    { uid = 0
    , size = ( 0, 0 )
    , position = ( 0, 0 )
    , velocity = ( 0, 0 )
    , acceleration = ( 0, 0 )
    , mass = 0
    , hitbox = []
    , simpleCheck = Box ( 0, 0 ) ( 0, 0 )
    , hp = 0
    , lifeStatus = Alive
    , gcModel = NullGCModel
    , extra = Dict.empty
    }


{-| GC init data, don't modify this by hand!
-}
type GameComponentInitData
    = GCEnderInitData EnderInit
    | GCUpgradeMenuInitData UpgradeMenuInit
    | GCChipInitData ChipInit
    | GCStoryAnimationInitData StoryAnimationInit
    | GCRulesInitData RulesInit
    | GCStarterMenuInitData StarterMenuInit
    | GCPauseMenuInitData PauseMenuInit
    | GCPotionInitData PotionInit
    | GCStoreMenuInitData StoreMenuInit
    | GCStoreInitData StoreInit
    | GCEnemyInitData EnemyInit
    | GCBulletInitData BulletInit
    | GCWeaponInitData WeaponInit
    | GCGameMapInitData GameMapInit
    | GCPlayerInitData PlayerInit
    | GCIdData Int GameComponentInitData
    | NullGCInitData


{-| GCModel
-}
type GCModel
    = NullGCModel
    | GCPlayerModel PlayerBase.Model
    | GCEnemyModel EnemyBase.Model
    | GCWeaponModel WeaponBase.Model
    | GCChipModel ChipBase.Model
    | GCBulletModel BulletBase.Bullet
    | GCGameMapModel GameMapBase.Model
    | GCStoreModel StoreBase.Model
    | GCStoreMenuModel StoreMenuBase.Model
    | GCPotionModel PotionBase.Model
    | GCPauseMenuModel PauseMenuBase.Model
    | GCUpgradeMenuModel UpgradeMenuBase.Model
    | GCStarterMenuModel StarterMenuBase.Model
    | GCRulesModel RulesBase.Model
    | GCStoryAnimationModel StoryAnimationBase.Model
    | GCEnderModel EnderBase.Model
