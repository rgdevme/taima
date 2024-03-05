import dayjs, { duration } from 'dayjs'
import { Entry, EntryData } from '../types/entries'
import { formatDate } from '../ui/constants'

export const processEntry = (entry: Entry): EntryData => {
	const djs = dayjs(Number(entry.start))
	const dur = duration(Number(entry.duration), 'milliseconds')
	return {
		description: entry.description,
		duration: Number(entry.duration),
		start: Number(entry.start),
		task_id: entry.task.id,
		task_name: entry.task.name,
		id: entry.id,
		status: null,
		weekDay: djs.format('dddd'),
		date: djs.format(formatDate),
		hours: dur.asHours()
	}
}

export const calculateHours = (
	entries: EntryData[]
): { [k: string]: number; total: number } =>
	entries.reduce(
		(t, e) => {
			const upd = { ...t }
			if (!(e.date in t)) t[e.date] = 0
			t[e.date] += e.hours
			t.total += e.hours
			return { ...t }
		},
		{ total: 0 }
	)
