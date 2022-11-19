import { Card, CardContent, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useMemo } from "react"
import { stringToColor } from "../../utils/theme"
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress"

const RobotStatus = ({ name, id, x = "--", y = "--", dmg = 100 }) => {
  const color = useMemo(() => stringToColor(name + id), [name, id])
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        minWidth: 300,
        backgroundColor:
          dmg === 100
            ? theme.palette.background.darker
            : theme.palette.background.default,
      })}
    >
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>x: {x}</Typography>
        <Typography>y: {y}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={dmg}
              sx={{
                backgroundColor: color + "80",
                [`& .${linearProgressClasses.bar}`]: {
                  backgroundColor: color,
                },
              }}
            />
          </Box>
          <Box>
            <Typography variant="body2">{dmg}%</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RobotStatus
