import { useEffect } from 'react'

// const defaultConfig: { delay?: number; dependencies?: any[] } = {
// 	delay: 300,
// 	dependencies: []
// }

export const useTimeout = (callback: (...args: any[]) => void, delay = 300) => {
	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => callback(), delay)

		return () => clearTimeout(timeout)
	}, [callback])
}
