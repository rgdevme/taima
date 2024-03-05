import { useState } from 'react'

/**
 *
 * @param data The initial state.
 * @param callback A function to run with only the changed properties
 * as argument.
 * @returns The updated state object, and the corresponding function,
 * to partially update the state
 */
export const useObject = <T>(
	data: T,
	{
		callback
	}: {
		callback?: (key: keyof T, value: T[keyof T]) => void
	} = {}
): [T, (data: Partial<T>) => void] => {
	const [state, setState] = useState(data)

	const update = (data: Partial<T>) => {
		setState(e => ({ ...e, ...data }))

		if (!!callback) {
			console.log('update: ', { data })
			Object.entries(data).forEach(([k, v]) =>
				callback(k as keyof T, v as T[keyof T])
			)
		}
	}

	return [state, update]
}
