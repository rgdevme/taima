import { List } from './list'

export interface FoldersResult {
	folders: Folder[]
}

export interface Folder {
	id: string
	name: string
	orderindex: number
	override_statuses: boolean
	hidden: boolean
	space: {
		id: string
		name: string
	}
	task_count: string
	archived: boolean
	statuses: {
		id: string
		status: string
		type: string
		orderindex: number
		color: string
	}[]
	lists: List.List[]
	permission_level: string
}
