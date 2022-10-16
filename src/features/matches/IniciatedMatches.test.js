import React from "react"
import { getAllByTestId, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { IniciatedMatches } from "./IniciatedMatches"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { iniciated } from "./api/iniciated"


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

test("Render message when there are no mathces", async () => {
    render(<IniciatedMatches matches={[]}/>)
    expect(screen.getByText(/Parece que todavía no has jugado ninguna partida.../i)).toBeInTheDocument()
})

test("Renders all matches' names", async () => {
    const {getAllByTestId} = render(<IniciatedMatches matches={iniciated}/>)
    const matches_names = getAllByTestId('match-name').map((cell) => cell.textContent)
    const iniciated_names = iniciated.map(match => match.name)
    expect(matches_names).toEqual(iniciated_names)
})