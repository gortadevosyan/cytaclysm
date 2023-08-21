module SceneProtos.CoreEngine.GameComponents.Ender.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (alpha)
import Color
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Text exposing (renderTextWithColor)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), nullData)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel env initData =
    case initData of
        GCIdData _ (GCEnderInitData p) ->
            { nullData | gcModel = GCEnderModel { tp = p.tp, stTime = env.t } }

        _ ->
            nullData


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        tt =
            case d.gcModel of
                GCEnderModel mo ->
                    mo.stTime

                _ ->
                    0
    in
    if env.t < tt + 1500 then
        ( d, [], env )

    else
        ( d, [ ( GCParent, QuitMsg ) ], env )


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
    let
        tt =
            case d.gcModel of
                GCEnderModel mo ->
                    mo.stTime

                _ ->
                    0

        tp =
            case d.gcModel of
                GCEnderModel mo ->
                    mo.tp

                _ ->
                    0

        nt =
            if env.t - tt <= 1200 then
                env.t - tt

            else
                1500 - (env.t - tt)
    in
    if tp == 0 then
        [ ( group [ alpha (toFloat nt / 300 |> max 0 |> min 1) ]
                (shapes [ fill Color.black ] [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ]
                    :: (case d.gcModel of
                            GCEnderModel em ->
                                if em.tp == 0 then
                                    group []
                                        [ renderTextWithColor env.globalData 48 "It's ... dark." "disposabledroid_bbregular" Color.white ( 400, 200 )
                                        , renderTextWithColor env.globalData 48 "It's getting darker." "disposabledroid_bbregular" Color.white ( 400, 270 )
                                        , renderTextWithColor env.globalData 48 "Until death came, he was still brandishing his weapon." "disposabledroid_bbregular" Color.white ( 400, 340 )
                                        , renderTextWithColor env.globalData 48 "" "disposabledroid_bbregular" Color.white ( 400, 410 )
                                        , renderTextWithColor env.globalData 48 "Cast a cold eye" "disposabledroid_bbregular" Color.white ( 400, 480 )
                                        , renderTextWithColor env.globalData 48 "On life, on death" "disposabledroid_bbregular" Color.white ( 400, 550 )
                                        , renderTextWithColor env.globalData 48 "Horseman, pass by." "disposabledroid_bbregular" Color.white ( 400, 620 )
                                        ]

                                else
                                    group [] []

                            _ ->
                                group [] []
                       )
                    :: []
                )
          , 10000
          )
        ]

    else
        [ ( group [ alpha (toFloat nt / 300 |> max 0 |> min 1) ]
                (shapes [ fill Color.black ] [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ]
                    :: (case d.gcModel of
                            GCEnderModel em ->
                                if em.tp == 1 then
                                    group []
                                        [ renderTextWithColor env.globalData 48 "Daybreak." "disposabledroid_bbregular" Color.white ( 400, 200 )
                                        , renderTextWithColor env.globalData 48 "He has the sword, he has the gun" "disposabledroid_bbregular" Color.white ( 400, 270 )
                                        , renderTextWithColor env.globalData 48 "Reaching his scatter, for which he plugs chips" "disposabledroid_bbregular" Color.white ( 400, 340 )
                                        , renderTextWithColor env.globalData 48 "At fast pace, with great power" "disposabledroid_bbregular" Color.white ( 400, 410 )
                                        , renderTextWithColor env.globalData 48 "He drew a circle in vain." "disposabledroid_bbregular" Color.white ( 400, 480 )
                                        , renderTextWithColor env.globalData 48 "\"Something... for nothing.\"" "disposabledroid_bbregular" Color.white ( 400, 550 )
                                        , renderTextWithColor env.globalData 72 "HUMAN. TREMBLE FOR ME." "disposabledroid_bbregular" Color.white ( 400, 620 )
                                        ]

                                else
                                    group [] []

                            _ ->
                                group [] []
                       )
                    :: []
                )
          , 10000
          )
        ]
