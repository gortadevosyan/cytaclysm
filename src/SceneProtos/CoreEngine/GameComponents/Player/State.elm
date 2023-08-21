module SceneProtos.CoreEngine.GameComponents.Player.State exposing (isWalking, changeState)

{-| This file is descripted the player's state

@docs isWalking, changeState

-}

import Array exposing (get)
import Html exposing (i)
import Lib.Env.Env exposing (EnvC)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), GameComponentInitData(..), GameComponentMsg, GameComponentTarget, LifeStatus(..), nullData)
import SceneProtos.CoreEngine.GameComponents.Player.Base exposing (Dir(..), MotionState(..), MovementState(..), PositionState(..), nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| judge is walking
-}
isWalking : MovementState -> Bool
isWalking ms =
    case ms of
        Walking _ ->
            True

        _ ->
            False


isJumpingUp : MovementState -> Bool
isJumpingUp ms =
    case ms of
        JumpingUp _ ->
            True

        _ ->
            False


isJumpingTop : MovementState -> Bool
isJumpingTop ms =
    case ms of
        JumpingTop _ ->
            True

        _ ->
            False


isJumpingDown : MovementState -> Bool
isJumpingDown ms =
    case ms of
        JumpingDown _ ->
            True

        _ ->
            False


isLandingBuffer : MovementState -> Bool
isLandingBuffer ms =
    case ms of
        LandingBuffer _ ->
            True

        _ ->
            False


isInDoubleJump : MotionState -> Bool
isInDoubleJump motion =
    case motion of
        InDoubleJump _ ->
            True

        _ ->
            False


getAnimIndex : MovementState -> String -> Int
getAnimIndex ms str =
    if str == "Walking" then
        case ms of
            Walking i ->
                i

            _ ->
                0

    else if str == "JumpingUp" then
        case ms of
            JumpingUp i ->
                i

            _ ->
                0

    else if str == "JumpingTop" then
        case ms of
            JumpingTop i ->
                i

            _ ->
                0

    else if str == "JumpingDown" then
        case ms of
            JumpingDown i ->
                i

            _ ->
                0

    else if str == "LandingBuffer" then
        case ms of
            LandingBuffer i ->
                i

            _ ->
                0

    else
        0


{-| change player to update state
-}
changeState : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
changeState ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCPlayerModel model ->
                    model

                _ ->
                    nullModel

        omstate =
            omodel.movementState

        opstate =
            omodel.positionState

        omotion =
            omodel.motionState

        kl =
            env.globalData.keyList

        bk =
            omodel.boundKey

        odir =
            omodel.dir

        vel =
            d.velocity

        changeDir : Dir -> Dir
        changeDir dir =
            if Maybe.withDefault False (get bk.right kl) == True then
                Right

            else if Maybe.withDefault False (get bk.left kl) == True then
                Left

            else
                dir

        changeMotion : MotionState -> MotionState
        changeMotion motion =
            case motion of
                InDoubleJump n ->
                    InDoubleJump (n + 1)

                _ ->
                    motion

        ( ( nmstate, npstate, nmotion ), ndir ) =
            case opstate of
                OnGround ->
                    if
                        (omstate == Idle || isWalking omstate || isLandingBuffer omstate)
                            && Maybe.withDefault False (get bk.right kl)
                            == True
                            && Maybe.withDefault False (get bk.left kl)
                            == True
                    then
                        if Maybe.withDefault False (get bk.jump kl) == True || Maybe.withDefault False (get bk.jump2 kl) == True then
                            ( ( JumpingUp 0, InAir, Normal ), odir |> changeDir )

                        else
                            ( ( Idle, OnGround, Normal ), odir )

                    else if
                        (omstate == Idle || isLandingBuffer omstate || (isWalking omstate && omodel.dir == Left))
                            && Maybe.withDefault False (get bk.right kl)
                            == True
                    then
                        if Maybe.withDefault False (get bk.jump kl) == True || Maybe.withDefault False (get bk.jump2 kl) == True then
                            ( ( JumpingUp 0, InAir, Normal ), Right )

                        else
                            ( ( Walking 0, OnGround, Normal ), Right )

                    else if
                        (omstate == Idle || isLandingBuffer omstate || (isWalking omstate && omodel.dir == Right))
                            && Maybe.withDefault False (get bk.left kl)
                            == True
                    then
                        if Maybe.withDefault False (get bk.jump kl) == True || Maybe.withDefault False (get bk.jump2 kl) == True then
                            ( ( JumpingUp 0, InAir, Normal ), Left )

                        else
                            ( ( Walking 0, OnGround, Normal ), Left )

                    else if
                        (omstate == Idle || isWalking omstate || isLandingBuffer omstate)
                            && (Maybe.withDefault False (get bk.jump kl) == True || Maybe.withDefault False (get bk.jump2 kl) == True)
                    then
                        ( ( JumpingUp 0, InAir, Normal ), odir |> changeDir )

                    else if
                        isWalking omstate
                            && (Maybe.withDefault False (get bk.right kl) == True || Maybe.withDefault False (get bk.left kl) == True)
                    then
                        ( ( Walking (getAnimIndex omstate "Walking" + 1), OnGround, Normal ), odir )

                    else if isJumpingDown omstate then
                        ( ( LandingBuffer 0, OnGround, Normal ), odir |> changeDir )

                    else if omstate == LandingBuffer 9 || omstate == LandingBuffer 10 || omstate == LandingBuffer 11 then
                        ( ( Idle, OnGround, Normal ), odir )

                    else if isLandingBuffer omstate then
                        ( ( LandingBuffer (getAnimIndex omstate "LandingBuffer" + 1), OnGround, Normal ), odir |> changeDir )

                    else
                        ( ( Idle, opstate, Normal ), odir )

                InAir ->
                    if omstate == Idle || isWalking omstate then
                        ( ( JumpingTop 0, InAir, omotion ), odir )

                    else if (isInDoubleJump omotion == False) && (Maybe.withDefault False (get bk.jump kl) == True || Maybe.withDefault False (get bk.jump2 kl) == True) then
                        ( ( omstate, opstate, InDoubleJump 0 ), odir |> changeDir )

                    else if (isJumpingTop omstate || isJumpingUp omstate) && Tuple.second vel >= 5 then
                        ( ( JumpingDown 0, InAir, omotion ), odir |> changeDir )

                    else if isJumpingUp omstate && Tuple.second vel > -5 then
                        ( ( JumpingTop 0, InAir, omotion ), odir |> changeDir )

                    else if isJumpingUp omstate then
                        ( ( JumpingUp (getAnimIndex omstate "JumpingUp" + 1), InAir, omotion |> changeMotion ), odir |> changeDir )

                    else if isJumpingTop omstate then
                        ( ( JumpingTop (getAnimIndex omstate "JumpingTop" + 1), InAir, omotion |> changeMotion ), odir |> changeDir )

                    else if isJumpingDown omstate then
                        ( ( JumpingDown (getAnimIndex omstate "JumpingDown" + 1), InAir, omotion |> changeMotion ), odir |> changeDir )

                    else if isLandingBuffer omstate then
                        ( ( LandingBuffer (getAnimIndex omstate "LandingBuffer" + 1), InAir, omotion |> changeMotion ), odir |> changeDir )

                    else
                        ( ( omstate, opstate, omotion ), odir |> changeDir )

        nenv =
            let
                gd =
                    env.globalData
            in
            if nmstate == JumpingUp 0 || nmotion == InDoubleJump 0 then
                { env | globalData = { gd | keyList = env.globalData.keyList |> Array.set bk.jump False |> Array.set bk.jump2 False } }

            else
                env
    in
    ( { d | gcModel = GCPlayerModel { omodel | movementState = nmstate, positionState = npstate, motionState = nmotion, dir = ndir } }, ls, nenv )
