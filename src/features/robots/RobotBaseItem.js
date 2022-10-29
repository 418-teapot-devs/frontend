import React from "react"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/system"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export function RobotBaseItem(props) {

    console.log(props)

  return (
    <Box display="inline-block">
      <Card variant="outlined">
        <CardContent>
          <Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack sx={{ mb: 1}}>
                <Stack direction="column" alignItems="left" noWrap>
                  <Typography variant="overline" margin={0} noWrap>
                    {props.name}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap>
                    <EmojiEventsIcon sx={{fontSize: 15, color: "#ffc107"}}> 
                    </EmojiEventsIcon> Win rate: {props.win_rate}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap>
                    <LocalFireDepartmentIcon sx={{fontSize: 15, color: "#f44336"}}>
                    </LocalFireDepartmentIcon> MMR: {props.mmr}
                  </Typography>
                </Stack>
              </Stack>
              <Avatar src={props.avatar} sx={{ width: 60, height: 60 }}/>
            </Stack>
          </Stack>
        </CardContent>
        {props.children}
      </Card>
    </Box>
    
  )
}