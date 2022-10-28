import { Grid } from "@mui/material"
import React from "react"
import { PublicMatches, CreatedMatches, StartedMatches, JoinedMatches } from "../features/matches/list/Matches"
import { CreateMatch } from "../features/matches/create/CreateMatch"
import { Box } from "@mui/system"

export const MatchesPage = () => {
  return (
    <React.Fragment>
      <h1>Partidas</h1>
      <Grid container >

        <Grid item  md={6}>
          <Box sx={{padding: 3 }} >
            <h2>Partidas Propias</h2>
            <Box
              sx={{width:"100%", height:300, overflow:"scroll"}}
              data-testid="created-matches">
              <CreatedMatches  />
            </Box>
          </Box>
        </Grid>

        <Grid item md={6} >
        <Box sx={{padding: 3}}>
          <h2>Partidas Compartidas</h2>
          <Box
            sx={{width:"100%", height:300, overflow:"scroll"}}
            data-testid="joined-matches"
          >
              <JoinedMatches />
          </Box>
        </Box>
        </Grid>
      
      </Grid>
      <Box
        data-testid="public-matches"
      >
        <h2>Partidas Públicas</h2>
        <PublicMatches/>
      </Box>
      <Box
        data-testid="started-matches">
        <h2>Historial de partidas</h2>
        <StartedMatches/>
      </Box>
    </React.Fragment>
  )
}
