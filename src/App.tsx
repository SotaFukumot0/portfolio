import { useEffect, useState } from 'react'
import UnityPage from './UnityPage'
import DrawerUI from './DrawerUI'
import DialogUI from './DialogUI'
import SimplePage from './SimplePage'
import { ThemeProvider, useTheme, getCurrentTheme } from './components/theme-provider'
import { AppContext, WebGPUStatus } from './context/AppContext'

const App = () => {
  const { setTheme } = useTheme()
  const [initialized, setInitialized] = useState(false)
  const [webGPUStatus, setWebGPUStatus] = useState<WebGPUStatus>('checking')

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const themeParam = urlParams.get('theme')
      if (themeParam === 'dark' || themeParam === 'light') {
        setTheme(themeParam)
        localStorage.setItem('vite-ui-theme', themeParam)
      }else{
        localStorage.removeItem('vite-ui-theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
        localStorage.setItem('vite-ui-theme', prefersDark ? 'dark' : 'light')
      }
      //webgpu
      if (!('gpu' in navigator)) {
        setWebGPUStatus('unsupported')
      } else {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter()
          setWebGPUStatus(adapter ? 'supported' : 'unsupported')
        } catch {
          setWebGPUStatus('unsupported')
        }
      }
      setInitialized(true)
    }

    init()
  }, [])

  if (!initialized) return null
  return (
    <ThemeProvider defaultTheme={getCurrentTheme()}>
      <AppContext.Provider value={{ webGPUStatus, setWebGPUStatus }}>
        {webGPUStatus === 'unsupported' ? (
          <SimplePage />
        ) : (
          <UnityPage />
        )}  
        <DrawerUI />
        <DialogUI />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App
