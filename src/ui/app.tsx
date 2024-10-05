import { routes } from './router/routes'
import { SideMenu } from './components/menu'
import { Footer } from './components/footer'
import { theme as t } from '../../tailwind.config.js'
import { ThemeProvider } from '@emotion/react'
import { AppContext } from './context/app'
import '../common/utils/moment'
import { Route, Router } from 'electron-router-dom'

const theme = t.extend

export default () => (
  <AppContext>
    <ThemeProvider theme={theme}>
      <Router
        main={
          <>
            {/* <SideMenu /> */}
            <Route {...routes.config} />
            <Route {...routes.details} />
            <Route {...routes.error} />
            {/* <Footer /> */}
          </>
        }
      />
    </ThemeProvider>
  </AppContext>
)
