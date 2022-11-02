import { Grid } from "@mui/material"
import React from "react"

import { PublicMatches } from "../features/matches/list/PublicMatches"
import { CreatedMatches } from "../features/matches/list/CreatedMatches"
import { StartedMatches } from "../features/matches/list/StartedMatches"
import { JoinedMatches } from "../features/matches/list/JoinedMatches"

import { CreateMatch } from "../features/matches/create/CreateMatch"
import { Box, Typography } from "@mui/material"

export const MatchesPage = () => {
  return (
    <React.Fragment>
      <Typography variant="h3">Partidas</Typography>
      <Grid container >
        <Grid item  md={6} sx={{padding: 3 }}>
              <Box
                data-testid="created-matches">
                <CreatedMatches height={300} />
            </Box>
        </Grid>

        <Grid item md={6} >
        <Box sx={{padding: 3}}>
          <Box data-testid="joined-matches">
            <JoinedMatches height={300}/>
          </Box>
        </Box>
        </Grid>
      
      </Grid>
      <Box
        data-testid="public-matches"
        sx={{padding: 3}}>
        <PublicMatches height={"100%"}/>
      </Box>
      <Box
        data-testid="started-matches"
        sx={{padding: 3}}>
        <StartedMatches height="100%"/>
      </Box>
    </React.Fragment>
  )
}
