import React from "react"
import { useRoutes } from "react-router-dom"
import { Login } from "./features/user/Login"
import { Root } from "./routes/Root"
import { ProtectedRoute } from "./routes/ProtectedRoute"

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
  ])

  return routes
}

export default App
