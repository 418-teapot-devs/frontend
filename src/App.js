import React from "react"
import { CreatedMatches } from "./features/matches/CreatedMatches"
import { listCreated } from "./features/matches/api/created"

function App() {
  return (
    <div>
      <h1>PyRobots</h1>
      <CreatedMatches matches={listCreated()}/>
    </div>
  )
}

export default App
