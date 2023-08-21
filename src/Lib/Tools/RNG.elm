module Lib.Tools.RNG exposing
    ( genRandomInt, genRandomListInt
    , genRandomIntSeed, genRandomIntWithSeed, seed
    )

{-|


# RNG module

Sample RNG module.

You can add your own RNG generators here.

The seed is often given by the current tick.

@docs genRandomInt, genRandomListInt
@docs genRandomIntSeed, genRandomIntWithSeed, seed

-}

import Random


{-| Generate a random int in the range [a, b] using the given seed.
-}
genRandomInt : Int -> ( Int, Int ) -> Int
genRandomInt t ( a, b ) =
    Tuple.first (Random.step (genInt ( a, b )) (seed t))


{-| Generate a random seed.
-}
genRandomIntSeed : Int -> ( Int, Int ) -> ( Int, Random.Seed )
genRandomIntSeed t ( a, b ) =
    Random.step (genInt ( a, b )) (seed t)


{-| Generate a random int in with seed.
-}
genRandomIntWithSeed : Random.Seed -> ( Int, Int ) -> ( Int, Random.Seed )
genRandomIntWithSeed t ( a, b ) =
    Random.step (genInt ( a, b )) t


genInt : ( Int, Int ) -> Random.Generator Int
genInt ( a, b ) =
    Random.int a b


{-| Generate a random list of ints in the range [a, b] using the given seed.
-}
genRandomListInt : Int -> Int -> ( Int, Int ) -> List Int
genRandomListInt t n ( a, b ) =
    Tuple.first (Random.step (genListInt ( a, b ) n) (seed t))


genListInt : ( Int, Int ) -> Int -> Random.Generator (List Int)
genListInt ( a, b ) n =
    Random.list n (genInt ( a, b ))


{-| Generate a init seed.
-}
seed : Int -> Random.Seed
seed t =
    Random.initialSeed t
