module SceneProtos.CoreEngine.GameComponents.Player.Base exposing (BoundKey, Dir(..), Model, MotionState(..), MovementState(..), PlayerInit, PositionState(..), nullModel)

{-|

@docs BoundKey, Dir, Model, MotionState, MovementState, PlayerInit, PositionState, nullModel

-}

import Lib.Tools.KeyCode exposing (..)


{-| player init
-}
type alias PlayerInit =
    { pozition : ( Int, Int )
    , size : ( Float, Float )
    }


{-| model
-}
type alias Model =
    { movementState : MovementState
    , positionState : PositionState
    , motionState : MotionState
    , boundKey : BoundKey
    , dir : Dir
    , maxHp : Float
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { movementState = Idle
    , positionState = InAir
    , motionState = Normal
    , boundKey = initBoundKey
    , dir = Right
    , maxHp = 200
    }


{-| movement sate
-}
type MovementState
    = Idle
    | Walking Int
    | JumpingUp Int
    | JumpingTop Int
    | JumpingDown Int
    | LandingBuffer Int


{-| position state
-}
type PositionState
    = InAir
    | OnGround


{-| motion state
-}
type MotionState
    = Normal
    | InDoubleJump Int


{-| direction
-}
type Dir
    = Left
    | Right


{-| key list
-}
type alias BoundKey =
    { left : Int
    , right : Int
    , jump : Int
    , jump2 : Int
    }


{-| key list init
-}
initBoundKey : BoundKey
initBoundKey =
    { left = key_a
    , right = key_d
    , jump = key_w
    , jump2 = space
    }
