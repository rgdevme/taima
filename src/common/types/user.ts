export interface UserResult {
	user: User
}

export interface User {
	id: number
	username: string
	email: string
	color: string
	profilePicture: string
	initials: string
	week_start_day: number
	global_font_support: boolean
	timezone: string
}
