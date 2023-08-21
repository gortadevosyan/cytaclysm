module SceneProtos.CoreEngine.Physics.CollisionGC exposing (updateCollision)

{-|

@docs updateCollision

-}

import Lib.Tools.ArrayTools exposing (array2D_flatten, array2D_indexedSlice)
import List exposing (member)
import MainConfig exposing (tileSize)
import Messenger.RecursionList exposing (updateObjectsWithTarget)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), GameComponent, GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..))
import SceneProtos.CoreEngine.GameComponent.Handler exposing (recBody)
import SceneProtos.CoreEngine.GameComponents.Bullet.Base as Bullet exposing (BulletType(..))
import SceneProtos.CoreEngine.GameComponents.Enemy.Base as Enemy exposing (EnemyType(..))
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (AtkType(..))
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)


{-| update collsion
-}
updateCollision : EnvC -> List GameComponent -> ( List GameComponent, List GameComponentMsg, EnvC )
updateCollision env objs =
    updateObjectsWithTarget recBody env (judgeCollision env objs) objs


judgeCollision : EnvC -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCollision env objs =
    let
        ( bullets, objs2 ) =
            List.partition (\obj -> obj.name == "Bullet") objs

        rbullets =
            bullets |> List.filter (\obj -> obj.data.lifeStatus == Alive)

        ( enemies, objs3 ) =
            List.partition (\obj -> obj.name == "Enemy") objs2

        renemies =
            enemies |> List.filter (\obj -> obj.data.lifeStatus == Alive)

        ( player, objs4 ) =
            List.partition (\obj -> obj.name == "Player") objs3

        ( weapon, objs5 ) =
            List.partition (\obj -> obj.name == "Weapon") objs4

        rweapon =
            weapon
                |> List.filter
                    (\obj ->
                        case obj.data.gcModel of
                            GCWeaponModel model ->
                                model.atkType == Saber && (env.t - model.lastAtkTime) < round (toFloat model.atkInterval / 2.5)

                            _ ->
                                False
                    )
    in
    judgeCoBulletsGamemap env rbullets
        ++ judgeCoBulletsEnemies env rbullets renemies
        ++ judgeCoBulletsPlayer env rbullets player
        ++ judgeCoEnemiesPlayer env renemies player
        ++ judgeCoBulletsWeapon env rbullets rweapon
        ++ judgeCoEnemiesWeapon env renemies rweapon


judgeCoEnemiesPlayer : EnvC -> List GameComponent -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoEnemiesPlayer env enemies players =
    List.concatMap
        (\enemy ->
            List.foldl
                (\player ( cls, isFirst ) ->
                    if isFirst && chkCollisionEnemyPlayer ( env, enemy.data, player.data ) then
                        ( [ ( GCById enemy.data.uid, GCAtkPlayerMsg )
                          , ( GCById player.data.uid, GCHitByEnemyMsg enemy.data.gcModel )
                          ]
                            ++ cls
                        , False
                        )

                    else
                        ( cls, isFirst )
                )
                ( [], True )
                players
                |> Tuple.first
        )
        (enemies
            |> List.filter
                (\gc ->
                    case gc.data.gcModel of
                        GCEnemyModel model ->
                            case model.typeId of
                                EnemyDash _ ->
                                    env.t - model.lastHitTime > 60

                                EnemyShot _ ->
                                    False

                        _ ->
                            False
                )
        )


judgeCoEnemiesWeapon : EnvC -> List GameComponent -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoEnemiesWeapon env enemies weapons =
    List.concatMap
        (\enemy ->
            List.foldl
                (\weapon cls ->
                    if chkCollisionEnemyWeapon ( env, enemy.data, weapon.data ) then
                        [ ( GCById enemy.data.uid, GCHitByWeaponMsg weapon.data.gcModel )
                        ]
                            ++ cls

                    else
                        cls
                )
                []
                weapons
        )
        enemies


judgeCoBulletsWeapon : EnvC -> List GameComponent -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoBulletsWeapon env bullets weapons =
    List.concatMap
        (\bullet ->
            List.foldl
                (\weapon cls ->
                    if chkCollisionBulletWeapon ( env, bullet.data, weapon.data ) then
                        [ ( GCById bullet.data.uid, GCCollisionBulletMsg "Weapon" )
                        ]
                            ++ cls

                    else
                        cls
                )
                []
                weapons
        )
        bullets


judgeCoBulletsPlayer : EnvC -> List GameComponent -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoBulletsPlayer env bullets players =
    List.concatMap
        (\bullet ->
            List.foldl
                (\player ( cls, isFirst ) ->
                    if isFirst && chkCollisionBulletPlayer ( env, bullet.data, player.data ) then
                        ( [ ( GCById bullet.data.uid, GCCollisionBulletMsg "Player" )
                          , ( GCById player.data.uid, GCHitByBulletMsg bullet.data.gcModel )
                          ]
                            ++ cls
                        , False
                        )

                    else
                        ( cls, isFirst )
                )
                ( [], True )
                players
                |> Tuple.first
        )
        bullets


judgeCoBulletsEnemies : EnvC -> List GameComponent -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoBulletsEnemies env bullets enemies =
    List.concatMap
        (\bullet ->
            List.foldl
                (\enemy ( cls, isFirst ) ->
                    if isFirst && chkCollisionBulletEnemy ( env, bullet.data, enemy.data ) then
                        ( [ ( GCById bullet.data.uid, GCCollisionBulletMsg "Enemy" )
                          , ( GCById enemy.data.uid, GCHitByBulletMsg bullet.data.gcModel )
                          ]
                            ++ cls
                        , False
                        )

                    else
                        ( cls, isFirst )
                )
                ( [], True )
                enemies
                |> Tuple.first
        )
        bullets


judgeCoBulletsGamemap : EnvC -> List GameComponent -> List ( GameComponentTarget, GameComponentMsg )
judgeCoBulletsGamemap env bullets =
    List.concatMap
        (\bullet ->
            if chkCollisionBulletGamemap ( env, bullet.data ) then
                [ ( GCById bullet.data.uid, GCCollisionBulletMsg "GameMap" ) ]

            else
                []
        )
        bullets


type alias Line =
    { st : ( Float, Float )
    , en : ( Float, Float )
    }


genLineList : ( EnvC, Data ) -> List Line
genLineList ( env, d ) =
    let
        ( x, y ) =
            d.position |> Tuple.mapBoth toFloat toFloat

        ( vx, vy ) =
            d.velocity

        angle =
            atan2 vy vx

        lineList =
            List.concatMap
                (\hb ->
                    let
                        ( ( x_, y_ ), ( w_, h_ ) ) =
                            ( hb.offSet, hb.size )

                        ( ( leftX, leftY ), ( rightX, rightY ) ) =
                            ( ( x_ - w_ / 2, y_ - h_ / 2 ), ( x_ + w_ / 2, y_ + h_ / 2 ) )

                        ( x1, y1 ) =
                            ( x + leftX * cos angle - leftY * sin angle, y + leftX * sin angle + leftY * cos angle )

                        ( x2, y2 ) =
                            ( x + vx + rightX * cos angle - rightY * sin angle, y + vy + rightX * sin angle + rightY * cos angle )

                        ( x3, y3 ) =
                            ( x + rightX * cos angle - rightY * sin angle, y + rightX * sin angle + rightY * cos angle )

                        ( x4, y4 ) =
                            ( x + vx + leftX * cos angle - leftY * sin angle, y + vy + leftX * sin angle + leftY * cos angle )

                        ( x5, y5 ) =
                            ( x, y )

                        ( x6, y6 ) =
                            ( x + vx, y + vy )
                    in
                    [ { st = ( x1, y1 ), en = ( x2, y2 ) }, { st = ( x3, y3 ), en = ( x4, y4 ) }, { st = ( x5, y5 ), en = ( x6, y6 ) } ]
                )
                (d.simpleCheck :: d.hitbox)
    in
    lineList


genLineListWeapon : ( EnvC, Data ) -> List Line
genLineListWeapon ( env, d ) =
    let
        ( x, y ) =
            d.position |> Tuple.mapBoth toFloat toFloat

        angle =
            case d.gcModel of
                GCWeaponModel model ->
                    model.angle

                _ ->
                    0

        lineList =
            List.concatMap
                (\hb ->
                    let
                        ( ( x_, y_ ), ( w_, h_ ) ) =
                            ( hb.offSet, hb.size )

                        ( ( leftX, leftY ), ( rightX, rightY ) ) =
                            ( ( x_ - w_, y_ - h_ / 2 ), ( x_, y_ + h_ / 2 ) )

                        ( x1, y1 ) =
                            ( x + leftX * cos angle - leftY * sin angle, y + leftX * sin angle + leftY * cos angle )

                        ( x2, y2 ) =
                            ( x + rightX * cos angle - leftY * sin angle, y + rightX * sin angle + leftY * cos angle )

                        ( x3, y3 ) =
                            ( x + rightX * cos angle - rightY * sin angle, y + rightX * sin angle + rightY * cos angle )

                        ( x4, y4 ) =
                            ( x + leftX * cos angle - rightY * sin angle, y + leftX * sin angle + rightY * cos angle )
                    in
                    [ { st = ( x1, y1 ), en = ( x3, y3 ) }, { st = ( x4, y4 ), en = ( x2, y2 ) } ]
                )
                (d.simpleCheck :: d.hitbox)
    in
    lineList


genTLine : ( EnvC, Data ) -> Line -> List ( ( Int, Int ), Int )
genTLine ( env, d ) line =
    let
        tm =
            env.commonData.tileMap

        stx =
            min (Tuple.first line.st) (Tuple.first line.en)

        sty =
            min (Tuple.second line.st) (Tuple.second line.en)

        enx =
            max (Tuple.first line.st) (Tuple.first line.en)

        eny =
            max (Tuple.second line.st) (Tuple.second line.en)

        xsIndex =
            floor stx // tileSize

        xeIndex =
            floor enx // tileSize

        ysIndex =
            floor sty // tileSize

        yeIndex =
            floor eny // tileSize

        tline =
            array2D_flatten <| array2D_indexedSlice ( xsIndex, ysIndex ) ( xeIndex, yeIndex ) tm
    in
    tline


chkCollisionEnemyPlayer : ( EnvC, Data, Data ) -> Bool
chkCollisionEnemyPlayer ( env, enemyd, playerd ) =
    let
        enemyLineList =
            genLineList ( env, enemyd )

        playerLineList =
            genLineList ( env, playerd )
    in
    member True <|
        List.map
            (\enemyLine ->
                member True <|
                    List.map
                        (\playerLine -> chkIntersectSegSeg enemyLine.st enemyLine.en playerLine.st playerLine.en)
                        playerLineList
            )
            enemyLineList


chkCollisionEnemyWeapon : ( EnvC, Data, Data ) -> Bool
chkCollisionEnemyWeapon ( env, enemyd, weapond ) =
    let
        enemyLineList =
            genLineList ( env, enemyd )

        weaponLineList =
            genLineListWeapon ( env, weapond )
    in
    member True <|
        List.map
            (\enemyLine ->
                member True <|
                    List.map
                        (\weaponLine -> chkIntersectSegSeg enemyLine.st enemyLine.en weaponLine.st weaponLine.en)
                        weaponLineList
            )
            enemyLineList


chkCollisionBulletWeapon : ( EnvC, Data, Data ) -> Bool
chkCollisionBulletWeapon ( env, bulletd, weapond ) =
    let
        bmodel =
            case bulletd.gcModel of
                GCBulletModel model ->
                    model

                _ ->
                    Bullet.nullBullet
    in
    case bmodel.bulletType of
        EnemyBullet _ ->
            let
                bulletLineList =
                    genLineList ( env, bulletd )

                enemyLineList =
                    genLineListWeapon ( env, weapond )
            in
            member True <|
                List.map
                    (\bulletLine ->
                        member True <|
                            List.map
                                (\enemyLine -> chkIntersectSegSeg bulletLine.st bulletLine.en enemyLine.st enemyLine.en)
                                enemyLineList
                    )
                    bulletLineList

        PlayerBullet _ ->
            False


chkCollisionBulletPlayer : ( EnvC, Data, Data ) -> Bool
chkCollisionBulletPlayer ( env, bulletd, playerd ) =
    let
        bmodel =
            case bulletd.gcModel of
                GCBulletModel model ->
                    model

                _ ->
                    Bullet.nullBullet
    in
    case bmodel.bulletType of
        EnemyBullet _ ->
            let
                bulletLineList =
                    genLineList ( env, bulletd )

                enemyLineList =
                    genLineList ( env, playerd )
            in
            member True <|
                List.map
                    (\bulletLine ->
                        member True <|
                            List.map
                                (\enemyLine -> chkIntersectSegSeg bulletLine.st bulletLine.en enemyLine.st enemyLine.en)
                                enemyLineList
                    )
                    bulletLineList

        PlayerBullet _ ->
            False


chkCollisionBulletEnemy : ( EnvC, Data, Data ) -> Bool
chkCollisionBulletEnemy ( env, bulletd, enemyd ) =
    let
        bmodel =
            case bulletd.gcModel of
                GCBulletModel model ->
                    model

                _ ->
                    Bullet.nullBullet
    in
    case bmodel.bulletType of
        PlayerBullet _ ->
            let
                bulletLineList =
                    genLineList ( env, bulletd )

                enemyLineList =
                    genLineList ( env, enemyd )
            in
            member True <|
                List.map
                    (\bulletLine ->
                        member True <|
                            List.map
                                (\enemyLine -> chkIntersectSegSeg bulletLine.st bulletLine.en enemyLine.st enemyLine.en)
                                enemyLineList
                    )
                    bulletLineList

        EnemyBullet _ ->
            False


chkCollisionBulletGamemap : ( EnvC, Data ) -> Bool
chkCollisionBulletGamemap ( env, d ) =
    let
        lineList =
            genLineList ( env, d )
    in
    member True <|
        List.map
            (\line ->
                let
                    tline =
                        genTLine ( env, d ) line
                in
                if
                    List.member True
                        (List.map
                            (\( ( gx, gy ), grid ) ->
                                if modBy 2 grid == 1 then
                                    chkIntersectSegTile line ( gx, gy )

                                else
                                    False
                            )
                            tline
                        )
                then
                    True

                else
                    False
            )
            lineList


chkIntersectSegTile : Line -> ( Int, Int ) -> Bool
chkIntersectSegTile line ( gx, gy ) =
    let
        ( stx, sty ) =
            line.st

        ( enx, eny ) =
            line.en

        ( x1, y1 ) =
            ( stx, sty )

        ( x2, y2 ) =
            ( enx, eny )

        ( x3, y3 ) =
            ( toFloat (gx * tileSize), toFloat (gy * tileSize) )

        ( x4, y4 ) =
            ( toFloat (gx * tileSize + tileSize), toFloat (gy * tileSize) )

        ( x5, y5 ) =
            ( toFloat (gx * tileSize + tileSize), toFloat (gy * tileSize + tileSize) )

        ( x6, y6 ) =
            ( toFloat (gx * tileSize), toFloat (gy * tileSize + tileSize) )
    in
    if chkIntersectSegSeg ( x1, y1 ) ( x2, y2 ) ( x3, y3 ) ( x4, y4 ) then
        True

    else if chkIntersectSegSeg ( x1, y1 ) ( x2, y2 ) ( x4, y4 ) ( x5, y5 ) then
        True

    else if chkIntersectSegSeg ( x1, y1 ) ( x2, y2 ) ( x5, y5 ) ( x6, y6 ) then
        True

    else if chkIntersectSegSeg ( x1, y1 ) ( x2, y2 ) ( x6, y6 ) ( x3, y3 ) then
        True

    else
        False


chkIntersectSegSeg : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float ) -> ( Float, Float ) -> Bool
chkIntersectSegSeg ( x1, y1 ) ( x2, y2 ) ( x3, y3 ) ( x4, y4 ) =
    if (max x3 x4 < min x1 x2) || (max x1 x2 < min x3 x4) || (max y3 y4 < min y1 y2) || (max y1 y2 < min y3 y4) then
        False

    else if cross ( x1, y1 ) ( x3, y3 ) ( x4, y4 ) * cross ( x2, y2 ) ( x3, y3 ) ( x4, y4 ) > 0 || cross ( x4, y4 ) ( x1, y1 ) ( x2, y2 ) * cross ( x3, y3 ) ( x1, y1 ) ( x2, y2 ) > 0 then
        False

    else
        True


cross : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float ) -> Float
cross ( x1, y1 ) ( x2, y2 ) ( x3, y3 ) =
    (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3)
