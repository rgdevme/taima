import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'

const defautlConfig: {
	delay?: number | null
	initial?: number
} = {
	delay: null,
	initial: 0
}

export const useTimer = (
	callback: (seconds: number) => void,
	options = defautlConfig
) => {
	const { delay, initial } = { ...defautlConfig, ...options }
	const now = () => moment().milliseconds()
	const epoc = useRef(now())
	const startTime = useRef(now())
	const remainingTime = useRef(0)
	const [currentDelay, setCurrentDelay] = useState(delay)
	const [seconds, setSeconds] = useState(initial)
	const [status, setStatus] = useState<'playing' | 'stopped' | 'paused'>(
		'playing'
	)
	const interval = useRef<NodeJS.Timeout>(null)

	const updateRemainingTime = (pause: boolean) => {
		const { current: start } = startTime
		remainingTime.current = currentDelay - (pause ? now() - start : 0)
	}

	const execute = useCallback(() => {
		console.log('callback called')
		startTime.current = now()
		const amount = !!interval ? 1 : 0
		setSeconds(p => {
			const upd = p + amount
			callback(upd)
			return upd
		})
		if (currentDelay === null) setCurrentDelay(delay)
	}, [callback])

	const play = () => {
		epoc.current = now()
		setStatus('playing')
	}

	const stop = (pause = false) => {
		setStatus(pause ? 'paused' : 'stopped')
		if (!pause) setSeconds(initial)
		updateRemainingTime(pause)
		setCurrentDelay(null)
	}

	const pause = () => {
		if (status !== 'playing') play()
		else stop(true)
	}

	useEffect(() => {
		setCurrentDelay(delay)
	}, [delay])

	useEffect(() => {
		console.log(
			status,
			seconds,
			currentDelay,
			interval.current,
			remainingTime.current,
			startTime.current,
			epoc.current
		)

		if (currentDelay === null) {
			console.log('called clear interval')
			clearInterval(interval.current)
			return
		}

		if (status === 'playing') {
			console.log('called playing')
			interval.current = setInterval(execute, currentDelay)
		}
		return () => {
			clearInterval(interval.current)
		}
	}, [status, currentDelay])

	return { seconds, pause, stop, play, status }
}
