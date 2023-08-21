module SceneProtos.CoreEngine.GameComponents.Potion.Model exposing
    ( initModel, updateModel, updateModelRec, viewModel
    , displayPotion
    )

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel
@docs displayPotion

-}

import Base exposing (Msg(..))
import Canvas exposing (Renderable, group, shapes)
import Canvas.Settings exposing (fill)
import Color
import Dict exposing (Dict)
import Lib.Component.Base exposing (DefinedTypes(..))
import Lib.Coordinate.Coordinates exposing (judgeMouseRect)
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Text exposing (renderText)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Box, Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), LifeStatus(..), nullBox, nullData)
import SceneProtos.CoreEngine.GameComponents.Potion.Base exposing (Model, nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData id (GCPotionInitData d) ->
            Data id ( 40, 40 ) ( 40, 900 ) ( 0, 0 ) ( 0, 1 ) 1 [ Box ( 0, 5 ) ( 64, 118 ) ] nullBox 0 Alive (GCPotionModel <| Model 100 10) initExtraData

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

        nmsg =
            if gd.mouseDownAct then
                if judgeMouseRect gd.mousePos ( 40 - 20, 900 + 20 ) ( 40, 40 ) then
                    []
                    -- [ ( GCByName "Player", UsePotionMsg 100 15 ) ]

                else
                    []

            else
                []
    in
    ( d, nmsg, env )


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
    [ ( displayPotion env d, 1 ) ]


{-| The display fuction to display potion
-}
displayPotion : EnvC CommonData -> Data -> Renderable
displayPotion env d =
    let
        omodel =
            case d.gcModel of
                GCPotionModel potion ->
                    potion

                _ ->
                    nullModel

        ( posx, posy ) =
            d.position

        ( sizex, sizey ) =
            d.size

        camPos =
            ( toFloat <| posx - round (sizex / 2), toFloat <| posy + round (sizey / 2) )

        camSize =
            ( sizex, sizey )

        potionText =
            String.fromInt <| omodel.price
    in
    group []
        [ shapes [ fill Color.yellow ] [ rect env.globalData camPos camSize ]
        , renderText env.globalData 40 ("Potion Details \n hp:" ++ potionText) "Times New Roman" camPos

        --, renderText env.globalData 40 (Debug.toString env.globalData.mousePos) "Times New Roman" ( toFloat posx, toFloat <| posy + 50 )
        ]
