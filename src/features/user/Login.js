import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { LoginForm } from "./LoginForm"

export const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values) => {
    setLoading(true)

    const loginError = await login(values.username, values.password)

    setError(loginError)
    setLoading(false)
  }

  return <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
}
