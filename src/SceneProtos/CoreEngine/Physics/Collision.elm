module SceneProtos.CoreEngine.Physics.Collision exposing (simpleHandleGonnaCollideXY, simpleIsOnGround)

{-|

@docs simpleHandleGonnaCollideXY, simpleIsOnGround

-}

import Array2D exposing (Array2D, getColumn, getRow)
import Compare exposing (minimum)
import Lib.Tools.ArrayTools exposing (array2D_flatten, array2D_indexedSlice, array2D_slice)
import MainConfig exposing (tileSize)
import SceneProtos.CoreEngine.GameComponent.Base as GC exposing (Box, Data)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import Tuple exposing (first, second)


type alias RectBox =
    { pos : ( Float, Float )
    , size : ( Float, Float )
    }


inf : Float
inf =
    100000


eps : Float
eps =
    0.001



-- handleCollide : (EnvC, Data) -> (EnvC, Data)
-- handleCollide (env, d) =
--     let
--         c = env.commonData
--         (x, y) = d.position |> Tuple.mapBoth toFloat toFloat
--         (vx , vy) = d.velocity
--         (offsetXmin,offsetYmin) = List.foldl (\box (xq,yq) -> (min (first box.offSet) xq, min (second box.offSet) yq)) (0,0) d.hitbox
--         (offsetXmax,offsetYmax) = List.foldl (\box (xq,yq) -> (max (first box.offSet + first box.size) xq, max (second box.offSet + second box.size) yq)) (0,0) d.hitbox
--         (xmin,ymin) = ( min (x + offsetXmin) (x + offsetXmin + vx) , min (y + offsetYmin) (y + offsetYmin + vy) )
--         (xmax,ymax) = ( max (x + offsetXmax) (x + offsetXmax + vx) , max (y + offsetYmax) (y + offsetYmax + vy) )
--         (tileXmin,tileYmin) = (floor (xmin / tileSize) - 1, floor (ymin / tileSize) - 1)
--         (tileXmax,tileYmax) = (floor (xmax / tileSize) + 1, floor (ymax / tileSize) + 1)
--         tileNear = c.tileMap |> array2D_indexedSlice (tileXmin,tileYmin) (tileXmax,tileYmax) |> array2D_flatten |> List.filter (\(_,t) -> t > 0)
--         tileBox = (tileNear |> List.map (\((xt,yt),_) -> {pos=(toFloat xt * tileSize,toFloat yt * tileSize) , size=(tileSize,tileSize)} ))
--     in
--     (env, d) |> handleCollideBottom tileBox |> handleCollideTop tileBox
-- isPlayerOnGround : (EnvC, Data) -> Bool
-- isPlayerOnGround (env, d) =
--     let
--         c = env.commonData
--         (x, y) = d.position |> Tuple.mapBoth toFloat toFloat
--         (vx , vy) = d.velocity
--         (offsetXmin,offsetYmin) = List.foldl (\box (xq,yq) -> (min (first box.offSet) xq, min (second box.offSet) yq)) (0,0) d.hitbox
--         (offsetXmax,offsetYmax) = List.foldl (\box (xq,yq) -> (max (first box.offSet + first box.size) xq, max (second box.offSet + second box.size) yq)) (0,0) d.hitbox
--         (xmin,ymin) = ( min (x + offsetXmin) (x + offsetXmin + vx) , min (y + offsetYmin) (y + offsetYmin + vy) )
--         (xmax,ymax) = ( max (x + offsetXmax) (x + offsetXmax + vx) , max (y + offsetYmax) (y + offsetYmax + vy) )
--         (tileXmin,tileYmin) = (floor (xmin / tileSize) - 1, floor (ymin / tileSize) - 1)
--         (tileXmax,tileYmax) = (floor (xmax / tileSize) + 1, floor (ymax / tileSize) + 1)
--         tileNear = c.tileMap |> array2D_indexedSlice (tileXmin,tileYmin) (tileXmax,tileYmax) |> array2D_flatten |> List.filter (\(_,t) -> t > 0)
--         tileBox = (tileNear |> List.map (\((xt,yt),_) -> {pos=(toFloat xt * tileSize,toFloat yt * tileSize) , size=(tileSize,tileSize)} ))
--     in
--     checkCollideBottom d tileBox
-- handleCollideTop : List RectBox -> (EnvC, Data) -> (EnvC, Data)
-- handleCollideTop tileBox (env, d) =
--     if checkCollideTop d tileBox then
--         (env, { d | velocity = ( first d.velocity, 0 ) })
--     else
--         (env, d)
-- handleCollideBottom : List RectBox -> (EnvC, Data) -> (EnvC, Data)
-- handleCollideBottom tileBox (env, d) =
--     if checkCollideBottom d tileBox then
--         (env, { d | velocity = ( first d.velocity, 0 ) })
--     else
--         (env, d)
-- checkCollideTop : Data -> List RectBox -> Bool
-- checkCollideTop d tileBox =
--     let
--         topLine = d.hitbox |> List.foldl (\box (x1,x2,y0) -> if (second box.offSet + second box.size) <= y0
--              then (first box.offSet, first box.offSet + first box.size , second box.offSet + second box.size)
--              else (x1,x2,y0)) (inf,inf,inf)
--     in
--     (second d.velocity > 0) && (member True <| List.map (\box -> intscHorizontalSegBox box topLine) tileBox)
-- checkCollideBottom : Data -> List RectBox -> Bool
-- checkCollideBottom d tileBox =
--     let
--         bottomLine = d.hitbox |> List.foldl (\box (x1,x2,y0) -> if (second box.offSet + second box.size) >= y0
--              then (first box.offSet, first box.offSet + first box.size , second box.offSet + second box.size)
--              else (x1,x2,y0)) (0,0,0)
--     in
--     (second d.velocity > 0) && (member True <| List.map (\box -> intscHorizontalSegBox box bottomLine) tileBox)
-- intscHorizontalSegBox : RectBox -> (Float,Float,Float) -> Bool
-- intscHorizontalSegBox box (x1,x2,y0) =
--     let
--         (x3,y3) = box.pos
--         (x4,y4) = (x3 + first box.size, y0 + second box.size )
--     in
--     (y3 <= y0) && (y4 >= y0) && ((x1 <= x3 && x3 <= x2) || (x1 <= x4 && x4 <= x2) || (x3 <= x1 && x2 <= x4) || (x1 <= x3 && x4 <= x2))


handleGonnaCollideBottom : ( EnvC, Data ) -> ( EnvC, Data )
handleGonnaCollideBottom ( env, d ) =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, vy ) =
            d.velocity

        rectList =
            List.map (\hb -> RectBox ( toFloat x + vx + first hb.offSet, toFloat y + vy + second hb.offSet ) hb.size) d.hitbox

        dPosVelList =
            List.map
                (\rect ->
                    let
                        ( x_, y_ ) =
                            rect.pos

                        ( w_, h_ ) =
                            rect.size

                        bottomY =
                            y_ + h_ / 2

                        bottomXS =
                            x_ - w_ / 2 + eps

                        bottomXE =
                            x_ + w_ / 2 - eps

                        yIndex =
                            floor bottomY // tileSize

                        sIndex =
                            floor bottomXS // tileSize

                        eIndex =
                            floor bottomXE // tileSize

                        tline =
                            array2D_flatten <| array2D_slice ( sIndex, yIndex ) ( eIndex, yIndex ) tm
                    in
                    if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                        ( ( 0, floor vy - modBy tileSize (floor bottomY) ), ( vx, 0 ) )

                    else
                        ( ( 0, 0 ), ( vx, vy ) )
                )
                rectList

        ndpv =
            Maybe.withDefault ( ( 0, 0 ), ( 0, 0 ) ) (Compare.maximum (Compare.by (\a -> second (first a))) dPosVelList)
    in
    ( env, { d | position = ( first d.position, second d.position + second (first ndpv) ), velocity = second ndpv } )



-- handleGonnaCollideTop : ( EnvC, Data ) -> ( EnvC, Data )
-- handleGonnaCollideTop ( env, d ) =
--     let
--         tm =
--             env.commonData.tileMap
--         ( x, y ) =
--             d.position
--         ( vx, vy ) =
--             d.velocity
--         rectList =
--             List.map (\hb -> RectBox ( toFloat x + vx + first hb.offSet, toFloat y + vy + second hb.offSet ) hb.size) d.hitbox
--         dPosVelList =
--             List.map
--                 (\rect ->
--                     let
--                         ( x_, y_ ) =
--                             rect.pos
--                         ( w_, h_ ) =
--                             rect.size
--                         topY =
--                             y_ - h_ / 2
--                         topXS =
--                             x_ - w_ / 2 + eps
--                         topXE =
--                             x_ + w_ / 2 - eps
--                         yIndex =
--                             floor topY // tileSize
--                         sIndex =
--                             floor topXS // tileSize
--                         eIndex =
--                             floor topXE // tileSize
--                         tline =
--                             array2D_flatten <| array2D_slice ( sIndex, yIndex ) ( eIndex, yIndex ) tm
--                         pjline =
--                             array2D_flatten <| array2D_slice ( sIndex, yIndex + 1 ) ( eIndex, yIndex + 1 ) tm
--                         jline =
--                             if List.isEmpty pjline then
--                                 List.map (\_ -> 0) tline
--                             else
--                                 pjline
--                     in
--                     if List.member True (List.map2 (\tgrid jgrid -> tgrid > 0 && jgrid == 0) tline jline) then
--                         ( ( 0, ceiling vy + tileSize - modBy tileSize (floor topY) ), ( vx, 0 ) )
--                     else
--                         ( ( 0, 0 ), ( vx, vy ) )
--                 )
--                 rectList
--         ndpv =
--             Maybe.withDefault ( ( 0, 0 ), ( 0, 0 ) ) (Compare.minimum (Compare.by (\a -> second (first a))) dPosVelList)
--     in
--     ( env, { d | position = ( first d.position, second d.position + second (first ndpv) ), velocity = second ndpv } )
-- handleGonnaCollideRight : ( EnvC, Data ) -> ( EnvC, Data )
-- handleGonnaCollideRight ( env, d ) =
--     let
--         tm =
--             env.commonData.tileMap
--         ( x, y ) =
--             d.position
--         ( vx, vy ) =
--             d.velocity
--         rectList =
--             List.map (\hb -> RectBox ( toFloat x + vx + first hb.offSet, toFloat y + vy + second hb.offSet ) hb.size) d.hitbox
--         dPosVelList =
--             List.map
--                 (\rect ->
--                     let
--                         ( x_, y_ ) =
--                             rect.pos
--                         ( w_, h_ ) =
--                             rect.size
--                         rightX =
--                             x_ + w_ / 2
--                         rightYS =
--                             y_ - h_ / 2 + eps
--                         rightYE =
--                             y_ + h_ / 2 - eps
--                         xIndex =
--                             floor rightX // tileSize
--                         sIndex =
--                             floor rightYS // tileSize
--                         eIndex =
--                             floor rightYE // tileSize
--                         tline =
--                             array2D_flatten <| array2D_slice ( xIndex, sIndex ) ( xIndex, eIndex ) tm
--                         pjline =
--                             array2D_flatten <| array2D_slice ( xIndex - 1, sIndex ) ( xIndex - 1, eIndex ) tm
--                         jline =
--                             if List.isEmpty pjline then
--                                 List.map (\_ -> 0) tline
--                             else
--                                 pjline
--                     in
--                     if List.member True (List.map2 (\tgrid jgrid -> tgrid > 0 && jgrid == 0) tline jline) then
--                         ( ( floor vx - modBy tileSize (floor rightX), 0 ), ( 0, vy ) )
--                     else
--                         ( ( 0, 0 ), ( vx, vy ) )
--                 )
--                 rectList
--         ndpv =
--             Maybe.withDefault ( ( 0, 0 ), ( 0, 0 ) ) (Compare.maximum (Compare.by (\a -> first (first a))) dPosVelList)
--     in
--     ( env, { d | position = ( first d.position + first (first ndpv), second d.position ), velocity = second ndpv } )
-- handleGonnaCollideLeft : ( EnvC, Data ) -> ( EnvC, Data )
-- handleGonnaCollideLeft ( env, d ) =
--     let
--         tm =
--             env.commonData.tileMap
--         ( x, y ) =
--             d.position
--         ( vx, vy ) =
--             d.velocity
--         rectList =
--             List.map (\hb -> RectBox ( toFloat x + vx + first hb.offSet, toFloat y + vy + second hb.offSet ) hb.size) d.hitbox
--         dPosVelList =
--             List.map
--                 (\rect ->
--                     let
--                         ( x_, y_ ) =
--                             rect.pos
--                         ( w_, h_ ) =
--                             rect.size
--                         leftX =
--                             x_ - w_ / 2
--                         leftYS =
--                             y_ - h_ / 2 + eps
--                         leftYE =
--                             y_ + h_ / 2 - eps
--                         xIndex =
--                             floor leftX // tileSize
--                         sIndex =
--                             floor leftYS // tileSize
--                         eIndex =
--                             floor leftYE // tileSize
--                         tline =
--                             array2D_flatten <| array2D_slice ( xIndex, sIndex ) ( xIndex, eIndex ) tm
--                         pjline =
--                             array2D_flatten <| array2D_slice ( xIndex + 1, sIndex ) ( xIndex + 1, eIndex ) tm
--                         jline =
--                             if List.isEmpty pjline then
--                                 List.map (\_ -> 0) tline
--                             else
--                                 pjline
--                     in
--                     if List.member True (List.map2 (\tgrid jgrid -> tgrid > 0 && jgrid == 0) tline jline) then
--                         ( ( ceiling vx + tileSize - modBy tileSize (floor leftX), 0 ), ( 0, vy ) )
--                     else
--                         ( ( 0, 0 ), ( vx, vy ) )
--                 )
--                 rectList
--         ndpv =
--             Maybe.withDefault ( ( 0, 0 ), ( 0, 0 ) ) (Compare.minimum (Compare.by (\a -> first (first a))) dPosVelList)
--     in
--     ( env, { d | position = ( first d.position + first (first ndpv), second d.position ), velocity = second ndpv } )


handleGonnaCollideY : ( EnvC, Data ) -> Int -> ( Int, Float )
handleGonnaCollideY ( env, d ) dx =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, vy ) =
            d.velocity

        rectList =
            List.map (\hb -> RectBox ( toFloat x + toFloat dx + first hb.offSet, toFloat y + vy + second hb.offSet ) hb.size) d.hitbox

        ( offsetYBottom, velBottom ) =
            let
                dPosVelList =
                    List.map
                        (\rect ->
                            let
                                ( x_, y_ ) =
                                    rect.pos

                                ( w_, h_ ) =
                                    rect.size

                                bottomY =
                                    y_ + h_ / 2

                                bottomXS =
                                    x_ - w_ / 2 + eps

                                bottomXE =
                                    x_ + w_ / 2 - eps

                                yIndex =
                                    floor bottomY // tileSize

                                sIndex =
                                    floor bottomXS // tileSize

                                eIndex =
                                    floor bottomXE // tileSize

                                tline =
                                    array2D_flatten <| array2D_slice ( sIndex, yIndex ) ( eIndex, yIndex ) tm
                            in
                            if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                                ( 0 - modBy tileSize (floor bottomY), 0 )

                            else
                                ( 0, vy )
                        )
                        rectList
            in
            Maybe.withDefault ( 0, 0 ) (Compare.minimum (Compare.by (\a -> first a)) dPosVelList)

        ( offsetYTop, velTop ) =
            let
                dPosVelList =
                    List.map
                        (\rect ->
                            let
                                ( x_, y_ ) =
                                    rect.pos

                                ( w_, h_ ) =
                                    rect.size

                                topY =
                                    y_ - h_ / 2

                                topXS =
                                    x_ - w_ / 2 + eps

                                topXE =
                                    x_ + w_ / 2 - eps

                                yIndex =
                                    floor topY // tileSize

                                sIndex =
                                    floor topXS // tileSize

                                eIndex =
                                    floor topXE // tileSize

                                tline =
                                    array2D_flatten <| array2D_slice ( sIndex, yIndex ) ( eIndex, yIndex ) tm
                            in
                            if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                                ( tileSize - modBy tileSize (floor topY), 0 )

                            else
                                ( 0, vy )
                        )
                        rectList
            in
            Maybe.withDefault ( 0, 0 ) (Compare.maximum (Compare.by (\a -> first a)) dPosVelList)

        offsetY =
            offsetYTop + offsetYBottom

        nvy =
            Compare.min (Compare.by (\a -> abs a)) velTop velBottom
    in
    ( offsetY, nvy )


handleGonnaCollideX : ( EnvC, Data ) -> ( Int, Float )
handleGonnaCollideX ( env, d ) =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, vy ) =
            d.velocity

        rectList =
            List.map (\hb -> RectBox ( toFloat x + vx + first hb.offSet, toFloat y + second hb.offSet ) hb.size) d.hitbox

        ( offsetXLeft, velLeft ) =
            let
                dPosVelList =
                    List.map
                        (\rect ->
                            let
                                ( x_, y_ ) =
                                    rect.pos

                                ( w_, h_ ) =
                                    rect.size

                                leftX =
                                    x_ - w_ / 2

                                leftYS =
                                    y_ - h_ / 2 + eps

                                leftYE =
                                    y_ + h_ / 2 - eps

                                xIndex =
                                    floor leftX // tileSize

                                sIndex =
                                    floor leftYS // tileSize

                                eIndex =
                                    floor leftYE // tileSize

                                tline =
                                    array2D_flatten <| array2D_slice ( xIndex, sIndex ) ( xIndex, eIndex ) tm
                            in
                            if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                                ( tileSize - modBy tileSize (floor leftX), 0 )

                            else
                                ( 0, vx )
                        )
                        rectList
            in
            Maybe.withDefault ( 0, 0 ) (Compare.maximum (Compare.by (\a -> first a)) dPosVelList)

        ( offsetXRight, velRight ) =
            let
                dPosVelList =
                    List.map
                        (\rect ->
                            let
                                ( x_, y_ ) =
                                    rect.pos

                                ( w_, h_ ) =
                                    rect.size

                                rightX =
                                    x_ + w_ / 2

                                rightYS =
                                    y_ - h_ / 2 + eps

                                rightYE =
                                    y_ + h_ / 2 - eps

                                xIndex =
                                    floor rightX // tileSize

                                sIndex =
                                    floor rightYS // tileSize

                                eIndex =
                                    floor rightYE // tileSize

                                tline =
                                    array2D_flatten <| array2D_slice ( xIndex, sIndex ) ( xIndex, eIndex ) tm
                            in
                            if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                                ( 0 - modBy tileSize (floor rightX), 0 )

                            else
                                ( 0, vx )
                        )
                        rectList
            in
            Maybe.withDefault ( 0, 0 ) (Compare.minimum (Compare.by (\a -> first a)) dPosVelList)

        offsetX =
            offsetXLeft + offsetXRight

        nvx =
            Compare.min (Compare.by (\a -> abs a)) velLeft velRight
    in
    ( offsetX, nvx )


handleGonnaCollideXY : ( EnvC, Data ) -> ( EnvC, Data )
handleGonnaCollideXY ( env, d ) =
    let
        ( ox, oy ) =
            d.position

        ( ovx, ovy ) =
            d.velocity

        ( offsetX, nvx ) =
            handleGonnaCollideX ( env, d )

        ( offsetY, nvy ) =
            handleGonnaCollideY ( env, d ) offsetX

        -- ((cornerOffsetX, cornerOffsetY), (cornernvx, cornernvy)) =
        --     if offsetX == 0 && offsetY == 0 then
        --         handleGonnaCollideCorner (env, d)
        --     else
        --         ((0, 0), (nvx, nvy))
        npos =
            ( ox + floor ovx + offsetX, oy + floor ovy + offsetY )

        nvel =
            ( nvx, nvy )
    in
    ( env, { d | position = npos, velocity = nvel } )



-- handleGonnaCollideCorner : ( EnvC, Data ) -> ((Int, Int), (Float, Float))
-- handleGonnaCollideCorner (env, d) =
--     let
--         (ox, oy) = d.position
--         (ovx, ovy) = d.velocity
--         ((offsetX, offsetY), (nvx, nvy)) =
--             let
--                 tm = env.commonData.tileMap
--                 (nx_, ny_) = (ox + ovx, oy + ovy)
--             in
--             if ovx < 0 && ovy > 0 then
--                 let
--     in


isOnGround : ( EnvC, Data ) -> Bool
isOnGround ( env, d ) =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, vy ) =
            d.velocity

        rectList =
            List.map (\hb -> RectBox ( toFloat x + first hb.offSet, toFloat y + vy + second hb.offSet + 25 ) hb.size) d.hitbox

        dPosVelList =
            List.map
                (\rect ->
                    let
                        ( x_, y_ ) =
                            rect.pos

                        ( w_, h_ ) =
                            rect.size

                        bottomY =
                            y_ + h_ / 2

                        bottomXS =
                            x_ - w_ / 2 + eps

                        bottomXE =
                            x_ + w_ / 2 - eps

                        yIndex =
                            floor bottomY // tileSize

                        sIndex =
                            floor bottomXS // tileSize

                        eIndex =
                            floor bottomXE // tileSize

                        tline =
                            array2D_flatten <| array2D_slice ( sIndex, yIndex ) ( eIndex, yIndex ) tm

                        -- pjline =
                        --     array2D_flatten <| array2D_slice ( sIndex, yIndex - 1 ) ( eIndex, yIndex - 1 ) tm
                        -- jline =
                        --     if List.isEmpty pjline then
                        --         List.map (\_ -> 0) tline
                        --     else
                        --         pjline
                    in
                    if List.member True (List.map (\grid -> modBy 2 grid == 1) tline) then
                        ( ( 0, floor vy - modBy tileSize (floor bottomY) ), ( vx, 0 ) )

                    else
                        ( ( 0, 0 ), ( vx, vy ) )
                )
                rectList

        ndpv =
            Maybe.withDefault ( ( 0, 0 ), ( 0, 0 ) ) (Compare.maximum (Compare.by (\a -> second (first a))) dPosVelList)
    in
    second (first ndpv) /= 0 && second (second ndpv) == 0


{-| check whether is on ground
-}
simpleIsOnGround : ( EnvC, Data ) -> Bool
simpleIsOnGround ( env, d ) =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        hb =
            d.simpleCheck

        ( x_, y_ ) =
            ( toFloat x + first hb.offSet, toFloat y + second hb.offSet + 25 )

        ( w_, h_ ) =
            hb.size

        tl =
            ( floor (x_ - w_ / 2) // tileSize, floor (y_ - h_ / 2) // tileSize )

        br =
            ( floor (x_ + w_ / 2) // tileSize, floor (y_ + h_ / 2) // tileSize )

        slice =
            array2D_flatten <| array2D_slice tl br tm

        check =
            List.map
                (\grid -> modBy 2 grid == 1)
                slice
    in
    List.member True check


simpleHandleGonnaCollideX : ( EnvC, Data ) -> ( Int, Float )
simpleHandleGonnaCollideX ( env, d ) =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, _ ) =
            d.velocity

        hb =
            d.simpleCheck

        ( x_, y_ ) =
            ( toFloat x + vx + first hb.offSet, toFloat y + second hb.offSet )

        ( w_, h_ ) =
            hb.size

        tl =
            ( ceiling (x_ - w_ / 2) // tileSize, ceiling (y_ - h_ / 2 + 1) // tileSize )

        br =
            ( floor (x_ + w_ / 2) // tileSize, floor (y_ + h_ / 2) // tileSize )

        realtl =
            ( x_ - w_ / 2, y_ - h_ / 2 )

        realbr =
            ( x_ + w_ / 2, y_ + h_ / 2 )

        slice =
            array2D_flatten <| array2D_indexedSlice tl br tm

        ( offsetX, nvx ) =
            if vx > 0 then
                let
                    minDx =
                        Maybe.withDefault 0 <|
                            List.minimum <|
                                List.map
                                    (\( ( indexx, _ ), grid ) ->
                                        if modBy 2 grid == 1 then
                                            indexx * tileSize - (realbr |> first |> floor) - 1

                                        else
                                            0
                                    )
                                    slice

                    nvelx =
                        if minDx == 0 then
                            vx

                        else
                            0
                in
                ( minDx, nvelx )

            else if vx < 0 then
                let
                    maxDx =
                        Maybe.withDefault 0 <|
                            List.maximum <|
                                List.map
                                    (\( ( indexx, _ ), grid ) ->
                                        if modBy 2 grid == 1 then
                                            (indexx + 1) * tileSize - (realtl |> first |> ceiling) + 1

                                        else
                                            0
                                    )
                                    slice

                    nvelx =
                        if maxDx == 0 then
                            vx

                        else
                            0
                in
                ( maxDx, nvelx )

            else
                ( 0, vx )
    in
    ( offsetX, nvx )


simpleHandleGonnaCollideY : ( EnvC, Data ) -> Int -> ( Int, Float )
simpleHandleGonnaCollideY ( env, d ) dx =
    let
        tm =
            env.commonData.tileMap

        ( x, y ) =
            d.position

        ( vx, vy ) =
            d.velocity

        hb =
            d.simpleCheck

        ( x_, y_ ) =
            ( toFloat x + vx + toFloat dx + first hb.offSet, toFloat y + vy + second hb.offSet )

        ( w_, h_ ) =
            hb.size

        tl =
            ( ceiling (x_ - w_ / 2) // tileSize, ceiling (y_ - h_ / 2) // tileSize )

        br =
            ( floor (x_ + w_ / 2) // tileSize, floor (y_ + h_ / 2) // tileSize )

        realtl =
            ( x_ - w_ / 2, y_ - h_ / 2 )

        realbr =
            ( x_ + w_ / 2, y_ + h_ / 2 )

        slice =
            array2D_flatten <| array2D_indexedSlice tl br tm

        ( offsetY, nvy ) =
            if vy > 0 then
                let
                    minDy =
                        Maybe.withDefault 0 <|
                            List.minimum <|
                                List.map
                                    (\( ( _, indexy ), grid ) ->
                                        if modBy 2 grid == 1 then
                                            indexy * tileSize - (realbr |> second |> floor) - 1

                                        else
                                            0
                                    )
                                    slice

                    nvely =
                        if minDy == 0 then
                            vy

                        else
                            0
                in
                ( minDy, nvely )

            else if vy < 0 then
                let
                    maxDy =
                        Maybe.withDefault 0 <|
                            List.maximum <|
                                List.map
                                    (\( ( _, indexy ), grid ) ->
                                        if modBy 2 grid == 1 then
                                            (indexy + 1) * tileSize - (realtl |> second |> ceiling) + 3

                                        else
                                            0
                                    )
                                    slice

                    nvely =
                        if maxDy == 0 then
                            vy

                        else
                            0
                in
                ( maxDy, nvely )

            else
                ( 0, vy )
    in
    ( offsetY, nvy )


{-| check collision in both x and y direction
-}
simpleHandleGonnaCollideXY : ( EnvC, Data ) -> ( EnvC, Data )
simpleHandleGonnaCollideXY ( env, d ) =
    let
        ( ox, oy ) =
            d.position

        ( ovx, ovy ) =
            d.velocity

        ( offsetX, nvx ) =
            simpleHandleGonnaCollideX ( env, d )

        ( offsetY, nvy ) =
            simpleHandleGonnaCollideY ( env, d ) offsetX

        npos =
            ( ox + floor ovx + offsetX, oy + floor ovy + offsetY )

        nvel =
            ( nvx, nvy )
    in
    ( env, { d | position = npos, velocity = nvel } )
