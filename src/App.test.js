import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "./app/store"
import App from "./App"

const store = setupStore()

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText(/PyRobots/i)).toBeInTheDocument()
})
