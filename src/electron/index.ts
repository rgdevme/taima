import { BrowserWindow, Menu, Tray, app, ipcMain, ipcRenderer } from 'electron'
import { initWindow } from './window'
import { initTray } from './tray'
import '../utils/moment'
import { startServer } from '../server'

let customWindow: BrowserWindow
let tray: Tray

const expressApp = startServer()
app.dock.hide()
app.whenReady().then(() => {
	customWindow = initWindow()
	tray = initTray(customWindow)
})

app.on('before-quit', e => {
	expressApp.close(() => console.log('Server closed'))
})

ipcMain.on('exit-app', () => app.exit())
