import React from "react"
import { CreatedMatches } from "./features/matches/CreatedMatches"
import { listCreated } from "./features/matches/api/created"

var divStyle = {
  height: '15vw'
}

function App() {
  return (
    <div>
    <h1>PyRobots</h1>
    <div style={divStyle}>
      <CreatedMatches matches={listCreated()}/>
      </div>
    </div>
  )
}

export default App
