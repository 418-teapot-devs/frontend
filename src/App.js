import React from "react"
import { useRoutes } from "react-router-dom"
import { Login } from "./features/user/Login"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { CreateMatch } from "./features/matches/CreateMatch"
import { AvailableRobots } from "../src/features/matches/api/creatematch"

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
          element: <h1>Robots</h1>,
        },
        {
          path: "/matches",
          element: <h1>Mis Partidas</h1>,
        },
        {
          path: "/profile",
          element: <h1>Perfil</h1>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/creatematch",
      element: <CreateMatch userRobots={AvailableRobots()} />,
    },
  ])

  return routes
}

export default App
