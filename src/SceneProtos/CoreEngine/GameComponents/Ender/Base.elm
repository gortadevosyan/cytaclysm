module SceneProtos.CoreEngine.GameComponents.Ender.Base exposing (EnderInit, Model)

{-| This is ender when win or dead

@docs EnderInit, Model

-}


{-| type alias
-}
type alias EnderInit =
    { tp : Int }


{-| model
-}
type alias Model =
    { stTime : Int
    , tp : Int
    }
