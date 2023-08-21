module SceneProtos.CoreEngine.GameComponents.Store.Potion exposing (Potion, PotionType(..))

{-|

@docs Potion, PotionType

-}


{-| potion property
-}
type alias Potion =
    { price : Int
    , potionType : PotionType
    }


{-| potion type
-}
type PotionType
    = SmallHealthPotion
    | MediumHealthPotion
    | LargeHealthPotion
    | SpeedPotion
    | AtkPotion
