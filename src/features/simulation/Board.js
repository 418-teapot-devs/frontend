import React, { useState } from "react"
import { Layer, Rect } from "react-konva"
import CustomStage from "./CustomStage"
import Robot from "./Robot"

const initialRobots = [
  {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  },
  {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  },
  {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  },
  {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  },
  {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  }
]

const Board = () => {
  const [robots, setRobots] = useState(initialRobots)

  const robotsRandomPositions = () => {
    setRobots(robots.map((_) => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000
    })))
  }

  return (
    <React.Fragment>
      <button
        onClick={() => robotsRandomPositions()}
      >
        Move rect to random Position
      </button>
      <CustomStage
        width={1000}
        height={1000}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={1000}
            height={1000}
            fill="grey"
          />
          {
            robots.map((robot) => (
              <Robot
                position={robot}
                width={30}
                height={30}
                fill="red"
              />
            ))
          }
          
        </Layer>
      </CustomStage>
    </React.Fragment>
  )
}

export default Board
