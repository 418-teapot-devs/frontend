import React from "react"
import { getAllByTestId, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { IniciatedMatches } from "./IniciatedMatches"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { iniciated } from "./api/iniciated"
import { string } from "yup"

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
  render(<IniciatedMatches matches={[]} />)
  expect(
    screen.getByText(/Parece que todavía no has jugado ninguna partida.../i)
  ).toBeInTheDocument()
})

test("Renders all matches' names", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_names = getAllByTestId("match-name").map(
    (cell) => cell.textContent
  )
  const iniciated_names = iniciated.map((match) => match.name)
  expect(matches_names).toEqual(iniciated_names)
})

test("Renders all matches' creators", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_creators = getAllByTestId("match-username").map(
    (cell) => cell.textContent
  )
  const iniciated_creators = iniciated.map((match) => match.username)
  expect(matches_creators).toEqual(iniciated_creators)
})

test("Renders all matches' games", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_games = getAllByTestId("match-games").map(
    (cell) => cell.textContent
  )
  const iniciated_games = iniciated.map((match) => String(match.games))
  expect(matches_games).toEqual(iniciated_games)
})
test("Renders all matches' rounds", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_rounds = getAllByTestId("match-rounds").map(
    (cell) => cell.textContent
  )
  const iniciated_rounds = iniciated.map((match) => String(match.rounds))
  expect(matches_rounds).toEqual(iniciated_rounds)
})

test("Renders results when there are ready", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_rank = getAllByTestId("match-rank").map(
    (cell) => cell.textContent
  )
  const iniciated_rank = iniciated.map((match) => {
    if (match.ranking_position == null) {
      return ""
    } else {
      return String(match.ranking_position)
    }
  })
  expect(matches_rank).toEqual(iniciated_rank)

  const matches_mmrwon = getAllByTestId("match-mmrwon").map(
    (cell) => cell.textContent
  )
  const iniciated_mmrwon = iniciated.map((match) => {
    if (match.MMR_won == null) {
      return ""
    } else {
      return "+" + String(match.MMR_won)
    }
  })
  expect(matches_mmrwon).toEqual(iniciated_mmrwon)
})

test("Renders all robots", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_robots = getAllByTestId("match-robot").length
  const expected_robots = iniciated.reduce(
    (a, match) => a + match.robots.length,
    0
  )
  expect(matches_robots).toEqual(expected_robots)
})

test("Renders locks if match is private", async () => {
  const { getAllByTestId } = render(<IniciatedMatches matches={iniciated} />)
  const matches_isprivate = getAllByTestId("match-private").length
  const expected_isprivate = iniciated.reduce(
    (a, match) => a + (match.is_private ? 1 : 0),
    0
  )
  expect(matches_isprivate).toEqual(expected_isprivate)
})
