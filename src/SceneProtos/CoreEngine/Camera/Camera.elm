module SceneProtos.CoreEngine.Camera.Camera exposing (updateCamera, shakeCam, removeOutOfBound, removeDead, lengthInCam, sizeInCam, posInMap, posInCam)

{-| The camera, to show what display in screen

@docs updateCamera, shakeCam, removeOutOfBound, removeDead, lengthInCam, sizeInCam, posInMap, posInCam

-}

import Array
import Array2D
import Lib.Tools.KeyCode exposing (shift)
import Lib.Tools.RNG exposing (genRandomInt)
import MainConfig exposing (cameraFollow, tileSize)
import SceneProtos.CoreEngine.Camera.Base exposing (CameraState(..))
import SceneProtos.CoreEngine.Camera.Config exposing (cameraHeight, cameraWidth)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GCModel(..), GameComponent, LifeStatus(..))
import SceneProtos.CoreEngine.GameComponent.Handler exposing (getGCById, getGCByName, getGCPos)
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (EnemyType(..))
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC, Model)
import Tuple exposing (first, second)


{-| update camera by envc
-}
updateCamera : ( EnvC, Model ) -> ( EnvC, Model )
updateCamera ( env, model ) =
    let
        c =
            env.commonData

        ocam =
            c.camera

        playerPos =
            ( model.objects, "Player" ) |> getGCByName |> getGCPos
    in
    if dist ocam.position playerPos <= 3 then
        ( { env | commonData = { c | camera = ocam } }, model ) |> updateCameraSize |> updateCameraState

    else
        ( env, model ) |> updateCamVel |> updateCamPos |> updateCameraSize |> updateCameraState


updateCameraState : ( EnvC, Model ) -> ( EnvC, Model )
updateCameraState ( env, model ) =
    let
        c =
            env.commonData

        ocam =
            c.camera

        ncam =
            case ocam.cameraState of
                Shaking i ->
                    if i == 0 then
                        { ocam | cameraState = Normal }

                    else
                        { ocam | cameraState = Shaking (i - 1) }

                Normal ->
                    ocam
    in
    ( { env | commonData = { c | camera = ncam } }, model )


{-| shake the camera
-}
shakeCam : ( EnvC, Model ) -> Int -> ( EnvC, Model )
shakeCam ( env, model ) t =
    let
        c =
            env.commonData

        ocam =
            c.camera

        ncam =
            { ocam | cameraState = Shaking t }
    in
    ( { env | commonData = { c | camera = ncam } }, model )


updateCameraSize : ( EnvC, Model ) -> ( EnvC, Model )
updateCameraSize ( env, model ) =
    let
        c =
            env.commonData

        ocam =
            c.camera

        kl =
            env.globalData.keyList

        maxs =
            1.8

        ncam =
            if Maybe.withDefault False (Array.get shift kl) == True then
                if first ocam.size < cameraWidth * maxs && second ocam.size < cameraHeight * maxs then
                    { ocam | size = ( first ocam.size + 32, second ocam.size + 18 ) }

                else
                    { ocam | size = ( cameraWidth * maxs, cameraHeight * maxs ) }

            else if first ocam.size < cameraWidth + 32 && second ocam.size < cameraHeight + 18 then
                { ocam | size = ( cameraWidth, cameraHeight ) }

            else
                { ocam | size = ( first ocam.size - 32, second ocam.size - 18 ) }
    in
    ( { env | commonData = { c | camera = ncam } }, model )


updateCamPos : ( EnvC, Model ) -> ( EnvC, Model )
updateCamPos ( env, model ) =
    let
        c =
            env.commonData

        ocam =
            c.camera

        ( cvx, cvy ) =
            ocam.velocity

        ( cx, cy ) =
            ocam.position

        newPos =
            ( cx + floor cvx, cy + floor cvy )

        ncam =
            { ocam | position = newPos }
    in
    ( { env | commonData = { c | camera = ncam } }, model )


updateCamVel : ( EnvC, Model ) -> ( EnvC, Model )
updateCamVel ( env, model ) =
    let
        c =
            env.commonData

        ocam =
            c.camera

        ( cvx, cvy ) =
            ocam.velocity

        ( cx, cy ) =
            ocam.position

        ( px, py ) =
            ( model.objects, 0 ) |> getGCById |> getGCPos

        ( ncvx, ncvy ) =
            if cx /= px && cy /= py then
                ( toFloat (px - cx) * 0.08 * cameraFollow, toFloat (py - cy) * 0.08 * cameraFollow )

            else
                ( cvx, cvy )

        ncam =
            { ocam | velocity = ( ncvx, ncvy ) }
    in
    ( { env | commonData = { c | camera = ncam } }, model )


{-| get an object pos in camera
-}
posInCam : EnvC -> ( Int, Int ) -> ( Float, Float )
posInCam env ( x, y ) =
    let
        ( cx, cy ) =
            env.commonData.camera.position

        ( cw, ch ) =
            env.commonData.camera.size
    in
    ( (1920 / cw) * ((x |> toFloat) - (cx |> toFloat) + cw / 2), (1080 / ch) * ((y |> toFloat) - (cy |> toFloat) + ch / 2) ) |> shakePos env


{-| get an object pos in map
-}
posInMap : EnvC -> ( Int, Int ) -> ( Float, Float )
posInMap env ( x, y ) =
    let
        ( fx, fy ) =
            ( x, y ) |> Tuple.mapBoth toFloat toFloat

        ( cx, cy ) =
            env.commonData.camera.position |> Tuple.mapBoth toFloat toFloat

        ( cw, ch ) =
            env.commonData.camera.size
    in
    ( cx + (fx / 1920 - 0.5) * cw, cy + (fy / 1080 - 0.5) * ch )


{-| get an object size in camera
-}
sizeInCam : EnvC -> ( Float, Float ) -> ( Float, Float )
sizeInCam env ( w, h ) =
    let
        ( cw, ch ) =
            env.commonData.camera.size
    in
    ( 1920 * w / cw, 1080 * h / ch )


{-| get an object length in camera
-}
lengthInCam : EnvC -> Float -> Float
lengthInCam env l =
    let
        ( cw, _ ) =
            env.commonData.camera.size
    in
    1920 * l / cw


dist : ( Int, Int ) -> ( Int, Int ) -> Float
dist ( a, b ) ( c, d ) =
    sqrt (toFloat ((a - c) ^ 2 + (b - d) ^ 2))


isInCamera : EnvC -> ( Int, Int ) -> Bool
isInCamera env ( x, y ) =
    let
        c =
            env.commonData.camera

        ( cx, cy ) =
            c.position

        ( w, h ) =
            c.size
    in
    x <= cx + ceiling w // 2 + tileSize && x >= cx - ceiling w // 2 - tileSize && y <= cy + ceiling h // 2 + tileSize && y >= cy - ceiling h // 2 - tileSize


isInCameraRange : EnvC -> ( Int, Int ) -> Float -> Bool
isInCameraRange env ( x, y ) k =
    let
        c =
            env.commonData.camera

        ( cx, cy ) =
            c.position

        ( w, h ) =
            ( first c.size * k, second c.size * k )
    in
    x <= cx + ceiling w // 2 + tileSize && x >= cx - ceiling w // 2 - tileSize && y <= cy + ceiling h // 2 + tileSize && y >= cy - ceiling h // 2 - tileSize


shakePos : EnvC -> ( Float, Float ) -> ( Float, Float )
shakePos env ( x, y ) =
    if modBy 3 env.t == 0 && isShaking env then
        let
            offsetX =
                genRandomInt env.t ( -20, 20 )

            offsetY =
                genRandomInt env.t ( -18, 18 )
        in
        ( x + toFloat offsetX, y + toFloat offsetY )

    else
        ( x, y )


isShaking : EnvC -> Bool
isShaking env =
    case env.commonData.camera.cameraState of
        Shaking _ ->
            True

        _ ->
            False


{-| remove dead enemy
-}
removeDead : List GameComponent -> List GameComponent
removeDead =
    List.filter
        (\x ->
            case x.data.lifeStatus of
                Alive ->
                    True

                Dead t ->
                    case x.name of
                        "Enemy" ->
                            if checkElite x then
                                t <= 90

                            else
                                t <= 30

                        "Bullet" ->
                            t <= 15

                        "Player" ->
                            t <= 300

                        _ ->
                            t <= 30
        )


checkElite : GameComponent -> Bool
checkElite gc =
    case gc.data.gcModel of
        GCEnemyModel emodel ->
            emodel.typeId == EnemyShot 3

        _ ->
            False


{-| remove the bullet out of bound
-}
removeOutOfBound : EnvC -> List GameComponent -> List GameComponent
removeOutOfBound env ls =
    ls
        |> List.filter
            (\p ->
                p.name
                    /= "Bullet"
                    || (let
                            ( x, y ) =
                                p.data.position |> posInCam env
                        in
                        x > -1920 && x < 1920 * 2 && y > -1080 && y < 1080 * 2
                       )
            )
        |> (if env.commonData.showUI then
                List.filter
                    (\p ->
                        p.name
                            /= "Enemy"
                            || (let
                                    ( x, y ) =
                                        p.data.position

                                    ( tx, ty ) =
                                        ( x // tileSize, y // tileSize )
                                in
                                Maybe.withDefault 1 (Array2D.get tx ty env.commonData.tileMap) |> modBy 2 |> (==) 0
                               )
                    )

            else
                \x -> x
           )
