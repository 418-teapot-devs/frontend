import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import LoginPage from "./routes/LoginPage"
import RegisterPage from "./routes/RegisterPage"
import { Profile } from "./features/user/Profile"
import { Box } from "@mui/material"

import { UploadBot } from "./features/robots/UploadBot"
import LobbyContainer from "./features/matches/lobby/LobbyContainer"
import { RobotsList } from "./features/robots/RobotsList"

import { CreateMatch } from "./features/matches/create/CreateMatch"
import { MatchesPage } from "./routes/MatchesPage"

import SimulationManager from "./features/simulation/SimulationManager"
import { StartedMatchesPage } from "./routes/StartedMatchesPage"

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
          element: <MatchesPage />,
        },
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
          element: <CreateMatch />,
        },
        {
          path: "/matches/history",
          element: <StartedMatchesPage />,
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

  return (
    <Box sx={(theme) => ({backgroundColor: theme.palette.background.main, minHeight: "100vh"})}>
      {routes}
    </Box>
  )
}

export default App
