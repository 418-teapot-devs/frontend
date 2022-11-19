import { useSearchParams } from "react-router-dom"

import RecoverPasswordEmailForm from "./RecoverPasswordEmailForm"
import RecoverPasswordForm from "./RecoverPasswordForm"

const RecoverPassword = () => {
  const [searchParams, _] = useSearchParams()

  return searchParams.get("token") ? (
    <RecoverPasswordForm />
  ) : (
    <RecoverPasswordEmailForm />
  )
}

export default RecoverPassword
