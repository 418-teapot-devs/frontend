import React from "react"
import { findByText, getAllByTestId, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { JoinedMatches } from "./JoinedMatches"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { joined } from "./api/joined"



export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/created", async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(200), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Should render grid", async () => {
    const user = userEvent.setup()
    const {getAllByTestId} = render(<JoinedMatches matches={joined} />)
    expect(getAllByTestId('match-grid').length).toEqual(1)
})

test("Should render all matches", async () => {
    const user = userEvent.setup()
    const {getAllByTestId} = render(<JoinedMatches matches={joined} />)
    expect(getAllByTestId('match-card').length).toEqual(joined.length)
})

test("Should open match details with corresponding message", async () => {
    const user = userEvent.setup()
    render(<JoinedMatches matches={joined} />)
    for (let i = 0; i < joined.length; i++) {

      await user.click(screen.getAllByRole("button", { name: "show-more" })[i])
  
      const creator = joined[i].username;
      if (joined[i].robots.length >= joined[i].min_players){
          const message = "Esperando a que @" + creator + " inicie la partida..."
          expect( await screen.findByText(message)).toBeInTheDocument()
      } else {
          const message = "@" + creator + " podrá iniciar la partida cuando lleguen "
          + String(joined[i].min_players - joined[i].robots.length) + " robots más..."
          expect(await screen.findByText(message)).toBeInTheDocument()
      }
      await user.click(screen.getAllByRole("button", { name: "show-more" })[i])
    }
})
