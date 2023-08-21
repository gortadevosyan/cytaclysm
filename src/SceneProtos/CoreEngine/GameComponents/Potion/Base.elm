module SceneProtos.CoreEngine.GameComponents.Potion.Base exposing (Model, PotionInit, nullModel)

{-|

@docs Model, PotionInit, nullModel

-}


{-| giving the potion init structure
-}
type alias PotionInit =
    { price : Int
    , effect : Float -- increases the hp by amount of percentages
    }


{-| model
-}
type alias Model =
    { price : Int
    , effect : Float
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    Model 0 0
