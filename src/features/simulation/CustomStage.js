import React, { useCallback, useLayoutEffect } from "react"
import { Stage } from "react-konva"

const STAGE_WIDTH = 1000
const STAGE_HEIGHT = 1000

let delta = {
  x: 0,
  y: 0,
}
let isMoving = false

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

  const handleOnWheel = (e) => {
    e.evt.preventDefault()

    let scaleBy = 1.08

    const stage = stageRef.current

    let oldScale = stage.scaleX()
    let pointer = stage.getPointerPosition()

    let mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    let direction = e.evt.deltaY > 0 ? -1 : 1

    if (e.evt.ctrlKey) {
      scaleBy = 1.16
    }

    let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

    stage.scale({ x: newScale, y: newScale })
    stage.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    })
  }

  const handleOnMouseMove = (e) => {
    const stage = stageRef.current
    const pointer = stage.getPointerPosition()

    if (e.evt.buttons === 1) {
      if (!isMoving) {
        isMoving = true

        const stage_x = stage.x()
        const stage_y = stage.y()

        delta.x = Math.abs(pointer.x - stage.x())
        delta.y = Math.abs(pointer.y - stage.y())

        if (stage_x < pointer.x) {
          delta.x = -delta.x
        }

        if (stage_y < pointer.y) {
          delta.y = -delta.y
        }
      }

      let newPos = {
        x: pointer.x + delta.x,
        y: pointer.y + delta.y,
      }

      stage.position(newPos)
    } else {
      isMoving = false
      delta.x = 0
      delta.y = 0
    }
  }

  useLayoutEffect(() => {
    fitStageToContainer()
  })

  return (
    <Stage
      ref={stageRef}
      {...props}
      onWheel={handleOnWheel}
      onMouseMove={handleOnMouseMove}
    >
      {children}
    </Stage>
  )
}

export default CustomStage
