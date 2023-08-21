module SceneProtos.CoreEngine.GameComponents.StoryAnimation.Base exposing (Model, StoryAnimationInit, nullModel)

{-|

@docs Model, StoryAnimationInit, nullModel

-}


{-| nothing
-}
type alias StoryAnimationInit =
    {}


{-| model
-}
type alias Model =
    { t : Int
    }


{-| nullmodel
-}
nullModel : Model
nullModel =
    { t = 0
    }
