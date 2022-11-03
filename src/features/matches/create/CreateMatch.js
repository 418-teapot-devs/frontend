import { CreateMatchForm } from "./CreateMatchForm"
import React, { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { Grid } from "@mui/material"

const creatematch = (values, token) => {
  return (fetch("http://127.0.0.1:8000/matches/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      name: values.name,
      robot_id: values.robot_id,
      max_players: values.max_players,
      min_players: values.min_players,
      rounds: values.rounds,
      games: values.games,
      password: values.password,
    }),
  })
)}

export const CreateMatch = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [failure, setFailure] = useState(false)
  const { user } = useAuth()

  const onSubmit = async (values) => {
    setLoading(true)
    const response = await creatematch(values, user.token)
    switch (response.status) {
      case 201:
        setLoading(false)
        setSucces(true)
        setFailure(false)
        break
      default:
        setLoading(false)
        setSucces(false)
        setFailure(true)
        break
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <CreateMatchForm
          onSubmit={onSubmit}
          loading={loading}
          success={success}
          failure={failure}
        />
      </Grid>
    </Grid>
  )
}