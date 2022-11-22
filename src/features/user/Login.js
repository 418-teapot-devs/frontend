import { Box } from "@mui/system"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { AlertMessage } from "../../utils/AlertMessage"
import { LoginForm } from "./LoginForm"

const VerificationInfo = ({ is_verified }) => {
  if (is_verified) {
    return (
      <AlertMessage
        severity="success"
        message="Se verificó el usuario con éxito"
      />
    )
  } else {
    return (
      <AlertMessage
        severity="error"
        message="La verificación no se realizó correctamente"
      />
    )
  }
}

export const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const params = new URLSearchParams(document.location.search)
  const is_verified = params.get("verify_success")

  const onSubmit = async (values) => {
    setLoading(true)

    const loginError = await login(values.username, values.password)

    setError(loginError)
    setLoading(false)
  }

  return (
    <Box>
      <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
      {Boolean(is_verified) && (
        <VerificationInfo is_verified={is_verified === "True"} />
      )}
    </Box>
  )
}
