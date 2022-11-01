import React, { useEffect, useMemo, useRef } from "react"
import { Circle, Rect } from "react-konva"
import { stringToColor } from "../../utils/theme"

export const Missile = ({ layerRef, name, exploding, ...props }) => {
  const fill = useMemo(() => stringToColor(name), [name])

  return (
    <Circle
      offsetX={-props.radius}
      offsetY={-props.radius}
      fill={fill}
      {...props}
    />
  )
}

export const ExplodingMissile = ({ layerRef, name, exploding, ...props }) => {
  const missileRef = useRef(null)
  const fill = "red"

  useEffect(() => {
    if (exploding) {
      const missile = missileRef.current
      missile.to({
        scaleX: 3,
        scaleY: 3,
        duration: 0,
      })
    }
  }, [exploding])

  return (
    <Circle
      ref={missileRef}
      offsetX={-props.radius}
      offsetY={-props.radius}
      fill={fill}
      {...props}
    />
  )
}
