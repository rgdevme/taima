import { Router } from 'express'
import {
	EntriesResult,
	Entry,
	EntryData,
	EntryGet,
	EntryPost
} from '../../types/entries'
import { instance } from '../axios'
import { config } from '../config'
import dayjs from 'dayjs'

const entries = Router()

const methods = {
	create: (team_id, entry) => [
		'post',
		`/team/${team_id}/time_entries`,
		{
			description: entry.description,
			start: entry.start,
			duration: entry.duration,
			tid: entry.task_id,
			tags: [],
			billable: false,
			assignee: config.assignee
		}
	],
	update: (team_id, entry) => [
		'put',
		`/team/${team_id}/time_entries/${entry.id}`,
		{
			description: entry.description,
			start: entry.start,
			end: dayjs(entry.start).add(entry.duration, 'milliseconds').valueOf(),
			duration: entry.duration,
			tid: entry.task_id,
			tags: [],
			tag_action: 'add',
			billable: false
		}
	],
	delete: (team_id, entry) => [
		'delete',
		`/team/${team_id}/time_entries/${entry.id}`,
		null
	]
} as {
	[k: string]: (
		team_id: number,
		entry: EntryData
	) => [string, string, { [k: string]: any } | null]
}

entries
	.route('/')
	.get(async (req: EntryGet, res) => {
		const today = dayjs()

		const {
			end_date = today.endOf('day').valueOf(),
			start_date = today.startOf('day').valueOf()
		} = req.query

		try {
			const {
				data: { data }
			} = await instance.get<EntriesResult>(
				`/team/${config.team_id}/time_entries`,
				{
					params: {
						start_date,
						end_date,
						assignee: config.assignee
					}
				}
			)
			res.json(data)
		} catch (error) {
			res.json(error)
		}
	})
	// .post(async (req: EntryPost, res) => {
	// 	try {
	// 		if (!req.body) throw new Error('empty body')

	// 		const entriesData = req.body
	// 		setTimeout(() => res.json(entriesData), 300)
	// 	} catch (error) {
	// 		res.json(error)
	// 	}
	// })
	.post(async (req: EntryPost, res) => {
		try {
			if (!req.body) throw new Error('empty body')

			const entriesData = req.body

			console.log(req.body)

			const promises = entriesData.map(async entryData => {
				const [method, url, body] = methods[entryData.status](
					config.team_id,
					entryData
				)
				console.log(method, url)
				const {
					data: { data }
				} = await instance[method]<EntriesResult>(url, body)
				return data as Entry
			})

			const result = await Promise.all(promises)
			res.json(result)
		} catch (error) {
			res.json(error)
		}
	})

export { entries }
