import { createContext, useCallback, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { login as loginAPI } from "../api/login"

const AuthContext = createContext()

const INITIAL_USER = {
  token: null,
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", INITIAL_USER)
  const navigate = useNavigate()

  const login = async (username, password) => {
    const [token, error] = await loginAPI(username, password)

    if (token) {
      setUser({ token: token })
      navigate("/", { replace: true })
    }

    return error
  }

  const logout = useCallback(() => {
    setUser({ token: null })
    navigate("/login", { replace: true })
  }, [setUser, navigate])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}