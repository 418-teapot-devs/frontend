import React, { useEffect, useMemo, useRef } from "react"
import { Circle, Rect } from "react-konva"
import { stringToColor } from "../../utils/theme"

export const Missile = ({ name, sender_id, exploding, ...props }) => {
  const fill = useMemo(() => stringToColor(name + sender_id), [name, sender_id])

  return (
    <Circle
      fill={fill}
      {...props}
    />
  )
}

export const ExplodingMissile = ({ exploding, ...props }) => {
  const missileRef = useRef(null)
  const fill = "red"

  useEffect(() => {
    if (exploding) {
      const missile = missileRef.current
      missile.to({
        opacity: 0,
        duration: 0.5,
      })
    }
  }, [exploding])

  return (
    <Circle
      ref={missileRef}
      fill={fill}
      {...props}
    />
  )
}
