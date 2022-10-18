import { CreateMatch } from "../features/matches/CreateMatch"
import { Grid } from "@mui/material"
import { CreatedMatches } from "../features/matches/CreatedMatches"
import React from "react"

export const Matches = () => {
  return (
    <React.Fragment>
      <h2>Partidas</h2>
      <Grid container>
        <Grid item xs={12} md={6}>
          <CreateMatch />
        </Grid>
        <Grid item xs={12} md={6}>
          <CreatedMatches />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
