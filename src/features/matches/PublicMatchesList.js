import React from "react"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  AvatarGroup,
  Tooltip,
  Button,
} from "@mui/material"
import { LockOutlined } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}))

const joinmatch = (match) => {
  window.alert("Te uniste a la partida:" + match.name + "Con id: " + match.id)
}

export const PublicMatchesList = ({ matches }) => {
  return (
    <Paper
      sx={{ height: "100%", width: "100%", overflow: "hidden" }}
      data-testid="iniciated-matches"
    >
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Partida</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Creador</StyledTableCell>
              <StyledTableCell>Juegos</StyledTableCell>
              <StyledTableCell>Rondas</StyledTableCell>
              <StyledTableCell align="right">Jugadores</StyledTableCell>
              <StyledTableCell align="left">Min/Max</StyledTableCell>

              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {matches.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  Parece que todavía no hay ninguna partida...
                </StyledTableCell>
              </StyledTableRow>
            )}
            {matches.map((match, index) => (
              <StyledTableRow key={index} data-testid="public-match-row">
                <StyledTableCell data-testid="public-match-name">
                  {match.name}
                </StyledTableCell>
                <StyledTableCell data-testid="public-match-isprivate">
                  {match.is_private && (
                    <LockOutlined
                      data-testid="public-match-private"
                      color="disabled"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell data-testid="public-match-username">
                  {match.username}
                </StyledTableCell>
                <StyledTableCell data-testid="public-match-games">
                  {match.games}
                </StyledTableCell>
                <StyledTableCell data-testid="public-match-rounds">
                  {match.rounds}
                </StyledTableCell>
                <StyledTableCell data-testid="public-match-players">
                  <AvatarGroup max={4}>
                    {match.robots.map((robot, index) => (
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
                </StyledTableCell>
                <StyledTableCell>
                  {match.min_players}-{match.max_players}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => joinmatch(match)}>Unirme</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
