import React from "react"
import {
  Avatar,
  Card,
  CardContent,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/system"

export function RobotBaseItem(props) {

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="overline" margin={0} noWrap="true">
                  {props.name}
                </Typography>
              </Stack>
            </Stack>
            <Avatar src={props.avatar} />
          </Stack>
        </Stack>
      </CardContent>
      {props.children}
    </Card>
  )
}