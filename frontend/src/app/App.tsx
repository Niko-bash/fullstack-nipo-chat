import { ROUTER_CONFIG } from '@/shared/config/router-config'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Link, Outlet } from 'react-router'

function App() {
	return (
		<MantineProvider>
			<div>
				<header>
					<nav>
						<Link to={ROUTER_CONFIG.HOME_PAGE}>main</Link>
						<Link to={ROUTER_CONFIG.SETTINGS_PAGE}>settings</Link>
					</nav>
				</header>
				<main>
					<Outlet />
				</main>
			</div>
		</MantineProvider>
	)
}

export default App
