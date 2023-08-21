module SceneProtos.CoreEngine.GameComponents.StoryAnimation.Model exposing (initModel, updateModel, updateModelRec, viewModel)

{-|


# Model for this GameComponent

@docs initModel, updateModel, updateModelRec, viewModel

-}

import Array exposing (get)
import Canvas exposing (Renderable, shapes)
import Canvas.Settings exposing (fill)
import Canvas.Settings.Advanced exposing (alpha)
import Color
import Lib.Env.Env exposing (Env, EnvC)
import Lib.Render.Shape exposing (rect)
import Lib.Render.Sprite exposing (renderSprite)
import Lib.Render.Text exposing (renderTextWithColor, renderTextWithColorCenter)
import Lib.Tools.KeyCode exposing (capsLock, enter, key_a, key_d, key_s, key_w, shift)
import SceneProtos.CoreEngine.GameComponent.Base exposing (Data, GCModel(..), GameComponentInitData(..), GameComponentMsg(..), GameComponentTarget(..), nullData)
import SceneProtos.CoreEngine.GameComponents.Enemy.Base exposing (EnemyType(..))
import SceneProtos.CoreEngine.GameComponents.StoryAnimation.Base exposing (nullModel)
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| initModel

Initialize the model. It should update the id.

-}
initModel : Env -> GameComponentInitData -> Data
initModel _ initData =
    case initData of
        GCIdData _ (GCStoryAnimationInitData _) ->
            { nullData | gcModel = GCStoryAnimationModel nullModel }

        _ ->
            nullData


{-| updateModel

Add your component logic here.

-}
updateModel : EnvC CommonData -> Data -> ( Data, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updateModel env d =
    let
        omodel =
            case d.gcModel of
                GCStoryAnimationModel m ->
                    m

                _ ->
                    nullModel

        nmodel =
            { omodel | t = omodel.t + 1 }

        nd =
            { d | gcModel = GCStoryAnimationModel nmodel }
    in
    (if Maybe.withDefault False (get enter env.globalData.keyList) then
        ( nd, [ ( GCParent, GCInitStartMenuMsg ), ( GCParent, SetKeyMsg ( key_d, False ) ), ( GCParent, DestroyTileMap ), ( GCParent, StopShakeCameraMsg ) ], env )

     else if omodel.t == 0 then
        ( nd
        , [ ( GCParent, GCStoryMapMsg )
          , ( GCParent, GCInitPlayerMsg ( 600, 800 ) )
          , ( GCParent, GCShakeCameraMsg 1600 )
          , ( GCParent, SetKeyMsg ( key_d, True ) )
          , ( GCParent, SetKeyMsg ( key_w, False ) )
          , ( GCParent, SetKeyMsg ( key_a, False ) )
          , ( GCParent, SetKeyMsg ( key_s, False ) )
          , ( GCParent, SetKeyMsg ( shift, False ) )
          , ( GCParent, SetKeyMsg ( capsLock, False ) )
          , ( GCParent
            , GCInitEnemyMsg
                [ { pos = ( 200, -300 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 400, -600 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 400, -800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 400, -800 )
                  , typeId = EnemyShot 2
                  }
                , { pos = ( 600, -1000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 800, -1300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 1000, -1700 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 1300, -2000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 1500, -2400 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 1900, -12800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 2300, -13300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 2500, -13800 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 2600, -14500 )
                  , typeId = EnemyDash 0
                  }
                ]
            )
          ]
        , env
        )

     else if omodel.t == 600 then
        ( nd
        , [ ( GCParent, SetKeyMsg ( key_d, True ) )
          , ( GCParent, SetKeyMsg ( key_w, False ) )
          , ( GCParent, SetKeyMsg ( key_a, False ) )
          , ( GCParent, SetKeyMsg ( key_s, False ) )
          , ( GCParent, SetKeyMsg ( shift, False ) )
          , ( GCParent, SetKeyMsg ( capsLock, False ) )
          , ( GCParent
            , GCInitEnemyMsg
                [ { pos = ( 6000 + 200, -300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 6000 + 400, -600 )
                  , typeId = EnemyDash 1
                  }
                , { pos = ( 6000 + 400, -800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 6000 + 400, -800 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 6000 + 600, -1000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 6000 + 800, -1300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 6000 + 1000, -1700 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 6000 + 1300, -2000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 6000 + 1500, -2400 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 6000 + 1900, -12800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 6000 + 2300, -13300 )
                  , typeId = EnemyShot 0
                  }
                ]
            )
          ]
        , env
        )

     else if omodel.t == 1200 then
        ( nd
        , [ ( GCParent, SetKeyMsg ( key_d, True ) )
          , ( GCParent, SetKeyMsg ( key_w, False ) )
          , ( GCParent, SetKeyMsg ( key_a, False ) )
          , ( GCParent, SetKeyMsg ( key_s, False ) )
          , ( GCParent, SetKeyMsg ( shift, False ) )
          , ( GCParent, SetKeyMsg ( capsLock, False ) )
          , ( GCParent
            , GCInitEnemyMsg
                [ { pos = ( 12000 + 200, -300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 12000 + 400, -600 )
                  , typeId = EnemyDash 1
                  }
                , { pos = ( 12000 + 400, -800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 12000 + 400, -800 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 12000 + 600, -1000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 12000 + 800, -1300 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 12000 + 1000, -1700 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 12000 + 1300, -2000 )
                  , typeId = EnemyShot 0
                  }
                , { pos = ( 12000 + 1500, -2400 )
                  , typeId = EnemyShot 1
                  }
                , { pos = ( 12000 + 1900, -12800 )
                  , typeId = EnemyDash 0
                  }
                , { pos = ( 12000 + 2300, -13300 )
                  , typeId = EnemyShot 0
                  }
                ]
            )
          ]
        , env
        )

     else if omodel.t >= 1599 then
        ( nd, [ ( GCParent, GCInitStartMenuMsg ), ( GCParent, SetKeyMsg ( key_d, False ) ), ( GCParent, DestroyTileMap ), ( GCParent, StopShakeCameraMsg ) ], env )

     else
        ( nd
        , [ ( GCParent, SetKeyMsg ( key_d, True ) )
          , ( GCParent, SetKeyMsg ( key_w, False ) )
          , ( GCParent, SetKeyMsg ( key_a, False ) )
          , ( GCParent, SetKeyMsg ( key_s, False ) )
          , ( GCParent, SetKeyMsg ( shift, False ) )
          , ( GCParent, SetKeyMsg ( capsLock, False ) )
          ]
        , env
        )
    )
        |> (\( xx, yy, zz ) -> ( xx, yy, zz |> (\e -> { e | globalData = e.globalData |> (\gdd -> { gdd | mouseDownAct = False }) }) ))


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
        omodel =
            case d.gcModel of
                GCStoryAnimationModel m ->
                    m

                _ ->
                    nullModel
    in
    ( renderSprite env.globalData [] ( 696, 980 ) ( 528, 96 ) "press_enter_to_skip", 4 )
        :: (if omodel.t >= 1500 then
                [ ( shapes [ fill Color.black, alpha <| (toFloat (omodel.t - 1500) / 100) ] [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ], 3 ) ]

            else if omodel.t <= 200 then
                [ ( shapes [ fill Color.black, alpha <| (toFloat (200 - omodel.t) / 200) ] [ rect env.globalData ( 0, 0 ) ( 1920, 1080 ) ], 3 ) ]

            else if omodel.t >= 400 && omodel.t <= 700 then
                [ ( renderTextWithColorCenter env.globalData 65 "Chaos are unleashed with the scientist's invention..." "disposabledroid_bbregular" Color.white ( 960, 300 ), 3 ) ]

            else if omodel.t >= 700 && omodel.t <= 1000 then
                [ ( renderTextWithColorCenter env.globalData 65 "Use your weapon to defeat enemies..." "disposabledroid_bbregular" Color.white ( 960, 300 ), 3 ) ]

            else if omodel.t >= 1000 && omodel.t <= 1500 then
                [ ( renderTextWithColorCenter env.globalData 50 "Can you save humanity without becoming the very forces you set out to defeat?" "disposabledroid_bbregular" Color.white ( 960, 300 ), 3 ) ]

            else
                []
           )
