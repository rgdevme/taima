import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { router } from './routes'

const port = 8081

export const startServer = () => {
	const expressApp = express()
	expressApp.use(bodyParser.json())
	expressApp.use(cors())
	expressApp.use('/', router)

	return expressApp.listen(port, () => {
		console.log(`🚀 https://localhost:${port}`)
	})
}
