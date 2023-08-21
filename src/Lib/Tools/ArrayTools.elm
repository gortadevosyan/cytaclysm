module Lib.Tools.ArrayTools exposing (array2D_slice, array2D_indexedSlice, array2D_flatten, combine, transpose)

{-| This module contains extra functions for working with Array and Array2D

@docs array2D_slice, array2D_indexedSlice, array2D_flatten, combine, transpose

-}

import Array
import Array2D exposing (Array2D, columns, fromList, get, indexedMap, isEmpty, rows, set)
import Html exposing (a)
import List.Extra
import Tuple exposing (first, second)


{-| Gives the slice of Array from (x1,y1) to (x2,y2). The intervals are closed. Parts outside the bounds are discarded.
-}
array2D_slice : ( Int, Int ) -> ( Int, Int ) -> Array2D a -> Array2D a
array2D_slice ( x1_, y1_ ) ( x2_, y2_ ) array =
    if isEmpty array then
        array

    else
        case Array2D.get 0 0 array of
            Nothing ->
                array

            Just defaultEle ->
                let
                    ( r, c ) =
                        ( Array2D.rows array, Array2D.columns array )

                    x1 =
                        max 0 x1_

                    y1 =
                        max 0 y1_

                    x2 =
                        min (r - 1) x2_

                    y2 =
                        min (c - 1) y2_

                    w =
                        x2 - x1 + 1

                    h =
                        y2 - y1 + 1

                    slice =
                        Array2D.repeat w h defaultEle

                    f x y =
                        Maybe.withDefault defaultEle (Array2D.get (x + x1) (y + y1) array)
                in
                Array2D.indexedMap (\i j _ -> f i j) slice


{-| Gives the slice of Array from (x1,y1) to (x2,y2) with its original index. The intervals are closed. Parts outside the bounds are discarded.
-}
array2D_indexedSlice : ( Int, Int ) -> ( Int, Int ) -> Array2D a -> Array2D ( ( Int, Int ), a )
array2D_indexedSlice ( x1_, y1_ ) ( x2_, y2_ ) array =
    if isEmpty array then
        Array2D.indexedMap (\i j c -> ( ( i, j ), c )) array

    else
        case Array2D.get 0 0 array of
            Nothing ->
                Array2D.indexedMap (\i j c -> ( ( i, j ), c )) array

            Just defaultEle ->
                let
                    ( r, c ) =
                        ( Array2D.rows array, Array2D.columns array )

                    x1 =
                        max 0 x1_

                    y1 =
                        max 0 y1_

                    x2 =
                        min (r - 1) x2_

                    y2 =
                        min (c - 1) y2_

                    w =
                        x2 - x1 + 1

                    h =
                        y2 - y1 + 1

                    slice =
                        Array2D.repeat w h defaultEle

                    f x y =
                        Maybe.withDefault defaultEle (Array2D.get (x + x1) (y + y1) array)
                in
                Array2D.indexedMap (\i j _ -> ( ( i + x1, j + y1 ), f i j )) slice


{-| Flatten Array2D to a simple list.
-}
array2D_flatten : Array2D a -> List a
array2D_flatten arr =
    List.range 0 (Array2D.rows arr - 1)
        |> List.map (\i -> Array2D.getRow i arr |> Maybe.withDefault Array.empty |> Array.toList)
        |> List.concat


array2D_flatten_column : Array2D a -> List a
array2D_flatten_column arr =
    List.range 0 (Array2D.columns arr - 1)
        |> List.map (\i -> Array2D.getColumn i arr |> Maybe.withDefault Array.empty |> Array.toList)
        |> List.concat


{-| Combine 2 2D array
-}
combine : Array2D Int -> Array2D (Array2D Int) -> Array2D Int
combine acc arr =
    let
        src =
            array2D_flatten_column arr

        res =
            List.Extra.indexedFoldl (\i arr2d target -> writeInArray2D arr2d ( modBy (rows arr) i * 32, (i // rows arr) * 32 ) target) acc src
    in
    res


writeInArray2D : Array2D Int -> ( Int, Int ) -> Array2D Int -> Array2D Int
writeInArray2D arr ( x, y ) target =
    let
        ( _, ( _, _ ), res ) =
            writeInArray2D_ ( arr, ( ( x, y ), ( 0, 0 ) ), target )
    in
    res


writeInArray2D_ : ( Array2D Int, ( ( Int, Int ), ( Int, Int ) ), Array2D Int ) -> ( Array2D Int, ( ( Int, Int ), ( Int, Int ) ), Array2D Int )
writeInArray2D_ ( arr, ( start, cur ), target ) =
    let
        this =
            Maybe.withDefault 0 (get (first cur) (second cur) arr)

        nindex =
            if first cur >= rows arr - 1 && second cur >= columns arr - 1 then
                ( -1, -1 )

            else if first cur >= rows arr - 1 then
                ( 0, second cur + 1 )

            else
                ( first cur + 1, second cur )

        ntarget =
            set (first start + first cur) (second start + second cur) this target
    in
    if first nindex == -1 && second nindex == -1 then
        ( arr, ( start, cur ), ntarget )

    else
        writeInArray2D_ ( arr, ( start, nindex ), ntarget )


{-| for a 2d array give a transponse
-}
transpose : Array2D a -> Array2D a
transpose arr =
    List.range 0 (Array2D.columns arr - 1)
        |> List.map (\i -> Array2D.getColumn i arr |> Maybe.withDefault Array.empty |> Array.toList)
        |> fromList


isTopEdge : ( Int, Int ) -> Array2D a -> Bool
isTopEdge ( x, y ) _ =
    if y == 0 then
        True

    else
        False


isBottomEdge : ( Int, Int ) -> Array2D a -> Bool
isBottomEdge ( x, y ) arr =
    if y == columns arr - 1 then
        True

    else
        False


isLeftEdge : ( Int, Int ) -> Array2D a -> Bool
isLeftEdge ( x, y ) _ =
    if x == 0 then
        True

    else
        False


isRightEdge : ( Int, Int ) -> Array2D a -> Bool
isRightEdge ( x, y ) arr =
    if x == rows arr - 1 then
        True

    else
        False


isEdge : ( Int, Int ) -> Array2D a -> Bool
isEdge ( x, y ) arr =
    isTopEdge ( x, y ) arr || isBottomEdge ( x, y ) arr || isLeftEdge ( x, y ) arr || isRightEdge ( x, y ) arr
