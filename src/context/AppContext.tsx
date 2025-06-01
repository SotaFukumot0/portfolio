import { createContext, useContext } from "react"

export type WebGPUStatus = "checking" | "supported" | "unsupported"

type AppContextType = {
  webGPUStatus: WebGPUStatus
  setWebGPUStatus: (status: WebGPUStatus) => void
}

export const AppContext = createContext<AppContextType>({
  webGPUStatus: "checking",
  setWebGPUStatus: () => {},
})

export const useAppContext = () => useContext(AppContext)
