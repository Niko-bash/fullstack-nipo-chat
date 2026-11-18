import { MainPage } from '@/pages/main.page'
import { SettingsPage } from '@/pages/settings.page'
import { ROUTER_CONFIG } from '@/shared/config/router-config'
import { createBrowserRouter } from 'react-router'
import App from '../App'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ index: true, Component: MainPage },
			{ path: ROUTER_CONFIG.SETTINGS_PAGE, Component: SettingsPage }
		]
	}
])
