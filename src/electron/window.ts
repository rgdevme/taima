import { BrowserWindow, Tray } from 'electron'
import isDev from 'electron-is-dev'
import { createFileRoute } from 'electron-router-dom'
import { join } from 'path'

const createWindow = () =>
	new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: isDev
		},
		frame: false,
		movable: true,
		minimizable: false,
		closable: false,
		resizable: false,
		fullscreenable: false,
		maximizable: false,
		roundedCorners: true,
		thickFrame: false,
		show: false,
		skipTaskbar: true
	})

export const toggleWindow = (customWindow: BrowserWindow, tray?: Tray) => {
	if (customWindow.isVisible()) customWindow.hide()
	else if (tray) {
		const t = tray.getBounds()
		const w = customWindow.getBounds()

		customWindow.setPosition(t.x + t.width - w.width, t.y + t.height + 16)
		customWindow.show()
		customWindow.focus()
		// positioner.position(customWindow, tray.getBounds(), { x: 'center', y: 'center' })
	}
}

export const initWindow = () => {
	let customWindow = createWindow()

	// if (isDev) customWindow.loadURL('http://localhost:3000')
	// else customWindow.loadFile('.dist/ui/index.html')
	const fileRoute = createFileRoute('.dist/ui/index.html', 'main')
	customWindow.loadFile(...fileRoute)

	// customWindow.on('hide', () => customWindow.webContents.closeDevTools())
	// customWindow.on('show', () =>
	// 	customWindow.webContents.openDevTools({ mode: 'right' })
	// )
	customWindow.on('closed', () => (customWindow = null))
	customWindow.on('blur', () => toggleWindow(customWindow))

	// app.on('customWindow-all-closed', () => {
	// 	if (process.platform !== 'darwin') app.quit()
	// })
	// app.on('activate', () => {
	// 	if (customWindow === null) createWindow(app, customWindow)
	// })

	return customWindow
}
