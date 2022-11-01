import { StartedMatches } from "../features/matches/list/StartedMatches"
import { Box, Card, Grid } from "@mui/material"

export const StartedMatchesPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={9}>
        <Card variant="outlined">
          <Box sx={{ padding: 3 }}>
            <StartedMatches height={"100%"} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

