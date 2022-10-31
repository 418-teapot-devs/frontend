import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../../../utils/testUtils"
import { joinmatch_request } from "./api/JoinMatch"
import { server } from "../../../mocks/server"

import { matcheslist } from "../../../mocks/data/matcheslist"
import { PublicMatches } from "../list/PublicMatches"

test("Click join and form pops up", async () => {

  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[0]
  const user = userEvent.setup()

  await user.click(screen.getByTestId('join-button-'+ match.id))
  expect(
    await screen.findByText('Unirme a partida: ' + match.name)
  ).toBeInTheDocument()

  await user.click(screen.getByTestId('submit-joinform-'+ match.id))
  expect(
    await screen.findByText(/Elegir un robot es obligatorio/i)
  ).toBeInTheDocument()

})

test("Click join and form pops up, then close it", async () => {

  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[0]
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

test("Click join and sumbit form", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[0]
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


test("Fail to sumbit form: incorrect password", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[3]
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


test("Fail to sumbit form", async () => {
    
  const { getAllByTestId } = renderWithProviders(<PublicMatches/>)
  await waitFor(()=> {
    const matches_names = getAllByTestId  ("public-match-name").map(
      (cell) => cell.textContent
    )
    const public_names = matcheslist.map((match) => match.name)
    expect(matches_names).toEqual(public_names)
  })
  const match = matcheslist[1]
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
    await screen.findByText(/Se produjo un error/i)
  ).toBeInTheDocument()

})