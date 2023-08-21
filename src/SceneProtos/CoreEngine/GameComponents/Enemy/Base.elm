module SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing
    ( ChasingState(..), Dir(..), EnemyInit, EnemyType(..), Model, PositionState(..)
    , nullModel
    )

{-| This includes the enemy datas

@docs ChasingState, Dir, EnemyInit, EnemyType, Model, PositionState, nullModel)

-}


{-| enemy init type
-}
type alias EnemyInit =
    { position : ( Int, Int )
    , size : ( Float, Float )
    , id : Int
    , typeId : EnemyType
    , mass : Float
    }


{-| enemy model
-}
type alias Model =
    { chasingState : ChasingState
    , positionState : PositionState
    , dir : Dir
    , searchSpeed : Float
    , chaseSpeed : Float
    , chaseSense : Float
    , maxHp : Float
    , atk : Float
    , atkInterval : Int
    , bulletVel : Float
    , lastAtkTime : Int
    , lastTurnTime : Int
    , lastHitTime : Int
    , lastHitByTime : Int
    , targetPos : ( Float, Float )
    , typeId : EnemyType
    }


{-| enemy type
-}
type EnemyType
    = EnemyShot Int
    | EnemyDash Int


{-| enemy position state
-}
type PositionState
    = OutCamera
    | NearCamera
    | OnCamera
    | PosDead


{-| enemy chasing state
-}
type ChasingState
    = Await
    | Search
    | Chase


{-| direction
-}
type Dir
    = Left
    | Right
    | Up
    | Down


{-| nullmodel
-}
nullModel : Model
nullModel =
    { chasingState = Await
    , positionState = NearCamera
    , dir = Right
    , searchSpeed = 3
    , chaseSpeed = 4
    , chaseSense = 60
    , atk = 0
    , maxHp = 10
    , atkInterval = 30
    , bulletVel = 20
    , lastAtkTime = -1000000
    , lastTurnTime = -1000000
    , lastHitTime = -1000000
    , lastHitByTime = -1000000
    , targetPos = ( 0, 0 )
    , typeId = EnemyShot 0
    }
