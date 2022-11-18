import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import { SettingsProvider, useSettings } from "./hooks/useSettings"
import "./index.css"
import { ThemeProvider } from "@mui/system"
import { darkModeTheme, lightModeTheme } from "./utils/theme"

const container = document.getElementById("root")
const root = createRoot(container)

const ThemeComponent = ({ children }) => {
  const { settings } = useSettings()

  return (
    <ThemeProvider theme={settings.darkMode ? darkModeTheme : lightModeTheme}>
      {children}
    </ThemeProvider>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <ThemeComponent>
            <App />
          </ThemeComponent>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
