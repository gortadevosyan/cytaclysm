module SceneProtos.CoreEngine.GameComponent.Handler exposing
    ( update, updaterec, match, super, recBody
    , updateGC, viewGC
    , getGCById, getGCByName, getGCPos
    )

{-| Handler to update game components

@docs update, updaterec, match, super, recBody
@docs updateGC, viewGC
@docs getGCById, getGCByName, getGCPos

-}

import Canvas exposing (Renderable, group)
import Lib.Env.Env exposing (EnvC, cleanEnvC)
import List.Extra exposing (findMap)
import Messenger.GeneralModel exposing (viewModelList)
import Messenger.Recursion exposing (RecBody)
import Messenger.RecursionList exposing (updateObjects)
import SceneProtos.CoreEngine.GameComponent.Base exposing (GameComponent, GameComponentMsg(..), GameComponentTarget(..))
import SceneProtos.CoreEngine.LayerBase exposing (CommonData)


{-| RecUpdater
-}
updaterec : GameComponent -> EnvC CommonData -> GameComponentMsg -> ( GameComponent, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
updaterec gc env msg =
    let
        ( newGC, newMsg, newEnv ) =
            gc.updaterec env msg gc.data
    in
    ( { gc | data = newGC }, newMsg, newEnv )


{-| Updater
-}
update : GameComponent -> EnvC CommonData -> ( GameComponent, List ( GameComponentTarget, GameComponentMsg ), EnvC CommonData )
update gc env =
    let
        ( newGC, newMsg, newEnv ) =
            gc.update env gc.data
    in
    ( { gc | data = newGC }, newMsg, newEnv )


{-| Matcher
-}
match : GameComponent -> GameComponentTarget -> Bool
match gc tar =
    case tar of
        GCParent ->
            False

        GCById x ->
            x == gc.data.uid

        GCByName x ->
            x == gc.name


{-| Super
-}
super : GameComponentTarget -> Bool
super tar =
    case tar of
        GCParent ->
            True

        _ ->
            False


{-| Rec body for the component
-}
recBody : RecBody GameComponent GameComponentMsg (EnvC CommonData) GameComponentTarget
recBody =
    { update = update
    , updaterec = updaterec
    , match = match
    , super = super
    , clean = cleanEnvC
    }


{-| Update all the components in an array and recursively update the components which have messenges sent.

Return a list of messages sent to the parentlayer.

-}
updateGC : EnvC CommonData -> List GameComponent -> ( List GameComponent, List GameComponentMsg, EnvC CommonData )
updateGC env xs =
    let
        ( newGC, newMsg, newEnv ) =
            updateObjects recBody env xs
    in
    ( newGC, newMsg, newEnv )


{-| Generate the view of the components
-}
viewGC : EnvC CommonData -> List GameComponent -> Renderable
viewGC env xs =
    group [] <|
        List.map (\( a, _ ) -> a) <|
            List.sortBy (\( _, a ) -> a) <|
                List.concat <|
                    viewModelList env xs


{-| get a gc by id
-}
getGCById : ( List GameComponent, Int ) -> Maybe GameComponent
getGCById ( ls, id ) =
    findMap
        (\gc ->
            if gc.data.uid == id then
                Just gc

            else
                Nothing
        )
        ls


{-| get a gc by name
-}
getGCByName : ( List GameComponent, String ) -> Maybe GameComponent
getGCByName ( ls, str ) =
    findMap
        (\gc ->
            if gc.name == str then
                Just gc

            else
                Nothing
        )
        ls


{-| get a gc pos
-}
getGCPos : Maybe GameComponent -> ( Int, Int )
getGCPos gc =
    case gc of
        Just g ->
            g.data.position

        Nothing ->
            ( 0, 0 )
