module SceneProtos.CoreEngine.GameComponents.Enemy.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array2D exposing (Array2D)
import Base exposing (Msg(..))
import Canvas exposing (Renderable)
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Tools.ArrayTools exposing (array2D_indexedSlice, array2D_slice)
import Lib.Tools.Queue exposing (Queue, gbfsr)
import Lib.Tools.RNG exposing (genRandomInt)
import MainConfig exposing (gravity, tileSize)
import Quantity exposing (per)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInMap)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Bullet.Base exposing (BulletInit, BulletType(..))
import SceneProtos.CoreEngine.GameComponents.Chip.Base as ChipBase
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (..)
import SceneProtos.CoreEngine.GameComponents.Enemy.Display exposing (displayEnemy)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import SceneProtos.CoreEngine.Physics.Collision as Collision
import SceneProtos.CoreEngine.Physics.Movement exposing (updateVelByAcc)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel env initData =
    case initData of
        GCIdData id (GCEnemyInitData d) ->
            let
                mass =
                    1
            in
            Data id
                d.size
                d.position
                ( 0, 0 )
                ( 0, gravity )
                mass
                [ nullBox ]
                -- []
                (Box ( 0, 5 ) ( 70, 70 ))
                0
                Alive
                (GCEnemyModel nullModel)
                initExtraData
                |> enemyConfig env.t d.typeId

        _ ->
            nullData


enemyConfig : Int -> EnemyType -> Data -> Data
enemyConfig seed typeId od =
    case typeId of
        EnemyShot st ->
            case st of
                0 ->
                    { od
                        | gcModel =
                            GCEnemyModel
                                { nullModel
                                    | searchSpeed = 3
                                    , chaseSpeed = 4
                                    , maxHp = 9.99
                                    , atk = 4
                                    , atkInterval = 60
                                    , bulletVel = 20
                                    , chaseSense = 60
                                    , dir =
                                        if genRandomInt seed ( 0, 1 ) == 0 then
                                            Left

                                        else
                                            Right
                                    , typeId = typeId
                                }
                        , hp = 9.99
                    }

                1 ->
                    { od
                        | gcModel =
                            GCEnemyModel
                                { nullModel
                                    | searchSpeed = 1
                                    , chaseSpeed = 1
                                    , maxHp = 29.99
                                    , atk = 2
                                    , atkInterval = 25
                                    , bulletVel = 5
                                    , chaseSense = 60
                                    , dir =
                                        if genRandomInt seed ( 0, 1 ) == 0 then
                                            Left

                                        else
                                            Right
                                    , typeId = typeId
                                }
                        , hp = 29.99
                    }

                2 ->
                    { od
                        | gcModel =
                            GCEnemyModel
                                { nullModel
                                    | searchSpeed = 3.4
                                    , chaseSpeed = 4
                                    , maxHp = 7.99
                                    , atk = 5
                                    , atkInterval = 90
                                    , bulletVel = 10
                                    , chaseSense = 40
                                    , dir =
                                        if genRandomInt seed ( 0, 1 ) == 0 then
                                            Left

                                        else
                                            Right
                                    , typeId = typeId
                                }
                        , hp = 7.99
                        , acceleration = ( 0, 0 )
                    }

                3 ->
                    { od
                        | gcModel =
                            GCEnemyModel
                                { nullModel
                                    | searchSpeed = 0
                                    , chaseSpeed = 0
                                    , maxHp = 79.99
                                    , atk = 3
                                    , atkInterval = 160
                                    , bulletVel = 10
                                    , chaseSense = 200
                                    , dir =
                                        if genRandomInt seed ( 0, 1 ) == 0 then
                                            Left

                                        else
                                            Right
                                    , typeId = typeId
                                }
                        , hp = 79.99
                        , acceleration = ( 0, 1 )
                        , simpleCheck = Box ( 0, 4 ) ( 90, 188 )
                        , size = ( 192, 192 )
                    }

                _ ->
                    od

        EnemyDash _ ->
            { od
                | gcModel =
                    GCEnemyModel
                        { nullModel
                            | searchSpeed = 5
                            , chaseSpeed = 30
                            , maxHp = 19.99
                            , atk = 8
                            , atkInterval = -1
                            , chaseSense = 300
                            , dir =
                                if genRandomInt seed ( 0, 1 ) == 0 then
                                    Left

                                else
                                    Right
                            , typeId = typeId
                        }
                , hp = 19.99
            }


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    case env.msg of
        Tick _ ->
            case d.lifeStatus of
                Alive ->
                    updateAliveModel env d

                Dead dt ->
                    let
                        coinNum =
                            genRandomInt (env.t + d.uid + 817) ( 1, 5 )

                        goldCoin =
                            coinNum // 5

                        silverCoin =
                            coinNum - goldCoin * 5

                        nCoinMsg =
                            if dt == 5 then
                                List.repeat goldCoin ( GCParent, GCNewChipMsg { tp = ChipBase.Coin 5, position = d.position } )
                                    ++ List.repeat silverCoin ( GCParent, GCNewChipMsg { tp = ChipBase.Coin 1, position = d.position } )

                            else
                                []

                        chipRand =
                            genRandomInt (env.t + d.uid * 2 + 12306) ( 1, 9 )

                        nChipMsg =
                            if dt == 5 then
                                case chipRand of
                                    1 ->
                                        [ ( GCParent, GCNewChipMsg { tp = ChipBase.Chip DoubleTrigger, position = d.position } ) ]

                                    2 ->
                                        [ ( GCParent, GCNewChipMsg { tp = ChipBase.Chip Scatter, position = d.position } ) ]

                                    3 ->
                                        [ ( GCParent, GCNewChipMsg { tp = ChipBase.Chip Splash, position = d.position } ) ]

                                    _ ->
                                        []

                            else
                                []
                    in
                    ( { d | lifeStatus = Dead (dt + 1) }, nCoinMsg ++ nChipMsg, env )

        _ ->
            ( d, [], env )


updateAliveModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateAliveModel env d =
    let
        ( nd, nl, nenv ) =
            ( d, [], env )
                -- |> updatePositionState
                |> updateVel
                |> updateDir

        -- |> updateTest
        ( nenv2, nd2 ) =
            ( nenv, nd )
                |> Collision.simpleHandleGonnaCollideXY

        ( rd, rl, renv ) =
            updateAtk nenv2 nd2
    in
    ( rd, nl ++ rl, renv )


updateTest : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateTest ( d, ls, env ) =
    let
        model =
            case d.gcModel of
                GCEnemyModel enemy ->
                    enemy

                _ ->
                    nullModel

        nnd =
            if model.typeId /= EnemyShot 2 then
                enemyConfig env.t (EnemyShot 2) d

            else
                d
    in
    ( nnd, ls, env )


updateAtk : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateAtk env d =
    let
        model =
            case d.gcModel of
                GCEnemyModel enemy ->
                    enemy

                _ ->
                    nullModel

        ( gcmsg, nnd ) =
            case model.typeId of
                EnemyShot st ->
                    if model.chasingState == Chase then
                        let
                            fltPosition =
                                ( toFloat <| first d.position, toFloat <| second d.position )

                            shotIntervalPossible =
                                env.t - model.lastAtkTime > model.atkInterval || (st == 3 && genRandomInt (env.t * d.uid + 114514) ( 1, 40 ) == 1)

                            ( r1, r2 ) =
                                ( toFloat (genRandomInt (env.t * d.uid) ( -16, 16 )), toFloat (genRandomInt (env.t + d.uid * 1926) ( -16, 16 )) )

                            ( rr1, rr2 ) =
                                if st == 0 then
                                    ( r1 * 2, r2 * 2 )

                                else if st == 1 then
                                    ( r1 * 20, r2 * 20 )

                                else if st == 3 then
                                    ( r1 * 50, r2 * 50 )

                                else
                                    ( 0, 0 )

                            realTargetPos =
                                ( first model.targetPos
                                    + rr1
                                , second model.targetPos
                                    + rr2
                                )
                        in
                        if shotIntervalPossible then
                            if st /= 3 then
                                ( [ ( GCParent
                                    , GCNewBulletMsg
                                        (BulletInit fltPosition
                                            realTargetPos
                                            model.bulletVel
                                            ( 25, 12.5 / 2 * 2.5 )
                                            (EnemyBullet st)
                                            model.atk
                                            0
                                        )
                                    )
                                  ]
                                , { d | gcModel = GCEnemyModel { model | lastAtkTime = env.t } }
                                )

                            else
                                ( List.map
                                    (\p ->
                                        ( GCParent
                                        , GCNewBulletMsg
                                            (BulletInit fltPosition
                                                p
                                                model.bulletVel
                                                ( 40 / 1.2, 25 / 1.2 )
                                                (EnemyBullet st)
                                                model.atk
                                                0
                                            )
                                        )
                                    )
                                    (genTarList env.t fltPosition realTargetPos)
                                , { d | gcModel = GCEnemyModel { model | lastAtkTime = env.t } }
                                )

                        else
                            ( [], d )

                    else
                        ( [], d )

                _ ->
                    ( [], d )
    in
    ( nnd, gcmsg, env )


genTarList : Int -> ( Float, Float ) -> ( Float, Float ) -> List ( Float, Float )
genTarList seed ( cx, cy ) ( tx, ty ) =
    let
        theta =
            atan2 (ty - cy) (tx - cx)

        r =
            sqrt ((tx - cx) * (tx - cx) + (ty - cy) * (ty - cy))

        num =
            genRandomInt seed ( 4, 12 )

        genT =
            List.map (\i -> ( tx + r * cos (theta + 2 * pi * toFloat i / toFloat num), ty + r * sin (theta + 2 * pi * toFloat i / toFloat num) )) (List.range 0 (num - 1))
    in
    genT


updateVel : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateVel ( d, ls, env ) =
    let
        tileMap =
            env.commonData.tileMap

        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        odir =
            omodel.dir

        ovel =
            d.velocity

        nvel =
            ovel

        randomV =
            (genRandomInt (env.t * d.uid) ( -100, 100 ) |> toFloat) / 100

        nvel2 =
            case omodel.typeId of
                EnemyShot st ->
                    (if st /= 2 then
                        case omodel.chasingState of
                            Await ->
                                ( 0, second nvel )

                            Search ->
                                if odir == Right then
                                    ( omodel.searchSpeed, second nvel )

                                else
                                    ( -omodel.searchSpeed, second nvel )

                            Chase ->
                                if odir == Right then
                                    ( omodel.chaseSpeed, second nvel )

                                else
                                    ( -omodel.chaseSpeed, second nvel )

                     else
                        case omodel.chasingState of
                            Await ->
                                rotVel omodel.searchSpeed (env.t + 1206 - d.uid) nvel

                            Search ->
                                rotVel omodel.searchSpeed (env.t + 1206 - d.uid) nvel

                            Chase ->
                                rotVel omodel.searchSpeed (env.t + 1206 - d.uid) nvel
                                    |> tarVel omodel.targetPos (d.position |> Tuple.mapBoth toFloat toFloat)
                     -- case omodel.chasingState of
                     --     Await ->
                     --         rotVel nvel
                     --     Search ->
                     --         if odir == Right then
                     --             ( omodel.searchSpeed, second nvel )
                     --         else
                     --             ( -omodel.searchSpeed, second nvel )
                     --     Chase ->
                     --         if odir == Right then
                     --             ( omodel.chaseSpeed, second nvel )
                     --         else
                     --             ( -omodel.chaseSpeed, second nvel )
                    )
                        |> (\v ->
                                if st == 0 then
                                    case omodel.chasingState of
                                        Await ->
                                            ( 0, second v )

                                        _ ->
                                            ( first v + randomV, second v )

                                else
                                    v
                           )

                EnemyDash _ ->
                    case omodel.chasingState of
                        Await ->
                            ( 0, second nvel )

                        Search ->
                            if env.t - omodel.lastTurnTime > 90 then
                                if odir == Right then
                                    ( omodel.searchSpeed, second nvel )

                                else
                                    ( -omodel.searchSpeed, second nvel )

                            else
                                ( 0, second nvel )

                        Chase ->
                            if env.t - omodel.lastTurnTime > 90 then
                                if odir == Right then
                                    ( omodel.chaseSpeed, second nvel )

                                else
                                    ( -omodel.chaseSpeed, second nvel )

                            else
                                ( 0, second nvel )

        ( newenv, newdata ) =
            if omodel.typeId /= EnemyShot 2 then
                ( env, { d | velocity = nvel2 } ) |> updateVelByAcc

            else
                ( env, { d | velocity = nvel2 } )
    in
    ( newdata, ls, newenv )


rotVel : Float -> Int -> ( Float, Float ) -> ( Float, Float )
rotVel r seed ( x, y ) =
    let
        theta =
            atan2 y x

        ntheta =
            theta + 0.03 * ((toFloat <| genRandomInt seed ( -100, 100 )) / 200 / 100)

        nr =
            r + ((toFloat <| genRandomInt (seed * 2) ( -100, 100 )) / 200)

        nx =
            nr * cos ntheta

        ny =
            nr * sin ntheta
    in
    ( nx, ny )


tarVel : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float ) -> ( Float, Float )
tarVel ( tx, ty ) ( cx, cy ) ( vx, vy ) =
    let
        theta =
            atan2 (ty - cy) (tx - cx)

        r =
            sqrt (vx * vx + vy * vy)

        ctheta =
            atan2 vy vx

        ntheta =
            (ctheta * 5 + theta) / 6

        nx =
            r * cos ntheta

        ny =
            r * sin ntheta
    in
    ( nx, ny )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env gcmsg d =
    let
        emodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        judgeHitByTime =
            10
    in
    case gcmsg of
        EnemyUpdateMsg pos ->
            ( d, [], env ) |> updateChasingState pos |> updateTarget pos

        GCHitByBulletMsg gcModel ->
            case gcModel of
                GCBulletModel bullet ->
                    let
                        nhp =
                            d.hp - bullet.atk
                    in
                    (if nhp <= 0 then
                        if d.lifeStatus == Alive then
                            ( { d | lifeStatus = Dead 0, hp = nhp }, [], env )

                        else
                            ( { d | hp = nhp }, [], env )

                     else
                        ( { d | hp = nhp }, [], env )
                    )
                        |> (\( dd, ll, ee ) -> ( { dd | gcModel = GCEnemyModel { emodel | lastHitByTime = env.t } }, ll, ee ))

                _ ->
                    ( d, [], env )

        GCHitByWeaponMsg gcModel ->
            case gcModel of
                GCWeaponModel weapon ->
                    let
                        ratk =
                            weapon.atk * (1 + toFloat (List.length weapon.weaponUpgrade.upgrades))

                        nhp =
                            d.hp - weapon.atk
                    in
                    if env.t - emodel.lastHitByTime >= judgeHitByTime then
                        (if nhp <= 0 then
                            if d.lifeStatus == Alive then
                                ( { d | lifeStatus = Dead 0, hp = nhp }, [], env )

                            else
                                ( { d | hp = nhp }, [], env )

                         else
                            ( { d | hp = nhp }, [], env )
                        )
                            |> (\( dd, ll, ee ) -> ( { dd | gcModel = GCEnemyModel { emodel | lastHitByTime = env.t } }, ll, ee ))

                    else
                        ( d, [], env )

                _ ->
                    ( d, [], env )

        GCAtkPlayerMsg ->
            case d.gcModel of
                GCEnemyModel enemy ->
                    ( { d | gcModel = GCEnemyModel { enemy | lastHitTime = env.t } }, [], env )

                _ ->
                    ( d, [], env )

        _ ->
            ( d, [], env )


updateChasingState : ( Int, Int ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateChasingState pos ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        ( pposx, pposy ) =
            pos

        ( eposx, eposy ) =
            d.position

        isFarAway =
            dist ( pposx, pposy ) ( eposx, eposy ) > 32 * toFloat tileSize

        isNear =
            if isFarAway then
                False

            else if dist ( pposx, pposy ) ( eposx, eposy ) < 8 * toFloat tileSize then
                True

            else
                -- (List.length <| findPath env ( pposx, pposy ) ( eposx, eposy )) <= 3
                False

        nChasingState =
            case omodel.chasingState of
                Await ->
                    if not isFarAway then
                        Search

                    else
                        Await

                Search ->
                    if isFarAway then
                        Await

                    else if isNear then
                        Chase

                    else
                        Search

                Chase ->
                    if isFarAway then
                        Await

                    else
                        Chase

        ( nd, nls, nenv ) =
            ( { d | gcModel = GCEnemyModel { omodel | chasingState = nChasingState, targetPos = pos |> Tuple.mapBoth toFloat toFloat } }, [], env )
    in
    ( nd, nls, nenv )


updateTarget : ( Int, Int ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateTarget ppos ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel
    in
    ( { d | gcModel = GCEnemyModel { omodel | targetPos = ppos |> Tuple.mapBoth toFloat toFloat } }, ls, env )


updateDir : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateDir ( d, ls, env ) =
    let
        tileMap =
            env.commonData.tileMap

        omodel =
            case d.gcModel of
                GCEnemyModel model ->
                    model

                _ ->
                    nullModel

        ( pposx, pposy ) =
            omodel.targetPos

        odir =
            omodel.dir

        ( eposx, eposy ) =
            d.position |> Tuple.mapBoth toFloat toFloat

        nxtTile =
            if odir == Right then
                1

            else
                -1

        ( nposx, nposy ) =
            ( first d.position // tileSize + nxtTile, second d.position // tileSize )

        isFacingWall =
            (Array2D.get nposx nposy tileMap |> Maybe.withDefault 1 |> (\t -> modBy 2 t == 1))
                && (if odir == Right then
                        modBy tileSize (first d.position) >= 32

                    else
                        modBy tileSize (first d.position) <= 32
                   )

        isFacingCliff =
            Array2D.get nposx (nposy + 1) tileMap |> Maybe.withDefault 1 |> (\t -> modBy 2 t == 0)

        ndir =
            case omodel.typeId of
                EnemyShot st ->
                    case omodel.chasingState of
                        Await ->
                            odir

                        Search ->
                            let
                                isChange =
                                    (env.t - omodel.lastTurnTime > 20)
                                        && (isFacingWall || (isFacingCliff && st <= 1))
                            in
                            if isChange then
                                if odir == Right then
                                    Left

                                else
                                    Right

                            else
                                odir

                        Chase ->
                            if st == 0 then
                                if
                                    pposx
                                        > eposx
                                        + (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))
                                then
                                    Right

                                else if
                                    pposx
                                        < eposx
                                        - (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))
                                then
                                    Left

                                else
                                    odir

                            else if st == 1 then
                                let
                                    peright =
                                        pposx
                                            > eposx
                                            + (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                    peleft =
                                        pposx
                                            < eposx
                                            - (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                    isChange =
                                        ((env.t - omodel.lastTurnTime > 60)
                                            && ((omodel.dir == Left && peright)
                                                    || (omodel.dir == Right && peleft)
                                               )
                                        )
                                            || isFacingWall
                                            || isFacingCliff
                                in
                                if isChange then
                                    if odir == Right then
                                        Left

                                    else
                                        Right

                                else
                                    odir

                            else if st == 2 then
                                let
                                    peright =
                                        pposx
                                            > eposx
                                            + (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                    peleft =
                                        pposx
                                            < eposx
                                            - (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                    isChange =
                                        ((env.t - omodel.lastTurnTime > 60)
                                            && ((omodel.dir == Left && peright)
                                                    || (omodel.dir == Right && peleft)
                                               )
                                        )
                                            || isFacingWall
                                in
                                if isChange then
                                    if odir == Right then
                                        Left

                                    else
                                        Right

                                else
                                    odir

                            else
                                odir

                EnemyDash _ ->
                    case omodel.chasingState of
                        Await ->
                            odir

                        Search ->
                            if isFacingWall || isFacingCliff then
                                if odir == Right then
                                    Left

                                else
                                    Right

                            else
                                odir

                        Chase ->
                            let
                                peright =
                                    pposx
                                        > eposx
                                        + (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                peleft =
                                    pposx
                                        < eposx
                                        - (omodel.chaseSense + toFloat (genRandomInt (env.t * d.uid * 2) ( -10, 10 )))

                                isChange =
                                    ((env.t - omodel.lastTurnTime > 180)
                                        && ((omodel.dir == Left && peright)
                                                || (omodel.dir == Right && peleft)
                                           )
                                    )
                                        || isFacingWall
                                        || isFacingCliff
                            in
                            if isChange then
                                if odir == Right then
                                    Left

                                else
                                    Right

                            else
                                odir

        nTurnTime =
            if ndir == odir then
                omodel.lastTurnTime

            else
                env.t

        ( nd, nls, nenv ) =
            ( { d | gcModel = GCEnemyModel { omodel | dir = ndir, lastTurnTime = nTurnTime } }, [], env )
    in
    ( nd, nls, nenv )


dist : ( Int, Int ) -> ( Int, Int ) -> Float
dist ( x1, y1 ) ( x2, y2 ) =
    let
        dx =
            x1 - x2

        dy =
            y1 - y2
    in
    sqrt (toFloat (dx * dx + dy * dy))


findPath : EnvC CommonData -> ( Int, Int ) -> ( Int, Int ) -> List ( Int, Int )
findPath env ( pposx, pposy ) ( eposx, eposy ) =
    let
        tileMap =
            env.commonData.tileMap

        ( pidx, pidy ) =
            ( pposx // tileSize, pposy // tileSize )

        ( eidx, eidy ) =
            ( eposx // tileSize, eposy // tileSize )

        ( stidx, stidy ) =
            ( min pidx eidx, min pidy eidy )

        ( enidx, enidy ) =
            ( max pidx eidx, max pidy eidy )

        step : ( Int, Int ) -> Queue ( Int, Int )
        step ( x, y ) =
            case Array2D.get x y tileMap of
                Nothing ->
                    []

                Just t ->
                    if (modBy 2 t == 1) || (( x, y ) == ( enidx, enidy )) then
                        []

                    else
                        [ ( x - 1, y ), ( x + 1, y ), ( x, y - 1 ), ( x, y + 1 ) ]

        log : ( Int, Int ) -> ( Int, Int ) -> ( ( Int, Int ), ( Int, Int ) )
        log cur to =
            ( to, cur )

        rec =
            gbfsr 8 ( stidx, stidy ) step log

        cut =
            array2D_slice ( stidx, stidy ) ( enidx, enidy ) tileMap |> Array2D.map (\_ -> ( 0, 0 ))

        recCutF : Queue ( ( Int, Int ), ( Int, Int ) ) -> Array2D ( Int, Int ) -> Array2D ( Int, Int )
        recCutF r c =
            case r of
                [] ->
                    c

                ( ( tox, toy ), cur ) :: rs ->
                    recCutF rs (Array2D.set (tox - stidx) (toy - stidy) cur c)

        recCut =
            recCutF rec cut

        getPath : ( Int, Int ) -> List ( Int, Int ) -> List ( Int, Int )
        getPath ( x, y ) l =
            if ( x, y ) == ( stidx, stidy ) then
                ( x, y ) :: l

            else
                case Array2D.get x y recCut of
                    Nothing ->
                        l

                    Just fr ->
                        getPath fr (( x, y ) :: l)
    in
    getPath ( enidx, enidy ) []


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayEnemy env d, 3 ) ]
