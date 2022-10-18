import { useState, useEffect } from "react"
import { PublicMatchesList } from "./PublicMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const PublicMatches = () => {
  const { user } = useAuth()

  const [matches, setMatches] = useState([])
  useEffect(() => {
    const loadListPublic = async () => {
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

    loadListPublic()
  }, [])

  return <PublicMatchesList matches={matches} />
}
