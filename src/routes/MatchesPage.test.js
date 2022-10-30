import React from "react"
import { screen } from "@testing-library/react"
import { MatchesPage } from "./MatchesPage"
import { renderWithProviders } from "../utils/testUtils"
import { rest } from "msw"
import { setupServer } from "msw/node"

test("Renders all titles and tables", async () => {
    const { getAllByTestId } = renderWithProviders(
      <MatchesPage />
    )
    expect( await screen.findByText(/Partidas Compartidas/i)).toBeInTheDocument()
    expect( await screen.findByText(/Partidas Propias/i)).toBeInTheDocument()
    expect( await screen.findByText(/Partidas Públicas/i)).toBeInTheDocument()
    expect( await screen.findByText(/Historial de partidas/i)).toBeInTheDocument()

    screen.getByTestId('created-matches')
    screen.getByTestId('joined-matches')
    screen.getByTestId('public-matches')
    screen.getByTestId('started-matches')
})
