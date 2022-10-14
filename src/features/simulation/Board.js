import React, { useState, useEffect } from "react"
import { Stage, Layer, Rect, Circle, Image } from "react-konva"
import useImage from "use-image"

let delta = {
  x: 0,
  y: 0
}
let isMoving = false

function Board() {
  const [image] = useImage("https://konvajs.org/assets/lion.png")
  const [randomLocation, setRandomLocation] = useState({ x: 500 - 30 / 2, y: 500 - 30 / 2})
  const stageRef = React.useRef(null)
  const rectRef = React.useRef(null)
  useEffect(() => {
    const rect = rectRef.current
    rect.to({ ...randomLocation, duration: 0.5 })
  });


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

    let newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
  }

  const handleOnMouseMove = (e) => {
    const stage = stageRef.current

    let pointer = stage.getPointerPosition()

    console.log({
      pointer_x: pointer.x,
      pointer_y: pointer.y,
      stage_x: stage.x(),
      stage_y: stage.y(),
    })

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
  };

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setRandomLocation({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
          })
        }}
      >
        Move rect to random location
      </button>
      <Stage
        ref={stageRef}
        width={1000}
        height={1000}
        onWheel={handleOnWheel}
        onMouseMove={handleOnMouseMove}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={1000}
            height={1000}
            fill="grey"
          />
          <Image width={50} height={50} image={image} />
          <Rect
            ref={rectRef}
            width={30}
            height={30}
            fill="red"
          />
        </Layer>
      </Stage>
    </React.Fragment>
  )
}

export default Board
