import { useState, useEffect } from "react"
import { CreatedMatchesList } from "./CreatedMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const CreatedMatches = () => {
  const { user } = useAuth()

  function loadListCreated() {
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

  const [matches, setMatches] = useState([])
  useEffect(() => {
    loadListCreated()
  })

  return <CreatedMatchesList matches={matches} />
}
