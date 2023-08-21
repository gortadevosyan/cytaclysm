module SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Base exposing (UpgradeMenuInit, Model, MovingState(..), nullModel)

{-|

@docs UpgradeMenuInit, Model, MovingState, nullModel

-}

import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))


{-| init
-}
type alias UpgradeMenuInit =
    { hp : Float
    , installedChip : List Upgrade
    , installingChip : Upgrade
    }


{-| model
-}
type alias Model =
    -- Pos is left-top corner, size is width-height
    { bgPos : ( Float, Float )
    , bgSize : ( Float, Float )

    --
    , resumePos : ( Float, Float )
    , resumeSize : ( Float, Float )

    --
    , chipPos : List ( Float, Float )
    , chipSize : ( Float, Float )
    , installedChip : List Upgrade
    , installingChip : Upgrade
    , movingState : MovingState

    --
    , hpPos : ( Float, Float )
    , hpSize : ( Float, Float )
    , hp : Float
    , speedBuffPos : ( Float, Float )
    , speedBuffTextPos : ( Float, Float )
    , atkBuffPos : ( Float, Float )
    , atkBuffTextPos : ( Float, Float )
    , buffSize : ( Float, Float )
    , coinTextPos : ( Float, Float )
    }


{-| moving state
-}
type MovingState
    = Moving ( ( Int, Int ), ( Upgrade, Float, Float ), ( Upgrade, Float, Float ) )
    | Stopped Int


{-| nullmodel
-}
nullModel : Model
nullModel =
    { bgPos = ( 0, 0 )
    , bgSize = ( 1920, 1080 )

    --
    , resumePos = ( 376, 228 )
    , resumeSize = ( 184, 52 )

    --
    , chipPos = [ ( 1396, 340 ), ( 1396, 520 ), ( 1396, 700 ), ( 1152, 340 ), ( 1152, 520 ), ( 1152, 700 ) ]
    , chipSize = ( 128, 128 )
    , installedChip = []
    , installingChip = Scatter
    , movingState = Stopped 2

    --
    , hpPos = ( 400, 800 )
    , hpSize = ( 240, 40 )
    , hp = 0
    , speedBuffPos = ( 350, 780 )
    , speedBuffTextPos = ( 420, 785 )
    , atkBuffPos = ( 600, 780 )
    , atkBuffTextPos = ( 670, 785 )
    , buffSize = ( 96, 96 )
    , coinTextPos = ( 1350, 220 )
    }
