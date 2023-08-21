module SceneProtos.CoreEngine.LayerBase exposing
    ( CommonData
    , Buff(..), InputState(..)
    , nullCommonData
    )

{-| Layer Base

@docs CommonData
@docs Buff, InputState
@docs nullCommonData

-}

import Array2D exposing (Array2D)
import List exposing (range)
import List.Extra exposing (andThen)
import SceneProtos.CoreEngine.Camera.Base exposing (Camera, nullCamera)
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (genTileMap)


{-| CommonData

Edit your own CommonData here.

-}
type alias CommonData =
    { tileMap : Array2D Int
    , camera : Camera
    , coin : Int
    , inputState : InputState
    , buff : List Buff
    , showUI : Bool
    , instruction : Int
    }


{-| buff type
-}
type Buff
    = NullBuff
    | SpeedUp Int
    | IncreaseDamage Int


{-| input state
-}
type InputState
    = Transfering Int
    | Other


nullTileMap : Array2D Int
nullTileMap =
    Array2D.repeat 96 96 0


testTileMap : Array2D Int
testTileMap =
    nullTileMap
        |> createLine ( 0, 1 ) ( 0, 20 )
        |> createLine ( 1, 20 ) ( 250, 20 )
        |> createLine ( 5, 14 ) ( 10, 14 )
        |> createLine ( 16, 10 ) ( 24, 10 )
        |> createLine ( 1, 5 ) ( 5, 5 )
        |> createLine ( 10, 4 ) ( 10, 7 )
        |> createLine ( 13, 2 ) ( 17, 6 )
        |> createLine ( 6, 4 ) ( 7, 4 )
        |> createLine ( 25, 5 ) ( 25, 9 )
        |> createLine ( 23, 9 ) ( 23, 10 )
        |> createLine ( 30, 13 ) ( 35, 17 )
        |> createLine ( 34, 9 ) ( 38, 9 )
        |> createLine ( 29, 3 ) ( 32, 3 )
        |> SceneProtos.CoreEngine.GameComponents.GameMap.Base.setBlock ( 20, 25 ) ( 200, 300 ) 1


createLine : ( Int, Int ) -> ( Int, Int ) -> Array2D Int -> Array2D Int
createLine ( stx, sty ) ( enx, eny ) tileMap =
    let
        line =
            drawLine ( stx, sty ) ( enx, eny )
    in
    List.foldl (\( x, y ) arr -> Array2D.set x y 1 arr) tileMap line


drawLine : ( Int, Int ) -> ( Int, Int ) -> List ( Int, Int )
drawLine ( stx, sty ) ( enx, eny ) =
    let
        ( dx, dy ) =
            ( enx - stx, eny - sty )

        ( steps, ( xdir, ydir ) ) =
            if abs dx > abs dy then
                ( abs dx, ( 0, 0.5 ) )

            else
                ( abs dy, ( 0.5, 0 ) )

        ( xinc, yinc ) =
            ( (dx |> toFloat) / (steps |> toFloat), (dy |> toFloat) / (steps |> toFloat) )

        ( x, y ) =
            ( stx |> toFloat, sty |> toFloat )
    in
    List.map (\i -> ( x, y ) |> Tuple.mapBoth ((+) (toFloat i * xinc + xdir)) ((+) (toFloat i * yinc + ydir))) (List.range 0 steps)
        |> List.map (Tuple.mapBoth floor floor)


{-| Init CommonData
-}
nullCommonData : CommonData
nullCommonData =
    { tileMap = testTileMap
    , camera = nullCamera
    , coin = 200
    , inputState = Other
    , buff = []
    , showUI = False
    , instruction = 0
    }
