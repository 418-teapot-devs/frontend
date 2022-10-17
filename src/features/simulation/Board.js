import React from "react"
import { Layer, Rect } from "react-konva"
import CustomStage from "./CustomStage"
import Robot from "./Robot"

const Board = ({ robots }) => {
  return (
    <CustomStage width={1000} height={1000}>
      <Layer>
        <Rect x={0} y={0} width={1000} height={1000} fill="grey" />
        {robots.map((robot) => (
          <Robot position={robot} width={20} height={20} fill="red" />
        ))}
      </Layer>
    </CustomStage>
  )
}

export default Board
