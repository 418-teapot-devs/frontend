import { findAllByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { RegisterPage } from "./RegisterPage"
import React from "react"
import { renderWithProviders } from "../utils/testUtils"

test("Component is rendered", async () => {
  renderWithProviders(<RegisterPage/>)
  expect(await screen.findAllByText(/Registrarse/i)).toHaveLength(2)
})

test("Already have an account", async () => {
  const user = userEvent.setup()
  renderWithProviders(<RegisterPage />)

  await user.click(screen.getByRole("button", { name: /¿Ya tienes cuenta?/i }))

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/login`)
  })
})
