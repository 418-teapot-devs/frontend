import { Backdrop, CircularProgress } from "@mui/material"
import React, { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Simulation from "./Simulation"
import SimulationForm from "./SimulationForm"

const SimulationManager = () => {
  const [simulation, setSimulation] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = (values) => {
    setLoading(true)
    fetch("http://127.0.0.1:8000/simulate/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: user.token,
      },
      body: JSON.stringify({
        rounds: values.rounds,
        robots: values.robots,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setSimulation(data)
      })
  }

  return simulation ? (
    <Simulation {...simulation} />
  ) : (
    <React.Fragment>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SimulationForm onSubmit={handleSubmit} />
    </React.Fragment>
  )
}

export default SimulationManager
