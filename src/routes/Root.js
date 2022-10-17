import { useAuth } from "../hooks/useAuth"

export const Root = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>PyRobots</h1>
      <p>{user.token}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}