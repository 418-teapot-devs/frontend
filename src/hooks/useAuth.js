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
    avatar_url: null // Es así?
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", INITIAL_USER)
  const [profile, setProfile] = useLocalStorage("profile", INITIAL_USER.profile)
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

  const updateProfile = async (user) => {
    setProfile({ username: user.username, email: user.email, avatar_url: "http://localhost:8000" + user.avatar_url })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateProfile
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
