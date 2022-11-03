import React, { useMemo } from "react"
import { Rect } from "react-konva"
import { stringToColor } from "../../utils/theme"

const Robot = ({ name, id, ...props }) => {
  const fill = useMemo(() => stringToColor(name + id), [name, id])

  return (
    <Rect
      fill={fill}
      offsetX={props.height / 2}
      offsetY={props.width / 2}
      {...props}
    />
  )
}

export default Robot
