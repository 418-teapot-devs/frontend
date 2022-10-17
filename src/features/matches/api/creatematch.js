import { useState, useEffect } from "react"
import { IniciatedMatches } from "../IniciatedMatches" //?
import { useAuth } from "../../../hooks/useAuth"
import { appendOwnerState } from "@mui/base"

export function AvailableRobots() {
  
  const { user } = useAuth()

  function loadAvailableRobots() {
    fetch("http://127.0.0.1:8000/robots/", {
      method: "GET",
      headers: {
        accept: "application/json",
        token: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => setRobots(data))
  }

  const [robots, setRobots] = useState([])
  useEffect(() => {loadAvailableRobots()}, [])

  return robots
}

export const creatematch = (values, token) => {
  return fetch("http://127.0.0.1:8000/matches/created", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      name: values.name,
      name_robot: values.robot_name,
      max_players: values.max_players,
      min_players: values.min_players,
      rounds: values.rounds,
      games: values.games,
      password: values.password,
    }),
  })
}
