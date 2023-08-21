module SceneProtos.CoreEngine.GameComponents.StoreMenu.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

--import SceneProtos.CoreEngine.GameComponents.Store.Model exposing (checkColisionWithPlayer)

import Array exposing (get)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill, stroke)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Tools.KeyCode exposing (key_c)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, posInMap, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Potion.Base exposing (PotionInit)
import SceneProtos.CoreEngine.GameComponents.Potion.Model exposing (displayPotion)
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Base exposing (Model, StoreMenuInit, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCStoreMenuInitData d) ->
            Data id d.size d.position ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 5 ) ( 64, 118 ) ] nullBox 0 Alive (GCStoreMenuModel nullModel) initExtraData

        _ ->
            nullData


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        gd =
            env.globalData

        model =
            case d.gcModel of
                GCStoreMenuModel storeMenu ->
                    storeMenu

                _ ->
                    nullModel

        ( sizex, sizey ) =
            d.size

        ( weaponSizex, weaponSizey ) =
            ( 0.2 * sizex, 0.5 * sizey )

        ( gcmsg, nd ) =
            if Maybe.withDefault False (get key_c env.globalData.keyListPre) then
                ( [], { d | lifeStatus = Dead 0 } )

            else
                ( [], d )
    in
    ( nd, gcmsg, env )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env _ d =
    ( d, [ ( GCParent, GCPotionInitMsg (PotionInit 100 15) ) ], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayStoreMenu env d, 1 ), ( displayPotion env d, 2 ) ]


displayStoreMenu : EnvC CommonData -> Data -> Renderable
displayStoreMenu env d =
    let
        ( posx, posy ) =
            d.position

        ( sizex, sizey ) =
            d.size

        camPos =
            posInCam env ( posx - round (sizex / 2), posy + round (sizey / 2) )

        camSize =
            sizeInCam env ( sizex, sizey )
    in
    case d.lifeStatus of
        Alive ->
            group []
                [ shapes [ fill Color.yellow ] [ rect env.globalData camPos camSize ] ]

        _ ->
            group []
                [ shapes [] [] ]
