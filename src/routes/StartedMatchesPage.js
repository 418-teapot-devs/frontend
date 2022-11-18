import { StartedMatches } from "../features/matches/list/StartedMatches"
import { Box, Card } from "@mui/material"

export const StartedMatchesPage = () => {
  return (
    <Card variant="outlined">
      <Box sx={{ padding: 3 }}>
        <StartedMatches height={"100%"} />
      </Box>
    </Card>
  )
}
