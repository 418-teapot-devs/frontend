import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import  LoginPage  from "./routes/LoginPage"
import  RegisterPage  from "./routes/RegisterPage"
import { Profile } from "./features/user/Profile"

import { UploadBot } from "./features/robots/UploadBot"
import LobbyContainer from "./features/matches/lobby/LobbyContainer"
import { RobotsList } from "./features/robots/RobotsList"

import { CreateMatch } from "./features/matches/create/CreateMatch" 
import { StartedMatchesPage } from "./routes/StartedMatchesPage"
import { MatchesPage } from "./routes/MatchesPage"

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
          path: "/robots",
          element: <RobotsList />,
        },
        {
          path: "/uploadbot",
          element: <UploadBot />,
        },
        {
          path: "/matches",
          element: <MatchesPage />,
        },
        {
          path: "/matches/create",
          element: <CreateMatch />
        },
        {
          path: "/matches/:matchId",
          element: <LobbyContainer />,
        },
        {
          path: "/matches/:matchId",
          element: <LobbyContainer />,
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
          path: "/matches/started",
          element: <StartedMatchesPage />,
        }
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ])

  return routes
}

export default App