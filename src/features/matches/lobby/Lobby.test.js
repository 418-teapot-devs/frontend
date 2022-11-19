import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../utils/testUtils"

import { Lobby } from "./Lobby"
import React from "react"

import { server } from "../../../mocks/server"

const host_providers = {
  user: {
    profile: {
      username: "simona",
      email: "simona@gmail.com",
      avatar: "",
    },
  },
}

const user_providers = {
  user: {
    profile: {
      username: "anna",
      email: "anna@gmail.com",
      avatar: "",
    },
  },
}

const match_lobby = {
  name: "matchname",
  id: "1234",
  host: {
    username: "simona",
    avatar_url: "",
  },
  max_players: 3,
  min_players: 2,
  games: 200,
  rounds: 100,
  is_private: false,
  robots: [
    {
      name: "robot1",
      avatar_url: "",
      username: "simona",
    },
    {
      name: "robot2",
      avatar_url: "",
      username: "anna",
    },
  ],
  state: "Lobby",
}

const match_finished = {
  name: "matchname",
  id: "1234",
  host: {
    username: "simona",
    avatar_url: "",
  },
  max_players: 3,
  min_players: 2,
  games: 200,
  rounds: 100,
  is_private: false,
  robots: [
    {
      name: "robot1",
      avatar_url: "",
      username: "simona",
    },
    {
      name: "robot2",
      avatar_url: "",
      username: "anna",
    },
  ],
  state: "Finished",
  results: {
    0: {
      name: "robot1",
      robot_pos: 2,
    },
    1: {
      name: "robot2",
      robot_pos: 1,
    },
  },
}

test("Show match data", async () => {
  renderWithProviders(<Lobby match={match_lobby} />, {
    preloadedState: host_providers,
  })
  const missing_robots = match_lobby.max_players - match_lobby.robots.length
  const infomessage = missing_robots > 1 ? "Esperando que se unan " + missing_robots + " robots..." : "Esperando que se una 1 robot..."
  expect(screen.getByText(match_lobby.name)).toBeInTheDocument()
  expect(screen.getByText(infomessage)).toBeInTheDocument()

  expect(
    screen.getByText("min. jugadores: " + match_lobby.min_players)
  ).toBeInTheDocument()

  expect(
    screen.getByText("max. jugadores: " + match_lobby.max_players)
  ).toBeInTheDocument()

  expect(screen.getByText("juegos: " + match_lobby.games)).toBeInTheDocument()

  expect(screen.getByText("rondas: " + match_lobby.rounds)).toBeInTheDocument()

  match_lobby.robots.map((robot) => {
    expect(screen.getByText(robot.name)).toBeInTheDocument()
    expect(screen.getByText("@" + robot.username)).toBeInTheDocument()
  })
})

test("Render start button if user is host", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Lobby match={match_lobby} />, {
    preloadedState: host_providers,
  })
  const start_button = screen.getByRole("button", { name: "Iniciar" })
  await user.click(start_button)
  expect(start_button).toBeInTheDocument()
})

test("Render abandon button if user is not host", async () => {
  const user = userEvent.setup()

  renderWithProviders(<Lobby match={match_lobby} />, {
    preloadedState: user_providers,
  })
  const abandon_button = screen.getByRole("button", { name: "Abandonar" })

  expect(abandon_button).toBeInTheDocument()
  await user.click(abandon_button)

  expect(
    screen.getByText(/¿Quieres abandonar la partida?/i)
  ).toBeInTheDocument()

  await user.click(screen.getByRole("button", { name: "Sí, abandonar" }))
  expect(window.location.pathname).not.toBe(`/matches/${match_lobby.id}`)
})

test("Show result if match is finished", async () => {
  renderWithProviders(<Lobby match={match_finished} />)
  const match_winner = "robot2"

  expect(screen.getByText("Ganador: " + match_winner))
})
