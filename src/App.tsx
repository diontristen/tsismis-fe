import '@mantine/core/styles.css';
import '@/styles/global.css';
import { MantineProvider } from '@mantine/core'
import AppRouter from './route';
import { theme } from '@/styles/theme';
function App() {
  return (
    <>
      <MantineProvider
      theme={theme} 
      withCssVariables
      defaultColorScheme='dark'>
        <AppRouter />
      </MantineProvider>
    </>
  )

}

export default App
