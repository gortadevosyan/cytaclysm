module SceneProtos.CoreEngine.GameComponents.PauseMenu.Base exposing (Model, PauseMenuInit, nullModel)

{-|

@docs Model, PauseMenuInit, nullModel

-}


{-| nothing
-}
type alias PauseMenuInit =
    {}


{-| model
-}
type alias Model =
    { resumePos : ( Int, Int )
    , quitPos : ( Int, Int )
    , buttonSize : ( Float, Float )
    }


{-| nhllmodel
-}
nullModel : Model
nullModel =
    { resumePos = ( 960, 540 - 130 )
    , quitPos = ( 960, 540 + 130 )
    , buttonSize = ( 256 * 1.3, 128 * 1.3 )
    }
