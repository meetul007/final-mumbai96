import axios from 'axios'
import loaderService from './loader'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// REQUEST
api.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			loaderService.show()

			const token = localStorage.getItem('owner_token')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
		}

		return config
	},
	(error) => {
		if (typeof window !== 'undefined') {
			loaderService.hide()
		}
		return Promise.reject(error)
	},
)

// RESPONSE
api.interceptors.response.use(
	(response) => {
		if (typeof window !== 'undefined') {
			loaderService.hide()
		}
		return response
	},
	(error) => {
		if (typeof window !== 'undefined') {
			loaderService.hide()

			if (error.response?.status === 401) {
				localStorage.removeItem('owner_token')
				window.location.href = '/auth/login'
			}
		}

		return Promise.reject(error)
	},
)

export default api
