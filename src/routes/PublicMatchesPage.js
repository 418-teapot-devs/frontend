import { Grid } from "@mui/material"
import React from "react"

import { PublicMatches } from "../features/matches/list/PublicMatches"

import { Box } from "@mui/material"
import { Card } from "@mui/material"

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

