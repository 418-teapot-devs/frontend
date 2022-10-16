import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Register } from "./Register"
import React from "react"

/* 
req, an information about a matching request;
res, a functional utility to create the mocked response;
ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.
*/

export const handlers = [

  rest.post("http://localhost:8000/users/", async (req, res, ctx) => {

    // const body = await req.body()
    // if (body.name === "avatar") {
    //   return res(ctx.status(200), ctx.delay(150))
    // } else {
    //   return res(ctx.status(500), ctx.delay(150))
    // };

    const username = await req.params['username'];

    if (username === "username") {
      return res(
        ctx.status(200),
        ctx.delay(150)
      )
    } else if (username.username === "takenUsername") {
      return res(
        ctx.status(409),
        ctx.delay(150)
      )
    } else {
      return res(
        ctx.status(500),
        ctx.delay(150)
      )
    }
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// All inputs are correct
test("should register", async () => {
  const user = userEvent.setup()
  render(<Register />);

  await user.click(screen.getByRole("button", { name: "Subir avatar" }))
  await user.upload(screen.getByLabelText("avatar"), new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" }))

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("username")

  await user.click(screen.getByLabelText("Correo electrónico"))
  await user.keyboard("username@gmail.com")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByRole("button", { name: /Registrarse/i }))

  expect(await screen.findByText(/Se creó el usuario con éxito/i)).toBeInTheDocument()
});

// Incorrect inputs: taken username no avatar
test("taken username no avatar", async () => {
  const user = userEvent.setup()
  render(<Register />);

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("takenUsername")

  await user.click(screen.getByLabelText("Correo electrónico"))
  await user.keyboard("username@gmail.com")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByRole("button", { name: /Registrarse/i }))

  expect(await screen.findByText(/El correo electrónico o nombre de usuario ya está en uso/i)).toBeInTheDocument()
})

// Incorrect inputs: wrong password
test("wrong password fixes should register", async () => {
  const user = userEvent.setup()
  render(<Register />);

  await user.click(screen.getByRole("button", { name: "Subir avatar" }))
  await user.upload(screen.getByLabelText("avatar"), new File(["(⌐□_□)"], "image.png", { type: "image/png" }))
  // how to test if image is uploaded?

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("username")

  await user.click(screen.getByLabelText("Correo electrónico"))
  await user.keyboard("username@gmail.com")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Pass")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Pass")

  await user.click(screen.getByRole("button", { name: /Registrarse/i }))

  expect(await screen.findByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument()

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Password")

  expect(await screen.findByText(/La contraseña debe tener al menos un número/i)).toBeInTheDocument()

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Password2")

  expect(await screen.findByText(/Las contraseñas no coinciden/i)).toBeInTheDocument()

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByRole("button", { name: /Registrarse/i }))

  expect(await screen.findByText(/Se creó el usuario con éxito/i)).toBeInTheDocument()
})

// Unknown error
test("unknown error", async () => {
  const user = userEvent.setup()
  render(<Register />);

  await user.click(screen.getByRole("button", { name: "Subir avatar" }))
  await user.upload(screen.getByLabelText("avatar"), new File(["(⌐□_□)"], "image.png", { type: "image/png" }))
  // how to test if the image is uploaded?

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("error")

  await user.click(screen.getByLabelText("Correo electrónico"))
  await user.keyboard("username@gmail.com")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Password1")

  await user.click(screen.getByRole("button", { name: /Registrarse/i }))

  expect(await screen.findByText(/No se pudo crear el usuario/i)).toBeInTheDocument()
})