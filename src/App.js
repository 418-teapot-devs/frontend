import React from "react"
import { IniciatedMatches } from "./features/matches/IniciatedMatches"
import { iniciated } from "./features/matches/api/iniciated"

var divStyle = {
  height: '30vw'
}

function App() {
  return (
    <div style={divStyle}>
      <h1>PyRobots</h1>
      <IniciatedMatches matches={iniciated}/>
    </div>
  )
}

export default App
