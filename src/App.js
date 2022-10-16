import React from "react"
import { joined } from "./features/matches/api/joined"
import { JoinedMatches } from "./features/matches/JoinedMatches"

var divStyle = {
  height: '30vw'
}

function App() {
  return (
    <div>
    <h1>PyRobots</h1>
    <div style={divStyle}>
      <JoinedMatches matches={joined}/>
      </div>
    </div>
  )
}

export default App
