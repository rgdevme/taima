import { Config } from '../pages/config'
import {
	CloseCircleOutlined,
	ClockCircleOutlined,
	SettingFilled,
	SettingOutlined
} from '@ant-design/icons'
import { Daily } from '../pages/daily'

export const routes = {
	details: {
		path: '/',
		name: 'Details',
		icon: <ClockCircleOutlined />,
		element: <Daily />,
		show: true,
		index: true
	},
	config: {
		path: '/config',
		name: 'Config',
		icon: <SettingOutlined />,
		element: <Config />,
		show: true
	},
	error: {
		path: '*',
		name: '404',
		icon: <CloseCircleOutlined />,
		element: <div>404</div>,
		show: false
	}
}
