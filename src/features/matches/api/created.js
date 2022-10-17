import { useState, useEffect } from "react"
import { CreatedMatches } from "../CreatedMatches"
import { useAuth } from "../../../hooks/useAuth"

export function ListCreated() {
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

  return <CreatedMatches matches={matches} />
}
