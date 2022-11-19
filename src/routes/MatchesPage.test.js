import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { MatchesPage } from "./MatchesPage"
import { renderWithProviders } from "../utils/testUtils"
import userEvent from "@testing-library/user-event"

import { server } from "../mocks/server"
test("Can toggle tables", async () => {
  const user = userEvent.setup()
    
  const { getAllByTestId } = renderWithProviders(
    <MatchesPage />
  )
  expect( await screen.findByText(/Unidas/i)).toBeInTheDocument()
  expect( await screen.findByText(/Creadas/i)).toBeInTheDocument()
  expect( await screen.findByText(/Públicas/i)).toBeInTheDocument()
  expect( await screen.findByText(/Mis Partidas/i)).toBeInTheDocument()

  await user.click(screen.getByRole("button", {name: "Unidas"}))
  expect( await screen.findByText(/Partidas unidas/i)).toBeInTheDocument()

  await user.click(screen.getByRole("button", {name: "Públicas"}))
  expect( await screen.findByText(/Partidas públicas/i)).toBeInTheDocument()
})


test("Click create match and change directory", async () => {
  const user = userEvent.setup()
  renderWithProviders(<MatchesPage />)
  await user.click(screen.getByRole("button", {name: "Crear Partida"}))

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/matches/create`)
  })

})