import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sandbox from './Sandbox.tsx'
// @ts-ignore
import Maintenance from './Maintenance.tsx'
import DrawerUI from './DrawerUI'
import DialogUI from './DialogUI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Maintenance /> */}
    <DrawerUI/>
    <DialogUI/>
  </StrictMode>,
)
