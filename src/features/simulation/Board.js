import { Box } from "@mui/material"
import React, { useRef } from "react"
import { Layer, Rect } from "react-konva"
import CustomStage from "./CustomStage"
import Robot from "./Robot"

const Board = ({ robots }) => {
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
          {robots.map((robot, i) => (
            <Robot
              key={i}
              width={20}
              height={20}
              {...robot}
            />
          ))}
        </Layer>
      </CustomStage>
    </Box>
  )
}

export default Board
