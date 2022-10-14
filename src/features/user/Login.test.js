import { rest } from "msw"
import { setupServer } from "msw/node"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Login } from "./Login"
import { Profile } from "./Profile"
import React from "react"
import { renderWithProviders } from "../../utils/testUtils"


export const handlers = [
  rest.post("http://127.0.0.1:8000/users/login", async (req, res, ctx) => {
    const body = await req.json()
    if (body.username === "username") {
      return res(
        ctx.json({
          token: "tokenblablabla"
        }),
        ctx.status(200),
        ctx.delay(150)
      )
    } else {
      return res(
        ctx.status(409),
        ctx.delay(150)
      )
    }
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("should login", async () => {
  const user = userEvent.setup()
  renderWithProviders(
    <React.Fragment>
      <Login />
      <Profile />
    </React.Fragment>
  )

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("username")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("password")

  await user.click(screen.getByRole("button", { name: "Login" }))

  expect(await screen.findByText(/Token: tokenblablabla/i)).toBeInTheDocument()
})

test("should not login", async () => {
  const user = userEvent.setup()
  renderWithProviders(
    <React.Fragment>
      <Login />
      <Profile />
    </React.Fragment>
  )

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("usernamethatdoesnotexists")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("password")

  await user.click(screen.getByRole("button", { name: "Login" }))

  expect(screen.queryByText(/Token: tokenblablabla/i)).toBeNull()
})
