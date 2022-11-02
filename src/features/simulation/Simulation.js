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
    }, 10)
    return () => clearInterval(intervalRef.current)
  }, [paused, rounds.length])

  const roundData = Object.keys(rounds[round].robots).map((key) => ({
    ...rounds[round].robots[key],
    name: robots[key].name,
  }))

  const robotsWithId = Object.keys(robots).map((key) => ({
    ...robots[key],
    robot_id: key,
  }))

  return (
    <Paper sx={{ padding: 2}} variant="outlined">
      <Stack
        sx={{ height: "calc(100vh - 50px)" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} sx={{ maxHeight: "90%" }}>
          <Board robots={roundData} />
          <Stack spacing={1}>
            {robotsWithId.map((robot, i) => (
              <RobotStatus
                key={i}
                name={robot.name}
                {...rounds[round].robots[robot.robot_id]}
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
