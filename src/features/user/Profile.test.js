import { rest } from "msw"
import { setupServer } from "msw/node"
import { getByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../utils/testUtils"

import { Profile } from "./Profile"
import React from "react"

const providers = {
  user: {
    profile: {
      username: "LORASS",
      email: "e@mail.com",
      avatar: ""
    }
  }
}

test("Show Information", async () => {
  const user = userEvent.setup()

  renderWithProviders(
    <Profile />,
    { preloadedState: providers }
  )

  expect(
    screen.getByText("Nombre de usuario: @" + providers.user.profile.username)
  ).toBeInTheDocument()

  expect(
    screen.getByText("Correo electrónico: " + providers.user.profile.email)
  ).toBeInTheDocument()
})
