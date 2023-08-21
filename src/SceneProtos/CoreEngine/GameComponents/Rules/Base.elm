module SceneProtos.CoreEngine.GameComponents.Rules.Base exposing (Model, RulesInit, nullModel)

{-|

@docs Model, RulesInit, nullModel

-}


{-| nothing
-}
type alias RulesInit =
    {}


{-| model
-}
type alias Model =
    { backPos : ( Int, Int )
    , buttonSize : ( Float, Float )
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { backPos = ( 200, 200 )
    , buttonSize = ( 100, 50 )
    }
