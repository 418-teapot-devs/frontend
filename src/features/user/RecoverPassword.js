import { useSearchParams } from "react-router-dom"

import RecoverPasswordForm from "./RecoverPasswordForm"
import ResetPasswordForm from "./ResetPasswordForm"

const RecoverPassword = () => {
  const [searchParams] = useSearchParams()

  return searchParams.get("token") ? (
    <ResetPasswordForm resetToken={searchParams.get("token")} />
  ) : (
    <RecoverPasswordForm />
  )
}

export default RecoverPassword
