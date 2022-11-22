import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../utils/testUtils"

import { ProtectedRoute } from "./ProtectedRoute"
import { Profile } from "../features/user/Profile"
import React from "react"

const logged_user = {
  user: {
    token: "token",
    profile: {
      username: "LORASS",
      email: "e@mail.com",
      avatar: "",
    },
  },
}

const not_logued_user = {
  user: {
    token: null,
    profile: null,
  },
}

test("Show text if user is logged in", async () => {
  renderWithProviders(
    <ProtectedRoute>
      <div>Im here!</div>
    </ProtectedRoute>, {preloadedState: logged_user} 
  )

  expect(screen.getByText(/Im here!/i)).toBeInTheDocument()
})
