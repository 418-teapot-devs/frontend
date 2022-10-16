import React from "react"
import App from "./App"
import { getByTestId, render,  screen  } from "@testing-library/react"
import userEvent from '@testing-library/user-event';


test("Renders title and table", () => {
  const { getByText } = render(
      <App />
  )
  expect(screen.getByText(/PyRobots/i)).toBeInTheDocument()
  expect(screen.getByTestId('iniciated-matches')).toBeInTheDocument()
})
