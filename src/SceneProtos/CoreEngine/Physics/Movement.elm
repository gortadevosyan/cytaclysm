module SceneProtos.CoreEngine.Physics.Movement exposing (updatePos, movePos, updateVelByAcc)

{-|

@docs updatePos, movePos, updateVelByAcc

-}

import SceneProtos.CoreEngine.GameComponent.Base exposing (Data)
import SceneProtos.CoreEngine.GameLayer.Common exposing (EnvC)
import Tuple exposing (first, second)


{-| update the position
-}
updatePos : ( EnvC, Data ) -> ( EnvC, Data )
updatePos ( env, d ) =
    ( env, d ) |> movePos


{-| move to another position
-}
movePos : ( EnvC, Data ) -> ( EnvC, Data )
movePos ( env, d ) =
    ( env, { d | position = ( first d.position + round (first d.velocity), second d.position + round (second d.velocity) ) } )


{-| update the acc value
-}
updateVelByAcc : ( EnvC, Data ) -> ( EnvC, Data )
updateVelByAcc ( env, d ) =
    ( env, { d | velocity = ( first d.velocity + first d.acceleration, second d.velocity + second d.acceleration ) } )
