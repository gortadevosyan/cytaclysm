module SceneProtos.CoreEngine.GameComponents.Player.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Canvas exposing (Renderable)
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Tools.KeyCode exposing (escape, key_e)
import List exposing (member)
import List.Extra exposing (find, findIndex)
import MainConfig exposing (gravity)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullData)
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (Dir(..), Model, MotionState(..), MovementState(..), PositionState(..), nullModel)
import SceneProtos.CoreEngine.GameComponents.Player.Config exposing (jumpVel, mass, speed, speedIncreased)
import SceneProtos.CoreEngine.GameComponents.Player.Display exposing (displayPlayer, displayPlayerAsRect)
import SceneProtos.CoreEngine.GameComponents.Player.State exposing (..)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade)
import SceneProtos.CoreEngine.LayerBase exposing (Buff(..), CommonData, InputState(..))
import SceneProtos.CoreEngine.Physics.Collision as Collision
import SceneProtos.CoreEngine.Physics.Movement exposing (movePos, updatePos, updateVelByAcc)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCPlayerInitData d) ->
            let
                hp =
                    200
            in
            Data id
                d.size
                d.pozition
                ( 0, 0 )
                ( 0, gravity * toFloat mass )
                mass
                [ Box ( 0, 5 ) ( 64, 118 ) ]
                (Box ( 0, 5 ) ( 60, 117 ))
                hp
                Alive
                (GCPlayerModel { nullModel | maxHp = hp })
                initExtraData

        -- Data id d.size d.pozition ( 0, 0 ) ( 0, gravity ) mass [ Box ( 0, 5 ) ( 64, 118 ) ] Alive (GCPlayerModel nullModel) initExtraData
        _ ->
            nullData


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    case d.lifeStatus of
        Alive ->
            let
                ( nd, nl, nenv ) =
                    ( d, [], env ) |> updatePositionState |> changeState |> updateVel

                ( nenv2, nd2 ) =
                    ( nenv, nd )
                        |> Collision.simpleHandleGonnaCollideXY

                npos =
                    nd2.position

                nmodel =
                    case nd2.gcModel of
                        GCPlayerModel model ->
                            model

                        _ ->
                            nullModel

                ndir =
                    nmodel.dir

                nl2 =
                    [ ( GCByName "Weapon", WeaponUpdateMsg npos ndir )
                    , ( GCByName "Enemy", EnemyUpdateMsg npos )
                    , ( GCByName "Store", GCPlayerPositionMsg npos )
                    , ( GCByName "GameMap", GCPlayerPositionMsg npos )
                    ]

                ( pmsg, penv ) =
                    if Maybe.withDefault False (get escape env.globalData.keyList) then
                        ( [ ( GCParent, PauseMsg ) ], nenv2 |> (\e -> { e | globalData = e.globalData |> (\gd -> { gd | keyList = env.globalData.keyList |> set escape False }) }) )

                    else
                        ( [], nenv2 )

                ( umsg, uenv ) =
                    if Maybe.withDefault False (get key_e env.globalData.keyList) then
                        ( [ ( GCParent, UpgradeInitMsg d.hp ) ], penv |> (\e -> { e | globalData = e.globalData |> (\gd -> { gd | keyList = env.globalData.keyList |> set key_e False }) }) )

                    else
                        ( [], penv )
            in
            ( nd2, nl ++ nl2 ++ pmsg ++ umsg, uenv |> updateInputState )

        Dead dt ->
            ( { d | lifeStatus = Dead (dt + 1) }
            , if dt == 0 then
                [ ( GCParent, PlayerDeadMsg ) ]

              else
                []
            , env
            )


updateInputState : EnvC CommonData -> EnvC CommonData
updateInputState env =
    let
        oc =
            env.commonData

        nc =
            { oc
                | inputState =
                    case oc.inputState of
                        Transfering i ->
                            if i < 0 then
                                Other

                            else
                                Transfering (i - 1)

                        _ ->
                            Other
            }
    in
    { env | commonData = nc }



-- (newEnv, newData) = (env, d) |> updateVelByAcc |> updatePos


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env gcmsg d =
    case gcmsg of
        GCHitByBulletMsg gcModel ->
            case gcModel of
                GCBulletModel bullet ->
                    let
                        nhp =
                            d.hp - bullet.atk
                    in
                    if nhp <= 0 && d.lifeStatus == Alive then
                        ( { d | lifeStatus = Dead 0, hp = nhp }, [], env )

                    else
                        ( { d | hp = nhp }, [], env )

                _ ->
                    ( d, [], env )

        GCHitByEnemyMsg gcModel ->
            case gcModel of
                GCEnemyModel enemy ->
                    let
                        nhp =
                            d.hp - enemy.atk
                    in
                    if nhp < 0 && d.lifeStatus == Alive then
                        ( { d | lifeStatus = Dead 0, hp = nhp }, [], env )

                    else
                        ( { d | hp = nhp }, [], env )

                _ ->
                    ( d, [], env )

        Heal i ->
            case d.gcModel of
                GCPlayerModel pm ->
                    ( { d | hp = d.hp + toFloat i |> min pm.maxHp }, [], env )

                _ ->
                    ( { d | hp = d.hp + toFloat i }, [], env )

        Transfer p ->
            let
                oc =
                    env.commonData

                nc =
                    { oc | inputState = Transfering 100 }
            in
            ( { d | position = p }, [], { env | commonData = nc } )

        _ ->
            ( d, [], env )


updatePositionState : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updatePositionState ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel
    in
    if Collision.simpleIsOnGround ( env, d ) then
        ( { d | gcModel = GCPlayerModel { omodel | positionState = OnGround } }, ls, env )

    else
        ( { d | gcModel = GCPlayerModel { omodel | positionState = InAir } }, ls, env )


updateVel : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateVel ( d, ls, env ) =
    let
        nspeed =
            if
                findIndex
                    (\b ->
                        case b of
                            SpeedUp _ ->
                                True

                            _ ->
                                False
                    )
                    env.commonData.buff
                    /= Nothing
            then
                speedIncreased

            else
                speed

        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel

        kl =
            env.globalData.keyList

        bk =
            omodel.boundKey

        ovel =
            d.velocity

        nvel =
            if omodel.movementState == JumpingUp 0 || omodel.motionState == InDoubleJump 0 then
                ( first ovel, -jumpVel )

            else
                ovel

        nvel2 =
            if omodel.movementState == Idle then
                ( 0, second nvel )

            else if Maybe.withDefault False (get bk.right kl) == True && Maybe.withDefault False (get bk.left kl) == True then
                ( 0, second nvel )

            else if omodel.dir == Right && Maybe.withDefault False (get bk.right kl) == True then
                ( nspeed, second nvel )

            else if omodel.dir == Left && Maybe.withDefault False (get bk.left kl) == True then
                ( -nspeed, second nvel )

            else
                ( 0, second nvel )

        ( newenv, newdata ) =
            ( env, { d | velocity = nvel2 } ) |> updateVelByAcc
    in
    ( newdata, ls, newenv )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayPlayer env d, 3 ) ]
