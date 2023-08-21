module SceneProtos.CoreEngine.GameComponents.Chip.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array2D
import Base exposing (Msg(..))
import Canvas exposing (Renderable, group)
import Canvas.Settings.Advanced exposing (alpha, imageSmoothing)
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Sprite exposing (renderSprite, renderSpriteWithRev)
import Lib.Tools.RNG exposing (genRandomInt)
import MainConfig exposing (gravity, tileSize)
import SceneProtos.CoreEngine.Camera.Camera exposing (posInCam, sizeInCam)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg, GameComponentTarget, LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Chip.Base exposing (ChipType(..), nullModel)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)
import SceneProtos.CoreEngine.Physics.Collision as Collision
import SceneProtos.CoreEngine.Physics.Movement exposing (updateVelByAcc)
import Tuple exposing (first, mapBoth, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel env initData =
    case initData of
        GCIdData id (GCChipInitData chipI) ->
            let
                mass =
                    1
            in
            case chipI.tp of
                Coin _ ->
                    Data id
                        ( 25, 25 )
                        chipI.position
                        (calRandomV (env.t + 1926 - id) 1)
                        ( 0, gravity )
                        mass
                        [ nullBox ]
                        -- []
                        (Box ( 0, 0 ) ( 30, 30 ))
                        0
                        Alive
                        (GCChipModel { nullModel | tp = chipI.tp })
                        initExtraData

                _ ->
                    Data id
                        ( 50, 50 )
                        chipI.position
                        (calRandomV (env.t + 1926 - id) 1.8)
                        ( 0, gravity )
                        mass
                        [ nullBox ]
                        -- []
                        (Box ( 0, 0 ) ( 60, 60 ))
                        0
                        Alive
                        (GCChipModel { nullModel | tp = chipI.tp })
                        initExtraData

        _ ->
            nullData


calRandomV : Int -> Float -> ( Float, Float )
calRandomV seed div =
    let
        theta =
            genRandomInt seed ( 270 - 45, 270 + 45 ) |> toFloat |> degrees

        v =
            (genRandomInt (seed * 2) ( 12, 25 ) |> toFloat) / div
    in
    ( v * cos theta, v * sin theta )


initExtraData : Dict String DefinedTypes
initExtraData =
    Dict.fromList
        []


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    case env.msg of
        Tick _ ->
            if d.lifeStatus == Alive then
                let
                    ( nd, nl, nenv ) =
                        ( d, [], env )
                            |> updateVel

                    ( nenv2, nd2 ) =
                        ( nenv, nd )
                            |> Collision.simpleHandleGonnaCollideXY
                in
                ( nd2, nl, nenv2 )

            else
                let
                    ( nd, nl, nenv ) =
                        ( d, [], env )
                            |> updateDeadVel
                in
                ( nd, nl, nenv )

        _ ->
            ( d, [], env )


updateVel : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateVel ( d, ls, env ) =
    let
        tileMap =
            env.commonData.tileMap

        omodel =
            case d.gcModel of
                GCChipModel model ->
                    model

                _ ->
                    nullModel

        ovel =
            d.velocity

        ( eposx, eposy ) =
            d.position |> Tuple.mapBoth toFloat toFloat

        ( nposx, nposy ) =
            ( first d.position // tileSize, second d.position // tileSize + 1 )

        isOnGround =
            (Array2D.get nposx nposy tileMap |> Maybe.withDefault 1 |> (\t -> modBy 2 t == 1))
                && (-0.02 < second ovel && second ovel < 1)

        nvel =
            if isOnGround then
                ( 0, 0 )

            else
                ovel

        ( newenv, newdata ) =
            ( env, { d | velocity = nvel } ) |> updateVelByAcc
    in
    ( newdata, ls, newenv )


updateDeadVel : ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData ) -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateDeadVel ( d, ls, env ) =
    let
        omodel =
            case d.gcModel of
                GCChipModel model ->
                    model

                _ ->
                    nullModel

        ov =
            sqrt (first d.velocity * first d.velocity + second d.velocity * second d.velocity)

        nv =
            if ov < 12 then
                ov + 1

            else
                ov

        tarp =
            omodel.targetPos

        curp =
            d.position |> mapBoth toFloat toFloat

        vecL =
            sqrt ((first tarp - first curp) * (first tarp - first curp) + (second tarp - second curp) * (second tarp - second curp))

        nvel =
            ( (first tarp - first curp) / vecL * nv, (second tarp - second curp) / vecL * nv )

        ( newenv, newdata ) =
            ( env, { d | velocity = nvel, position = ( first d.position + round (first nvel), second d.position + round (second nvel) ) } )
    in
    ( newdata, ls, newenv )


{-| updateModelRec

Add your component logic here.

-}
updateModelRec : EnvC CommonData -> GameComponentMsg -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModelRec env _ d =
    ( d, [], env )


{-| viewModel

Change this to your own component view function.

-}
viewModel : EnvC CommonData -> Data -> List ( Renderable, Int )
viewModel env d =
    [ ( displayChip env d, 1 ) ]


displayChip : EnvC CommonData -> Data -> Renderable
displayChip env d =
    let
        ( x_, y_ ) =
            posInCam env d.position

        ( w, h ) =
            sizeInCam env d.size

        x =
            x_ - w / 2

        y =
            y_ - h / 2

        omodel =
            case d.gcModel of
                GCChipModel model ->
                    model

                _ ->
                    nullModel

        id =
            case omodel.tp of
                Chip DoubleTrigger ->
                    "chip_doubletrigger"

                Chip Scatter ->
                    "chip_scatter"

                Chip Splash ->
                    "chip_splash"

                Chip NoUpgrade ->
                    "chip_empty"

                Coin n ->
                    if n >= 5 then
                        case modBy 5 (env.t // 3) of
                            0 ->
                                "coin_gold_1"

                            1 ->
                                "coin_gold_2"

                            2 ->
                                "coin_gold_3"

                            3 ->
                                "coin_gold_4"

                            _ ->
                                "coin_gold_5"

                    else
                        case modBy 5 (env.t // 3) of
                            0 ->
                                "coin_silver_1"

                            1 ->
                                "coin_silver_2"

                            2 ->
                                "coin_silver_3"

                            3 ->
                                "coin_silver_4"

                            _ ->
                                "coin_silver_5"

        alphaVal =
            case d.lifeStatus of
                Alive ->
                    1.0

                Dead dt ->
                    max 0 (1.0 - toFloat dt / 5)
    in
    group [ imageSmoothing False, alpha alphaVal ]
        (renderSprite
            env.globalData
            []
            ( x, y )
            ( w, h )
            id
            :: []
        )
