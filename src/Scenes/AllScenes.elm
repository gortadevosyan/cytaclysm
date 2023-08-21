module Scenes.AllScenes exposing (allScenes)

{-| This module is generated by Messenger, don't modify this.

This module records all the scenes.

@docs allScenes

-}

import SceneProtos.CoreEngine.Export as CoreEngine
import SceneProtos.CoreEngine.Global as CoreEngineG
import Scenes.Home.Export as Home
import Scenes.Logo.Export as Logo
import Scenes.Logo.Global as LogoG
import Scenes.SceneSettings exposing (SceneT)


{-| allScenes
Add all the scenes here
-}
allScenes : List ( String, SceneT )
allScenes =
    [ ( "Logo", LogoG.sceneToST Logo.scene )
    , ( "Home", CoreEngineG.sceneToST <| CoreEngine.genScene Home.game )
    ]