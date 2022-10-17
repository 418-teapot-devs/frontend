import { useState, useEffect } from "react"
import { IniciatedMatches } from "../IniciatedMatches"
import { useAuth } from "../../../hooks/useAuth"

export function ListIniciated() {
  const { user } = useAuth()

  function loadListIniciated() {
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

  const [matches, setMatches] = useState([])
  useEffect(() => {
    loadListIniciated()
  })

  return <IniciatedMatches matches={matches} />
}
