import React from "react"
import { render } from "@testing-library/react"
import { Root } from "./Root"
import { AuthProvider } from "../hooks/useAuth"
import { BrowserRouter } from "react-router-dom"

test("renders learn react link", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  )

  expect(getByText(/PyRobots/i)).toBeInTheDocument()
})
