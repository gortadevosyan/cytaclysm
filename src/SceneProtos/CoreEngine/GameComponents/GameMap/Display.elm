module SceneProtos.CoreEngine.GameComponents.GameMap.Display exposing (displayGameMap)

{-|

@docs displayGameMap

-}

import Array
import Array2D
import Canvas exposing (Renderable, empty, group)
import Canvas.Settings.Advanced exposing (imageSmoothing)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Tools.ArrayTools exposing (array2D_indexedSlice)
import List.Extra exposing (findIndex)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..))
import SceneProtos.CoreEngine.GameComponents.GameMap.Base exposing (nullModel)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| display the game map
-}
displayGameMap : EnvC -> Data -> Renderable
displayGameMap env d =
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
                        if first (posInCam env ( tileSize * r, tileSize * c )) >= toFloat -tileSize && first (posInCam env ( tileSize * r, tileSize * c )) <= toFloat (1920 + tileSize) && second (posInCam env ( tileSize * r, tileSize * c )) >= toFloat -tileSize && second (posInCam env ( tileSize * r, tileSize * c )) <= toFloat (1080 + tileSize) then
                            group [ imageSmoothing False ] [ renderSprite env.globalData [] (posInCam env ( tileSize * r, tileSize * c )) (sizeInCam env ( tileSize |> toFloat, tileSize |> toFloat )) ("tile_" ++ fromInt t) ]

                        else
                            empty
                    )
            )
        , displayTrans env d
        , displayInstruction env d
        , debug env d
        ]


displayTrans : EnvC -> Data -> Renderable
displayTrans env d =
    let
        omodel =
            case d.gcModel of
                GCGameMapModel model ->
                    model

                _ ->
                    nullModel

        trans =
            omodel.mapTransPoint ++ omodel.storeTransPoint
    in
    group [ imageSmoothing False ]
        (List.map (\( x, y ) -> renderSprite env.globalData [] (posInCam env ( x - tileSize, y - tileSize )) (sizeInCam env ( toFloat (2 * tileSize), toFloat (2 * tileSize) )) "port") trans)


displayInstruction : EnvC -> Data -> Renderable
displayInstruction env d =
    let
        omodel =
            case d.gcModel of
                GCGameMapModel model ->
                    model

                _ ->
                    nullModel
    in
    if omodel.nearTrans /= ( 0, 0 ) then
        renderSprite env.globalData [] ( first (posInCam env omodel.nearTrans) - 32, second (posInCam env omodel.nearTrans) - 140 ) ( 48, 48 ) "key_r"

    else
        Canvas.empty


debug : EnvC -> Data -> Renderable
debug env d =
    let
        omodel =
            case d.gcModel of
                GCGameMapModel model ->
                    model

                _ ->
                    nullModel
    in
    group []
        [--     renderTextWithColor env.globalData 20 (Debug.toString omodel.blueprint.rooms) "Times New Roman" Color.red ( 100, 0 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.blueprint.roomCnt) "Times New Roman" Color.red ( 0, 0 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.mapGenState) "Times New Roman" Color.red ( 0, 50 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.blueprint.start) "Times New Roman" Color.red ( 0, 100 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.blueprint.end) "Times New Roman" Color.red ( 0, 150 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.blueprint.pathList) "Times New Roman" Color.red ( 0, 200 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.blueprint.typeList) "Times New Roman" Color.red ( 0, 250 )
         -- , renderTextWithColor env.globalData 40 (Debug.toString omodel.spawn) "Times New Roman" Color.red ( 0, 300 )
         -- , renderTextWithColor env.globalData 30 (Debug.toString omodel.smallestMap) "Times New Roman" Color.red ( 0, 350 )
         --  renderTextWithColor env.globalData 30 (Debug.toString omodel.mapTransPoint) "Times New Roman" Color.red ( 0, 350 )
        ]
