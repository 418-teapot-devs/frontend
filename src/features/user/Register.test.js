import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Register } from "./Register"
import React from "react"
//import { renderWithProviders } from "../../utils/testUtils"

/* 
req, an information about a matching request;
res, a functional utility to create the mocked response;
ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.
*/

export const handlers = [

  rest.post("http://localhost:8000/users/", async (req, res, ctx) => {

    const data = await req.params();
    const username = req.params['username'];

    //const pageParams = new URLSearchParams(window.location.search)
    //const username = pageParams.get('username')

    console.log(username)
    if (username === "lmaooo") {
      return res(
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

test("should register", async () => {
  const user = userEvent.setup()
  render(<Register />)

  // await user.click(screen.getByRole("button", { name: "Subir un avatar" }))
  // await user.upload(screen.getByLabelText("avatar"), new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" }))

  await user.click(screen.getByLabelText("Nombre de usuario"))
  await user.keyboard("username1")

  await user.click(screen.getByLabelText("Correo electrónico"))
  await user.keyboard("user@name.o")

  await user.click(screen.getByLabelText("Contraseña"))
  await user.keyboard("Lmao1234")

  await user.click(screen.getByLabelText("Reingrese la contraseña"))
  await user.keyboard("Lmao1234")

  await user.click(screen.getByRole("button", { name: "Registrarse" }))

  expect(await screen.findByText(/Se creó el usuario con éxito/i)).toBeInTheDocument()
});

// test("should not register", async () => {
//   const user = userEvent.setup()
//   renderWithProviders(
//     <React.Fragment>
//       <Register />
//     </React.Fragment>
//   )

//   await user.click(screen.getByRole("button", { name: "Subir un avatar" }))
//   await user.upload(screen.getByLabelText("avatar"), new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" }))

//   await user.click(screen.getByLabelText("Nombre de usuario"))
//   await user.keyboard("annaaimeri")

//   await user.click(screen.getByLabelText("Correo electrónico"))
//   await user.keyboard("jdaimeri@gmail.com")

//   await user.click(screen.getByLabelText("Contraseña"))
//   await user.keyboard("Lmao1234")

//   await user.click(screen.getByLabelText("Reingrese la contraseña"))
//   await user.keyboard("Lmao1234")

//   await user.click(screen.getByRole("button", { name: "Registrarse" }))

//   expect(screen.queryByText(/Token: tokenblablabla/i)).toBeNull()
// })