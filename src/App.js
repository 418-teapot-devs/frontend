import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import  LoginAndRegister  from "./routes/LoginAndRegister"
import { MyMatchesPage } from "./routes/MyMatchesPage"
import { Profile } from "./features/user/Profile"
import { UploadBot } from "./features/robots/UploadBot"

import { CreateMatch } from "./features/matches/create/CreateMatch" 
import { PublicMatchesPage } from "./routes/PublicMatchesPage"
import { StartedMatchesPage } from "./routes/StartedMatchesPage"
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
          element: <MyMatchesPage />,
        },
        {
          path: "/matches/create",
          element: <CreateMatch />
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/simulation",
          element: <SimulationManager />,
        },
        {
          path: "/matches/public",
          element: <PublicMatchesPage />,
        },
        {
          path: "/matches/started",
          element: <StartedMatchesPage />,
        }
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