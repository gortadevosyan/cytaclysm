module SceneProtos.CoreEngine.GameComponents.Store.Base exposing (Item(..), ItemStates(..), Model, StoreInit, nullModel)

{-|

@docs Item, ItemStates, Model, StoreInit, nullModel

-}

import SceneProtos.CoreEngine.GameComponents.Store.Potion exposing (Potion)


{-| store init
-}
type alias StoreInit =
    { position : ( Int, Int )
    }


{-| model
-}
type alias Model =
    { items : List Item
    , itemStates : List ItemStates
    , near : Int
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { items = []
    , itemStates = []
    , near = 0
    }


{-| item type
-}
type Item
    = PotionItem Potion
    | NullItem


{-| intem state
-}
type ItemStates
    = Selling
    | Bought


type MenuState
    = Open
    | Closed
