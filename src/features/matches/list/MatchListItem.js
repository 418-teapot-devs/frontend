import React from "react"
import { TableRow, Avatar, AvatarGroup, Tooltip, Button } from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import TableCell from "@mui/material/TableCell"

export const MatchListItem = (props) => {
  return (
    <TableRow data-testid="public-match-row">
      <TableCell data-testid="public-match-name">{props.match.name}</TableCell>
      <TableCell data-testid="public-match-isprivate">
        {props.match.is_private && (
          <LockOutlined data-testid="public-match-private" color="disabled" />
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
          {Object.keys(props.match.robots).map((key, index) => (
            <Tooltip
              data-testid="public-match-robot"
              arrow
              title={`${props.match.robots[key].name},@${props.match.robots[key].username}`}
              placement="top-start"
              key={index}
            >
              <Avatar
                key={index}
                src={
                  "http://localhost:8000" + props.match.robots[key].avatar_url
                }
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>
        {props.match.min_players}-{props.match.max_players}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          fullWidth
          data-testid={"join-button-" + props.match.id}
          onClick={() => props.onClick(props.match)}
        >
          {props.buttontext}
        </Button>
      </TableCell>
    </TableRow>
  )
}
