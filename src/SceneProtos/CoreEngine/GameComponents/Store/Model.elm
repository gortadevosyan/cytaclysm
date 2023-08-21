module SceneProtos.CoreEngine.GameComponents.Store.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get)
import Canvas exposing (Renderable, group)
import Canvas.Settings.Advanced exposing (imageSmoothing)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Coordinate.Coordinates exposing (dist)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text exposing (renderTextWithColor)
import Lib.Tools.KeyCode exposing (key_r)
import Lib.Tools.RNG exposing (genRandomListInt)
import List.Extra exposing (getAt, setAt)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Store.Base exposing (Item(..), ItemStates(..), Model, nullModel)
import SceneProtos.CoreEngine.GameComponents.Store.Potion exposing (Potion, PotionType(..))
import SceneProtos.CoreEngine.LayerBase exposing (Buff(..), CommonData)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel env initData =
    case initData of
        GCIdData id (GCStoreInitData d) ->
            Data id ( toFloat (8 * tileSize), toFloat (6 * tileSize) ) d.position ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 5 ) ( 64, 118 ) ] nullBox 0 Alive (initStoreModel env id) initExtraData

        _ ->
            nullData


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


initStoreModel : Env -> Int -> GCModel
initStoreModel env t =
    let
        -- newWeaponPos =
        --     ( posx - round (0.2 * sizex), posy + round (0.25 * sizey) )
        -- newPotionPos =
        --     ( posx + round (0.2 * sizex), posy + round (0.25 * sizey) )
        -- store =
        --     Model newWeaponPos newPotionPos ( 0, 0 )
        randomList =
            genRandomListInt t 3 ( 1, 5 )

        potionList =
            List.map
                (\i ->
                    case i of
                        1 ->
                            Potion 20 SmallHealthPotion

                        2 ->
                            Potion 40 MediumHealthPotion

                        3 ->
                            Potion 80 LargeHealthPotion

                        4 ->
                            Potion 30 SpeedPotion

                        5 ->
                            Potion 40 AtkPotion

                        _ ->
                            Potion 30 SpeedPotion
                )
                randomList

        items =
            List.map (\potion -> PotionItem potion) potionList
    in
    GCStoreModel (Model items [ Selling, Selling, Selling ] 0)


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        model =
            case d.gcModel of
                GCStoreModel store ->
                    store

                _ ->
                    nullModel

        ( nmodel, ( nmsg, nenv ) ) =
            case model.near of
                0 ->
                    ( model, ( [], env ) )

                i ->
                    if Maybe.withDefault Bought (getAt (i - 1) model.itemStates) == Selling && Maybe.withDefault False (get key_r env.globalData.keyList) then
                        ( { model | itemStates = setAt (i - 1) Bought model.itemStates }, itemEffect env (Maybe.withDefault NullItem (getAt (i - 1) model.items)) )

                    else
                        ( model, ( [], env ) )
    in
    ( { d | gcModel = GCStoreModel nmodel }, nmsg, nenv )


itemEffect : EnvC CommonData -> Item -> ( List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
itemEffect env item =
    case item of
        PotionItem potion ->
            let
                c =
                    env.commonData

                nc =
                    { c | coin = c.coin - potion.price }

                nenv =
                    { env | commonData = nc }

                nmsg =
                    case potion.potionType of
                        SmallHealthPotion ->
                            [ ( GCByName "Player", Heal 10 ) ]

                        MediumHealthPotion ->
                            [ ( GCByName "Player", Heal 30 ) ]

                        LargeHealthPotion ->
                            [ ( GCByName "Player", Heal 70 ) ]

                        SpeedPotion ->
                            [ ( GCParent, AddBuffMsg (SpeedUp 4000) ) ]

                        AtkPotion ->
                            [ ( GCParent, AddBuffMsg (IncreaseDamage 6000) ) ]
            in
            if nc.coin < 0 then
                ( [], env )

            else
                ( nmsg, nenv )

        _ ->
            ( [], env )



-- ( sizex, sizey ) =
--     d.size
-- ( weaponSizex, weaponSizey ) =
--     ( 0.2 * sizex, 0.5 * sizey )
-- ( storeMenuPosx, storeMenuPosy ) =
--     model.playerPos
-- flag =
--     if checkColisionWithPlayer model.playerPos model.weaponPos ( weaponSizex, weaponSizey ) || checkColisionWithPlayer model.playerPos model.potionPos ( weaponSizex, weaponSizey ) then
--         True
--     else
--         False
-- ( gcmsg, nd ) =
--     if Maybe.withDefault False (get key_o env.globalData.keyListPre) then
--         if flag then
--             ( [ ( GCParent, GCStoreMenuOpenMsg (StoreMenuInit ( storeMenuPosx, storeMenuPosy - 800 ) ( 500, 500 )) ) ], d )
--         else
--             ( [], d )
--     else
--         ( [], d )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env cmsg d =
    let
        omodel =
            case d.gcModel of
                GCStoreModel store ->
                    store

                _ ->
                    nullModel

        nmodel =
            case cmsg of
                GCPlayerPositionMsg pos ->
                    let
                        near =
                            if dist pos ( first d.position - 3 * tileSize, second d.position + 2 * tileSize ) <= 90 then
                                1

                            else if dist pos ( first d.position, second d.position + 2 * tileSize ) <= 90 then
                                2

                            else if dist pos ( first d.position + 3 * tileSize, second d.position + 2 * tileSize ) <= 90 then
                                3

                            else
                                0
                    in
                    { omodel | near = near }

                _ ->
                    omodel

        nd =
            { d | gcModel = GCStoreModel nmodel }
    in
    ( nd, [], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayStore env d, 1 ) ]


displayStore : EnvC CommonData -> Data -> Renderable
displayStore env d =
    let
        model =
            case d.gcModel of
                GCStoreModel store ->
                    store

                _ ->
                    nullModel

        ( storex, storey ) =
            d.position

        items =
            List.indexedMap
                (\i item ->
                    case Maybe.withDefault Bought (getAt i model.itemStates) of
                        Selling ->
                            case item of
                                PotionItem potion ->
                                    case potion.potionType of
                                        SmallHealthPotion ->
                                            renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize + i * 3 * tileSize, storey )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "small_health_potion"

                                        MediumHealthPotion ->
                                            renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize + i * 3 * tileSize, storey )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "medium_health_potion"

                                        LargeHealthPotion ->
                                            renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize + i * 3 * tileSize, storey )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "large_health_potion"

                                        SpeedPotion ->
                                            renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize + i * 3 * tileSize, storey )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "speed_potion"

                                        AtkPotion ->
                                            renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize + i * 3 * tileSize, storey )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "atk_potion"

                                _ ->
                                    Canvas.empty

                        Bought ->
                            Canvas.empty
                )
                model.items
    in
    group [ imageSmoothing False ]
        (renderSprite env.globalData [] (posInCam env ( storex - 4 * tileSize, storey - 3 * tileSize )) (sizeInCam env ( toFloat (8 * tileSize), toFloat (6 * tileSize) )) "store"
            :: displayStoreMenu env d
            :: items
        )


displayStoreMenu : EnvC CommonData -> Data -> Renderable
displayStoreMenu env d =
    let
        model =
            case d.gcModel of
                GCStoreModel store ->
                    store

                _ ->
                    nullModel

        cur =
            Maybe.withDefault NullItem (getAt (model.near - 1) model.items)

        curState =
            Maybe.withDefault Bought (getAt (model.near - 1) model.itemStates)

        ( title, price, info ) =
            case ( cur, curState ) of
                ( PotionItem potion, Selling ) ->
                    case potion.potionType of
                        SmallHealthPotion ->
                            ( "Small Health Potion", fromInt potion.price ++ "$    (press R to buy)", "Heal 10 HP" )

                        MediumHealthPotion ->
                            ( "Medium Health Potion", fromInt potion.price ++ "$    (press R to buy)", "Heal 30 HP" )

                        LargeHealthPotion ->
                            ( "Large Health Potion", fromInt potion.price ++ "$    (press R to buy)", "Heal 70 HP" )

                        SpeedPotion ->
                            ( "Speed Potion", fromInt potion.price ++ "$    (press R to buy)", "Increase running speed" )

                        AtkPotion ->
                            ( "Attack Potion", fromInt potion.price ++ "$    (press R to buy)", "Increase player atk" )

                _ ->
                    ( "", "", "" )
    in
    group []
        (if cur == NullItem then
            []

         else
            [ renderTextWithColor env.globalData 40 title "disposabledroid_bbregular" Color.white (posInCam env ( first d.position - 4 * tileSize + 40, second d.position - 3 * tileSize + 30 ))
            , renderTextWithColor env.globalData 30 price "disposabledroid_bbregular" Color.white (posInCam env ( first d.position - 4 * tileSize + 40, second d.position - 2 * tileSize + 20 ))
            , renderTextWithColor env.globalData 30 info "disposabledroid_bbregular" Color.white (posInCam env ( first d.position - 4 * tileSize + 40, second d.position - 1 * tileSize ))
            ]
        )



-- displayStore : EnvC CommonData -> Data -> Renderable
-- displayStore env d =
--     let
--         model =
--             case d.gcModel of
--                 GCStoreModel store ->
--                     store
--                 _ ->
--                     nullModel
--         ( sizex, sizey ) =
--             d.size
--         ( wpx, wpy ) =
--             model.weaponPos
--         camPosWeapon =
--             posInCam env ( wpx - round (0.1 * sizex), wpy - round (sizey / 4) )
--         ( ppx, ppy ) =
--             model.potionPos
--         camPosPotion =
--             posInCam env ( ppx - round (0.1 * sizex), ppy - round (sizey / 4) )
--         camSize =
--             sizeInCam env ( 0.2 * sizex, sizey / 2 )
--         ( x, y ) =
--             d.position
--         ( bigx, bigy ) =
--             posInCam env ( x - round (sizex / 2), y - round (sizey / 2) )
--     in
--     group []
--         ([ shapes [ fill Color.red ] [ rect env.globalData ( bigx, bigy ) (sizeInCam env d.size) ] ]
--             ++ [ shapes [ fill Color.blue ] [ rect env.globalData camPosWeapon camSize, rect env.globalData camPosPotion camSize ] ]
--             ++ storeText env d
--         )
-- debug env d =
--     let
--         model =
--             case d.gcModel of
--                 GCStoreModel store ->
--                     store
--                 _ ->
--                     nullModel
--         ( sizex, sizey ) =
--             d.size
--         ( wpx, wpy ) =
--             model.weaponPos
--     in
--     {- }
--        [ renderText env.globalData 40 (Debug.toString [ sizex / 4, sizey / 4 ]) "Times New Roman" ( 1000, 0 )
--        , renderText env.globalData 40 (Debug.toString model.potionPos) "Times New Roman" ( 1000, 50 )
--        , renderText env.globalData 40 (Debug.toString model.playerPos) "Times New Roman" ( 1000, 100 )
--        , renderText env.globalData 40 (Debug.toString ( wpx, wpy )) "Times New Roman" ( 1000, 150 )
--        , renderText env.globalData 40 (Debug.toString d.position) "Times New Roman" ( 1000, 200 )
--        , renderText env.globalData 40 (Debug.toString env.globalData.mousePos) "Times New Roman" ( 1000, 250 )
--        ]
--     -}
--     []
-- storeText : EnvC CommonData -> Data -> List Renderable
-- storeText env d =
--     let
--         omodel =
--             case d.gcModel of
--                 GCStoreModel store ->
--                     store
--                 _ ->
--                     nullModel
--         ( sizex, sizey ) =
--             d.size
--         ( weaponTextDispx, weaponTextDispy ) =
--             posInCam env omodel.weaponPos
--         ( potionTextDispx, potionTextDispy ) =
--             posInCam env omodel.potionPos
--         weaponText =
--             if checkColisionWithPlayer omodel.playerPos omodel.weaponPos ( 0.1 * sizex, sizey / 2 ) then
--                 [ renderText env.globalData 40 "Press O to open the Weapon Shop" "Times New Roman" ( weaponTextDispx, weaponTextDispy ) ]
--             else
--                 []
--         potionText =
--             if checkColisionWithPlayer omodel.playerPos omodel.potionPos ( 0.1 * sizex, sizey / 2 ) then
--                 [ renderText env.globalData 40 "Press O to open the Potion Shop" "Times New Roman" ( potionTextDispx, potionTextDispy ) ]
--             else
--                 []
--     in
--     weaponText ++ potionText
-- checkColisionWithPlayer : ( Int, Int ) -> ( Int, Int ) -> ( Float, Float ) -> Bool
-- checkColisionWithPlayer playerPos rectPos rectSize =
--     let
--         ( playerx, playery ) =
--             playerPos
--         ( rectPosx, rectPosy ) =
--             rectPos
--         ( rectSizex, rectSizey ) =
--             rectSize
--         ans =
--             if playerx >= rectPosx - round (rectSizex / 2) && playerx <= rectPosx + round (rectSizex / 2) then
--                 if playery >= rectPosy - round (rectSizey / 2) && playery <= rectPosy + round (rectSizey / 2) then
--                     True
--                 else
--                     False
--             else
--                 False
--     in
--     ans
