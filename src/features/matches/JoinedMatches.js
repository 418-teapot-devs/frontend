import { useState, useEffect } from "react"
import { JoinedMatches } from "./JoinedMatchesList"
import { useAuth } from "../../hooks/useAuth"

export const JoinedMatches = () => {
  const { user } = useAuth()

  function loadListJoined() {
    fetch("http://127.0.0.1:8000/matches/joined", {
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
    loadListJoined()
  })

  return <JoinedMatches matches={matches} />
}
