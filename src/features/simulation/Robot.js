import React, { useEffect, useMemo } from "react"
import { Rect } from "react-konva"
import { stringToColor } from "../../utils/theme"

const Robot = ({ name, ...props }) => {
  const fill = useMemo(() => stringToColor(name), [name])

  return <Rect fill={fill} {...props} />
}

export default Robot
