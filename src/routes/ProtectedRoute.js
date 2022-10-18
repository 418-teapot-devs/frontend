import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  return user.token ? children : <Navigate to="/login" />
}
