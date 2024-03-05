import axios from 'axios'
import { useAxios, useAxiosConfig } from './useAxios'

const instance = axios.create({
	baseURL: `http://localhost:8081`,
	method: 'GET',
	headers: {
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		Expires: '0'
	}
})

export const useApi = <T, Y = T>(initialData: T, config: useAxiosConfig<T>) =>
	useAxios<T, Y>(initialData, config, instance)
