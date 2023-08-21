module SceneProtos.CoreEngine.GameComponents.Bullet.Base exposing (Bullet, BulletInit, BulletType(..), nullBullet)

{-| Bullet components base

@docs Bullet, BulletInit, BulletType, nullBullet

-}


{-| bullet init type
-}
type alias BulletInit =
    { startPos : ( Float, Float )
    , targetPos : ( Float, Float )
    , velocity : Float
    , size : ( Float, Float )
    , bulletType : BulletType
    , atk : Float
    , delay : Int
    }


{-| bullet type
-}
type alias Bullet =
    { bulletType : BulletType
    , atk : Float
    , delay : Int
    }


{-| bullet type
-}
type BulletType
    = PlayerBullet Int
    | EnemyBullet Int


{-| nullbullet
-}
nullBullet : Bullet
nullBullet =
    Bullet (PlayerBullet 0) 0 0
