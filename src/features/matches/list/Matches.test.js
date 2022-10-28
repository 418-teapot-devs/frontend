import React from "react"
import { screen } from "@testing-library/react"
import { PublicMatchesList } from "./MatchesList"
import { renderWithProviders } from "../../utils/testUtils"


test("Render message when there are no matches", async () => {
  renderWithProviders(<PublicMatchesList matches={[]} />)
  expect(
    screen.getByText(/Parece que todavía no hay ninguna partida.../i)
  ).toBeInTheDocument()
})

test("Renders all matches' names", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_names = getAllByTestId("public-match-name").map(
    (cell) => cell.textContent
  )
  const public_names = mockpublic.map((match) => match.name)
  expect(matches_names).toEqual(public_names)
})

test("Renders all matches' creators", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_creators = getAllByTestId("public-match-username").map(
    (cell) => cell.textContent
  )
  const Public_creators = mockpublic.map((match) => match.username)
  expect(matches_creators).toEqual(Public_creators)
})

test("Renders all matches' games", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_games = getAllByTestId("public-match-games").map(
    (cell) => cell.textContent
  )
  const Public_games = mockpublic.map((match) => String(match.games))
  expect(matches_games).toEqual(Public_games)
})
test("Renders all matches' rounds", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_rounds = getAllByTestId("public-match-rounds").map(
    (cell) => cell.textContent
  )
  const Public_rounds = mockpublic.map((match) => String(match.rounds))
  expect(matches_rounds).toEqual(Public_rounds)
})

test("Renders all robots", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
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
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_isprivate = getAllByTestId("public-match-private").length
  const expected_isprivate = mockpublic.reduce(
    (a, match) => a + (match.is_private ? 1 : 0),
    0
  )
  expect(matches_isprivate).toEqual(expected_isprivate)
})

test("Renders all the join buttons", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatchesList matches={mockpublic} />
  )
  const matches_join = screen.getAllByRole("button", { name: "Unirme" }).length
  const expected_join = mockpublic.length
  expect(matches_join).toEqual(expected_join)
})
