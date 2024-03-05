import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

type RequestStatus = { error: string; loading: boolean }
export type useAxios = typeof useAxios
export type useAxiosConfig<T> = AxiosRequestConfig & {
	log?: boolean
	lazy?: boolean
	callback?: (data: T) => void
}

export const useAxios = <T, Y = T>(
	initialData: T,
	{ lazy, log, callback, ...config }: useAxiosConfig<T> = {},
	instance: AxiosInstance = axios
): {
	data: T
	request: (options?: AxiosRequestConfig<Y>) => Promise<void>
	abort: AbortController['abort'] | null
} & RequestStatus => {
	let abort: AbortController['abort'] = null
	const [data, setData] = useState(initialData)
	const [state, setState] = useState<{
		error: string | null
		loading: boolean
	}>({
		error: null,
		loading: false
	})

	const request = async (options: AxiosRequestConfig = {}) => {
		if (abort !== null) {
			abort('Cancelled to make another requests')
			abort = null
		}
		try {
			const controller = new AbortController()
			abort = controller.abort
			setState(p => ({ ...p, loading: true }))
			const res = await instance({
				...config,
				...options,
				signal: controller.signal
			})
			const data = res.data
			if (log) console.log(config.url, { data })
			setData(data)
			setState(p => ({ ...p, error: null }))
			if (!!callback) callback(data)
		} catch (error) {
			setState(p => ({ ...p, error }))
			setData(initialData)
		} finally {
			setState(p => ({ ...p, loading: false }))
		}
	}

	useEffect(() => {
		if (!lazy) request()
	}, [])

	return { ...state, data, request, abort }
}
