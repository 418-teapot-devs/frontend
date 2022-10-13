import React from "react"
import { Button, CardActions, Grid } from "@mui/material"
import { MatchBaseItem } from "../MatchBaseItem"


let mockMatches = [
  {
    name: "Partida #1",
    games: 200,
    rounds: 10000,
    min_players: 1,
    max_players: 4,
    is_private: true,
    robots: [
      {
        name: "Roboto",
        username: "ThermoTank45",
        avatar_url:
          "https://lh3.googleusercontent.com/7iOhvq-MESm5mcvSXrW9EXqnKT2Y9w6mULmsOIeGYsVIqeteM6RbWhC-4xJM7p5SdoM7tWhbAqR4tbX3Fl8mR9hSKx6bNVsdlNLc",
      },
      {
        name: "Roboto",
        username: "ThermoTank46",
        avatar_url: "https://abhayraw1.github.io/icons/icon-256x256.png",
      },
      {
        name: "Roboto",
        username: "ThermoTank47",
        avatar_url:
          "https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/eb/8c/dc/eb8cdc29-5f64-7257-0937-b8bad0691c94/source/256x256bb.jpg",
      },
    ],
  },
  {
    name: "Partida #2",
    games: 100,
    rounds: 5000,
    min_players: 2,
    max_players: 3,
    is_private: false,
    robots: [
      {
        name: "Roboto",
        username: "ThermoTank45",
        avatar_url: "https://genspect.org/wp-content/uploads/Reddit.png"
      }
    ]
  },

]

// FIXME: Hacer el pedido http
const response = {status: 200, body: mockMatches}

export const listCreated = () => {
  const list = response.body.map((match) => {return(
  {
      name: match.name,
      username: null,
      is_private: match.is_private,
      max_players: match.max_players,
      min_players: match.min_players,
      robots: match.robots,
      games: match.games,
      rounds: match.rounds
  })}
  )
  return list
}


// test; Jest, RTL(React Testing Library): los testing se hacen desde el punto de vista de usuario.

// el componente se renderiza correctamente
// que cada row se renderiza: 
// front renderizado