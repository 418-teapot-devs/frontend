import React, { useEffect } from "react"
import { Rect } from "react-konva"

const Robot = ({ position, ...props }) => {
  const robotRef = React.useRef(null)
  useEffect(() => {
    const robot = robotRef.current
    robot.to({ ...position, duration: 0 })
  })

  return <Rect ref={robotRef} {...props} />
}

export default Robot
