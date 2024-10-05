import { Request } from 'express'

export interface EntriesResult {
	data: Entry[]
}

export interface EntryData {
	description: string
	duration: number
	start: number
	id: string
	task_id: string
	task_name: string
	status: 'create' | 'update' | 'delete' | null
	weekDay: string
	date: string
	hours: number
}

export type EntryGet = Request<
	null,
	null,
	null,
	{ start_date: number; end_date: number }
>
export type EntryPost = Request<null, null, EntryData[]>

export interface Entry {
	id: string
	task: Task
	wid: string
	user: User
	billable: boolean
	start: string
	end: string
	duration: string
	description: string
	tags: any[]
	source: string
	at: string
	task_location: TaskLocation
	task_url: string
}

interface Task {
	id: string
	name: string
	status: Status
	custom_type: any
}

interface Status {
	status: string
	color: string
	type: string
	orderindex: number
}

interface User {
	id: number
	username: string
	email: string
	color: string
	initials: string
	profilePicture: string
}

interface TaskLocation {
	list_id: string
	folder_id: string
	space_id: string
}
