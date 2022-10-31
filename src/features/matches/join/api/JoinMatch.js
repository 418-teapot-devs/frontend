
import { response } from "msw"
import { Navigate } from "react-router-dom"

// This functions are called in Public Matches 

export const joinmatch_request = async (values, match, token) => {
  return (fetch(`http://127.0.0.1:8000/matches/${match.id}/join/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      robot_id: values.robot_id,
      password: values.password,
    }),
  })
)}


// When submiting form, send post request to backend and redirect
export const JoinMatch = async (values, match, token, setLoading, setError) => {
  setLoading(true)
  try {
    const response = await joinmatch_request(values, match, token)
    switch (response.status) {
      case (201):
        setLoading(false)
        setError(null)
        return true

      case (403):
        setLoading(false)
        setError("La contraseña es incorrecta")
        return false

      default:
        setLoading(false)
        setError("Se produjo un error")
        return false
   }
  } catch (err) {
    setError(`Error desconocido: ${err}`)
  }
}