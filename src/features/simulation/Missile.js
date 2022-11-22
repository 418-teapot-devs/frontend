import React, { useEffect, useMemo, useRef } from "react"
import { Circle } from "react-konva"
import { stringToColor } from "../../utils/theme"

export const Missile = ({ name, sender_id, exploding, ...props }) => {
  const fill = useMemo(() => stringToColor(name + sender_id), [name, sender_id])

  return <Circle fill={fill} {...props} />
}

export const ExplodingMissile = ({ exploding, ...props }) => {
  const missileRef = useRef(null)

  useEffect(() => {
    if (exploding) {
      const missile = missileRef.current
      missile.to({
        opacity: 0,
        scaleX: 2,
        scaleY: 2,
        duration: 0.3
      })
    }
  }, [exploding])

  return <Circle ref={missileRef} fill={"#b71c1c"} {...props} />
}
