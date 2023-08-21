module Lib.Tools.Queue exposing
    ( empty, isEmpty, push, front, pop, append, gbfs, gbfsr
    , Queue
    )

{-| Easy realization of Queue

@docs empty, isEmpty, push, front, pop, append, gbfs, gbfsr
@docs Queue

-}


{-| Easy realization of Queue
-}
type alias Queue a =
    List a


{-| Easy realization of Queue, create an empty
-}
empty : Queue a
empty =
    []


{-| Easy realization of Queue, judge a queue is empty
-}
isEmpty : Queue a -> Bool
isEmpty =
    List.isEmpty


{-| Easy realization of Queue, push an element
-}
push : a -> Queue a -> Queue a
push =
    List.append << List.singleton


{-| Easy realization of Queue, get a front element
-}
front : Queue a -> Maybe a
front =
    List.head


{-| Easy realization of Queue, pop an element
-}
pop : Queue a -> Queue a
pop =
    List.drop 1


{-| Easy realization of Queue, append a queue
-}
append : Queue a -> Queue a -> Queue a
append =
    List.append


{-| A general breadth\_first\_search. Take initial state (starting point) and a function that return new states of queue.
-}
gbfs : Queue a -> (a -> Queue a) -> Queue a
gbfs q f =
    case front q of
        Nothing ->
            q

        Just x ->
            q |> pop |> append (f x)


{-| A general breadth\_first\_search with maxdep and recording. Take max depth, initial state (starting point), a function that return new states of queue,and a function that generate record.
-}
gbfsr : Int -> a -> (a -> Queue a) -> (a -> a -> b) -> Queue b
gbfsr maxDep init step log =
    let
        ( _, res ) =
            gbfsr_helper maxDep ( [ init ], empty ) step log
    in
    res


{-| Easy realization of Queue
-}
gbfsr_helper : Int -> ( Queue a, Queue b ) -> (a -> Queue a) -> (a -> a -> b) -> ( Queue a, Queue b )
gbfsr_helper dep ( q, rec ) f g =
    if dep <= 0 then
        ( q, rec )

    else
        case front q of
            Nothing ->
                ( q, rec )

            Just x ->
                gbfsr_helper (dep - 1) ( q |> pop |> append (f x), rec |> append (f x |> List.map (g x)) ) f g
