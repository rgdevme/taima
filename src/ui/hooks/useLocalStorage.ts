import { useEffect } from 'react'

type useLocalStorage = {
	<T extends object = {}>(key: string): {
		get: () => any
		set: (data: T[keyof T]) => void
		del: () => void
		clear: () => void
		all: () => T
	}
	<T extends object = {}>(): {
		get: (key: keyof T) => any
		set: (key: keyof T, data: T[keyof T]) => void
		del: (key: keyof T) => void
		clear: () => void
		all: () => T
	}
	<T extends object = {}>(initial: T): {
		get: (key: keyof T) => any
		set: (key: keyof T, data: T[keyof T]) => void
		del: (key: keyof T) => void
		clear: () => void
		all: () => T
	}
}

export const useLocalStorage: useLocalStorage = (key = undefined) => {
	const get = (k?: string) => {
		const result = localStorage.getItem(k ?? key)
		if (!result) return null
		return JSON.parse(result)
	}
	const del = (k?: string) => localStorage.removeItem(k ?? key)

	const set = (kOrData: string | any, data?: any) => {
		if (!data) localStorage.setItem(key, JSON.stringify(kOrData))
		else localStorage.setItem(kOrData, JSON.stringify(data))
	}

	const clear = () => localStorage.clear()

	const all = () => {
		const result = {}
		const qtty = localStorage.length
		for (let i = 0; i < qtty; i++) {
			const k = localStorage.key(i)
			const v = get(k)
			if (v) result[k] = v
		}
		return result
	}

	useEffect(() => {
		if (typeof key !== 'object') return
		for (const k in key) set(k, key[k])
	}, [])

	return {
		get,
		del,
		set,
		clear,
		all
	}
}
