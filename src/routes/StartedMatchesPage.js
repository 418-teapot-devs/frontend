import { StartedMatches } from "../features/matches/list/StartedMatches"
import { Box, Card } from "@mui/material"

export const StartedMatchesPage = () => {
  return (
    <Card variant="outlined">
      <StartedMatches height={"100%"} />
    </Card>
  )
}
