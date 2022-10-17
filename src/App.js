import React from "react"
import { ListIniciated } from "./features/matches/api/iniciated"

var divStyle = {
  height: '30vw'
}

function App() {
  return (
    <div style={divStyle}>
      <h1>PyRobots</h1>
      {ListIniciated()}
    </div>
  )
}

export default App
