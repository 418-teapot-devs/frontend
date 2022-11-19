// These functions are called in Public Matches 

export const joinmatch_request = async (values, match, token) => {
  return (fetch(`http://127.0.0.1:8000/matches/${match.id}/join/`, {
    method: "PUT",
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

  const response = await joinmatch_request(values, match, token)
  const detail = response.statusText.toString()

  switch (response.status) {
    case (201):
      setLoading(false)
      setError(null)
      return true
      
    case (403):
      setLoading(false)
      if (detail.includes("Match password is incorrect"))
        setError("La contraseña es incorrecta")
      else if (detail.includes("Match has already started"))
        setError("La partida ya fue iniciada")
      else if (detail.includes("Match is full"))
        setError("La partida ya está llena")
      else
        setError("Acción no autorizada")
      return false
        
    case (404):
      setLoading(false)
      if (detail.includes("Robot not found"))
        setError("El robot elegido ya no existe")
      else if (detail.includes("Match not found"))
        setError("La partida elegida fue eliminada")
      else 
        setError("La sesión caducó")
      return false
    
    default:
      setLoading(false)
      setError("Error de servidor")
      return false
  }

}