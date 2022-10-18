import { useState, useEffect } from "react"
import { PublicMatches } from "./PublicMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const PublicMatches = () => {
  const { user } = useAuth()

  function loadListPublic() {
    fetch("http://127.0.0.1:8000/matches/public", {
      method: "GET",
      headers: {
        accept: "application/json",
        token: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => setMatches(data))
  }

  const [matches, setMatches] = useState([])
  useEffect(() => {
    loadListPublic()
  })

  return <PublicMatches matches={matches} />
}
