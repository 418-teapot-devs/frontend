import React from "react"
import { ListPublic } from "./features/matches/api/public"

var divStyle = {
  height: '15vw'
}

function App() {

  return (
    <div>
      <h1>PyRobots</h1>
      <div style={divStyle}>
        {ListPublic()}
      </div>
    </div>
  )
}

export default App