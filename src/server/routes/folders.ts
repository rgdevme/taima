import { Router } from 'express'
import { instance } from '../axios'
import { FoldersResult } from '../../types/folder'
import { config } from '../config'

const folders = Router()

folders.route('/').get(async (req, res) => {
	try {
		const { data } = await instance.get<FoldersResult>(
			`space/${config.space_client}/folder`
		)
		res.json(data.folders)
	} catch (error) {
		res.json(error)
	}
})

export { folders }
