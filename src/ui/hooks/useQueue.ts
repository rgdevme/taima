import { useEffect, useState } from 'react'

export const useQueue = <T>(
	array: T[],
	{
		onEnterQueue,
		onExitQueue,
		onProcess,
		key
	}: {
		onEnterQueue?: (item: T) => void
		onExitQueue?: (item: T) => void
		onProcess?: (item: T) => Promise<void>
		key?: keyof T
	} = {}
): {
	state: T[]
	add: (item: T) => void
	del: (item: T) => void
} => {
	const [queue, setQueue] = useState(array)

	const add = (item: T) => {
		setQueue(p => {
			const upd = [...p]
			upd.push(item)
			return upd
		})
		if (onEnterQueue) onEnterQueue(item)
	}

	const del = (item: T) => {
		setQueue(p => {
			const upd = [...p.filter(x => x[key] !== item[key])]
			return upd
		})
		if (onExitQueue) onExitQueue(item)
	}

	const process = async (item: T) => {
		await onProcess(item)
		del(item)
	}

	useEffect(() => {
		if (queue.length === 0) return
		process(queue[0])
	}, [queue.length])

	return {
		state: queue,
		add,
		del
	}
}
