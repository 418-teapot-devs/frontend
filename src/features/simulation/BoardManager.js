import { Button } from "@mui/material"
import React, { useState } from "react"
import Board from "./Board"

const mockedRobots = [
  {
    x: [0.0, 50.0, 100.0, 100.0, 150.0, 200.0, 800.0],
    y: [0.0, 50.0, 100.0, 200.0, 300.0, 500.0, 800.0],
  },
]

const BoardManager = () => {
  const [index, setIndex] = useState(0)

  const robots = mockedRobots.map((robot) => ({
    x: robot.x[index],
    y: robot.y[index],
  }))

  return (
    <React.Fragment>
      <Button onClick={() => setIndex((index - 1) % 7)}>-</Button>
      <Button onClick={() => setIndex((index + 1) % 7)}>+</Button>
      <Board robots={robots} />
    </React.Fragment>
  )
}

export default BoardManager
