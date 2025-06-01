import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// @ts-ignore
import Sandbox from './Sandbox.tsx'
// @ts-ignore
import Maintenance from './Maintenance.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Maintenance /> */}
    <App />
  </StrictMode>,
)
