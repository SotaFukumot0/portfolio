import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sandbox from './Sandbox.tsx'
// @ts-ignore
import Maintenance from './Maintenance.tsx'
import DrawerUI from './DrawerUI.tsx'
import DialogUI from './DialogUI.tsx'
import UnityPage from './UnityPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Maintenance /> */}
    <UnityPage/>
    <DrawerUI/>
    <DialogUI/>
  </StrictMode>,
)
