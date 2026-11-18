import { Button, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { useEffect } from 'react'

function App() {
	useEffect(() => {
		const fetchTest = async () => {
			const response = await fetch('/api')

			if (!response.ok) {
				throw new Error('Error to server')
			}

			const data = await response.json()

			console.log(data)
		}

		fetchTest()
	}, [])

	return (
		<MantineProvider>
			<div>123</div>

			<Button>123</Button>
		</MantineProvider>
	)
}

export default App
