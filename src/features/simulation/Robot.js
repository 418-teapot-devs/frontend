import React, { useEffect, useMemo } from "react"
import { Rect } from "react-konva"
import { stringToColor } from "../../utils/theme"

const Robot = ({ x, y, name, ...props }) => {
  const robotRef = React.useRef(null)
  useEffect(() => {
    const robot = robotRef.current
    console.log(robot)
    robot.to({ x: x, y: y, duration: 0 })
  })

  const fill = useMemo(() => stringToColor(name), [name])

  return <Rect ref={robotRef} fill={fill} {...props} />
}

export default Robot
