import { screen } from "@testing-library/react"
import { rest } from "msw"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../utils/testUtils"
import { setupServer } from "msw/lib/node"

import { Profile } from "./Profile"
import React from "react"

export const handlers = [
  rest.put("http://127.0.0.1:8000/users/password/", async (req, res, ctx) => {
    const request = await req.json()
    const old_password = request.old_password
    const new_password = request.new_password

    if (old_password === "Password1" && new_password === "Password2") {
      return res(ctx.status(200), ctx.delay(150))
    } else if (old_password === "Password1" && new_password === "Password1") {
      return res(ctx.status(409), ctx.delay(150))
    } else if (old_password === "WrongPassword1" && new_password === "Password2") {
      return res(ctx.status(401), ctx.delay(150))
    }
    return res(ctx.status(404), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

const providers = {
  user: {
    profile: {
      username: "usuario",
      email: "usuario@gmail.com",
      avatar: "",
    },
  },
}

test("should show user information", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Profile />, { preloadedState: providers })

  expect(
    screen.getByText("Nombre de usuario: @" + providers.user.profile.username)
  ).toBeInTheDocument()

  expect(
    screen.getByText("Correo electrónico: " + providers.user.profile.email)
  ).toBeInTheDocument()
})

test("should change password", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Profile />, { preloadedState: providers })

  await user.click(screen.getByLabelText("Contraseña actual *"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Nueva contraseña *"))
  await user.keyboard("Password2")

  await user.click(screen.getByLabelText("Reingrese la nueva contraseña *"))
  await user.keyboard("Password2")

  await user.click(screen.getByRole("button", { name: /Cambiar contraseña/i }))

  expect(
    await screen.findByText(/Contraseña cambiada con éxito/i)
  ).toBeInTheDocument()
})

// wrong current password
test("should not change password, wrong current password", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Profile />, { preloadedState: providers })

  await user.click(screen.getByLabelText("Contraseña actual *"))
  await user.keyboard("WrongPassword1")

  await user.click(screen.getByLabelText("Nueva contraseña *"))
  await user.keyboard("Password2")

  await user.click(screen.getByLabelText("Reingrese la nueva contraseña *"))
  await user.keyboard("Password2")

  await user.click(screen.getByRole("button", { name: /Cambiar contraseña/i }))

  expect(
    await screen.findByText(/La contraseña actual es incorrecta/i)
  ).toBeInTheDocument()
})

// current password is the same as new one
test("should not change password, same old password", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Profile />, { preloadedState: providers })

  await user.click(screen.getByLabelText("Contraseña actual *"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Nueva contraseña *"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Reingrese la nueva contraseña *"))
  await user.keyboard("Password1")

  await user.click(screen.getByRole("button", { name: /Cambiar contraseña/i }))

  expect(
    await screen.findByText(/La contraseña nueva es igual a la actual/i)
  ).toBeInTheDocument()
})

// internal server error
test("should not change password, unknown error", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Profile />, { preloadedState: providers })

  await user.click(screen.getByLabelText("Contraseña actual *"))
  await user.keyboard("ErrorPswd1")

  await user.click(screen.getByLabelText("Nueva contraseña *"))
  await user.keyboard("ErrorPswd2")

  await user.click(screen.getByLabelText("Reingrese la nueva contraseña *"))
  await user.keyboard("ErrorPswd2")

  await user.click(screen.getByRole("button", { name: /Cambiar contraseña/i }))

  expect(
    await screen.findByText(/Error al cambiar la contraseña/i)
  ).toBeInTheDocument()
})