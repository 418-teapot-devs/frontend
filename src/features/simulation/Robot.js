import React, { useEffect } from "react"
import { Rect } from "react-konva"

const Robot = ({ position, ...props }) => {
  const rectRef = React.useRef(null)
  useEffect(() => {
    const rect = rectRef.current
    rect.to({ ...position, duration: 0.5 })
  })

  return <Rect ref={rectRef} {...props} />
}

export default Robot
