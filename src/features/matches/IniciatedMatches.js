import { useState, useEffect } from "react"
import { IniciatedMatchesList } from "./IniciatedMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const IniciatedMatches = () => {
  const [matches, setMatches] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const loadListIniciated = async () => {
      fetch("http://127.0.0.1:8000/matches/iniciated", {
        method: "GET",
        headers: {
          accept: "application/json",
          token: user.token,
        },
      })
        .then((response) => response.json())
        .then((data) => setMatches(data))
    }

    loadListIniciated()
  }, [])

  return <IniciatedMatchesList matches={matches} />
}
