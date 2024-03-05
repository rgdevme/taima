import { useLayoutEffect, useRef, useState } from 'react'

export const useKnob = (percent: number) => {
	const ref = useRef<HTMLCanvasElement>()
	const [size, setSize] = useState(0)
	const dpr = window.devicePixelRatio || 1
	const lineWidth = 4

	const configCanvas = () => {
		const canvas = ref.current
		const ctx = canvas.getContext('2d')
		let dimensions = getObjectFitSize(
			true,
			canvas.clientWidth,
			canvas.clientHeight,
			canvas.width,
			canvas.height
		)
		canvas.width = dimensions.width * dpr
		canvas.height = dimensions.height * dpr

		let ratio = Math.min(canvas.clientWidth / size, canvas.clientHeight / size)

		ctx.scale(ratio * dpr, ratio * dpr)

		ctx.imageSmoothingEnabled = true
		ctx.lineWidth = lineWidth
		ctx.lineCap = 'round'
	}

	const pcToRad = (pc: number) => pc * 2 * Math.PI

	const drawKnob = (number: number) => {
		const canvas = ref.current
		const ctx = canvas.getContext('2d')
		const { height, width } = canvas
		const s = size / 2 / dpr

		ctx.clearRect(0, 0, width, height)

		ctx.beginPath()
		ctx.arc(s, s, (size / 2 - lineWidth) / dpr, 0, 360)
		ctx.strokeStyle = 'gray'
		ctx.stroke()

		ctx.beginPath()
		ctx.arc(s, s, (size / 2 - lineWidth) / dpr, 0, pcToRad(number))
		ctx.strokeStyle = 'red'
		ctx.stroke()
	}

	useLayoutEffect(() => {
		setSize(ref.current.width)
	}, [])

	useLayoutEffect(() => {
		if (size > 0) configCanvas()
	}, [size])

	useLayoutEffect(() => {
		if (size > 0) drawKnob(percent)
	}, [percent, size])

	return <canvas className='graphic-counter' ref={ref} height='75' width='75' />
}

const getObjectFitSize = (
	contains: boolean,
	containerWidth: number,
	containerHeight: number,
	width: number,
	height: number
) => {
	var doRatio = width / height
	var cRatio = containerWidth / containerHeight
	var targetWidth = 0
	var targetHeight = 0
	var test = contains ? doRatio > cRatio : doRatio < cRatio

	if (test) {
		targetWidth = containerWidth
		targetHeight = targetWidth / doRatio
	} else {
		targetHeight = containerHeight
		targetWidth = targetHeight * doRatio
	}

	return {
		width: targetWidth,
		height: targetHeight,
		x: (containerWidth - targetWidth) / 2,
		y: (containerHeight - targetHeight) / 2
	}
}
