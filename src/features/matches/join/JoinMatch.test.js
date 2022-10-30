import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../../utils/testUtils"

import { server } from "../../../mocks/server"

import { matcheslist } from "../../../mocks/data/matcheslist"
import { PublicMatches } from "../list/PublicMatches"

test("Click join and form pops up", async () => {

  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[0]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()

  await user.click(screen.getByTestId('submit-joinform-'+ match.id))
  expect(
    await screen.findByText(/Elegir un robot es obligatorio/i)
  ).toBeInTheDocument()

})
