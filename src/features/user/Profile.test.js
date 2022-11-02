import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/testUtils"
import { Profile } from "./Profile"
import { profile } from "../../mocks/data/profile"
import React from "react"
import { server } from "../../mocks/server"

// Should render user information
test("should render user information", async () => {

  const providers = {user: {token: "token"}, login: () => {["token", {username: "username", email: "email", avatar_url: "avatar_url"}]}, logout: () => {["token", {username: null, email: null, avatar_url: null}]}} 

  renderWithProviders(<Profile />, {preloadedState: providers})

  expect(await screen.findByText(profile.username)).toBeInTheDocument()
  expect(await screen.findByText(profile.email)).toBeInTheDocument()
  expect(await screen.findAllByRole("img")).toBeInTheDocument()
})
