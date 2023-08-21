module SceneProtos.CoreEngine.GameComponents.GameMap.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (Array, fromList)
import Array2D exposing (Array2D, columns, get, rows, set)
import Canvas exposing (Renderable)
import Lib.Coordinate.Coordinates exposing (dist, equal)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Tools.ArrayTools exposing (array2D_flatten, array2D_slice, combine)
import Lib.Tools.KeyCode exposing (key_e, key_r)
import Lib.Tools.RNG exposing (genRandomInt, genRandomIntWithSeed, seed)
import List exposing (concat, concatMap, drop, filter, head, isEmpty, length, maximum, member, minimum, tail, take)
import List.Extra exposing (find, findIndex, getAt, last)
import Random
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), nullData)
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (EnemyType(..))
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (MapGenState(..), MapLoadingType(..), Model, nullModel)
import SceneProtos.CoreEngine.GameComponents.GameMap.Blueprint exposing (Blueprint, nullBlueprint)
import SceneProtos.CoreEngine.GameComponents.GameMap.Display exposing (displayGameMap)
import SceneProtos.CoreEngine.GameComponents.GameMap.Room exposing (Room, labRooms, nullRoom, storyRoom, testRoom)
import SceneProtos.CoreEngine.GameComponents.Store.Base exposing (StoreInit)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData, InputState(..))
import Time
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCGameMapInitData d) ->
            { nullData
                | uid = id
                , gcModel =
                    GCGameMapModel
                        { mapGenState = Loading GenBlueprint
                        , blueprint = nullBlueprint
                        , map = Array2D.empty
                        , smallestMap = Array2D.empty
                        , spawn = ( ( 0, 0 ), ( 0, 0 ) )
                        , mapTransPoint = []
                        , storeTransPoint = []
                        , storeRoom = []
                        , nearTrans = ( 0, 0 )
                        }
            }

        _ ->
            nullData


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        omodel =
            case d.gcModel of
                GCGameMapModel model ->
                    model

                _ ->
                    nullModel

        ( ( nenv, nmodel ), nmsg ) =
            case omodel.mapGenState of
                Loading GenBlueprint ->
                    ( ( env, omodel ) |> genBlueprint, [] )

                Loading GenRooms ->
                    ( ( env, omodel ) |> genRoom, [] )

                Loading GenTileMap ->
                    ( ( env, omodel ) |> genTileMap, [] )

                Loading GenPlayer ->
                    ( ( env, { omodel | mapGenState = Loading GenEnemy } ), [ ( GCParent, GCInitPlayerMsg (calPoint omodel.spawn) ) ] )

                Loading GenEnemy ->
                    ( ( env, { omodel | mapGenState = Loading GenStore } ), ( env, omodel ) |> randomGenEnemy |> calEnemyPoint )

                Loading GenStore ->
                    ( env, omodel ) |> genTrans

                Loaded ->
                    ( ( env, omodel ), [] )
    in
    ( { d | gcModel = GCGameMapModel nmodel }, nmsg, nenv )


calPoint : ( ( Int, Int ), ( Int, Int ) ) -> ( Int, Int )
calPoint ( ( a, b ), ( x, y ) ) =
    ( (a * 32 + x) * 64, (b * 32 + y) * 64 )


calEnemyPoint : List ( ( Int, Int ), Int, EnemyType ) -> List ( GameComponentTarget, GameComponentMsg )
calEnemyPoint ls =
    [ ( GCParent
      , GCInitEnemyMsg
            (List.concatMap (\( ( px, py ), n, et ) -> calPointList n ( px, py ) |> List.map (\p -> { pos = p, typeId = et }))
                ls
            )
      )
    ]


calPointList : Int -> ( Int, Int ) -> List ( Int, Int )
calPointList n ( x, y ) =
    List.range 0 (n - 1)
        |> List.map
            (\t ->
                (t + 1)
                    // 2
                    * (if modBy 2 t == 0 then
                        -1

                       else
                        1
                      )
            )
        |> List.map (\t -> ( x * 64 + t * 64, y * 64 ))


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env msg d =
    let
        model =
            case d.gcModel of
                GCGameMapModel m ->
                    m

                _ ->
                    nullModel
    in
    case msg of
        GCPlayerPositionMsg p ->
            let
                flag =
                    Maybe.withDefault ( 0, 0 ) (find (\t -> dist t p <= 150) (model.mapTransPoint ++ model.storeTransPoint))

                msg1 =
                    List.indexedMap
                        (\i t ->
                            if env.commonData.inputState == Other && dist t p <= 150 && Maybe.withDefault False (Array.get key_r env.globalData.keyList) then
                                ( GCByName "Player", Transfer (Maybe.withDefault ( 0, 0 ) (getAt i model.storeTransPoint)) )

                            else
                                ( GCByName "Player", NullGCMsg )
                        )
                        model.mapTransPoint

                msg2 =
                    List.indexedMap
                        (\i t ->
                            if env.commonData.inputState == Other && dist t p <= 150 && Maybe.withDefault False (Array.get key_r env.globalData.keyList) then
                                ( GCByName "Player", Transfer (Maybe.withDefault ( 0, 0 ) (getAt i model.mapTransPoint)) )

                            else
                                ( GCByName "Player", NullGCMsg )
                        )
                        model.storeTransPoint

                nmodel =
                    { model | nearTrans = flag }
            in
            if length (msg1 ++ msg2) > 0 then
                let
                    gd =
                        env.globalData

                    ngd =
                        { gd | keyList = Array.set key_r False gd.keyList }
                in
                ( { d | gcModel = GCGameMapModel nmodel }, msg1 ++ msg2, { env | globalData = ngd } )

            else
                ( { d | gcModel = GCGameMapModel nmodel }, msg1 ++ msg2, env )

        _ ->
            ( d, [], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayGameMap env d, 0 ) ]


genBlueprint : ( EnvC CommonData, Model ) -> ( EnvC CommonData, Model )
genBlueprint ( env, model ) =
    let
        initBp =
            model.blueprint

        -- initBp = Tree Start [Tree Corridor [Tree Treasure [Tree Corridor [Tree Normal [Tree End [NullTree]]]]]]
        seed0 =
            seed (Time.posixToMillis env.globalData.currentTimeStamp)

        ( seed1, nbp, ls ) =
            genPath ( seed0, initBp )

        start =
            Maybe.withDefault ( 0, 0 ) (last ls)

        end =
            Maybe.withDefault ( 0, 0 ) (head ls)

        -- (seed1, cnt, nBp) = (seed0, 3, initBp) |> genBlueprint_
        -- bp = model.blueprint
        thisl =
            drop 1 (take (length ls - 1) ls)

        prevl =
            take (length ls - 2) ls

        nextl =
            drop 2 ls

        typelist =
            List.map3
                (\prev this next ->
                    judgeType prev this next
                )
                prevl
                thisl
                nextl

        starttype =
            let
                second =
                    Maybe.withDefault ( 0, 0 ) (last thisl)
            in
            judgeType start start second

        endtype =
            let
                penult =
                    Maybe.withDefault ( 0, 0 ) (head thisl)
            in
            judgeType end end penult

        typeMap =
            List.foldl
                (\( ( x, y ), t ) arr ->
                    Array2D.set x y t arr
                )
                nbp.rooms
                (List.map2 (\( x, y ) t -> ( ( x, y ), t )) ls (endtype :: typelist ++ [ starttype ]))

        ( storeCnt, seed2 ) =
            genRandomIntWithSeed seed1 ( 1, 4 )

        ntypeMap =
            genStores typeMap seed2 storeCnt

        stores =
            List.map (\( row, col, _ ) -> ( row, col )) <|
                List.filter (\( _, _, flag ) -> flag) <|
                    array2D_flatten <|
                        Array2D.indexedMap
                            (\row col room ->
                                if room == -5 then
                                    ( row, col, True )

                                else
                                    ( row, col, False )
                            )
                            ntypeMap

        nbp2 =
            { nbp | rooms = ntypeMap, start = start, end = end, pathList = ls, typeList = endtype :: typelist ++ [ starttype ] }
    in
    ( env, { model | blueprint = nbp2, mapGenState = Loading GenRooms, storeRoom = stores } )


genStores : Array2D Int -> Random.Seed -> Int -> Array2D Int
genStores arr seed n =
    let
        ( x, seed0 ) =
            genRandomIntWithSeed seed ( 0, 5 )

        ( y, seed1 ) =
            genRandomIntWithSeed seed0 ( 0, 5 )
    in
    if n == 0 then
        arr

    else if Maybe.withDefault 1 (get x y arr) == 0 then
        genStores (set x y -5 arr) seed1 (n - 1)

    else
        genStores arr seed1 n



-- (env, {model | mapGenState = Loading GenRooms, blueprint = {bp | roomCnt = 6, rooms = initBp}})
-- genPathType : (Int, List (Int, Int)) -> Maybe (Int, List (Int, Int))
-- genPathType (i, ls) =
--     if i == 0 then
--         Nothing
--     else
--         Just <|


judgeType : ( Int, Int ) -> ( Int, Int ) -> ( Int, Int ) -> Int
judgeType ( prevx, prevy ) ( x, y ) ( nextx, nexty ) =
    if equal ( prevx, prevy ) ( x, y ) then
        if nextx == x && nexty == y - 1 then
            -1

        else if nextx == x && nexty == y + 1 then
            -3

        else if nextx == x + 1 && nexty == y then
            -2

        else if nextx == x - 1 && nexty == y then
            -4

        else
            0

    else if prevy == y && y == nexty then
        1

    else if prevx == x && x == nextx then
        2

    else if (prevx == x - 1 && prevy == y && nextx == x && nexty == y - 1) || (nextx == x - 1 && nexty == y && prevx == x && prevy == y - 1) then
        3

    else if (prevx == x + 1 && prevy == y && nextx == x && nexty == y - 1) || (nextx == x + 1 && nexty == y && prevx == x && prevy == y - 1) then
        4

    else if (prevx == x - 1 && prevy == y && nextx == x && nexty == y + 1) || (nextx == x - 1 && nexty == y && prevx == x && prevy == y + 1) then
        5

    else if (prevx == x + 1 && prevy == y && nextx == x && nexty == y + 1) || (nextx == x + 1 && nexty == y && prevx == x && prevy == y + 1) then
        6

    else
        0


genPath : ( Random.Seed, Blueprint ) -> ( Random.Seed, Blueprint, List ( Int, Int ) )
genPath ( t, bp ) =
    let
        rooms =
            bp.rooms

        ( roomCnt, seed0 ) =
            genRandomIntWithSeed t ( 10, 16 )

        ( initX, seed1 ) =
            genRandomIntWithSeed seed0 ( 0, 5 )

        ( initY, seed2 ) =
            genRandomIntWithSeed seed1 ( 0, 5 )

        ( seed3, ls, ( cnt, _ ) ) =
            genPath_ ( seed2, [ ( initX, initY ) ], ( 1, roomCnt ) )

        nrooms =
            List.foldl (\( x, y ) arr -> Array2D.set x y 1 arr) rooms ls
    in
    ( seed3, { bp | roomCnt = cnt, rooms = nrooms }, ls )


genPath_ : ( Random.Seed, List ( Int, Int ), ( Int, Int ) ) -> ( Random.Seed, List ( Int, Int ), ( Int, Int ) )
genPath_ ( t, ls, ( cnt, max ) ) =
    let
        pre =
            Maybe.withDefault ( 0, 0 ) (head ls)

        next0 =
            []

        next1 =
            if isOut (moveUp pre) || member (moveUp pre) ls then
                next0

            else
                moveUp pre :: next0

        next2 =
            if isOut (moveRight pre) || member (moveRight pre) ls then
                next1

            else
                moveRight pre :: next1

        next3 =
            if isOut (moveDown pre) || member (moveDown pre) ls then
                next2

            else
                moveDown pre :: next2

        next4 =
            if isOut (moveLeft pre) || member (moveLeft pre) ls then
                next3

            else
                moveLeft pre :: next3

        validCnt =
            List.length next4

        ( r, seed0 ) =
            genRandomIntWithSeed t ( 1, 100 )
    in
    if isEmpty next4 || cnt >= max then
        ( seed0, ls, ( cnt, max ) )

    else
        genPath_ ( seed0, Maybe.withDefault ( 0, 0 ) (getAt (modBy validCnt r) next4) :: ls, ( cnt + 1, max ) )


moveLeft : ( Int, Int ) -> ( Int, Int )
moveLeft ( x, y ) =
    ( x - 1, y )


moveRight : ( Int, Int ) -> ( Int, Int )
moveRight ( x, y ) =
    ( x + 1, y )


moveUp : ( Int, Int ) -> ( Int, Int )
moveUp ( x, y ) =
    ( x, y - 1 )


moveDown : ( Int, Int ) -> ( Int, Int )
moveDown ( x, y ) =
    ( x, y + 1 )


isOut : ( Int, Int ) -> Bool
isOut ( x, y ) =
    x < 0 || x > 5 || y < 0 || y > 5



-- genBlueprint_ : (Random.Seed, Int, Tree RoomType) -> (Random.Seed, Int, Tree RoomType)
-- genBlueprint_ (t, cnt, tree) =
--     let
--         (r, seed0) = genRandomIntWithSeed t (1, 100)
--         childList =
--             if r <= 50 then
--                 [genblueprint_ (seed0, )]
--         (seed1, ncnt, ntree) =
--             Tree Start [Tree Corridor [Tree Treasure [Tree Corridor [NullTree]]]]
--     in


genRoom : ( EnvC CommonData, Model ) -> ( EnvC CommonData, Model )
genRoom ( env, model ) =
    let
        bp =
            model.blueprint

        ( smallest, tl, br ) =
            smallestMap bp.rooms (bp.pathList ++ model.storeRoom)

        initMap =
            Array2D.indexedMap
                (\r c a ->
                    let
                        validRooms =
                            filter (\roomtp -> roomtp.roomTypeId == a) labRooms

                        seed =
                            r * 10 + c

                        random =
                            genRandomInt seed ( 0, 100 )
                    in
                    Maybe.withDefault nullRoom (getAt (modBy (length validRooms) random) validRooms)
                )
                smallest

        startInSmallest =
            ( first bp.start - first tl, second bp.start - second tl )

        storesInSmallest =
            List.map (\( x, y ) -> ( x - first tl, y - second tl )) model.storeRoom

        spawn =
            (Maybe.withDefault nullRoom (Array2D.get (first startInSmallest) (second startInSmallest) initMap)).spawnPoint
    in
    ( env, { model | map = initMap, smallestMap = smallest, storeRoom = storesInSmallest, spawn = ( startInSmallest, spawn ), mapGenState = Loading GenTileMap } )


smallestMap : Array2D Int -> List ( Int, Int ) -> ( Array2D Int, ( Int, Int ), ( Int, Int ) )
smallestMap arr ls =
    let
        minx =
            Maybe.withDefault 0 (minimum (List.map (\( x, _ ) -> x) ls))

        maxx =
            Maybe.withDefault 0 (maximum (List.map (\( x, _ ) -> x) ls))

        miny =
            Maybe.withDefault 0 (minimum (List.map (\( _, y ) -> y) ls))

        maxy =
            Maybe.withDefault 0 (maximum (List.map (\( _, y ) -> y) ls))
    in
    ( array2D_slice ( minx, miny ) ( maxx, maxy ) arr, ( minx, miny ), ( maxx, maxy ) )


genTrans : ( EnvC CommonData, Model ) -> ( ( EnvC CommonData, Model ), List ( GameComponentTarget, GameComponentMsg ) )
genTrans ( env, model ) =
    let
        msg =
            List.map (\p -> ( GCParent, GCInitStoreMsg (StoreInit (calPoint ( p, ( 16, 26 ) ))) )) model.storeRoom

        validTrans =
            List.concat <| array2D_flatten <| Array2D.indexedMap (\row col room -> List.map (\p -> ( row, col, p )) room.trans) model.map

        t =
            Time.posixToMillis env.globalData.currentTimeStamp

        ranList =
            Lib.Tools.RNG.genRandomListInt t (length model.storeRoom) ( 0, length validTrans - 1 )

        trans =
            List.map
                (\i ->
                    let
                        ( row, col, p ) =
                            Maybe.withDefault ( 0, 0, ( 0, 0 ) ) (List.Extra.getAt i validTrans)
                    in
                    calPoint ( ( row, col ), p )
                )
                ranList

        storeTrans =
            List.map
                (\p ->
                    calPoint ( p, ( 6, 28 ) )
                )
                model.storeRoom
    in
    ( ( env, { model | mapTransPoint = trans, mapGenState = Loaded, storeTransPoint = storeTrans } ), msg )


genTileMap : ( EnvC CommonData, Model ) -> ( EnvC CommonData, Model )
genTileMap ( env, model ) =
    let
        cd =
            env.commonData

        map =
            model.map

        initTileMap =
            Array2D.repeat (rows map * 32) (columns map * 32) 89

        tm =
            combine initTileMap (Array2D.map (\room -> room.tileMap) map)

        ncd =
            { cd | tileMap = tm }
    in
    ( { env | commonData = ncd }, { model | mapGenState = Loading GenPlayer } )


randomGenEnemy : ( EnvC CommonData, Model ) -> List ( ( Int, Int ), Int, EnemyType )
randomGenEnemy ( env, model ) =
    let
        sm =
            model.smallestMap

        allEnemies =
            concat <|
                array2D_flatten <|
                    Array2D.indexedMap
                        (\row col room ->
                            if Maybe.withDefault 0 (get row col sm) < 0 then
                                []

                            else
                                enemyPointInMap row col room
                        )
                        model.map

        tm =
            env.commonData.tileMap

        ml =
            max (Array2D.columns tm) (Array2D.rows tm)

        flying =
            List.map (\( ( x, y ), _, _ ) -> ( genRandomInt (x * 1206 + y) ( x - 5, x + 5 ), genRandomInt (x + y * 1206) ( y - 5, y + 5 ) )) allEnemies
                |> List.filter (\( x, y ) -> 0 == (Array2D.get x y tm |> Maybe.withDefault 1 |> modBy 2))
                |> List.map (\( x, y ) -> ( ( x, y ), genRandomInt (x * 1206 + y) ( -5, 3 ) |> max 0, EnemyShot 2 ))

        elite =
            List.map (\( ( x, y ), _, _ ) -> ( genRandomInt (x * 2004 + y) ( x - 5, x + 5 ), genRandomInt (x + y * 2004) ( y - 5, y + 5 ) )) allEnemies
                |> List.filter (\( x, y ) -> 0 == (Array2D.get x y tm |> Maybe.withDefault 1 |> modBy 2))
                |> List.map (\( x, y ) -> ( ( x, y ), genRandomInt (x * 1206 + y) ( -5, 1 ) |> max 0, EnemyShot 3 ))
    in
    allEnemies ++ flying ++ elite


enemyPointInMap : Int -> Int -> Room -> List ( ( Int, Int ), Int, EnemyType )
enemyPointInMap row col room =
    let
        enemies =
            List.map
                (\( ( x, y ), max, t ) ->
                    ( ( x + row * 32, y + col * 32 ), first <| genRandomIntWithSeed (seed <| row * 10 + col) ( 0, max ), t )
                )
                room.enemyPoint
    in
    enemies



-- calEnemyPoint : List ((Int, Int), Int, EnemyType) -> ( GameComponentTarget, GameComponentMsg )
-- genEnemy : ( EnvC CommonData, Model ) -> ( GameComponentTarget, GameComponentMsg )
-- genEnemy (env, model) =
--     let
--     in
