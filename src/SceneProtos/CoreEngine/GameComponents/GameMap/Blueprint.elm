module SceneProtos.CoreEngine.GameComponents.GameMap.Blueprint exposing (Blueprint, nullBlueprint)

{-| depleted

@docs Blueprint, nullBlueprint

-}

import Array2D exposing (Array2D)


{-| depleted
-}
type alias Blueprint =
    { roomCnt : Int
    , rooms : Array2D Int
    , start : ( Int, Int )
    , end : ( Int, Int )
    , pathList : List ( Int, Int )
    , typeList : List Int
    }


{-| depleted
-}
nullBlueprint : Blueprint
nullBlueprint =
    { roomCnt = 0
    , rooms = Array2D.repeat 6 6 0
    , start = ( 0, 0 )
    , end = ( 0, 0 )
    , pathList = []
    , typeList = []
    }
