import React from "react"
import { Login } from "./features/user/Login"
import { Profile } from "./features/user/Profile"
import { CreateMatch } from "./features/matches/CreateMatch"
import { IniciatedMatches } from "./features/matches/IniciatedMatches"
import { iniciated } from "./features/matches/api/iniciated"
import { Register } from "./features/user/Register"

var divStyle = {
  height: '30vw'
}

function App() {
  return (
    <div style={divStyle}>
      <h1>PyRobots</h1>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Login />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
