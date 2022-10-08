import { Grid } from "@mui/material"
import React from "react"
import { Login } from "./features/user/Login"
import { Profile } from "./features/user/Profile"

function App() {
  return (
    <div>
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
