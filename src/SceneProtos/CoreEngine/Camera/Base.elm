module SceneProtos.CoreEngine.Camera.Base exposing (Camera, CameraState(..), nullCamera)

{-| This is camera base file.

@docs Camera, CameraState, nullCamera

-}

import SceneProtos.CoreEngine.Camera.Config exposing (cameraHeight, cameraWidth)


{-| camera structure
-}
type alias Camera =
    { position : ( Int, Int )
    , velocity : ( Float, Float )
    , size : ( Float, Float )
    , cameraState : CameraState
    }


{-| null camera
-}
nullCamera : Camera
nullCamera =
    { position = ( 960, 540 )
    , velocity = ( 0, 0 )
    , size = ( cameraWidth, cameraHeight )
    , cameraState = Normal
    }


{-| camera state
-}
type CameraState
    = Normal
    | Shaking Int
