let listeners = []

let loadingCount = 0

const notify = () => {
	listeners.forEach((cb) => cb(loadingCount > 0))
}

const loaderService = {
	subscribe(cb) {
		listeners.push(cb)
		return () => {
			listeners = listeners.filter((l) => l !== cb)
		}
	},

	show() {
		loadingCount++
		notify()
	},

	hide() {
		loadingCount = Math.max(0, loadingCount - 1)
		notify()
	},
}

export default loaderService
