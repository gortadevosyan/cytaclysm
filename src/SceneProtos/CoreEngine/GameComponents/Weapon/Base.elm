module SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (WeaponInit, Model, Upgrade(..), AtkType(..), WeaponUpgrade, nullModel)

{-|

@docs WeaponInit, Model, Upgrade, AtkType, WeaponUpgrade, nullModel

-}

import Lib.Tools.KeyCode exposing (..)
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (Dir(..))


{-| weapon init
-}
type alias WeaponInit =
    { position : ( Int, Int )
    , size : ( Float, Float )
    , atkInterval : Int
    , atkType : AtkType
    }


{-| model
-}
type alias Model =
    { dir : Dir
    , angle : Float
    , atk : Float
    , atkInterval : Int
    , lastAtkTime : Int
    , lastHitTime : Int
    , atkType : AtkType
    , weaponUpgrade : WeaponUpgrade
    , boundKey : BoundKey
    }


{-| weapon upgrade type alias
-}
type alias WeaponUpgrade =
    { maxSlot : Int
    , upgrades : List Upgrade
    }


{-| weapon upgrade type
-}
type Upgrade
    = DoubleTrigger
    | Scatter
    | Splash
    | NoUpgrade


type alias BoundKey =
    { switch : Int }


initBoundKey : BoundKey
initBoundKey =
    { switch = key_f }


{-| attack type
-}
type AtkType
    = Saber
    | Shooter


{-| null model
-}
nullModel : Model
nullModel =
    Model Right 0 8 60 -1000000 -1000000 Shooter (WeaponUpgrade 2 [ NoUpgrade, NoUpgrade, NoUpgrade ]) initBoundKey
