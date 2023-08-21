module SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (GameMapInit, MapGenState(..), MapLoadingType(..), Model, genTileMap, nullModel, setBlock)

{-| This is the game map base type and structure

@docs GameMapInit, MapGenState, MapLoadingType, Model, genTileMap, nullModel, setBlock

-}

import Array2D exposing (Array2D)
import Lib.Tools.RNG exposing (genRandomIntSeed, genRandomIntWithSeed)
import List exposing (range)
import List.Extra exposing (andThen)
import Random
import SceneProtos.CoreEngine.GameComponents.GameMap.Blueprint exposing (Blueprint, nullBlueprint)
import SceneProtos.CoreEngine.GameComponents.GameMap.Room exposing (Room)
import Tuple exposing (first, second)


{-| init
-}
type alias GameMapInit =
    {}


{-| model
-}
type alias Model =
    { mapGenState : MapGenState
    , blueprint : Blueprint
    , map : Array2D Room
    , smallestMap : Array2D Int
    , spawn : ( ( Int, Int ), ( Int, Int ) )
    , storeRoom : List ( Int, Int )
    , mapTransPoint : List ( Int, Int )
    , storeTransPoint : List ( Int, Int )
    , nearTrans : ( Int, Int )
    }


{-| null model
-}
nullModel : Model
nullModel =
    { mapGenState = Loaded
    , blueprint = nullBlueprint
    , map = Array2D.empty
    , smallestMap = Array2D.empty
    , spawn = ( ( 0, 0 ), ( 0, 0 ) )
    , storeRoom = []
    , mapTransPoint = []
    , storeTransPoint = []
    , nearTrans = ( 0, 0 )
    }


{-| map generate state
-}
type MapGenState
    = Loading MapLoadingType
    | Loaded


{-| map loading type
-}
type MapLoadingType
    = GenBlueprint
    | GenRooms
    | GenTileMap
    | GenPlayer
    | GenEnemy
    | GenStore


type BSPTree a
    = BSPTree a (BSPTree a) (BSPTree a)
    | NullTree


type alias NodeData =
    { topleft : ( Int, Int )
    , bottomright : ( Int, Int )
    }


nullNodeData : NodeData
nullNodeData =
    { topleft = ( 0, 0 )
    , bottomright = ( 0, 0 )
    }


nullBSPTree : BSPTree a
nullBSPTree =
    NullTree


singletonBSPTree : a -> BSPTree a
singletonBSPTree value =
    BSPTree value NullTree NullTree


getLeftChild : BSPTree a -> BSPTree a
getLeftChild tree =
    case tree of
        BSPTree _ leftTree _ ->
            leftTree

        _ ->
            NullTree


getRightChild : BSPTree a -> BSPTree a
getRightChild tree =
    case tree of
        BSPTree _ rightTree _ ->
            rightTree

        _ ->
            NullTree


getDepth : BSPTree a -> Int
getDepth tree =
    case tree of
        NullTree ->
            0

        BSPTree _ left right ->
            1 + max (getDepth left) (getDepth right)


mapBSPTree : (a -> b) -> BSPTree a -> BSPTree b
mapBSPTree f tree =
    case tree of
        NullTree ->
            NullTree

        BSPTree value left right ->
            BSPTree (f value) (mapBSPTree f left) (mapBSPTree f right)


fold : (a -> b -> b) -> b -> BSPTree a -> b
fold f element tree =
    case tree of
        BSPTree value left right ->
            f value (fold f (fold f element right) left)

        NullTree ->
            element


foldLeaf : (a -> b -> b) -> b -> BSPTree a -> b
foldLeaf f element tree =
    case tree of
        BSPTree value left right ->
            if isLeaf (BSPTree value left right) then
                f value (foldLeaf f (foldLeaf f element right) left)

            else
                foldLeaf f (foldLeaf f element right) left

        NullTree ->
            element


updateNodes : (BSPTree a -> Bool) -> (a -> a) -> BSPTree a -> BSPTree a
updateNodes check f tree =
    case tree of
        NullTree ->
            NullTree

        BSPTree value left right ->
            BSPTree
                (if check (BSPTree value left right) == True then
                    f value

                 else
                    value
                )
                (updateNodes check f left)
                (updateNodes check f right)


updateNodesWithSeed : Random.Seed -> (BSPTree a -> Bool) -> (( Random.Seed, a ) -> ( Random.Seed, a )) -> BSPTree a -> ( Random.Seed, BSPTree a )
updateNodesWithSeed t check f tree =
    case tree of
        NullTree ->
            ( t, NullTree )

        BSPTree value left right ->
            let
                ( seed0, this ) =
                    if check (BSPTree value left right) == True then
                        f ( t, value )

                    else
                        ( t, value )

                ( seed1, leftTree ) =
                    updateNodesWithSeed seed0 check f left

                ( seed2, rightTree ) =
                    updateNodesWithSeed seed1 check f right
            in
            ( seed2, BSPTree this leftTree rightTree )


conflateNodesWithSeedPost : Random.Seed -> (Random.Seed -> NodeData -> NodeData -> ( Random.Seed, NodeData )) -> BSPTree NodeData -> ( Random.Seed, BSPTree NodeData )
conflateNodesWithSeedPost t f tree =
    case tree of
        NullTree ->
            ( t, NullTree )

        BSPTree value left right ->
            let
                ( seed0, leftTree ) =
                    conflateNodesWithSeedPost t f left

                ( seed1, rightTree ) =
                    conflateNodesWithSeedPost seed0 f right

                ( seed2, this ) =
                    if leftTree == NullTree || rightTree == NullTree then
                        ( seed1, value )

                    else
                        f seed1 (getNodeData leftTree) (getNodeData rightTree)
            in
            ( seed2, BSPTree this leftTree rightTree )


getNodeData : BSPTree NodeData -> NodeData
getNodeData tree =
    case tree of
        NullTree ->
            nullNodeData

        BSPTree value _ _ ->
            value


splitArea : Random.Seed -> BSPTree NodeData -> ( Random.Seed, BSPTree NodeData )
splitArea t tree =
    case tree of
        BSPTree node _ _ ->
            let
                tl =
                    node.topleft

                br =
                    node.bottomright

                xlength =
                    xLength tl br

                ylength =
                    yLength tl br

                a =
                    area tl br
            in
            if xlength <= 35 || ylength <= 22 || a <= 1200 then
                ( t, BSPTree node NullTree NullTree )

            else
                let
                    ( xoffset, seed0 ) =
                        genRandomIntWithSeed t ( -xlength // 4, xlength // 4 )

                    ( yoffset, seed1 ) =
                        genRandomIntWithSeed seed0 ( -ylength // 4, ylength // 4 )

                    chooseX =
                        if xlength > ylength + 30 then
                            True

                        else if xlength < ylength - 10 then
                            False

                        else
                            let
                                ( r, seed2 ) =
                                    genRandomIntWithSeed seed1 ( 0, 100 )
                            in
                            if r <= 50 then
                                True

                            else
                                False

                    ( nLeftData, nRightData ) =
                        if chooseX then
                            ( NodeData tl ( first br - xlength // 2 + xoffset, second br ), NodeData ( first br - xlength // 2 + xoffset + 1, second tl ) br )

                        else
                            ( NodeData tl ( first br, second br - ylength // 2 + yoffset ), NodeData ( first tl, second br - ylength // 2 + yoffset + 1 ) br )

                    ( seed3, leftTree ) =
                        splitArea seed1 (BSPTree nLeftData NullTree NullTree)

                    ( seed4, rightTree ) =
                        splitArea seed3 (BSPTree nRightData NullTree NullTree)
                in
                ( seed4, BSPTree node leftTree rightTree )

        NullTree ->
            ( t, NullTree )


area : ( Int, Int ) -> ( Int, Int ) -> Int
area ( a, b ) ( c, d ) =
    (abs (a - c) + 1) * (abs (b - d) + 1)


xLength : ( Int, Int ) -> ( Int, Int ) -> Int
xLength ( a, b ) ( c, d ) =
    abs (a - c) + 1


yLength : ( Int, Int ) -> ( Int, Int ) -> Int
yLength ( a, b ) ( c, d ) =
    abs (b - d) + 1


isLeaf : BSPTree a -> Bool
isLeaf tree =
    case tree of
        NullTree ->
            False

        BSPTree _ left right ->
            if left == NullTree && right == NullTree then
                True

            else
                False


constructRooms : Random.Seed -> BSPTree NodeData -> ( Random.Seed, BSPTree NodeData )
constructRooms t tree =
    updateNodesWithSeed t (\n -> isLeaf n) constructRoom tree


constructRoom : ( Random.Seed, NodeData ) -> ( Random.Seed, NodeData )
constructRoom ( t, node ) =
    let
        ( x1, y1 ) =
            node.topleft

        ( x2, y2 ) =
            node.bottomright

        xlength =
            xLength ( x1, y1 ) ( x2, y2 )

        ylength =
            yLength ( x1, y1 ) ( x2, y2 )

        ( xoffset1, seed0 ) =
            genRandomIntWithSeed t ( 1, xlength // 3 )

        ( yoffset1, seed1 ) =
            genRandomIntWithSeed seed0 ( 1, ylength // 3 )

        ( xoffset2, seed2 ) =
            genRandomIntWithSeed seed1 ( 1, xlength // 3 )

        ( yoffset2, seed3 ) =
            genRandomIntWithSeed seed2 ( 1, ylength // 3 )
    in
    if xLength ( x1 + xoffset1, y1 + yoffset1 ) ( x2 - xoffset2, y2 - yoffset2 ) > 3 * yLength ( x1 + xoffset1, y1 + yoffset1 ) ( x2 - xoffset2, y2 - yoffset2 ) || toFloat (yLength ( x1 + xoffset1, y1 + yoffset1 ) ( x2 - xoffset2, y2 - yoffset2 )) > 1.4 * toFloat (xLength ( x1 + xoffset1, y1 + yoffset1 ) ( x2 - xoffset2, y2 - yoffset2 )) then
        constructRoom ( seed3, node )

    else
        ( seed3, NodeData ( x1 + xoffset1, y1 + yoffset1 ) ( x2 - xoffset2, y2 - yoffset2 ) )


constructPaths : Random.Seed -> BSPTree NodeData -> ( Random.Seed, BSPTree NodeData )
constructPaths t tree =
    conflateNodesWithSeedPost t constructPath tree


constructPath : Random.Seed -> NodeData -> NodeData -> ( Random.Seed, NodeData )
constructPath t node1 node2 =
    let
        ( x1, y1 ) =
            node1.topleft

        ( x2, y2 ) =
            node1.bottomright

        ( x3, y3 ) =
            node2.topleft

        ( x4, y4 ) =
            node2.bottomright

        ( nx1, seed0 ) =
            genRandomIntWithSeed t ( x1, x2 )

        ( ny1, seed1 ) =
            genRandomIntWithSeed seed0 ( y1, y2 )

        ( nx2, seed2 ) =
            genRandomIntWithSeed seed1 ( x3, x4 )

        ( ny2, seed3 ) =
            genRandomIntWithSeed seed2 ( y3, y4 )

        room =
            ( ( nx1, ny1 ), ( nx2, ny2 ) ) |> findTlBr

        ( newSeed, newNode ) =
            if y2 < y3 || y4 < y1 then
                --two rooms are placed vertically
                if xLength (first room) (second room) <= 2 || xLength (first room) (second room) >= 15 then
                    constructPath seed3 node1 node2

                else
                    ( seed3, NodeData (first room) (second room) )

            else
            -- two rooms are placed horizontally
            if
                yLength (first room) (second room) <= 3 || yLength (first room) (second room) >= 12
            then
                constructPath seed3 node1 node2

            else
                ( seed3, NodeData (first room) (second room) )
    in
    ( newSeed, newNode )


findTlBr : ( ( Int, Int ), ( Int, Int ) ) -> ( ( Int, Int ), ( Int, Int ) )
findTlBr ( ( x1, y1 ), ( x2, y2 ) ) =
    if x1 < x2 && y1 < y2 then
        ( ( x1, y1 ), ( x2, y2 ) )

    else if x1 > x2 && y1 > y2 then
        ( ( x2, y2 ), ( x1, y1 ) )

    else if x1 > x2 && y1 < y2 then
        ( ( x2, y1 ), ( x1, y2 ) )

    else if x1 == x2 then
        if y1 <= y2 then
            ( ( x1, y1 ), ( x2, y2 ) )

        else
            ( ( x1, y2 ), ( x2, y1 ) )

    else if y1 == y2 then
        if x1 <= x2 then
            ( ( x1, y1 ), ( x2, y2 ) )

        else
            ( ( x2, y1 ), ( x1, y2 ) )

    else
        ( ( x1, y2 ), ( x2, y1 ) )


{-| generate tile map
-}
genTileMap : Int -> Array2D Int
genTileMap t =
    let
        ( w, seed0 ) =
            genRandomIntSeed t ( 100, 150 )

        ( h, seed1 ) =
            genRandomIntWithSeed seed0 ( 50, 75 )

        initTileMap =
            Array2D.repeat w h 1

        initNodeData =
            NodeData ( 0, 0 ) ( w - 1, h - 1 )

        root =
            BSPTree initNodeData NullTree NullTree

        ( seed2, areaTree ) =
            splitArea seed1 root

        ( seed3, roomTree ) =
            constructRooms seed2 areaTree

        ( seed4, pathTree ) =
            constructPaths seed3 roomTree

        tileMap =
            fold (writeInTileMap -1) initTileMap pathTree

        tileMap2 =
            foldLeaf (writeInTileMap 0) tileMap pathTree
    in
    tileMap2


writeInTileMap : Int -> NodeData -> Array2D Int -> Array2D Int
writeInTileMap i node tileMap =
    setBlock node.topleft node.bottomright i tileMap


{-| set an signle block in array
-}
setBlock : ( Int, Int ) -> ( Int, Int ) -> Int -> Array2D Int -> Array2D Int
setBlock ( stx, sty ) ( enx, eny ) i tileMap =
    let
        block =
            drawBlock ( stx, sty ) ( enx, eny )
    in
    List.foldl (\( x, y ) arr -> Array2D.set x y i arr) tileMap block


drawBlock : ( Int, Int ) -> ( Int, Int ) -> List ( Int, Int )
drawBlock ( stx, sty ) ( enx, eny ) =
    let
        xList =
            range stx enx

        yList =
            range sty eny
    in
    xList
        |> andThen
            (\x ->
                yList
                    |> andThen (\y -> [ ( x, y ) ])
            )
