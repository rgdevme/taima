import { User } from './user'

export namespace Space {
	export interface Root {
		spaces: Space[]
	}

	export interface Space {
		id: string
		name: string
		color: string
		private: boolean
		avatar: any
		admin_can_manage: boolean
		statuses: Status[]
		multiple_assignees: boolean
		features: Features
		archived: boolean
		members?: Member[]
	}

	export interface Status {
		id: string
		status: string
		type: string
		orderindex: number
		color: string
	}

	export interface Features {
		due_dates: DueDates
		sprints: Sprints
		time_tracking?: TimeTracking
		points: Points
		custom_items: CustomItems
		priorities: Priorities
		tags: Tags
		time_estimates?: TimeEstimates
		check_unresolved: CheckUnresolved
		zoom: Zoom
		milestones: Milestones
		custom_fields: CustomFields
		remap_dependencies?: RemapDependencies
		dependency_warning: DependencyWarning
		status_pies: StatusPies
		multiple_assignees: MultipleAssignees
		wip_limits?: WipLimits
	}

	export interface DueDates {
		enabled: boolean
		start_date: boolean
		remap_due_dates: boolean
		remap_closed_due_date: boolean
	}

	export interface Sprints {
		enabled: boolean
	}

	export interface TimeTracking {
		enabled: boolean
		harvest: boolean
		rollup: boolean
	}

	export interface Points {
		enabled: boolean
	}

	export interface CustomItems {
		enabled: boolean
	}

	export interface Priorities {
		enabled: boolean
		priorities: Priority[]
	}

	export interface Priority {
		color: string
		id: string
		orderindex: string
		priority: string
	}

	export interface Tags {
		enabled: boolean
	}

	export interface TimeEstimates {
		enabled: boolean
		rollup: boolean
		per_assignee: boolean
	}

	export interface CheckUnresolved {
		enabled: boolean
		subtasks: any
		checklists: any
		comments: any
	}

	export interface Zoom {
		enabled: boolean
	}

	export interface Milestones {
		enabled: boolean
	}

	export interface CustomFields {
		enabled: boolean
	}

	export interface RemapDependencies {
		enabled: boolean
	}

	export interface DependencyWarning {
		enabled: boolean
	}

	export interface StatusPies {
		enabled: boolean
	}

	export interface MultipleAssignees {
		enabled: boolean
	}

	export interface WipLimits {
		enabled: boolean
	}

	export interface Member {
		user: User.User
	}
}
