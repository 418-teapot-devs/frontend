import { Stack } from "@mui/material"
import React from "react"
import { MatchBaseItem } from "./features/matches/MatchBaseItem"

const mockMatches = [
  {
    name: "Partida #1",
    username: "profran",
    games: 200,
    rounds: 10000,
    min_players: 1,
    max_players: 4,
    is_private: true,
    robots: [
      {
        name: "Roboto",
        username: "ThermoTank45",
        avatar_url: "https://lh3.googleusercontent.com/7iOhvq-MESm5mcvSXrW9EXqnKT2Y9w6mULmsOIeGYsVIqeteM6RbWhC-4xJM7p5SdoM7tWhbAqR4tbX3Fl8mR9hSKx6bNVsdlNLc"
      },
      {
        name: "Roboto",
        username: "ThermoTank46",
        avatar_url: "https://abhayraw1.github.io/icons/icon-256x256.png"
      },
      {
        name: "Roboto",
        username: "ThermoTank47",
        avatar_url: "https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/eb/8c/dc/eb8cdc29-5f64-7257-0937-b8bad0691c94/source/256x256bb.jpg"
      }
    ]
  },
  {
    name: "Partida #2",
    username: "canon",
    games: 100,
    rounds: 5000,
    min_players: 1,
    max_players: 3,
    is_private: false,
    robots: [
      {
        name: "Roboto",
        username: "ThermoTank45",
        avatar_url: "https://lh3.googleusercontent.com/7iOhvq-MESm5mcvSXrW9EXqnKT2Y9w6mULmsOIeGYsVIqeteM6RbWhC-4xJM7p5SdoM7tWhbAqR4tbX3Fl8mR9hSKx6bNVsdlNLc"
      }
    ]
  }
]

function App() {
  return (
    <div>
      <h1>PyRobots</h1>
      <Stack spacing={2}>
        {mockMatches.map((match) => (
          <MatchBaseItem {...match} />
        ))}
      </Stack>
    </div>
  )
}

export default App
