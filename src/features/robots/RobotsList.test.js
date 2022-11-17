import { RobotsList } from "./RobotsList";
import { getAllByText, screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/testUtils"
import { robotslist } from "../../mocks/data/robotslist";
import { server } from "../../mocks/server"

test("Render button for creating robot", async () => {
  renderWithProviders(<RobotsList />)
  expect(
      screen.getByRole("link", {name: "Nuevo robot"})
  ).toBeInTheDocument()
})

test("Render all robots names", async () => {
  const { getAllByTestId } = renderWithProviders(
    <RobotsList />
  )

  robotslist.map(async (robot) => {
    expect(await screen.findByText(robot.name)).toBeInTheDocument()
    
  })
})

test("Render all robots win rate and played matches", async () => {
  const { getAllByTestId } = renderWithProviders(
    <RobotsList />
  )
  expect((await screen.findAllByText(/Tasa de victorias:/i)).length).toBe(robotslist.length)
  expect((await screen.findAllByText(/Partidas jugadas:/i)).length).toBe(robotslist.length)
})

test("case: failure", async () => {
  const providers = {
    user: {
      token: "error",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }
  renderWithProviders(<RobotsList />, { preloadedState: providers })
  expect((await screen.findByText(/Error en el servidor.../i))).toBeInTheDocument()
  
})
