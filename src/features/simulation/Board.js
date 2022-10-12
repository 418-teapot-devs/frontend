import React from "react"
import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import useImage from "use-image";


function Board() {
  const [image] = useImage("https://konvajs.org/assets/lion.png")

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image width={50} height={50} image={image} />
      </Layer>
    </Stage>
  )
}

export default Board
