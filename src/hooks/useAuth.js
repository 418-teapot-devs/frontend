import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { login as loginAPI } from "../api/login"

export const AuthContext = createContext()

const INITIAL_USER = {
  token: null,
  profile: {
    username: null,
    email: null,
    avatar: null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", INITIAL_USER)
  const navigate = useNavigate()

  const login = async (username, password) => {
    const [token, profile, error] = await loginAPI(username, password)

    if (token) {
      setUser({ token: token, profile: profile })
      navigate("/", { replace: true })
    }

    return error
  }

  const logout = () => {
    setUser({ token: null, profile: { username: null, email: null, avatar_url: null } })
    navigate("/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // TODO: Read more about useMemo and useCallback
    // eslint-disable-next-line
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
