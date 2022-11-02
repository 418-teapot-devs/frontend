import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { MyMatchesPage } from "./MyMatchesPage"
import { renderWithProviders } from "../utils/testUtils"
import userEvent from "@testing-library/user-event"

import { server } from "../mocks/server"
test("Renders all titles and tables", async () => {
    const { getAllByTestId } = renderWithProviders(
      <MyMatchesPage />
    )
    expect( await screen.findByText(/Partidas unidas/i)).toBeInTheDocument()
    expect( await screen.findByText(/Mis partidas/i)).toBeInTheDocument()

    screen.getByTestId('created-matches')
    screen.getByTestId('joined-matches')
})


test("Click create match and change directory", async () => {
  const user = userEvent.setup()
  renderWithProviders(<MyMatchesPage />)
  await user.click(screen.getByRole("button", {name: "Crear Partida"}))

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/matches/create`)
  })

})