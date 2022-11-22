import React from "react"
import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { renderWithProviders } from "../../utils/testUtils"
import RecoverPassword from "./RecoverPassword"

test("should show ResetPasswordForm", async () => {
  const window_location = window.location
  delete window.location
  window.location = { search: "?token=somevalidresettoken" }

  renderWithProviders(<RecoverPassword />)

  expect(await screen.findByTestId("reset-password-form")).toBeInTheDocument()

  window.location = window_location
})

test("should show RecoverPasswordForm", async () => {
  renderWithProviders(<RecoverPassword />)

  expect(await screen.findByTestId("recover-password-form")).toBeInTheDocument()
})
