import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import  LoginAndRegister  from "./routes/LoginAndRegister"
import { MatchesPage } from "./routes/MatchesPage"
import { Profile } from "./features/user/Profile"
import { UploadBot } from "./features/robots/UploadBot"
import SimulationManager from "./features/simulation/SimulationManager"

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
          element: <MatchesPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/simulation",
          element: <SimulationManager />,
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