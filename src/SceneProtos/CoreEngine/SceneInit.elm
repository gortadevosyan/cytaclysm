module SceneProtos.CoreEngine.SceneInit exposing
    ( nullCoreEngineInit
    , CoreEngineInit
    , initCommonData
    )

{-| SceneInit

@docs nullCoreEngineInit
@docs CoreEngineInit
@docs initCommonData

-}

import Lib.Env.Env exposing (Env)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent)
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (genTileMap)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData, nullCommonData)
import Time


{-| Init Data
-}
type alias CoreEngineInit =
    { objects : List GameComponent }


{-| Null CoreEngine init
-}
nullCoreEngineInit : CoreEngineInit
nullCoreEngineInit =
    { objects = [] }


{-| Initialize common data
-}
initCommonData : Env -> CoreEngineInit -> CommonData
initCommonData env _ =
    -- {nullCommonData | tileMap = genTileMap (Time.posixToMillis env.globalData.currentTimeStamp)}
    nullCommonData
