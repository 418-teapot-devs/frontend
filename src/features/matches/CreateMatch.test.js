import React from "react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CreateMatch } from "./CreateMatch"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../utils/testUtils"

const robots = [{ name: "Robot" }, { name: "Robot1" }]

export const handlers = [
  rest.post("http://127.0.0.1:8000/matches/created", async (req, res, ctx) => {
    const body = await req.json()
    if (body.name === "Nombre de Partida") {
      return res(ctx.status(201), ctx.delay(150))
    } else {
      return res(ctx.status(400), ctx.delay(150))
    }
  }),
  rest.get("http://127.0.0.1:8000/robots", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(150), ctx.json([...robots]))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// Case where all inputs are correct
test("Should create match", async () => {
  const user = userEvent.setup()

  renderWithProviders(<CreateMatch />)

  await user.click(screen.getByLabelText("Nombre de la partida"))
  await user.keyboard("Nombre de Partida")

  await user.click(screen.getByLabelText("Cantidad mínima de jugadores"))
  await user.keyboard("2")

  await user.click(screen.getByLabelText("Cantidad máxima de jugadores"))
  await user.keyboard("4")

  await user.click(screen.getByLabelText("Cantidad de juegos"))
  await user.keyboard("200")

  await user.click(screen.getByLabelText("Cantidad de rondas"))
  await user.keyboard("1000")

  await user.click(screen.getByLabelText("Contraseña de partida"))
  await user.keyboard("secret password")

  await user.click(screen.getByLabelText("Confirmar contraseña de partida"))
  await user.keyboard("secret password")

  await user.click(screen.getByLabelText("Elegir Robot"))
  await user.click(screen.getByText("Robot1"))

  await user.click(screen.getByRole("button", { name: "Crear" }))

  expect(
    await screen.findByText(/Se creó la partida con éxito/i)
  ).toBeInTheDocument()
})

// Cases where all inputs are incorrect
test("Should display error mesages. (1)", async () => {
  const user = userEvent.setup()

  renderWithProviders(<CreateMatch />)

  await user.click(screen.getByLabelText("Nombre de la partida"))
  await user.keyboard("This is a match name that has to many characters")

  await user.click(screen.getByLabelText("Cantidad mínima de jugadores"))
  await user.keyboard("1")

  await user.click(screen.getByLabelText("Cantidad máxima de jugadores"))
  await user.keyboard("5")

  await user.click(screen.getByLabelText("Cantidad de juegos"))
  await user.keyboard("201")

  await user.click(screen.getByLabelText("Cantidad de rondas"))
  await user.keyboard("10001")

  await user.click(screen.getByLabelText("Contraseña de partida"))
  await user.keyboard("password")

  await user.click(screen.getByLabelText("Confirmar contraseña de partida"))
  await user.keyboard("secret password")

  await user.click(screen.getByRole("button", { name: "Crear" }))

  expect(
    await screen.findByText(/El nombre de la partida es demasiado largo/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Las partidas deben incluir al menos 2 jugadores/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Se permiten hasta 4 jugadores/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Se permiten hasta 200 juegos/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Se permiten hasta 10000 rondas/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Las contraseñas deben ser iguales/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Elegir un robot es obligatorio/i)
  ).toBeInTheDocument()
  expect(
    screen.queryByText(/Se creó la partida con éxito/i)
  ).not.toBeInTheDocument()
})

test("Should display error messages (2)", async () => {
  const user = userEvent.setup()

  renderWithProviders(<CreateMatch />)

  await user.click(screen.getByLabelText("Cantidad mínima de jugadores"))
  await user.keyboard("4")

  await user.click(screen.getByLabelText("Cantidad máxima de jugadores"))
  await user.keyboard("3")

  await user.click(screen.getByLabelText("Cantidad de juegos"))
  await user.keyboard("0")

  await user.click(screen.getByLabelText("Cantidad de rondas"))
  await user.keyboard("0")

  await user.click(screen.getByLabelText("Contraseña de partida"))
  await user.keyboard("password")

  await user.click(screen.getByRole("button", { name: "Crear" }))

  expect(
    await screen.findByText(/El nombre de partida es obligatorio/i)
  ).toBeInTheDocument()
  expect(
    await screen.findByText(
      /La cantidad máxima de jugadores no debe ser menor que la cantidad mínima/i
    )
  ).toBeInTheDocument()
  expect(
    await screen.findByText(
      /La cantidad de juegos debe ser un entero positivo/i
    )
  ).toBeInTheDocument()
  expect(
    await screen.findByText(
      /La cantidad de rondas debe ser un entero positivo/i
    )
  ).toBeInTheDocument()
  expect(
    await screen.findByText(/Confirmar la contraseña ingresada/i)
  ).toBeInTheDocument()
  expect(
    screen.queryByText(/Se creó la partida con éxito/i)
  ).not.toBeInTheDocument()
})

test("Should inform if there was a server error", async () => {
  const user = userEvent.setup()

  renderWithProviders(<CreateMatch />)

  await user.click(screen.getByLabelText("Nombre de la partida"))
  await user.keyboard("error")

  await user.click(screen.getByLabelText("Cantidad mínima de jugadores"))
  await user.keyboard("3")

  await user.click(screen.getByLabelText("Cantidad máxima de jugadores"))
  await user.keyboard("3")

  await user.click(screen.getByLabelText("Cantidad de juegos"))
  await user.keyboard("1")

  await user.click(screen.getByLabelText("Cantidad de rondas"))
  await user.keyboard("1")

  await user.click(screen.getByLabelText("Elegir Robot"))
  await user.click(screen.getByText("Robot1"))

  await user.click(screen.getByRole("button", { name: "Crear" }))

  expect(
    await screen.findByText(
      /No se pudo crear la partida por un error en el servidor/i
    )
  ).toBeInTheDocument()

  // Allow not entering password
  expect(
    screen.queryByText(/Las contraseñas deben ser iguales/i)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText(/Confirmar la contraseña ingresada/i)
  ).not.toBeInTheDocument()
})
