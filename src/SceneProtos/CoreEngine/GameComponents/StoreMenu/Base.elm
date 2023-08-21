module SceneProtos.CoreEngine.GameComponents.StoreMenu.Base exposing (Model, StoreMenuInit, nullModel)

{-|

@docs Model, StoreMenuInit, nullModel

-}

import SceneProtos.CoreEngine.GameComponents.Potion.Base as PotionBase exposing (Model)


{-| store menu init
-}
type alias StoreMenuInit =
    { position : ( Int, Int )
    , size : ( Float, Float )
    }


{-| model
-}
type alias Model =
    { potions : List PotionBase.Model
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { potions = [ PotionBase.Model 100 15, PotionBase.Model 10 25 ]
    }
