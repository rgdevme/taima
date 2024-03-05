import { BrowserWindow, Tray, nativeImage } from 'electron'
import { toggleWindow } from './window'

const createTray = () => {
	const icon = nativeImage.createFromPath('./src/assets/favicon_16x16.png')
	let tray = new Tray(icon)
	return tray
}

export const initTray = (customWindow: BrowserWindow) => {
	let tray = createTray()

	tray.on('click', () => toggleWindow(customWindow, tray))

	return tray
}
