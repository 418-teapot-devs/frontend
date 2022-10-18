import React from "react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { JoinedMatchesList } from "./JoinedMatchesList"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { joined } from "./api/joined"
import { renderWithProviders } from "../../utils/testUtils"


test("Should render grid", async () => {
  const { getAllByTestId } = renderWithProviders(
    <JoinedMatchesList matches={joined} />
  )
  expect(getAllByTestId("match-grid").length).toEqual(1)
})

test("Should render all matches", async () => {
  const { getAllByTestId } = renderWithProviders(
    <JoinedMatchesList matches={joined} />
  )
  expect(getAllByTestId("match-card").length).toEqual(joined.length)
})

test("Should open match details with corresponding message", async () => {
  const user = userEvent.setup()
  renderWithProviders(<JoinedMatchesList matches={joined} />)
  for (let i = 0; i < joined.length; i++) {
    await user.click(screen.getAllByRole("button", { name: "show-more" })[i])

    const creator = joined[i].username
    if (joined[i].robots.length >= joined[i].min_players) {
      const message = "Esperando a que @" + creator + " inicie la partida..."
      expect(await screen.findByText(message)).toBeInTheDocument()
    } else {
      const message =
        "@" +
        creator +
        " podrá iniciar la partida cuando lleguen " +
        String(joined[i].min_players - joined[i].robots.length) +
        " robots más..."
      expect(await screen.findByText(message)).toBeInTheDocument()
    }
    await user.click(screen.getAllByRole("button", { name: "show-more" })[i])
  }
})
