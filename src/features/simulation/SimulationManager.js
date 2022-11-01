import React, { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Simulation from "./Simulation"

const SimulationManager = () => {
  const [simulation, setSimulation] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const loadSimulation = async () => {
      fetch("http://127.0.0.1:8000/simulate/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: user.token,
        },
        body: JSON.stringify({
          rounds: "999",
          robots: ["2"],
        }),
      })
        .then((response) => response.json())
        .then((data) => setSimulation(data))
    }

    loadSimulation()
  }, [user.token])

  return simulation ? <Simulation {...simulation} /> : <p>Loading</p>
}

export default SimulationManager
