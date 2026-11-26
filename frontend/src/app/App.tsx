import { ROUTER_CONFIG } from '@/shared/config/router-config'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { Link, Outlet } from 'react-router'

function App() {
	return (
		<MantineProvider>
			<ErrorBoundary
				fallbackRender={({ error, resetErrorBoundary }) => (
					<div>
						<div>Error!!!</div>
						<div>{getErrorMessage(error)}</div>
						<button onClick={resetErrorBoundary}>Try again</button>
					</div>
				)}

				onReset={() => {
					window.location.reload()
				}}
			>
				<Layout
					header={<Header />}
					main={<Outlet />}
					footer={<div>footer</div>}
				/>
			</ErrorBoundary>
		</MantineProvider>
	)
}

export default App

const Layout = ({
	header,
	main,
	footer
}: {
	header?: React.ReactNode
	main: React.ReactNode
	footer?: React.ReactNode
}) => {
	return (
		<div className="flex flex-col min-h-screen">
			{header}
			<main className="flex flex-1">{main}</main>
			{footer}
		</div>
	)
}

const Header = () => {
	return (
		<header>
			<nav>
				<Link to={ROUTER_CONFIG.HOME_PAGE}>main</Link>
				<Link to={ROUTER_CONFIG.SETTINGS_PAGE}>settings</Link>
			</nav>
		</header>
	)
}
