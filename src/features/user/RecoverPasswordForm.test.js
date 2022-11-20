import React from "react"
import { waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../utils/testUtils"
import RecoverPasswordForm from "./RecoverPasswordForm"

const handlers = [
  rest.put("http://127.0.0.1:8000/users/recover/", async (req, res, ctx) => {
    const email = req.url.searchParams.get("email")

    if (email === "valid@mail.com") {
      return res(ctx.status(200))
    } else if (email === "invalid@mail.com") {
      return res(ctx.status(401))
    } else {
      return res(ctx.status(500))
    }
  }),
  rest.post("http://127.0.0.1:8000/users/reset/", (req, res, ctx) => {
    return res(ctx.status(201))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<RecoverPasswordForm />)

  await waitFor(() => user.click(screen.getByLabelText("Email")))

  await waitFor(() => user.keyboard("valid@mail.com"))

  await waitFor(() =>
    user.click(getByTestId("recover-password-form-email-button"))
  )

  await waitFor(() =>
    expect(
      screen.getByText(/Se envió un correo al email ingresado/i)
    ).toBeInTheDocument()
  )
})

test("should not send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<RecoverPasswordForm />)

  await waitFor(() => user.click(screen.getByLabelText("Email")))

  await waitFor(() => user.keyboard("notavalidemailstring"))

  await waitFor(() =>
    user.click(getByTestId("recover-password-form-email-button"))
  )

  await waitFor(() =>
    expect(
      screen.getByText(/Debe ingresar un email válido/i)
    ).toBeInTheDocument()
  )
})

test("should not send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<RecoverPasswordForm />)

  await waitFor(() => user.click(screen.getByLabelText("Email")))

  await waitFor(() => user.keyboard("invalid@mail.com"))

  await waitFor(() =>
    user.click(getByTestId("recover-password-form-email-button"))
  )

  await waitFor(() =>
    expect(
      screen.getByText(/El email ingresado no existe/i)
    ).toBeInTheDocument()
  )
})

test("should not send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<RecoverPasswordForm />)

  await waitFor(() => user.click(screen.getByLabelText("Email")))

  await waitFor(() => user.keyboard("servererror@mail.com"))

  await waitFor(() =>
    user.click(getByTestId("recover-password-form-email-button"))
  )

  await waitFor(() =>
    expect(
      screen.getByText(/Error del servidor, intente más tarde/i)
    ).toBeInTheDocument()
  )
})
