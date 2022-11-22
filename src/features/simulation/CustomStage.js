import React, { useCallback, useLayoutEffect } from "react"
import { Stage } from "react-konva"

const STAGE_WIDTH = 1000
const STAGE_HEIGHT = 1000

const CustomStage = ({ children, containerRef, ...props }) => {
  const stageRef = React.useRef(null)

  const fitStageToContainer = useCallback(() => {
    if (containerRef && containerRef.current) {
      let container = containerRef.current
      let stage = stageRef.current

      let containerHeight = container.offsetHeight

      let scale = containerHeight / STAGE_WIDTH

      stage.width(STAGE_WIDTH * scale)
      stage.height(STAGE_HEIGHT * scale)
      stage.scale({ x: scale, y: scale })
    }
  }, [containerRef, stageRef])

  useLayoutEffect(() => {
    fitStageToContainer()
  })

  return (
    <Stage ref={stageRef} {...props}>
      {children}
    </Stage>
  )
}

export default CustomStage
