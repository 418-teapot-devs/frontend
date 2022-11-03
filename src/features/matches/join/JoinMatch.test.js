import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../../utils/testUtils"
import { joinmatch_request } from "./api/JoinMatch"
import { server } from "../../../mocks/server"

import { public_matcheslist } from "../../../mocks/data/matcheslist"
import { PublicMatches } from "../list/PublicMatches"

test("Click join and form pops up, then close it", async () => {

  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[0]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()

  await user.click(screen.getByTestId('cancel-joinform-'+ match.id))
  await waitFor(() => {
    expect(screen.queryByText('Unirme a partida: ' + match.name)).not.toBeInTheDocument()
  })
})


test("Fail to sumbit form: incorrect password", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[3]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })
  
  await waitFor(() =>{
    user.click(screen.getByText("Robot2"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/La contraseña es incorrecta/i)
  ).toBeInTheDocument()

})

test("Fail if invalid robot", async () => {
  const providers = {
    user: {
      token: "invalid robot",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }

  const { getAllByTestId } = renderWithProviders(
    <PublicMatches/>, { preloadedState: providers }
  )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/El robot elegido ya no existe/i)
  ).toBeInTheDocument()

})

test("Fail if invalid match", async () => {
  const providers = {
    user: {
      token: "invalid match",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }

  const { getAllByTestId } = renderWithProviders(
    <PublicMatches/>, { preloadedState: providers }
  )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/La partida elegida fue eliminada/i)
  ).toBeInTheDocument()

})

test("Fail if user is not found", async () => {
  const providers = {
    user: {
      token: "invalid user",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }

  const { getAllByTestId } = renderWithProviders(
    <PublicMatches/>, { preloadedState: providers }
  )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/La sesión caducó/i)
  ).toBeInTheDocument()

})

test("Fail if unauthorized action", async () => {
  const providers = {
    user: {
      token: "unauthorized",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }

  const { getAllByTestId } = renderWithProviders(
    <PublicMatches/>, { preloadedState: providers }
  )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/Acción no autorizada/i)
  ).toBeInTheDocument()

})

test("Fail if match is already started", async () => {
  const providers = {
    user: {
      token: "started match",
    },
    login: jest.fn(),
    logout: jest.fn(),
  }

  const { getAllByTestId } = renderWithProviders(
    <PublicMatches/>, { preloadedState: providers }
  )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/La partida ya fue iniciada/i)
  ).toBeInTheDocument()

})

test("Fail if joining full match", async () => {
  const { getAllByTestId } = renderWithProviders( <PublicMatches/> )

  await waitFor(()=> {
    const matches_names = getAllByTestId ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[7]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })

  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  expect(
    await screen.findByText(/La partida ya está llena/i)
  ).toBeInTheDocument()

})


test("Fail to sumbit form: server error", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[0]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()

  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })
  
  await waitFor(() => {
    user.click(screen.getByText("Robot2"))
  })

  await user.click(screen.getByLabelText("Contraseña de partida"))
  await user.keyboard("server error")

  await user.click(screen.getByTestId('submit-joinform-'+ match.id))

  expect(
    await screen.findByText(/Error de servidor/i)
  ).toBeInTheDocument()

})



test("Click join and sumbit form", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = public_matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = public_matcheslist[1]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()
  
  await waitFor(() => {
    user.click(screen.getByLabelText("Elegir Robot"))
  })
  await waitFor(() =>{
    user.click(screen.getByText("Robot1"))
    user.click(screen.getByTestId('submit-joinform-'+ match.id))
  })

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/matches/${match.id}`)
  })

})


