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
  blueGrey,
  purple,
  pink,
  orange,
  deepOrange,
  blue,
  green,
  teal
} from "@mui/material/colors"

// mock all
// const { worker } = require('./mocks/browser')
// worker.start()

const darkModeTheme = createTheme({
  palette: {
    primary: {
      main: red[400], // botones
    },
    background: {
      default: blueGrey[400], // personita de avatares y header de tablas
      paper: blueGrey[900], // cards
    },
    text: {
      primary: "#fff",
      secondary: [300],
    },
    error: {
      main: red[500],
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
