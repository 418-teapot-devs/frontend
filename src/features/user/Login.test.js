import { getByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Login } from "./Login"
import React from "react"
import { renderWithProviders } from "../../utils/testUtils"

import { server } from "../../mocks/server"


test("Should display error in form", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Login />)
  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("a")

  await user.click(screen.getByRole("button", { name: "Iniciar Sesión" }))
  expect(
    screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)
  ).toBeInTheDocument()

  expect(
    screen.getByText(/El nombre de usuario es requerido/i)
  ).toBeInTheDocument()
})

test("Should redirect if login is correct", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Login />)

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("user")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("password")

  await user.click(screen.getByRole("button", { name: "Iniciar Sesión" }))
  
  await waitFor(() => {
    expect(window.location.pathname).toBe(`/`)
  })
})


