import { Box, Button, Card, CardContent, Slider, Stack } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import Board from "./Board"

const MAX_ROUNDS = 10

const mockedRobots = [
  {
    x: [
      196.32, 376.56, 488.08, 847.6, 78.39, 396.71, 457.95, 466.48, 319.53,
      461.42,
    ],
    y: [
      301.35, 150.98, 868.97, 885.12, 443.15, 241.69, 267.73, 850.41, 319.11,
      928.06,
    ],
  },
  {
    x: [
      807.65, 166.02, 370.39, 242.44, 850.67, 172.53, 64.99, 490.26, 777.33,
      477.86,
    ],
    y: [
      813.92, 21.21, 379.07, 374.32, 903.14, 304.11, 768.49, 1.5, 984.62,
      198.61,
    ],
  },
  {
    x: [
      234.86, 99.1, 74.76, 945.44, 530.05, 769.72, 421.8, 690.7, 886.21, 782.16,
    ],
    y: [
      233.5, 900.16, 386.19, 867.07, 95.3, 463.47, 848.61, 902.06, 874.67,
      989.83,
    ],
  },
]

const Simulation = () => {
  const [round, setRound] = useState(0)
  const [paused, setPaused] = useState(true)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setRound((prevround) => (prevround + 1) % MAX_ROUNDS)
      }
    }, 500)
    return () => clearInterval(intervalRef.current)
  }, [paused])

  const handleClick = () => setPaused(!paused)

  const robots = mockedRobots.map((robot) => ({
    x: robot.x[round],
    y: robot.y[round],
  }))

  return (
    <Stack
      sx={{ height: "calc(100vh - 16px)" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack style={{ height: "100%" }} direction="row" spacing={2}>
        <Board robots={robots} />
        <Stack>
          <Card variant="outlined">
            <CardContent>
              Hola
            </CardContent>
          </Card>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ paddingRight: 2, width: "100%" }}>
        <Button variant="outlined" onClick={handleClick}>
          {paused ? "Play" : "Pause"}
        </Button>
        <Slider
          defaultValue={0}
          value={round}
          min={0}
          max={MAX_ROUNDS - 1}
          onChange={(e, newValue) => setRound(newValue)}
        />
      </Stack>
    </Stack>
  )
}

export default Simulation
