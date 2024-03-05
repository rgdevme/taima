import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 300) => {
	const [state, setState] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => {
			console.log('timeout reached')
			setState({ ...value })
		}, delay)
		console.log('fired timeout', timeout)
		return () => clearTimeout(timeout)
	}, [JSON.stringify(value), delay])

	return state
}
