import { useEffect, useState } from 'react'

export const useOriginal = <T extends object>(original: T, updated: T) => {
	const [o, commit] = useState(original)
	const [changed, setChanged] = useState(false)

	useEffect(() => {
		setChanged(hasChanged(o, updated))
	}, [o, updated])

	return { changed, commit }
}

const hasChanged = <T extends object>(a: T, b: T) => {
	return JSON.stringify(a) !== JSON.stringify(b)
}
