import React from "react"
import { CreateMatch } from "./features/matches/CreateMatch"

function App() {
  return (
    <div>
      <h1>PyRobots</h1>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <CreateMatch />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>

        </Grid>
      </Grid>
    </div>
  )
}

export default App
