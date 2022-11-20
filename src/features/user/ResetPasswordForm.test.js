import React from "react"
import { waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../utils/testUtils"
import ResetPasswordForm from "./ResetPasswordForm"

const handlers = [
  rest.put(
    "http://127.0.0.1:8000/users/reset_password/",
    async (req, res, ctx) => {
      const token = req.headers.get("token")

      if (token === "somevalidaresettoken") {
        return res(ctx.status(200))
      } else {
        return res(ctx.status(401))
      }
    }
  ),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(
    <ResetPasswordForm resetToken="somevalidaresettoken" />
  )

  await waitFor(() => user.click(screen.getByLabelText("Nueva contraseña")))

  await waitFor(() => user.keyboard("validPassword1"))

  await waitFor(() => user.click(screen.getByLabelText("Confirmar contraseña")))

  await waitFor(() => user.keyboard("validPassword1"))

  await waitFor(() => user.click(getByTestId("reset-password-form-button")))

  await waitFor(() =>
    expect(
      screen.getByText(/Se realizó el cambio de contraseña/i)
    ).toBeInTheDocument()
  )
})

test("form errors", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<ResetPasswordForm />)

  await waitFor(() => user.click(screen.getByLabelText("Nueva contraseña")))

  await waitFor(() => user.keyboard("passinv"))

  await waitFor(() => user.click(screen.getByLabelText("Confirmar contraseña")))

  await waitFor(() => user.keyboard("notequal"))

  await waitFor(() => user.click(getByTestId("reset-password-form-button")))

  await waitFor(() =>
    expect(
      screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)
    ).toBeInTheDocument()
  )

  await waitFor(() =>
    expect(
      screen.getByText(/Las contraseñas no coinciden/i)
    ).toBeInTheDocument()
  )
})


test("expired resetToken", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(
    <ResetPasswordForm resetToken="someinvalidaresettoken" />
  )

  await waitFor(() => user.click(screen.getByLabelText("Nueva contraseña")))

  await waitFor(() => user.keyboard("validPassword1"))

  await waitFor(() => user.click(screen.getByLabelText("Confirmar contraseña")))

  await waitFor(() => user.keyboard("validPassword1"))

  await waitFor(() => user.click(getByTestId("reset-password-form-button")))

  await waitFor(() =>
    expect(
      screen.getByText(/El token para recuperar contraseña ha expirado.../i)
    ).toBeInTheDocument()
  )
})
