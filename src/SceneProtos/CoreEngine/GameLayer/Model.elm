module SceneProtos.CoreEngine.GameLayer.Model exposing
    ( initModel
    , updateModel, updateModelRec
    , viewModel
    )

{-| Model module

@docs initModel
@docs updateModel, updateModelRec
@docs viewModel

-}

import Array exposing (fromList, get, set)
import Array2D
import Base exposing (State(..))
import Canvas exposing (Renderable, empty, group)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
import Lib.Coordinate.Coordinates exposing (dist)
import Lib.Env.Env exposing (noCommonData)
import Lib.Layer.Base exposing (LayerMsg(..), LayerTarget(..))
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text exposing (renderText)
import Lib.Tools.ArrayTools exposing (array2D_indexedSlice)
import Lib.Tools.KeyCode exposing (escape, key_r)
import List exposing (length)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, removeDead, removeOutOfBound, shakeCam, sizeInCam, updateCamera)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GCModel(..), GameComponent, GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullData)
import SceneProtos.CoreEngine.GameComponent.Handler exposing (getGCById, getGCByName, updateGC, viewGC)
import SceneProtos.CoreEngine.GameComponents.Bullet.Export as Bullet exposing (..)
import SceneProtos.CoreEngine.GameComponents.Chip.Base as ChipBase exposing (ChipType(..))
import SceneProtos.CoreEngine.GameComponents.Chip.Export as Chip
import SceneProtos.CoreEngine.GameComponents.Ender.Export as Ender
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (EnemyInit, EnemyType(..))
import SceneProtos.CoreEngine.GameComponents.Enemy.Export as Enemy
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (GameMapInit)
import SceneProtos.CoreEngine.GameComponents.GameMap.Export as GameMap
import SceneProtos.CoreEngine.GameComponents.GameMap.Room exposing (storyRoom)
import SceneProtos.CoreEngine.GameComponents.PauseMenu.Base exposing (PauseMenuInit)
import SceneProtos.CoreEngine.GameComponents.PauseMenu.Export as PauseMenu
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (PlayerInit)
import SceneProtos.CoreEngine.GameComponents.Player.Export as Player
import SceneProtos.CoreEngine.GameComponents.Rules.Base exposing (RulesInit)
import SceneProtos.CoreEngine.GameComponents.Rules.Export as Rules
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Base exposing (StarterMenuInit)
import SceneProtos.CoreEngine.GameComponents.StarterMenu.Export as StarterMenu
import SceneProtos.CoreEngine.GameComponents.Store.Export as Store exposing (..)
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Base exposing (StoreMenuInit)
import SceneProtos.CoreEngine.GameComponents.StoreMenu.Export as StoreMenu
import SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Base as UpgradeMenuBase
import SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Export as UpgradeMenu
import SceneProtos.CoreEngine.GameComponents.Weapon.Base as WeaponBase exposing (AtkType(..), Upgrade(..), WeaponInit)
import SceneProtos.CoreEngine.GameComponents.Weapon.Export as Weapon
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC, Model, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (Buff(..))
import SceneProtos.CoreEngine.Physics.CollisionGC exposing (updateCollision)
import SceneProtos.CoreEngine.SceneInit exposing (CoreEngineInit)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| initModel
Add components here
-}
initModel : EnvC -> CoreEngineInit -> Model
initModel _ coreInit =
    coreInit


handleComponentMsg : EnvC -> GameComponentMsg -> Model -> ( Model, List ( LayerTarget, LayerMsg ), EnvC )
handleComponentMsg env msg model =
    if env.globalData.state == Paused then
        case msg of
            ResumeMsg ->
                let
                    ogd =
                        env.globalData

                    newgd =
                        { ogd | state = Active }

                    nenv =
                        { env | globalData = newgd }

                    objs =
                        model.objects

                    newobjs =
                        case List.partition (\x -> x.name == "UpgradeMenu") objs |> Tuple.first |> List.head of
                            Nothing ->
                                List.filter (\x -> x.name /= "PauseMenu" && x.name /= "UpgradeMenu") objs

                            Just upgradeMenu ->
                                List.filter (\x -> x.name /= "PauseMenu" && x.name /= "UpgradeMenu") objs |> upgradeWeapon nenv upgradeMenu
                in
                ( { model | objects = newobjs }, [], nenv )

            QuitMsg ->
                let
                    objs =
                        [ StarterMenu.initGC (noCommonData env) <| GCIdData 0 (GCStarterMenuInitData <| StarterMenuInit) ]

                    ogd =
                        env.globalData

                    newgd =
                        { ogd | state = Active }

                    nenv =
                        { env | globalData = newgd }
                in
                ( { model | objects = objs }, [], nenv )

            _ ->
                ( model, [], env )

    else
        case msg of
            GCStoryMapMsg ->
                let
                    oc =
                        env.commonData

                    nc =
                        { oc | tileMap = storyRoom }
                in
                ( model, [], { env | commonData = nc } )

            DestroyTileMap ->
                let
                    oc =
                        env.commonData

                    nc =
                        { oc | tileMap = Array2D.empty }
                in
                ( model, [], { env | commonData = nc } )

            AddBuffMsg b ->
                let
                    oc =
                        env.commonData

                    nc =
                        { oc | buff = b :: oc.buff }
                in
                ( model, [], { env | commonData = nc } )

            GCNewBulletMsg bullet ->
                -- Create a new bullet
                let
                    objs =
                        model.objects

                    newBullet =
                        Bullet.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCBulletInitData bullet

                    newObjs =
                        objs ++ [ newBullet ]
                in
                ( { model | objects = newObjs }, [], env )

            GCNewChipMsg chip ->
                let
                    objs =
                        model.objects

                    newChip =
                        Chip.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCChipInitData chip

                    newObjs =
                        objs ++ [ newChip ]
                in
                ( { model | objects = newObjs }, [], env )

            GCInitPlayerMsg p ->
                let
                    objs =
                        model.objects

                    newPlayer =
                        Player.initGC (noCommonData env) <| GCIdData 0 (GCPlayerInitData <| PlayerInit p ( 128, 128 ))

                    newObjs =
                        newPlayer :: objs
                in
                ( { model | objects = newObjs }, [], env )

            GCInitStoreMsg store ->
                let
                    objs =
                        model.objects

                    newStore =
                        Store.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCStoreInitData store

                    newObjs =
                        objs ++ [ newStore ]
                in
                ( { model | objects = newObjs }, [], env )

            GCInitEnemyMsg lsP ->
                let
                    objs =
                        model.objects

                    newEnemy =
                        List.indexedMap
                            (\t { pos, typeId } ->
                                Enemy.initGC (noCommonData env) <|
                                    GCIdData (genUID objs + t)
                                        (GCEnemyInitData <|
                                            EnemyInit pos ( 128, 128 ) 1 typeId 1
                                        )
                            )
                            lsP

                    newObjs =
                        newEnemy ++ objs
                in
                ( { model | objects = newObjs }, [], env )

            -- ( model, [], env )
            GCStoreMenuOpenMsg storeMenu ->
                let
                    objs =
                        model.objects

                    newStoreMenu =
                        StoreMenu.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCStoreMenuInitData storeMenu

                    newObjs =
                        storeMenuUpdate objs newStoreMenu
                in
                ( { model | objects = newObjs }, [], env )

            {-
               GCStoreMenuCloseMsg id ->
                   let
                       objs =
                           model.objects

                       newObjs =
                           List.filter (\x -> x.Data.uid != id ) objs

                   in
                       ( { model | objects = newObjs }, [], env )
            -}
            GCSplashMsg center r ->
                let
                    ( enemies, others ) =
                        List.partition (\obj -> obj.name == "Enemy") model.objects

                    ( hitEnemies, noHitEnemies ) =
                        List.partition (\enemy -> isInCircle center r enemy.data.position) enemies

                    nEnemies =
                        List.map
                            (\enemy ->
                                let
                                    d =
                                        enemy.data

                                    hp =
                                        d.hp

                                    nhp =
                                        hp - 3

                                    ndata =
                                        if nhp <= 0 then
                                            if d.lifeStatus == Alive then
                                                { d | lifeStatus = Dead 0, hp = nhp }

                                            else
                                                { d | hp = nhp }

                                        else
                                            { d | hp = nhp }
                                in
                                { enemy | data = ndata }
                            )
                            hitEnemies

                    nobj =
                        others ++ noHitEnemies ++ nEnemies
                in
                ( { model | objects = nobj }, [], env )

            GCShakeCameraMsg t ->
                let
                    ( nenv, nmodel ) =
                        shakeCam ( env, model ) t
                in
                ( nmodel, [], nenv )

            StopShakeCameraMsg ->
                let
                    ( nenv, nmodel ) =
                        shakeCam ( env, model ) 0
                in
                ( nmodel, [], nenv )

            PlayerDeadMsg ->
                let
                    objs =
                        model.objects

                    newEnder =
                        Ender.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCEnderInitData { tp = 0 }

                    newObjs =
                        objs ++ [ newEnder ]
                in
                ( { model | objects = newObjs }, [], env )

            PlayerWinMsg ->
                let
                    objs =
                        model.objects

                    newEnder =
                        Ender.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCEnderInitData { tp = 1 }

                    newObjs =
                        objs ++ [ newEnder ]
                in
                ( { model | objects = newObjs }, [], env )

            PauseMsg ->
                let
                    ogd =
                        env.globalData

                    newState =
                        changeState ogd.state

                    ngd =
                        { ogd | state = newState }

                    nenv =
                        { env | globalData = ngd }

                    objs =
                        model.objects

                    newPauseMenu =
                        PauseMenu.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCPauseMenuInitData {}

                    newObjs =
                        objs ++ [ newPauseMenu ]
                in
                ( { model | objects = newObjs }, [], nenv )

            DisplayInstructionMsg ->
                let
                    oc =
                        env.commonData

                    nc =
                        { oc | instruction = 100 }
                in
                ( model, [], { env | commonData = nc } )

            UpgradeInitMsg playerHp ->
                let
                    ogd =
                        env.globalData

                    newState =
                        changeState ogd.state

                    ngd =
                        { ogd | state = newState }

                    objs =
                        model.objects

                    newEnder =
                        if (objs |> List.filter (\a -> a.name == "Enemy") |> List.length) == 0 then
                            [ Ender.initGC (noCommonData env) <| GCIdData (genUID model.objects) <| GCEnderInitData { tp = 1 } ]

                        else
                            []

                    ( newObjs, nenv ) =
                        case searchNearestChip objs of
                            Just ( nearestChip, nobjs ) ->
                                ( nobjs
                                    ++ [ UpgradeMenu.initGC (noCommonData env) <|
                                            GCIdData (genUID model.objects) <|
                                                GCUpgradeMenuInitData
                                                    { hp = playerHp
                                                    , installedChip = partitionInstalledChip objs
                                                    , installingChip = nearestChip
                                                    }
                                       ]
                                , { env | globalData = ngd }
                                )

                            Nothing ->
                                ( objs
                                    ++ [ UpgradeMenu.initGC (noCommonData env) <|
                                            GCIdData (genUID model.objects) <|
                                                GCUpgradeMenuInitData
                                                    { hp = playerHp
                                                    , installedChip = partitionInstalledChip objs
                                                    , installingChip = NoUpgrade
                                                    }
                                       ]
                                , { env | globalData = ngd }
                                )
                in
                ( { model | objects = newObjs ++ newEnder }, [], nenv )

            ResumeMsg ->
                let
                    ogd =
                        env.globalData

                    newgd =
                        { ogd | state = Active }

                    nenv =
                        { env | globalData = newgd }

                    objs =
                        model.objects

                    newobjs =
                        List.filter (\x -> x.name /= "PauseMenu" && x.name /= "UpgradeMenu") objs
                in
                ( { model | objects = newobjs }, [], nenv )

            GameStartMsg ->
                let
                    objs =
                        model.objects

                    nmap =
                        [ GameMap.initGC (noCommonData env) <| GCIdData 1 (GCGameMapInitData <| GameMapInit)
                        , Weapon.initGC (noCommonData env) <| GCIdData 2 (GCWeaponInitData <| WeaponInit ( 400, 100 ) ( 70 * 1.6, 24 * 1.6 ) 15 Shooter)
                        ]
                in
                ( { model | objects = nmap }, [], env )

            GCInitStartMenuMsg ->
                let
                    nmap =
                        [ StarterMenu.initGC (noCommonData env) <| GCIdData 0 (GCStarterMenuInitData <| StarterMenuInit)
                        ]
                in
                ( { model | objects = nmap }, [], { env | commonData = env.commonData |> (\c -> { c | showUI = True }) } )

            QuitMsg ->
                let
                    objs =
                        [ StarterMenu.initGC (noCommonData env) <| GCIdData 0 (GCStarterMenuInitData <| StarterMenuInit) ]
                in
                ( { model | objects = objs }, [], env )

            ShowRulesMsg ->
                let
                    objs =
                        [ Rules.initGC (noCommonData env) <| GCIdData 7 (GCRulesInitData <| RulesInit) ]
                in
                ( { model | objects = objs }, [], env )

            HideRulesMsg ->
                let
                    objs =
                        [ StarterMenu.initGC (noCommonData env) <| GCIdData 0 (GCStarterMenuInitData <| StarterMenuInit) ]
                in
                ( { model | objects = objs }, [], env )

            SetKeyMsg ( key, bool ) ->
                let
                    og =
                        env.globalData

                    ng =
                        { og | keyList = set key bool og.keyList }
                in
                ( model, [], { env | globalData = ng } )

            _ ->
                ( model, [], env )


upgradeWeapon : EnvC -> GameComponent -> List GameComponent -> List GameComponent
upgradeWeapon env upgradeMenu objs =
    let
        ( weapons, others ) =
            List.partition (\obj -> obj.name == "Weapon") objs

        umodel =
            case upgradeMenu.data.gcModel of
                GCUpgradeMenuModel um ->
                    um

                _ ->
                    UpgradeMenuBase.nullModel

        nweapons =
            weapons
                |> List.map
                    (\weapon ->
                        let
                            d =
                                weapon.data

                            wmodel =
                                case d.gcModel of
                                    GCWeaponModel wm ->
                                        wm

                                    _ ->
                                        WeaponBase.nullModel

                            nmodel =
                                { wmodel | weaponUpgrade = wmodel.weaponUpgrade |> (\wug -> { wug | upgrades = umodel.installedChip }) }

                            ndata =
                                { d | gcModel = GCWeaponModel nmodel }
                        in
                        { weapon | data = ndata }
                    )

        weaponPos =
            case List.head nweapons of
                Just w ->
                    w.data.position

                Nothing ->
                    ( 0, 0 )

        nchip =
            case umodel.installingChip of
                NoUpgrade ->
                    []

                _ ->
                    [ Chip.initGC (noCommonData env) <| GCIdData (genUID (nweapons ++ others)) <| GCChipInitData { tp = Chip umodel.installingChip, position = weaponPos } ]
    in
    nweapons ++ others ++ nchip


partitionInstalledChip : List GameComponent -> List Upgrade
partitionInstalledChip objs =
    let
        ( weapons, _ ) =
            List.partition (\obj -> obj.name == "Weapon") objs
    in
    case List.head weapons of
        Just w ->
            case w.data.gcModel of
                GCWeaponModel wgc ->
                    wgc.weaponUpgrade.upgrades

                _ ->
                    []

        Nothing ->
            []


searchNearestChip : List GameComponent -> Maybe ( Upgrade, List GameComponent )
searchNearestChip objs =
    let
        ( player, obj1 ) =
            List.partition (\obj -> obj.name == "Player") objs

        playerPos =
            case List.head player of
                Just p ->
                    p.data.position

                Nothing ->
                    ( 0, 0 )

        ( chips, others ) =
            List.partition
                (\obj ->
                    obj.name
                        == "Chip"
                        && (case obj.data.gcModel of
                                GCChipModel chip ->
                                    case chip.tp of
                                        Chip _ ->
                                            True

                                        _ ->
                                            False

                                _ ->
                                    False
                           )
                )
                objs

        ( hitChips, noHitChips ) =
            List.partition (\chip -> isInCircle playerPos (toFloat tileSize * 1.5) chip.data.position) chips |> Tuple.mapFirst (List.sortBy (\chip -> dist playerPos chip.data.position))
    in
    case List.head hitChips of
        Nothing ->
            Nothing

        Just nearestHitChip ->
            case nearestHitChip.data.gcModel of
                GCChipModel chip ->
                    case chip.tp of
                        Chip c ->
                            Just ( c, others ++ List.drop 1 hitChips ++ noHitChips )

                        _ ->
                            Nothing

                _ ->
                    Nothing


changeState : State -> State
changeState state =
    case state of
        Paused ->
            Active

        Active ->
            Paused


isInCircle : ( Int, Int ) -> Float -> ( Int, Int ) -> Bool
isInCircle center r p =
    dist center p <= r


genUID : List GameComponent -> Int
genUID xs =
    1 + (Maybe.withDefault 0 <| List.maximum (List.map (\x -> x.data.uid) xs))


storeMenuUpdate : List GameComponent -> GameComponent -> List GameComponent
storeMenuUpdate objs newStoreMenu =
    let
        oldObjs =
            List.filter (\x -> x.name /= "StoreMenu") objs

        newObjs =
            oldObjs ++ [ newStoreMenu ]
    in
    newObjs



-- To add new update process in the future:
--   Remember changing the Env and Obj used in ( newestEnv, newestModel )
--   Remember changing the last line to concat all the Msgs


{-| updateModel
Default update function

Add your logic to handle Msg here

-}
updateModel : EnvC -> Model -> ( Model, List ( LayerTarget, LayerMsg ), EnvC )
updateModel env model =
    if env.globalData.state == Paused then
        let
            objs =
                model.objects

            pauseMenu =
                List.filter (\x -> x.name == "PauseMenu" || x.name == "UpgradeMenu") objs

            objsWithoutPauseMenu =
                List.filter (\x -> x.name /= "PauseMenu" && x.name /= "UpgradeMenu") objs

            ( newObjs, newMsg, newEnv ) =
                updateGC env pauseMenu

            ( newestEnv, newestModel ) =
                ( newEnv, { model | objects = newObjs ++ objsWithoutPauseMenu } ) |> updateCamera

            nl =
                List.filter (\x -> x == ResumeMsg || x == QuitMsg) newMsg

            newestMsg =
                case length nl of
                    1 ->
                        if List.member ResumeMsg nl then
                            ResumeMsg

                        else
                            QuitMsg

                    _ ->
                        NullGCMsg

            ( nm, nmsg, nenv ) =
                handleComponentMsg newestEnv newestMsg newestModel
        in
        ( nm, nmsg, nenv )

    else
        let
            objs =
                model.objects |> removeDead |> removeOutOfBound env

            ( newObjs, newMsg, newEnv ) =
                updateGC env objs

            ( newObjs2, newMsg2, newEnv2 ) =
                updateCollision newEnv newObjs

            ( newObjs3, newMsg3, newEnv3 ) =
                updateCoin newEnv2 newObjs2

            ( newestEnv, newestModel ) =
                ( newEnv3 |> updateBuff |> updateInstruction, { model | objects = newObjs3 } ) |> updateCamera
        in
        List.foldl
            (\cTMsg ( m, cmsg, cenv ) ->
                let
                    ( nm, nmsg, nenv ) =
                        handleComponentMsg cenv cTMsg m
                in
                ( nm, nmsg ++ cmsg, nenv )
            )
            ( newestModel, [], newestEnv )
            (newMsg ++ newMsg2 ++ newMsg3)


updateInstruction : EnvC -> EnvC
updateInstruction env =
    let
        oc =
            env.commonData

        nc =
            { oc | instruction = 0 }
    in
    if Maybe.withDefault False (get Lib.Tools.KeyCode.enter env.globalData.keyList) then
        { env | commonData = nc }

    else
        env


updateCoin : EnvC -> List GameComponent -> ( List GameComponent, List GameComponentMsg, EnvC )
updateCoin env objs =
    let
        ( player, obj1 ) =
            List.partition (\obj -> obj.name == "Player") objs

        playerPos =
            case List.head player of
                Just p ->
                    p.data.position

                Nothing ->
                    ( 0, 0 )

        ( coins, others ) =
            List.partition
                (\obj ->
                    obj.name
                        == "Chip"
                        && (case obj.data.gcModel of
                                GCChipModel chip ->
                                    case chip.tp of
                                        Coin _ ->
                                            True

                                        _ ->
                                            False

                                _ ->
                                    False
                           )
                )
                objs

        ( hitCoins, noHitCoins ) =
            List.partition (\coin -> isInCircle playerPos (toFloat tileSize) coin.data.position) coins

        ( nearCoins, farCoins ) =
            List.partition (\coin -> isInCircle playerPos (toFloat tileSize * 3) coin.data.position) noHitCoins

        nHitCoins =
            List.map
                (\coin ->
                    let
                        d =
                            coin.data

                        ndata =
                            { d | lifeStatus = Dead 100 }
                    in
                    { coin | data = ndata }
                )
                hitCoins

        nenv =
            List.foldl
                (\coin oenv ->
                    case coin.data.gcModel of
                        GCChipModel chip ->
                            case chip.tp of
                                Coin c ->
                                    let
                                        oc =
                                            env.commonData

                                        nc =
                                            { oc | coin = oc.coin + c }
                                    in
                                    { oenv | commonData = nc }

                                _ ->
                                    oenv

                        _ ->
                            oenv
                )
                env
                nHitCoins

        nNearCoins =
            List.map
                (\coin ->
                    let
                        d =
                            coin.data

                        omodel =
                            case d.gcModel of
                                GCChipModel chip ->
                                    chip

                                _ ->
                                    ChipBase.nullModel

                        ndata =
                            { d
                                | lifeStatus = Dead 0
                                , gcModel =
                                    GCChipModel
                                        { omodel
                                            | targetPos =
                                                playerPos
                                                    |> Tuple.mapBoth toFloat toFloat
                                        }
                            }
                    in
                    { coin | data = ndata }
                )
                nearCoins

        nFarCoins =
            List.map
                (\coin ->
                    let
                        d =
                            coin.data

                        ndata =
                            { d | lifeStatus = Alive }
                    in
                    { coin | data = ndata }
                )
                farCoins

        nobj =
            others ++ nHitCoins ++ nNearCoins ++ nFarCoins
    in
    ( nobj, [], nenv )


updateBuff : EnvC -> EnvC
updateBuff env =
    let
        oc =
            env.commonData

        nb =
            List.map
                (\b ->
                    case b of
                        SpeedUp t ->
                            if t > 0 then
                                SpeedUp (t - 1)

                            else
                                NullBuff

                        IncreaseDamage t ->
                            if t > 0 then
                                IncreaseDamage (t - 1)

                            else
                                NullBuff

                        _ ->
                            NullBuff
                )
                oc.buff

        nc =
            { oc | buff = nb }
    in
    { env | commonData = nc }


addUnchangedGC : ( Model, List ( LayerTarget, LayerMsg ), EnvC ) -> List GameComponent -> ( Model, List ( LayerTarget, LayerMsg ), EnvC )
addUnchangedGC ( model, l, env ) nObjs =
    let
        oldObjs =
            model.objects

        nmodel =
            { model | objects = oldObjs ++ nObjs }
    in
    ( nmodel, l, env )


{-| updateModelRec
Default update function

Add your logic to handle LayerMsg here

-}
updateModelRec : EnvC -> LayerMsg -> Model -> ( Model, List ( LayerTarget, LayerMsg ), EnvC )
updateModelRec env _ model =
    ( model, [], env )


{-| viewModel
Default view function

If you don't have components, remove viewComponent.

If you have other elements than components, add them after viewComponent.

-}
viewModel : EnvC -> Model -> Renderable
viewModel env model =
    group [ imageSmoothing False ] ([ displayTileMap env, viewGC env model.objects ] ++ [ displayInstruction env ])


debug env model =
    let
        text =
            case env.globalData.state of
                Paused ->
                    "Paused"

                Active ->
                    "Active"
    in
    []


displayInstruction : EnvC -> Renderable
displayInstruction env =
    renderSprite env.globalData [ alpha (toFloat env.commonData.instruction / 100) ] ( 0, 0 ) ( 1920, 1080 ) "instruction"



-- [ renderText env.globalData 40 text "Arial" ( 0, 1040 ) ] ++ [ renderText env.globalData 40 (String.fromInt <| length model.objects) "Arial" ( 0, 800 ) ]


displayTileMap : EnvC -> Renderable
displayTileMap env =
    let
        tileMap =
            env.commonData.tileMap

        camera =
            env.commonData.camera

        ( cx, cy ) =
            camera.position |> Tuple.mapBoth toFloat toFloat

        ( sx, sy ) =
            camera.size

        ( px1, py1 ) =
            ( cx - sx / 2, cy - sy / 2 )

        ( px2, py2 ) =
            ( cx + sx / 2, cy + sy / 2 )

        tileSizeF =
            tileSize |> toFloat

        ( cxid1, cyid1 ) =
            ( px1 / tileSizeF |> floor, py1 / tileSizeF |> floor )

        ( cxid2, cyid2 ) =
            ( px2 / tileSizeF |> floor, py2 / tileSizeF |> floor )
    in
    group []
        [ group []
            ((tileMap |> array2D_indexedSlice ( cxid1, cyid1 ) ( cxid2, cyid2 ) |> Array2D.map (\( ( row, col ), cell ) -> ( row, col, cell ))).data
                |> Array.toList
                |> List.concatMap Array.toList
                |> List.map
                    (\( row, col, t ) ->
                        let
                            r =
                                row

                            c =
                                col
                        in
                        if
                            first (posInCam env ( tileSize * r, tileSize * c ))
                                >= toFloat -tileSize
                                && first (posInCam env ( tileSize * r, tileSize * c ))
                                <= toFloat (1920 + tileSize)
                                && second (posInCam env ( tileSize * r, tileSize * c ))
                                >= toFloat -tileSize
                                && second (posInCam env ( tileSize * r, tileSize * c ))
                                <= toFloat (1080 + tileSize)
                        then
                            group [ imageSmoothing False ]
                                [ renderSprite env.globalData
                                    []
                                    (posInCam env ( tileSize * r, tileSize * c ))
                                    (sizeInCam env ( tileSize |> toFloat, tileSize |> toFloat ))
                                    ("tile_" ++ fromInt t)
                                ]

                        else
                            empty
                    )
            )
        ]
