import React from "react"
import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { StartedMatchesPage } from "./StartedMatchesPage"

import { server } from "../mocks/server"
test("Renders title", async () => {
    const { getAllByTestId } = renderWithProviders(
      <StartedMatchesPage />
    )
    expect( await screen.findByText(/Historial de partidas/i)).toBeInTheDocument()

})
