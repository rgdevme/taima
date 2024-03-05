import { useEffect, useState } from 'react'

export const useArray = <T,>(
	value: T[],
	{ key }: { key?: keyof T } = {}
): [
	T[],
	{
		add: (...items: T[]) => void
		edit: (...items: T[]) => void
		del: (...items: T[]) => void
		replace: (items: T[]) => void
	}
] => {
	const [state, setState] = useState(value)

	const add = (...items: T[]) => setState(p => [...items, ...p])
	const del = (...items: T[]) => {
		setState(p => [...p.filter(x => !items.map(i => i[key]).includes(x[key]))])
	}
	const edit = (...items: T[]) => {
		setState(p => {
			const upd = [...p]
			items.forEach(item => {
				const i = p.findIndex(x => x[key] === item[key])
				if (i >= 0) upd[i] = item
			})
			return upd
		})
	}
	const replace = (items: T[]) => setState(items)

	useEffect(() => {
		console.log('useArray changed', state)
	}, [state])

	return [state, { add, del, edit, replace }]
}
