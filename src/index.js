import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  red,
  grey,
  purple,
  pink,
  orange,
  deepOrange,
  blue,
  green,
  teal
} from "@mui/material/colors"

// mock all
const { worker } = require('./mocks/browser')
worker.start()

const darkModeTheme = createTheme({
  palette: {
    primary: {
      main: '#4F8F55' , // botones
    },
    surface: [
      '#000',
      grey[900],
      "#5555",
    ],
    background: {
      paper: grey[900], // cards
      default: grey[500], // personita de avatares y header de tablas
    },
    text: {
      primary: "#fff",
      secondary: [300],
    },
    error: {
      main: red[300],
    }
  },
})

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkModeTheme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
