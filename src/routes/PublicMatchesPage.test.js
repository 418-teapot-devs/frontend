import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { PublicMatchesPage } from "./PublicMatchesPage"

import { server } from "../mocks/server"
test("Renders title", async () => {
    const { getAllByTestId } = renderWithProviders(
      <PublicMatchesPage />
    )
    expect( await screen.findByText(/Partidas públicas/i)).toBeInTheDocument()

})
