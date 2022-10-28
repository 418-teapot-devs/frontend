import React from "react"
import {
  TableRow,
  Avatar,
  AvatarGroup,
  Tooltip,
  Button,
} from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import TableCell from "@mui/material/TableCell"

export const MatchListItem = (props) => {
  console.log(props.match)
  return(
    <TableRow data-testid="public-match-row">
      <TableCell data-testid="public-match-name">
        {props.match.name}
      </TableCell>
      <TableCell data-testid="public-match-isprivate">
        {props.match.is_private && (
          <LockOutlined
            data-testid="public-match-private"
            color="disabled"
          />
        )}
      </TableCell>
      <TableCell data-testid="public-match-username">
        {props.match.host.username}
      </TableCell>
      <TableCell data-testid="public-match-games">
        {props.match.games}
      </TableCell>
      <TableCell data-testid="public-match-rounds">
        {props.match.rounds}
      </TableCell>
      <TableCell data-testid="public-match-players">
        <AvatarGroup max={4}>
          {props.match.robots.map((robot, index) => (
            <Tooltip
              data-testid="public-match-robot"
              arrow
              title={`${robot.name},@${robot.username}`}
              placement="top-start"
              key={index}
            >
              <Avatar key={index} src={robot.avatar_url} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>
        {props.match.min_players}-{props.match.max_players}
      </TableCell>
      <TableCell align="right">
        <Button onClick={props.onClick}>{props.buttontext}</Button>
      </TableCell>
    </TableRow>
  )
}