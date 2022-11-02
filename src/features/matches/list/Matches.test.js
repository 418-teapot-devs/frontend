import React from "react"
import { screen, waitFor } from "@testing-library/react"

import { PublicMatches } from "./PublicMatches"
import { CreatedMatches } from "./CreatedMatches"
import { StartedMatches } from "./StartedMatches"
import { JoinedMatches } from "./JoinedMatches"

import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../utils/testUtils"
import {
  public_matcheslist,
  created_matcheslist,
  started_matcheslist
} from "../../../mocks/data/matcheslist"

import { server } from "../../../mocks/server"

test("Renders all matches' names", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  await waitFor(() => {
    const matches_names = getAllByTestId("public-match-name").map(
    (cell) => cell.textContent
  )
  const public_names = public_matcheslist.map((match) => match.name)
  expect(matches_names).toEqual(public_names)

  })
})

test("Renders all matches' creators", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )

  await waitFor(() => {
  const matches_creators = getAllByTestId("public-match-username").map(
    (cell) => cell.textContent
  )
  const Public_creators = public_matcheslist.map((match) => match.host.username)
  expect(matches_creators).toEqual(Public_creators)
  })
})

test("Renders all matches' games", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  
  await waitFor(() => {
    const matches_games = getAllByTestId("public-match-games").map(
      (cell) => cell.textContent
    )
    const Public_games = public_matcheslist.map((match) => String(match.games))
    expect(matches_games).toEqual(Public_games)
  })
})

test("Renders all matches' rounds", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )

  await waitFor(() => {
    const matches_rounds = getAllByTestId("public-match-rounds").map(
      (cell) => cell.textContent
    )
    const Public_rounds = public_matcheslist.map((match) => String(match.rounds))
    expect(matches_rounds).toEqual(Public_rounds)
  })
})

test("Renders all robots", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
 
  await waitFor(() => {
    const matches_robots = getAllByTestId("public-match-robot").length
    const expected_robots = public_matcheslist.reduce(
      (a, match) => a + match.robots.length,
      0
    )
    expect(matches_robots).toEqual(expected_robots)
  })
})

test("Renders locks if match is private", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  await waitFor(() => {
    const matches_isprivate = getAllByTestId("public-match-private").length
    const expected_isprivate = public_matcheslist.reduce(
      (a, match) => a + (match.is_private ? 1 : 0),
      0
    )
    expect(matches_isprivate).toEqual(expected_isprivate)
  })
})

test("Renders all the join buttons in public", async () => {
  const { getAllByTestId } = renderWithProviders(
    <PublicMatches />
  )
  await waitFor(() => {
    const matches_join = screen.getAllByRole("button", { name: "Unirme" }).length
    const expected_join = public_matcheslist.length
    expect(matches_join).toEqual(expected_join)
  })
})


test("Renders all the details buttons in created", async () => {
  const { getAllByTestId } = renderWithProviders(
    <CreatedMatches />
  )
  await waitFor(() => {
    const matches_join = screen.getAllByRole("button", { name: "Detalles" }).length
    const expected_join = created_matcheslist.length
    expect(matches_join).toEqual(expected_join)
  })
})

test("Renders all the details buttons in started", async () => {
  const { getAllByTestId } = renderWithProviders(
    <StartedMatches />
  )
  await waitFor(() => {
    const matches_join = screen.getAllByRole("button", { name: "Detalles" }).length
    const expected_join = started_matcheslist.length
    expect(matches_join).toEqual(expected_join)
  })
})

test("Renders all the details buttons in joined", async () => {
  const { getAllByTestId } = renderWithProviders(
    <JoinedMatches />
  )
  expect(await screen.findByText(/Parece que todavía no hay ninguna partida.../i)).toBeInTheDocument()


})

test("Details button in created redirects", async () => {
  const { getAllByTestId } = renderWithProviders(
    <CreatedMatches />
  )
  const user = userEvent.setup()
  await waitFor(() => {
    user.click(screen.getAllByRole("button", { name: "Detalles" })[0])
  })

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/matches/13`)
  })
})

test("Details button in started redirects", async () => {
  const { getAllByTestId } = renderWithProviders(
    <StartedMatches />
  )
  const user = userEvent.setup()
  await waitFor(() => {
    user.click(screen.getAllByRole("button", { name: "Detalles" })[0])
  })

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/matches/11`)
  })
})

test("Refresh button issues request to back", async () => {
  const { getAllByTestId } = renderWithProviders(<StartedMatches/>)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('refresh-button'))
  await waitFor(() => {
    const expected_started = started_matcheslist.length
    const matches_started = screen.getAllByRole("button", { name: "Detalles" }).length
    expect(matches_started).toEqual(expected_started)
  })
})