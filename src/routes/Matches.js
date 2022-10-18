import { CreateMatch } from "../features/matches/CreateMatch"
import { Grid } from "@mui/material"
import { CreatedMatches } from "../features/matches/CreatedMatches"
import React from "react"
import { PublicMatches } from "../features/matches/PublicMatches"

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
        <Grid item xs={12}>
          <PublicMatches />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
