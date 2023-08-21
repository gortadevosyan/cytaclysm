module SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get, set)
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (imageSmoothing)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes)
import Lib.Coordinate.Coordinates exposing (distF, judgeMouseRect)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text exposing (renderTextWithColor)
import Lib.Tools.KeyCode exposing (escape, key_a, key_d, key_e, key_s, key_w)
import SceneProtos.CoreEngine.GameComponent.Base
    exposing
        ( Box
        , Data
        , GCModel(..)
        , GameComponentInitData(..)
        , GameComponentMsg(..)
        , GameComponentTarget(..)
        , LifeStatus(..)
        , nullBox
        , nullData
        )
import SceneProtos.CoreEngine.GameComponents.UpgradeMenu.Base exposing (MovingState(..), nullModel)
import SceneProtos.CoreEngine.GameComponents.Weapon.Base exposing (Upgrade(..))
import SceneProtos.CoreEngine.LayerBase exposing (Buff(..), CommonData)
import String exposing (fromInt)
import Tuple exposing (first, second)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCUpgradeMenuInitData d) ->
            Data id
                ( 0, 0 )
                ( 0, 0 )
                ( 0, 0 )
                ( 0, 1 )
                1
                [ Box ( 0, 0 ) ( 0, 0 ) ]
                nullBox
                0
                Alive
                (GCUpgradeMenuModel
                    { nullModel
                        | hp = d.hp
                        , installedChip = d.installedChip
                        , installingChip = d.installingChip
                    }
                )
                initExtraData

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
    let
        gd =
            env.globalData

        model =
            case d.gcModel of
                GCUpgradeMenuModel pauseMenu ->
                    pauseMenu

                _ ->
                    nullModel

        ( nmsg, nenv ) =
            if gd.mouseDownAct then
                if judgeMouseRect gd.mousePos model.resumePos model.resumeSize then
                    ( [ ( GCParent, ResumeMsg ) ]
                    , env
                        |> (\e ->
                                { e
                                    | globalData =
                                        e.globalData
                                            |> (\gdd -> { gdd | mouseDownAct = False })
                                }
                           )
                    )

                else
                    ( [], env )

            else
                ( [], env )

        ( pmsg, penv ) =
            if Maybe.withDefault False (get escape env.globalData.keyList) then
                ( [ ( GCParent, ResumeMsg ) ]
                , nenv
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd -> { gdd | keyList = env.globalData.keyList |> set escape False })
                            }
                       )
                )

            else
                ( [], nenv )

        ( emsg, eenv ) =
            if Maybe.withDefault False (get key_e env.globalData.keyList) then
                ( [ ( GCParent, ResumeMsg ) ]
                , penv
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd -> { gdd | keyList = env.globalData.keyList |> set key_e False })
                            }
                       )
                )

            else
                ( [], penv )
    in
    ( d, nmsg ++ pmsg ++ emsg, eenv ) |> updateState


updateState :
    ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
    -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateState ( d, omsg, env ) =
    let
        gd =
            env.globalData

        model =
            case d.gcModel of
                GCUpgradeMenuModel pauseMenu ->
                    pauseMenu

                _ ->
                    nullModel

        def =
            Maybe.withDefault ( 0, 0 )

        defc =
            Maybe.withDefault NoUpgrade
    in
    case model.movingState of
        Moving ( ( fr, to ), ( s1, p1x, p1y ), ( s2, p2x, p2y ) ) ->
            let
                frPos =
                    List.head (List.drop (fr - 1) model.chipPos) |> def

                toPos =
                    List.head (List.drop (to - 1) model.chipPos) |> def

                rate =
                    1 / 6
            in
            if distF ( p1x, p1y ) toPos <= 2 then
                ( d
                    |> (\dd ->
                            case dd.gcModel of
                                GCUpgradeMenuModel wmodel ->
                                    { dd
                                        | gcModel =
                                            GCUpgradeMenuModel
                                                { wmodel
                                                    | movingState =
                                                        if to >= 4 then
                                                            Stopped fr

                                                        else
                                                            Stopped to
                                                }
                                    }

                                _ ->
                                    dd
                       )
                    |> (if to >= 4 then
                            \dd ->
                                case dd.gcModel of
                                    GCUpgradeMenuModel wmodel ->
                                        { dd
                                            | gcModel =
                                                GCUpgradeMenuModel
                                                    { wmodel
                                                        | installingChip = List.head (List.drop (to - 4) model.installedChip) |> defc
                                                        , installedChip = List.take (to - 4) model.installedChip ++ [ model.installingChip ] ++ List.drop (to - 3) model.installedChip
                                                    }
                                        }

                                    _ ->
                                        dd

                        else
                            \dd -> dd
                       )
                , omsg
                , env
                )

            else
                ( d
                    |> (\dd ->
                            { dd
                                | gcModel =
                                    GCUpgradeMenuModel
                                        { model
                                            | movingState =
                                                Moving
                                                    ( ( fr, to )
                                                    , ( s1
                                                      , p1x + ((toPos |> Tuple.first) - (frPos |> Tuple.first)) * rate
                                                      , p1y + ((toPos |> Tuple.second) - (frPos |> Tuple.second)) * rate
                                                      )
                                                    , ( s2
                                                      , p2x + ((frPos |> Tuple.first) - (toPos |> Tuple.first)) * rate
                                                      , p2y + ((frPos |> Tuple.second) - (toPos |> Tuple.second)) * rate
                                                      )
                                                    )
                                        }
                            }
                       )
                , omsg
                , env
                )

        Stopped cur ->
            if Maybe.withDefault False (get key_a env.globalData.keyList) then
                ( d
                    |> (\dd ->
                            { dd
                                | gcModel =
                                    GCUpgradeMenuModel
                                        { model
                                            | movingState =
                                                Moving
                                                    ( ( cur, cur + 3 )
                                                    , ( model.installingChip
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> second
                                                      )
                                                    , ( List.head (List.drop (cur - 1) model.installedChip) |> defc
                                                      , List.head (List.drop (cur + 3 - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur + 3 - 1) model.chipPos) |> def |> second
                                                      )
                                                    )
                                        }
                            }
                       )
                , omsg
                , env
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd ->
                                                { gdd
                                                    | keyList =
                                                        env.globalData.keyList
                                                            |> set key_a False
                                                }
                                           )
                            }
                       )
                )

            else if Maybe.withDefault False (get key_d env.globalData.keyList) then
                ( d
                    |> (\dd ->
                            { dd
                                | gcModel =
                                    GCUpgradeMenuModel
                                        { model
                                            | movingState =
                                                Moving
                                                    ( ( cur, cur + 3 )
                                                    , ( model.installingChip
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> second
                                                      )
                                                    , ( List.head (List.drop (cur - 1) model.installedChip) |> defc
                                                      , List.head (List.drop (cur + 3 - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur + 3 - 1) model.chipPos) |> def |> second
                                                      )
                                                    )
                                        }
                            }
                       )
                , omsg
                , env
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd ->
                                                { gdd
                                                    | keyList =
                                                        env.globalData.keyList
                                                            |> set key_d False
                                                }
                                           )
                            }
                       )
                )

            else if Maybe.withDefault False (get key_w env.globalData.keyList) && cur >= 2 then
                ( d
                    |> (\dd ->
                            { dd
                                | gcModel =
                                    GCUpgradeMenuModel
                                        { model
                                            | movingState =
                                                Moving
                                                    ( ( cur, cur - 1 )
                                                    , ( model.installingChip
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> second
                                                      )
                                                    , ( NoUpgrade
                                                      , List.head (List.drop (cur - 1 - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur - 1 - 1) model.chipPos) |> def |> second
                                                      )
                                                    )
                                        }
                            }
                       )
                , omsg
                , env
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd ->
                                                { gdd
                                                    | keyList =
                                                        env.globalData.keyList
                                                            |> set key_w False
                                                }
                                           )
                            }
                       )
                )

            else if Maybe.withDefault False (get key_s env.globalData.keyList) && cur <= 2 then
                ( d
                    |> (\dd ->
                            { dd
                                | gcModel =
                                    GCUpgradeMenuModel
                                        { model
                                            | movingState =
                                                Moving
                                                    ( ( cur, cur + 1 )
                                                    , ( model.installingChip
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur - 1) model.chipPos) |> def |> second
                                                      )
                                                    , ( NoUpgrade
                                                      , List.head (List.drop (cur + 1 - 1) model.chipPos) |> def |> first
                                                      , List.head (List.drop (cur + 1 - 1) model.chipPos) |> def |> second
                                                      )
                                                    )
                                        }
                            }
                       )
                , omsg
                , env
                    |> (\e ->
                            { e
                                | globalData =
                                    e.globalData
                                        |> (\gdd ->
                                                { gdd
                                                    | keyList =
                                                        env.globalData.keyList
                                                            |> set key_s False
                                                }
                                           )
                            }
                       )
                )

            else
                ( d, omsg, env )


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
    [ ( displayUpgradeMenu env d, 100 ) ]


displayUpgradeMenu : EnvC CommonData -> Data -> Renderable
displayUpgradeMenu env d =
    let
        model =
            case d.gcModel of
                GCUpgradeMenuModel wmodel ->
                    wmodel

                _ ->
                    nullModel
    in
    group [ imageSmoothing False ]
        (renderSprite env.globalData [] model.bgPos model.bgSize "upgrade_menu"
            :: renderInstalled env d
            ++ renderInstalling env d
            -- ++ [ renderTextWithColor env.globalData 24 (Debug.toString model.movingState) "Arial" Color.white ( 1000, 1000 ) ]
            ++ renderPotion env d
        )


renderPotion : EnvC CommonData -> Data -> List Renderable
renderPotion env d =
    let
        model =
            case d.gcModel of
                GCUpgradeMenuModel wmodel ->
                    wmodel

                _ ->
                    nullModel

        spdP =
            env.commonData.buff
                |> List.foldl
                    (\b res ->
                        case b of
                            SpeedUp s ->
                                max res s

                            _ ->
                                res
                    )
                    -1

        spdID =
            if spdP > 0 then
                "speed_potion"

            else
                "speed_potion_none"

        spdTxt =
            if spdP > 0 then
                fromInt (spdP // 60) ++ " seconds"

            else
                "NONE"

        atkP =
            env.commonData.buff
                |> List.foldl
                    (\b res ->
                        case b of
                            IncreaseDamage s ->
                                max res s

                            _ ->
                                res
                    )
                    -1

        atkID =
            if atkP > 0 then
                "atk_potion"

            else
                "atk_potion_none"

        atkTxt =
            if atkP > 0 then
                fromInt (atkP // 60) ++ " seconds"

            else
                "NONE"
    in
    [ renderSprite env.globalData [] model.speedBuffPos model.buffSize spdID
    , renderTextWithColor env.globalData 32 "Speed Potion" "disposabledroid_bbregular" Color.white model.speedBuffTextPos
    , renderTextWithColor env.globalData 32 spdTxt "disposabledroid_bbregular" Color.white ( first model.speedBuffTextPos + 30, second model.speedBuffTextPos + 50 )
    , renderSprite env.globalData [] model.atkBuffPos model.buffSize atkID
    , renderTextWithColor env.globalData 32 "Damege Potion" "disposabledroid_bbregular" Color.white model.atkBuffTextPos
    , renderTextWithColor env.globalData 32 atkTxt "disposabledroid_bbregular" Color.white ( first model.atkBuffTextPos + 30, second model.atkBuffTextPos + 50 )
    , renderTextWithColor env.globalData 32 " Fire More" "disposabledroid_bbregular" Color.white ( 453, 370 )
    , renderTextWithColor env.globalData 32 " Rounds" "disposabledroid_bbregular" Color.white ( 453, 410 )
    , renderTextWithColor env.globalData 32 " Scattered" "disposabledroid_bbregular" Color.white ( 453, 475 )
    , renderTextWithColor env.globalData 32 " Bullets" "disposabledroid_bbregular" Color.white ( 453, 515 )
    , renderTextWithColor env.globalData 32 " Explosive" "disposabledroid_bbregular" Color.white ( 453, 580 )
    , renderTextWithColor env.globalData 32 " Bullets" "disposabledroid_bbregular" Color.white ( 453, 620 )
    , renderSprite env.globalData [] ( 400, 380 ) ( 50, 50 ) "chip_doubletrigger"
    , renderSprite env.globalData [] ( 400, 485 ) ( 50, 50 ) "chip_scatter"
    , renderSprite env.globalData [] ( 400, 590 ) ( 50, 50 ) "chip_splash"
    ]


renderInstalled : EnvC CommonData -> Data -> List Renderable
renderInstalled env d =
    let
        model =
            case d.gcModel of
                GCUpgradeMenuModel wmodel ->
                    wmodel

                _ ->
                    nullModel

        def =
            Maybe.withDefault ( 0, 0 )

        als =
            List.map2 (\pos upg -> renderSprite env.globalData [] pos model.chipSize (upgSprite upg)) (List.drop 3 model.chipPos) model.installedChip

        withOut : Int -> List a -> List a
        withOut n ls =
            List.take (n - 1) ls ++ List.drop n ls
    in
    case model.movingState of
        Stopped _ ->
            als

        Moving ( ( fr, to ), _, _ ) ->
            als |> withOut (to - 3)


renderInstalling : EnvC CommonData -> Data -> List Renderable
renderInstalling env d =
    let
        model =
            case d.gcModel of
                GCUpgradeMenuModel wmodel ->
                    wmodel

                _ ->
                    nullModel

        def =
            Maybe.withDefault ( 0, 0 )
    in
    case model.movingState of
        Stopped t ->
            if model.installingChip /= NoUpgrade then
                [ renderSprite env.globalData [] (List.head (List.drop (t - 1) model.chipPos) |> def) model.chipSize (upgSprite model.installingChip) ]

            else
                []

        Moving ( ( fr, to ), ( s1, p1x, p1y ), ( s2, p2x, p2y ) ) ->
            (if s1 /= NoUpgrade then
                [ renderSprite env.globalData [] ( p1x, p1y ) model.chipSize (upgSprite s1) ]

             else
                []
            )
                ++ (if to >= 4 then
                        [ renderSprite env.globalData [] ( p2x, p2y ) model.chipSize (upgSprite s2)
                        ]

                    else
                        []
                   )


upgSprite : Upgrade -> String
upgSprite upg =
    case upg of
        DoubleTrigger ->
            "chip_doubletrigger"

        Scatter ->
            "chip_scatter"

        Splash ->
            "chip_splash"

        _ ->
            "chip_empty"
