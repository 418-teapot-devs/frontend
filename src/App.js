import React from "react"
import { useRoutes } from "react-router-dom"
import { Login } from "./features/user/Login"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { CreateMatch } from "./features/matches/CreateMatch"

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/creatematch",
      element: <CreateMatch userRobots={[{name: "Robot1"}]}/>,
    },
  ])

  return routes
}

export default App
