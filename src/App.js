import React from "react"
import { ListCreated } from "./features/matches/api/created"

var divStyle = {
  height: '15vw'
}

function App() {

  return (
    <div>
      <h1>PyRobots</h1>
      <div style={divStyle}>
        {ListCreated()}
      </div>
    </div>
  )
}

export default App