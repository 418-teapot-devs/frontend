import { CreateMatch } from "../features/matches/CreateMatch"
import { ListCreated  } from "../features/matches/api/created"
import { ListPublic } from "../features/matches/api/public"
import { Stack, Box } from "@mui/material"

export const Matches = () => {
	return(
		<div>
		<h2>Partidas</h2>
		<Stack sx={{ height: "100% " }} spacing={10} direction="row">
			<Box sx={{ height: "80vh", padding: 1, width:"65%" }}>
				<CreateMatch userRobots={[]}/>
			</Box>

			<Box sx={{ padding: 1, width:"35%"}}>
				<ListCreated />
			</Box>
		</Stack>
		<ListPublic />
		</div>		
	)
}