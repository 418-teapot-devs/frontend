import React from "react"
import { useRoutes } from "react-router-dom"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import LoginPage from "./routes/LoginPage"
import RegisterPage from "./routes/RegisterPage"
import { Profile } from "./features/user/Profile"
import { Box } from "@mui/material"
import { UploadBot } from "./features/robots/UploadBot"
import { RobotsList } from "./features/robots/RobotsList"

import { CreateMatch } from "./features/matches/create/CreateMatch"
import { PublicMatchesPage } from "./routes/PublicMatchesPage"
import { StartedMatchesPage } from "./routes/StartedMatchesPage"
import { MyMatchesPage } from "./routes/MyMatchesPage"
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
          element: <PublicMatchesPage />,
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
          element: <MyMatchesPage />,
        },
        {
          path: "/matches/create",
          element: <CreateMatch />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/simulation",
          element: <SimulationManager />,
        },
        // {
        //   path: "/matches/public",
        //   element: <PublicMatchesPage />,
        // },
        {
          path: "/matches/started",
          element: <StartedMatchesPage />,
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
    <Box sx={(theme) => ({backgroundColor: theme.palette.surface[0], minHeight: "100vh"})}>
      {routes}
    </Box>
  )
}

export default App
