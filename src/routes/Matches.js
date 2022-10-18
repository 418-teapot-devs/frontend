import { CreateMatch } from "../features/matches/CreateMatch"
import { PublicMatches } from "../features/matches/PublicMatches"
import { Stack, Box } from "@mui/material"
import { CreatedMatches } from "../features/matches/CreatedMatches"

export const Matches = () => {
  return (
    <div>
      <h2>Partidas</h2>
      <Stack sx={{ height: "100% " }} spacing={10} direction="row">
        <Box sx={{ height: "80vh", padding: 1, width: "65%" }}>
          <CreateMatch userRobots={[]} />
        </Box>

        <Box sx={{ padding: 1, width: "35%" }}>
          <CreatedMatches />
        </Box>
      </Stack>
      <PublicMatches />
    </div>
  )
}
