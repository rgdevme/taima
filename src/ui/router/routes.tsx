import { Config } from '../pages/config'
import {
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from 'react-icons/ai'
import { Daily } from '../pages/daily'

export const routes = {
  details: {
    path: '/',
    name: 'Details',
    icon: <AiOutlineClockCircle />,
    element: <Daily />,
    show: true,
    index: true,
  },
  config: {
    path: '/config',
    name: 'Config',
    icon: <AiOutlineSetting />,
    element: <Config />,
    show: true,
  },
  error: {
    path: '*',
    name: '404',
    icon: <AiOutlineCloseCircle />,
    element: <div>404</div>,
    show: false,
  },
}
