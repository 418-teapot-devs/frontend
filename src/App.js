import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import  LoginAndRegister  from "./routes/LoginAndRegister"
import { Matches } from "./routes/Matches"
import { Profile } from "./features/user/Profile"
import { UploadBot } from "./features/robots/UploadBot"
import BoardManager from "./features/simulation/BoardManager"
import { Lobby } from "./features/matches/Lobby"

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <h1>Home</h1>,
        },
        {
          path: "/robots",
          element: <UploadBot />,
        },
        {
          path: "/matches",
          element: <Matches />,
        },
        {
          path: "/lobby",
          element: <Lobby />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/simulation",
          element: <BoardManager />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginAndRegister />,
    },
  ])

  return routes
}

export default App