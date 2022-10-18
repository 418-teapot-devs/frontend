import React from "react"
import { screen } from "@testing-library/react"
import { CreatedMatches } from "./CreatedMatches"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../utils/testUtils"

const createdMatches = []

export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/created", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(150), ctx.json(createdMatches))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Should render all matches", async () => {
  renderWithProviders(<CreatedMatches />)
  createdMatches.map((match) => {
    expect(screen.queryByText(match.name)).toBeInTheDocument()
  })
})
