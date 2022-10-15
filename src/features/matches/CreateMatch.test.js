import React from "react"
import { render,  screen  } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { CreateMatch } from "./CreateMatch"
import { rest } from "msw"
import { setupServer } from "msw/node"

// TEST CONSTANTS
const robots = [{name: "Robot"}, {name: "Robot1"}]
const matchame = "Nombre de Partida"
const matchminp = "2"
const matchmaxp = "4"
const matchgames = "200"
const matchrounds  = "10000"
const matchpassword = "secret password"
const matchconfirm = "secret password"
const matchrobot = "Robot1"


export const handlers = [
  rest.post("http://127.0.0.1:8000/matches/created", async (req, res, ctx) => {
    const body = await req.json()
    if (body.name === "Nombre de Partida") {
      return res(
        ctx.status(200),
        ctx.delay(150)
      )
    } else {
      return res(
        ctx.status(400),
        ctx.delay(150)
      )
    }
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())


// Case where all inputs are correct
test("Should create match", async () => {
  const user = userEvent.setup()
  render(
    <CreateMatch userRobots={robots} />
  );

  await user.click(screen.getByLabelText("Nombre de la partida"))
  await user.keyboard(matchame)

  await user.click(screen.getByLabelText("Cantidad mínima de jugadores"))
  await user.keyboard(matchminp)


  await user.click(screen.getByLabelText("Cantidad máxima de jugadores"))
  await user.keyboard(matchmaxp)

  await user.click(screen.getByLabelText("Cantidad de juegos"))
  await user.keyboard(matchgames)

  await user.click(screen.getByLabelText("Cantidad de rondas"))
  await user.keyboard(matchrounds)

  await user.click(screen.getByLabelText("Contraseña de partida"))
  await user.keyboard(matchpassword)

  await user.click(screen.getByLabelText("Confirmar contraseña de partida"))
  await user.keyboard(matchconfirm)

  await user.click(screen.getByLabelText("Elegir Robot"))
  await user.click(screen.getByText("Robot1"))

  await user.click(screen.getByRole("button", { name: "Crear" }))

  expect(await screen.findByText(/Se creó la partida con éxito/i)).toBeInTheDocument()
  
});
