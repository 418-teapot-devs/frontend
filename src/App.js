import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import  LoginAndRegister  from "./routes/LoginAndRegister"
import { Matches } from "./routes/Matches"
import { CreateMatch } from "./features/matches/CreateMatch"
import { Profile } from "./features/user/Profile"
import { UploadBot } from "./features/robots/UploadBot"
import Board  from "./features/simulation/Board"

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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/simulation",
          element: <Board robots={[]}/>,
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
