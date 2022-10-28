import { Grid } from "@mui/material"
import React from "react"
import { PublicMatches, CreatedMatches } from "../features/matches/list/Matches"
import { CreateMatch } from "../features/matches/create/CreateMatch"

export const MatchesPage = () => {
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
