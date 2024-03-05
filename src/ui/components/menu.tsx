import {
	useMatch,
	useMatches,
	useLocation,
	useNavigate
} from 'react-router-dom'
import { routes } from '../router/routes'
import { Menu, MenuProps } from 'antd'
import { useEffect } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

export const SideMenu = () => {
	const navigate = useNavigate()
	const loc = useLocation()
	const m = useMatch('/')

	useEffect(() => {
		console.log({ loc, wloc: window.location })
	})

	return (
		<Menu
			className='side-menu'
			selectedKeys={[
				Object.entries(routes).find(r => r[1].path === loc.hash)?.[0] ?? null
			]}
			items={Object.entries(routes)
				.filter(x => x[1].show)
				.map(
					([key, route]) =>
						({
							title: route.name,
							icon: route.icon,
							label: route.name,
							key: key,
							onClick: () =>
								navigate(route.path, {
									replace: true
								})
						} as MenuItem)
				)}
		/>
	)
}
