export interface ListRestul {
	lists: List[]
}

export interface List {
	id: string
	name: string
	orderindex: number
	content?: string
	status: Status
	priority: any
	assignee: any
	task_count: number
	due_date: any
	start_date: any
	folder: Folder
	space: Space
	archived: boolean
	override_statuses: boolean
	permission_level: string
}

interface Status {
	status: string
	color: string
	hide_label: boolean
}

interface Folder {
	id: string
	name: string
	hidden: boolean
	access: boolean
}

interface Space {
	id: string
	name: string
	access: boolean
}
