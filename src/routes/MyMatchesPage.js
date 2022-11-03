import { Grid } from "@mui/material"
import React from "react"

import { CreatedMatches } from "../features/matches/list/CreatedMatches"
import { JoinedMatches } from "../features/matches/list/JoinedMatches"

import { Card, Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

export const MyMatchesPage = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Fab
        variant="extended" 
        onClick={() => navigate("/matches/create")}
        color='primary'
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 16,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear Partida
      </Fab>


      <Grid container spacing={5}>
        <Grid item md={6}>
          <Card data-testid="created-matches" variant="outlined" sx={{padding: 2}}>
            <CreatedMatches height="100%" />
          </Card>
        </Grid>

          <Grid item md={6}>
            <Card data-testid="joined-matches" variant="outlined" sx={{padding: 2}}>
              <JoinedMatches height="100%" />
            </Card>
          </Grid>
      </Grid>
    </React.Fragment>
  )
}
