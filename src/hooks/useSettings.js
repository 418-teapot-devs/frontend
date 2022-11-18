import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage("settings", {
    darkMode: true,
  })

  const toggleDarkMode = () =>
    setSettings({ ...settings, darkMode: !settings.darkMode })

  const value = useMemo(
    () => ({
      settings,
      toggleDarkMode,
    }),
    // TODO: Read more about useMemo and useCallback
    // eslint-disable-next-line
    [settings]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  return useContext(SettingsContext)
}
