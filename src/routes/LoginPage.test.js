import { findAllByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { LoginPage } from "./LoginPage"
import React from "react"
import { renderWithProviders } from "../utils/testUtils"

test("Component is rendered", async () => {
  renderWithProviders(<LoginPage/>)
  expect(await screen.findByText(/Login/i)).toBeInTheDocument()
})

test("Already have an account", async () => {
  const user = userEvent.setup()
  renderWithProviders(<LoginPage />)

  await user.click(screen.getByRole("button", { name: /Crear cuenta/i }))

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/register`)
  })
})
