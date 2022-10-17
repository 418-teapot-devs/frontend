import React, { useState } from "react"
import Board from "./Board"

const mockedRobots = [
  {
    x: [0.0, 100.0, 300.0],
    y: [0.0, 100.0, 300.0],
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
      <button onClick={() => setIndex(index - 1)}>-</button>
      <button onClick={() => setIndex(index + 1)}>+</button>
      <Board robots={robots} />
    </React.Fragment>
  )
}

export default BoardManager
