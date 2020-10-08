const {app, ipcMain} = require('electron')
const {readFile, writeFile} = require('./file')

const TIME_DATA_PATH = 'S:/DATA/ac_time/record.json'

let record
let window

const saveRecord = () => {
	return writeFile(TIME_DATA_PATH, record)
}

ipcMain.on('load',  async (event) => {
	let interval = setInterval(() => {
		if (record) {
			event.reply('data-record', record)
			clearInterval(interval)
		}
	}, 100)
})
ipcMain.on('update',  async (event, data) => {
	record.data = data
	saveRecord().then(() => {
		event.reply('data-record', record)
	})
})
ipcMain.on('close',  async (event, data) => {
	record.data = data
	saveRecord().then(() => {
		app.quit()
	})
})
ipcMain.on('notice-passTime',  async (event, passTime) => {
	let progress = passTime / (1000 * 60 * 60 * 8)
	let value = progress >= 1 ? 1 : (progress % 0.5) * 2
	let mode = progress > 0.5 ? 'normal' : 'paused'
	window.setProgressBar(value, {mode})
})


const start = async (win) => {
	record = await readFile(TIME_DATA_PATH)
	if (!record.data) record.data = []
	window = win
}

module.exports = start