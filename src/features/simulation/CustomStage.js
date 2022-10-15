import React from "react"
import { Stage } from "react-konva"

let delta = {
	x: 0,
	y: 0
}
let isMoving = false

const CustomStage = ({children, ...props}) => {
	console.log(children)
	console.log(props)
	const stageRef = React.useRef(null)

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
		<Stage
			ref={stageRef}
			onWheel={handleOnWheel}
			onMouseMove={handleOnMouseMove}
			{...props}
		>
			{children}
		</Stage>
	)
}

export default CustomStage
