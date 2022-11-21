import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "../hooks/useAuth"

export const renderWithProviders = (
  ui,
  {
    preloadedState = {
      user: {
        token: "token",
        profile: {
          username: "username",
          email: "username@gmail.com",
          avatar: ""
        }
      },
      login: jest.fn(),
      logout: jest.fn(),
    },
    ...renderOptions
  } = {}
) => {
  const wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={preloadedState}>
          {children}
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }

  return { ...render(ui, { wrapper: wrapper, ...renderOptions }) }
}
