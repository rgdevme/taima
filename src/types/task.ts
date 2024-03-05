import { Request } from 'express'

export interface TasksResult {
	tasks: Task[]
}

export interface TasksData {
	listIds: string[]
	statuses?: string[]
	date_updated_gt?: number
}

export type TasksGet = Request<null, null, null, TasksData>

export interface Task {
	id: string
	custom_id: any
	name: string
	text_content?: string
	description?: string
	status: Status
	orderindex: string
	date_created: string
	date_updated: string
	date_closed: any
	date_done: any
	archived: boolean
	creator: Creator
	assignees: Assignee[]
	watchers: any[]
	checklists: Checklist[]
	tags: Tag[]
	parent: any
	priority?: Priority
	due_date?: string
	start_date?: string
	points?: number
	time_estimate?: number
	custom_fields: CustomField[]
	dependencies: any[]
	linked_tasks: any[]
	team_id: string
	url: string
	sharing: Sharing
	permission_level: string
	list: List
	project: Project
	folder: Folder
	space: Space
	time_spent?: number
}

interface Status {
	status: string
	color: string
	type: string
	orderindex: number
}

interface Creator {
	id: number
	username: string
	color?: string
	email: string
	profilePicture?: string
}

interface Assignee {
	id: number
	username: string
	color?: string
	initials: string
	email: string
	profilePicture?: string
}

interface Checklist {
	id: string
	task_id: string
	name: string
	date_created: string
	orderindex: number
	creator: number
	resolved: number
	unresolved: number
	items: Item[]
}

interface Item {
	id: string
	name: string
	orderindex: number
	assignee: any
	group_assignee: any
	resolved: boolean
	parent: any
	date_created: string
	children: any[]
}

interface Tag {
	name: string
	tag_fg: string
	tag_bg: string
	creator: number
}

interface Priority {
	color: string
	id: string
	orderindex: string
	priority: string
}

interface CustomField {
	id: string
	name: string
	type: string
	type_config: TypeConfig
	date_created: string
	hide_from_guests: boolean
	required?: boolean
	value: any
}

interface TypeConfig {
	options?: Option[]
	count?: number
	code_point?: string
	simple?: boolean
	formula?: string
	new_drop_down?: boolean
	single_user?: boolean
	include_groups: any
	include_guests?: boolean
	include_team_members?: boolean
	tracking?: Tracking
	complete_on?: number
	subtask_rollup?: boolean
	default?: number
	placeholder: any
}

interface Option {
	id: string
	name?: string
	color?: string
	orderindex?: number
	label?: string
}

interface Tracking {
	subtasks: boolean
	checklists: boolean
	archived_subtasks: boolean
	assigned_comments: boolean
}

interface Sharing {
	public: boolean
	public_share_expires_on: any
	public_fields: string[]
	token: any
	seo_optimized: boolean
}

interface List {
	id: string
	name: string
	access: boolean
}

interface Project {
	id: string
	name: string
	hidden: boolean
	access: boolean
}

interface Folder {
	id: string
	name: string
	hidden: boolean
	access: boolean
}

interface Space {
	id: string
}
