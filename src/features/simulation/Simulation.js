import { Button, Paper, Stack } from "@mui/material"
import Slider, { sliderClasses } from "@mui/material/Slider"
import React, { useEffect, useRef, useState } from "react"
import Board from "./Board"
import RobotStatus from "./RobotStatus"

const Simulation = ({ robots, rounds }) => {
  const [round, setRound] = useState(0)
  const [paused, setPaused] = useState(true)

  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setRound((prevround) => (prevround + 1) % rounds.length)
      }
    }, 25)
    return () => clearInterval(intervalRef.current)
  }, [paused, rounds.length])

  const roundRobots = Object.keys(rounds[round].robots).map((key) => ({
    ...rounds[round].robots[key],
    id: key,
    name: robots[key].name,
  }))

  const roundMissiles = Object.keys(rounds[round].missiles).map((key) => ({
    ...rounds[round].missiles[key],
    exploding: rounds[(round + 10) % rounds.length].missiles[key]
      ? rounds[(round + 10) % rounds.length].missiles[key].exploding
      : true,
    id: key,
    name: robots[rounds[round].missiles[key].sender_id].name,
  }))

  const getExplodingMissiles = () => {
    let explodingMissiles = []

    for (let i = round - 20; i >= 0 && i <= round; i++) {
      Object.keys(rounds[i].missiles).forEach((key) => {
        if (rounds[i].missiles[key].exploding) {
          explodingMissiles.push({
            ...rounds[i].missiles[key],
            id: key,
          })
        }
      })
    }

    return explodingMissiles
  }

  const roundExplodingMissiles = getExplodingMissiles()

  const robotsWithId = Object.keys(robots).map((key) => ({
    ...robots[key],
    id: key,
  }))

  return (
    <Paper sx={{ padding: 2 }} variant="outlined">
      <Stack
        sx={{ height: "calc(100vh - 50px)" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} sx={{ maxHeight: "90%" }}>
          <Board
            robots={roundRobots}
            missiles={roundMissiles}
            explodingMissiles={roundExplodingMissiles}
          />
          <Stack spacing={1}>
            {robotsWithId.map((robot) => (
              <RobotStatus
                key={robot.id}
                name={robot.name}
                {...rounds[round].robots[robot.id]}
              />
            ))}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ paddingRight: 2, width: "100%" }}
        >
          <Button variant="outlined" onClick={() => setPaused(!paused)}>
            {paused ? "Play" : "Pause"}
          </Button>
          <Slider
            sx={{
              [`& .${sliderClasses.track}`]: {
                transition: "none",
              },
              [`& .${sliderClasses.thumb}`]: {
                transition: "none",
              },
            }}
            defaultValue={0}
            value={round}
            min={0}
            max={rounds.length - 1}
            onChange={(e, newValue) => setRound(newValue)}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Simulation
