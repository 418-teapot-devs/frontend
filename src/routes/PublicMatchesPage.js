import { Grid } from "@mui/material"
import React from "react"

import { PublicMatches } from "../features/matches/list/PublicMatches"
import { CreatedMatches } from "../features/matches/list/CreatedMatches"
import { StartedMatches } from "../features/matches/list/StartedMatches"
import { JoinedMatches } from "../features/matches/list/JoinedMatches"

import { Box, Typography, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Card } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export const PublicMatchesPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={9}>
        <Card variant="outlined">
          <Box sx={{ padding: 3 }}>
            <PublicMatches height={"100%"} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

