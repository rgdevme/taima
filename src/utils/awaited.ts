export const awaited = (f: Function) =>
	new Promise<void>((res, rej) => {
		if (!!f) {
			f()
			res()
		} else rej('no object')
	})
