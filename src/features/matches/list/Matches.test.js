import React from "react"
import { screen } from "@testing-library/react"
import { PublicMatches, CreatedMatches, StartedMatches, JoinedMatches } from "./Matches"
import { renderWithProviders } from "../../../utils/testUtils"
import { mockpublic } from "./mockpublic"
import { rest } from "msw"
import { setupServer } from "msw/node"

export const handlers = [
  
  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('public')
    return res(ctx.status(200), ctx.delay(150), ctx.json([...mockpublic]))
  }),

  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('created')
    return res(ctx.status(200), ctx.delay(150), ctx.json([...mockpublic]))
  }),

  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('joined')
    return res(ctx.status(200), ctx.delay(150), ctx.json([...mockpublic]))
  }),

  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('started')
    return res(ctx.status(200), ctx.delay(150), ctx.json([...mockpublic]))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test("Renders all matches' names", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_names = getAllByTestId("public-match-name").map(
    (cell) => cell.textContent
  )
  const public_names = mockpublic.map((match) => match.name)
  expect(matches_names).toEqual(public_names)
})

test("Renders all matches' creators", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_creators = getAllByTestId("public-match-username").map(
    (cell) => cell.textContent
  )
  const Public_creators = mockpublic.map((match) => match.host.username)
  expect(matches_creators).toEqual(Public_creators)
})

test("Renders all matches' games", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_games = getAllByTestId("public-match-games").map(
    (cell) => cell.textContent
  )
  const Public_games = mockpublic.map((match) => String(match.games))
  expect(matches_games).toEqual(Public_games)
})
test("Renders all matches' rounds", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_rounds = getAllByTestId("public-match-rounds").map(
    (cell) => cell.textContent
  )
  const Public_rounds = mockpublic.map((match) => String(match.rounds))
  expect(matches_rounds).toEqual(Public_rounds)
})

test("Renders all robots", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_robots = getAllByTestId("public-match-robot").length
  const expected_robots = mockpublic.reduce(
    (a, match) => a + match.robots.length,
    0
  )
  expect(matches_robots).toEqual(expected_robots)
})

test("Renders locks if match is private", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_isprivate = getAllByTestId("public-match-private").length
  const expected_isprivate = mockpublic.reduce(
    (a, match) => a + (match.is_private ? 1 : 0),
    0
  )
  expect(matches_isprivate).toEqual(expected_isprivate)
})

test("Renders all the join buttons in public", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  const matches_join = screen.getAllByRole("button", { name: "Unirme" }).length
  const expected_join = mockpublic.length
  expect(matches_join).toEqual(expected_join)
})


test("Renders all the start buttons in created", async () => {
  const { getAllByTestId } = renderWithProviders(
    <CreatedMatches />
  )
  const matches_join = screen.getAllByRole("button", { name: "Iniciar" }).length
  const expected_join = mockpublic.length
  expect(matches_join).toEqual(expected_join)
})

test("Renders all the details buttons in started", async () => {
  const { getAllByTestId } = renderWithProviders(
    <StartedMatches />
  )
  const matches_join = screen.getAllByRole("button", { name: "Detalles" }).length
  const expected_join = mockpublic.length
  expect(matches_join).toEqual(expected_join)
})

test("Renders all the details buttons in joined", async () => {
  const { getAllByTestId } = renderWithProviders(
    <JoinedMatches />
  )
  const matches_join = screen.getAllByRole("button", { name: "Detalles" }).length
  const expected_join = mockpublic.length
  expect(matches_join).toEqual(expected_join)
})
