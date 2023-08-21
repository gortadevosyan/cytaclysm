module SceneProtos.CoreEngine.GameComponents.Chip.Base exposing (ChipInit, Model, ChipType(..), nullModel)

{-|

@docs ChipInit, Model, ChipType, nullModel

-}

import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))


{-| bullet chip start property
-}
type alias ChipInit =
    { tp : ChipType
    , position : ( Int, Int )
    }


{-| bullet chip end property
-}
type alias Model =
    { tp : ChipType
    , targetPos : ( Float, Float )
    }


{-| bullet chip chiptype
-}
type ChipType
    = Chip Upgrade
    | Coin Int


{-| bullet chip model
-}
nullModel : Model
nullModel =
    { tp = Coin 0
    , targetPos = ( 0, 0 )
    }
