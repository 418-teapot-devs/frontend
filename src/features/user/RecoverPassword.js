import { useSearchParams } from "react-router-dom"

import RecoverPasswordForm from "./RecoverPasswordForm"
import ResetPasswordForm from "./ResetPasswordForm"

const RecoverPassword = () => {
  const [searchParams, _] = useSearchParams()

  return searchParams.get("token") ? (
    <ResetPasswordForm />
  ) : (
    <RecoverPasswordForm />
  )
}

export default RecoverPassword
