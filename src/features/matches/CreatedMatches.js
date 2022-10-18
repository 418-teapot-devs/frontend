import { useState, useEffect } from "react"
import { CreatedMatchesList } from "./CreatedMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const CreatedMatches = () => {
  const [matches, setMatches] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const loadListCreated = async () => {
      fetch("http://127.0.0.1:8000/matches/created", {
        method: "GET",
        headers: {
          accept: "application/json",
          token: user.token,
        },
      })
      .then((response) => response.json())
      .then((data) => setMatches(data))
    }
    loadListCreated()
  }, [])

  return <CreatedMatchesList matches={matches} />
}
