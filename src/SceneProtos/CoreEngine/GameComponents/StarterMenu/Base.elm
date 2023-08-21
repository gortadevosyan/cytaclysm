module SceneProtos.CoreEngine.GameComponents.StarterMenu.Base exposing (Model, StarterMenuInit, nullModel)

{-|

@docs Model, StarterMenuInit, nullModel

-}


{-| nothing
-}
type alias StarterMenuInit =
    {}


{-| model
-}
type alias Model =
    { startPos : ( Int, Int )
    , rulesPos : ( Int, Int )
    , buttonSize : ( Float, Float )
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { startPos = ( 960, 600 )
    , rulesPos = ( 960, 750 )
    , buttonSize = ( 256, 128 )
    }
