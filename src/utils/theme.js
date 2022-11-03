import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  red,
  grey,
  blue,
  deepOrange
} from "@mui/material/colors"

// mock all
// const { worker } = require('./mocks/browser')
// worker.start()

export const lightModeTheme = createTheme({
  palette: {
    mode: 'light',

    primary: { // botones
      main: '#4F8F55',
    },
    background: {
      main: grey[400],     // fondo
      paper: '#fff', // catitas
      light: grey[100], // cartitas sobrepuestas
      default: grey[100], // header de tablas
    },
  },
})

export const darkModeTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: { // botones
      main: '#4F8F55',
    },
    background: {
      main: '#000',     // fondo
      paper: grey[900], // catitas
      light: grey[800], // cartitas sobrepuestas
      default: grey[800], // header de tablas
    },
    error: {
      main: red[200],
    },
    text: {
      primary: "#fff",
      secondary: grey[400],
    }
  },
})

export const stringToColor = (string) => {
  let hash = 0
  let i

  string = string + "123" + string

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}
