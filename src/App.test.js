import React from "react"
import App from "./App"
import { render,  screen  } from "@testing-library/react"
import userEvent from '@testing-library/user-event';


test("renders titles and buttons", () => {
  const { getByText } = render(
      <App />
  )

  expect(screen.getByText(/PyRobots/i)).toBeInTheDocument()
  expect(screen.getByText(/Crear Partida/i)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument()

})
