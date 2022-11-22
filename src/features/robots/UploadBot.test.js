import { rest } from "msw"
import { setupServer } from "msw/node"
import { getByText, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { UploadBot } from "./UploadBot"
import React from "react"
import { renderWithProviders } from "../../utils/testUtils"

import { server } from "../../mocks/server"

// All inputs are correct
test("should upload", async () => {
  const user = userEvent.setup()
  renderWithProviders(<UploadBot />)

  await user.click(screen.getByRole("button", { name: "avatar" }))
  await user.upload(
    screen.getByLabelText("avatar"),
    new File(["(⌐□_□)"], "image.png")
  )

  await user.click(screen.getByLabelText("Nombre *"))
  await user.keyboard("robot")

  await user.click(screen.getByRole("button", { name: "code" }))
  await user.upload(
    screen.getByLabelText("code"),
    new File(["hola"], "robot.py", { type: ".py" })
  )

  await user.click(screen.getByRole("button", { name: /Crear/i }))

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/robots`)
  })
})

// Incorrect inputs: taken name, no avatar
test("should not upload", async () => {
  const user = userEvent.setup()
  renderWithProviders(<UploadBot />)

  await user.click(screen.getByLabelText("Nombre *"))
  await user.keyboard("takenName")

  await user.click(screen.getByRole("button", { name: "code" }))
  await user.upload(
    screen.getByLabelText("code"),
    new File(["hola"], "robot.py", { type: ".py" })
  )

  await user.click(screen.getByRole("button", { name: /Crear/i }))

  expect(
    await screen.findByText(/Ya cuentas con un robot con ese nombre/i)
  ).toBeInTheDocument()
})

// Incorrect inputs: no code
test("no code, should not upload", async () => {
  const user = userEvent.setup()
  renderWithProviders(<UploadBot />)

  await user.click(screen.getByLabelText("Nombre *"))
  await user.keyboard("robot")

  await user.click(screen.getByRole("button", { name: /Crear/i }))

  expect(
    await screen.findByText(/El código de su robot es requerido/i)
  ).toBeInTheDocument()

  await user.click(screen.getByRole("button", { name: "code" }))
  await user.upload(
    screen.getByLabelText("code"),
    new File(["hola"], "robot.py", { type: ".py" })
  )

  await user.click(screen.getByRole("button", { name: /Crear/i }))

  expect(
    await screen.findByText(/Se subió el robot con éxito/i)
  ).toBeInTheDocument()
})

// unknown error
test("unknown error, should not upload", async () => {
  const user = userEvent.setup()
  renderWithProviders(<UploadBot />)

  await user.click(screen.getByLabelText("Nombre *"))
  await user.keyboard("error")

  await user.click(screen.getByRole("button", { name: "code" }))
  await user.upload(
    screen.getByLabelText("code"),
    new File(["hola"], "robot.py", { type: ".py" })
  )

  await user.click(screen.getByRole("button", { name: /Crear/i }))

  expect(
    await screen.findByText(/No se pudo subir el robot/i)
  ).toBeInTheDocument()
})

// 
test("Open editor and fail if no code provided", async () => {
  const user = userEvent.setup()
  renderWithProviders(<UploadBot />)

  await user.click(screen.getByLabelText("Nombre *"))
  await user.keyboard("robot")

  await user.click(screen.getByRole("button", { name: /Abrir editor/i }))
  
  expect(screen.getByRole("button", { name: /Subir código/i })).toBeDisabled()


  await user.click(screen.getByRole("button", { name: /Crear/i }))
  expect(screen.getByText(/El código de su robot es requerido/i)).toBeInTheDocument()
})

