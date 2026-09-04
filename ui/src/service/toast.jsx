const isBrowser = typeof window !== 'undefined'

const getToast = async () => {
	if (!isBrowser) return null
	const mod = await import('react-toastify')
	return mod.toast
}

const toastService = {
	success: async (message) => {
		const toast = await getToast()
		toast?.success(message, {
			position: 'top-right',
			autoClose: 3000,
		})
	},

	error: async (message) => {
		const toast = await getToast()
		toast?.error(message, {
			position: 'top-right',
			autoClose: 4000,
		})
	},

	info: async (message) => {
		const toast = await getToast()
		toast?.info(message, {
			position: 'top-right',
			autoClose: 3000,
		})
	},

	warn: async (message) => {
		const toast = await getToast()
		toast?.warning(message, {
			position: 'top-right',
			autoClose: 3000,
		})
	},
}

export default toastService
