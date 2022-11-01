import { Box } from "@mui/material"
import React, { useRef } from "react"
import { Layer, Rect } from "react-konva"
import CustomStage from "./CustomStage"
import { ExplodingMissile, Missile } from "./Missile"
import Robot from "./Robot"

const Board = ({ robots, missiles, explodingMissiles }) => {
  const boardContainerRef = useRef(null)

  return (
    <Box ref={boardContainerRef}>
      <CustomStage width={1000} height={1000} containerRef={boardContainerRef}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={1000}
            height={1000}
            fill="#1c1c1c"
            cornerRadius={4}
          />
        </Layer>
        <Layer>
          {robots.map((robot) => (
            <Robot key={robot.id} width={20} height={20} {...robot} />
          ))}
        </Layer>
        <Layer>
          {missiles.map((missile) => (
            <Missile key={missile.id} radius={7} {...missile} />
          ))}
        </Layer>
        <Layer>
          {explodingMissiles.map((missile) => (
            <ExplodingMissile key={missile.id} radius={7} {...missile} />
          ))}
        </Layer>
      </CustomStage>
    </Box>
  )
}

export default Board
