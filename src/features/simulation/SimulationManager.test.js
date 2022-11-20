import React from "react"
import { waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import SimulationManager from "./SimulationManager"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../utils/testUtils"

// FIXME: Do not show Konva errors
console.error = () => {}

const robots = {
  0: {
    name: "X-T1",
    avatar_url: "/assets/avatars/robot/1.png",
    username: "profran",
  },
  1: {
    name: "X-T2",
    avatar_url: "/assets/avatars/robot/2.png",
    username: "profran"
  },
}

const robotsList = Object.keys(robots).map((key) => ({
  ...robots[key],
  robot_id: key,
}))

const rounds = [
  {
    robots: {
      0: {
        x: 537,
        y: 819,
        dmg: 0,
      },
      1: {
        x: 323,
        y: 994,
        dmg: 0,
      },
    },
    missiles: {},
  },
  {
    robots: {
      0: {
        x: 347,
        y: 8789,
        dmg: 0,
      },
      1: {
        x: 673,
        y: 923,
        dmg: 3,
      },
    },
    missiles: {
      0: {
        sender_id: 0,
        x: 520,
        y: 819,
        exploding: false,
      },
    },
  },
]

const handlers = [
  rest.post("http://127.0.0.1:8000/simulate/", async (req, res, ctx) => {
    return res(
      ctx.json({
        robots: robots,
        rounds: rounds,
      })
    )
  }),
  rest.get("http://127.0.0.1:8000/robots/", (req, res, ctx) => {
    return res(ctx.json(robotsList))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should send form", async () => {
  const user = userEvent.setup()

  const { getByTestId } = renderWithProviders(<SimulationManager />)

  await user.click(getByTestId("simulation-form-rounds"))

  await user.keyboard("10000")

  await user.click(screen.getByLabelText("Elegir Robot *"))

  await user.click(screen.getByText("X-T1"))

  await user.click(getByTestId("simulation-form-start-button"))

  await waitFor(() =>
    Object.keys(robots).map((key) => {
      expect(getByTestId(`simulation-robot-${key}`)).toBeInTheDocument()
    })
  )

  expect(getByTestId("simulation-board")).toBeInTheDocument()
})

test("should not send form", async () => {
  const user = userEvent.setup()

  const { queryByTestId, getByTestId } = renderWithProviders(
    <SimulationManager />
  )

  await user.click(screen.getByLabelText("Cantidad de rondas *"))

  await user.keyboard("123456789")

  await user.click(screen.getByLabelText("Elegir Robot *"))

  await user.click(screen.getByText("X-T1"))

  await user.click(getByTestId("simulation-form-start-button"))

  expect(
    await screen.findByText("Se permiten hasta 10000 rondas")
  ).toBeInTheDocument()
  expect(queryByTestId("simulation-board")).not.toBeInTheDocument()
})

test("should not send form when not selecting any robot", async () => {
  const user = userEvent.setup()

  const { queryByTestId, getByTestId } = renderWithProviders(
    <SimulationManager />
  )

  await user.click(getByTestId("simulation-form-rounds"))
  await user.keyboard("798769879879")

  await waitFor(() => {
    expect(getByTestId("simulation-form-start-button")).toBeDisabled()
    expect(queryByTestId("simulation-board")).not.toBeInTheDocument()
  })
})