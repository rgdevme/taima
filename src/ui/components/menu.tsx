import {
  useMatch,
  useMatches,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { routes } from '../router/routes'
import { ActionIcon, Menu, Tooltip } from '@mantine/core'
import { useEffect } from 'react'

const { Item, Dropdown } = Menu

export const SideMenu = () => {
  const navigate = useNavigate()
  const loc = useLocation()
  const m = useMatch('/')

  useEffect(() => {
    console.log({ loc, wloc: window.location })
  })

  return (
    <Menu>
      {/* selectedKeys={[
      		Object.entries(routes).find(r => r[1].path === loc.hash)?.[0] ?? null,
      	]} */}
      <Dropdown>
        {Object.entries(routes)
          .filter(x => x[1].show)
          .map(([key, route]) => (
            <Item key={key}>
              <Tooltip label={route.name}>
                <ActionIcon
                  onClick={() =>
                    navigate(route.path, {
                      replace: true,
                    })
                  }
                >
                  {route.icon}
                </ActionIcon>
              </Tooltip>
            </Item>
          ))}
      </Dropdown>
    </Menu>
  )
}
