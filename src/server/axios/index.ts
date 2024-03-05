import axios from 'axios'
import { config } from '../config'

export const instance = axios.create({
	baseURL: `https://api.clickup.com/api/v2`,
	headers: {
		'Content-Type': 'application/json',
		Authorization: config.api_key
	}
})
instance.interceptors.request.use(
	config => config,
	error => Promise.reject(error)
)
