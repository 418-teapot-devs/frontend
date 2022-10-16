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
    CircularProgress,
} from '@mui/material'
import { LockOutlined } from "@mui/icons-material"
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));



export const IniciatedMatches = (({matches}) => {
  return (
    <Paper sx={{height: '100%', width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ height: '100%' }} >
      <Table
        stickyHeader
        aria-label="customized table"

      >
        <TableHead >
        <StyledTableRow>
            <StyledTableCell>Partida</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Puesto</StyledTableCell>
            <StyledTableCell>MMR ganado</StyledTableCell>
            <StyledTableCell>Creador</StyledTableCell>
            <StyledTableCell>Juegos</StyledTableCell>
            <StyledTableCell>Rondas</StyledTableCell>
            <StyledTableCell align="right">Jugadores</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            (matches.length === 0 ) &&
              <StyledTableRow>
                <StyledTableCell colSpan={8} align='center'>
                  Parece que todavía no has jugado ninguna partida...

                </StyledTableCell>
                </StyledTableRow>
            
          }
          {matches.map((match, index) => (
            <StyledTableRow key={index} data-testid="match-row" >
              <StyledTableCell data-testid="match-name">
               {match.name}
              </StyledTableCell>
              <StyledTableCell data-testid='match-isprivate'>
                 {match.is_private &&
                 <LockOutlined data-testid='match-private' color="disabled" />}
              </StyledTableCell>
              <StyledTableCell data-testid='match-rank' >
                {match.ranking_position ||
                <CircularProgress sx={{animationDuration: '6500ms'}}/>}
              </StyledTableCell>
              <StyledTableCell data-testid='match-mmrwon'>
                 {(Boolean(match.MMR_won) && "+" + match.MMR_won)
                 || <CircularProgress sx={{animationDuration: '6500ms'}}/>}
              </StyledTableCell>
              <StyledTableCell data-testid="match-username">{match.username}</StyledTableCell>
              <StyledTableCell data-testid="match-games">{match.games}</StyledTableCell>
              <StyledTableCell data-testid="match-rounds">{match.rounds}</StyledTableCell>
              <StyledTableCell data-testid="match-players">
                <AvatarGroup max={4}>
                {match.robots.map((robot, index) => (
                    <Tooltip data-testid="match-robot"
                      arrow
                      title={`${robot.name},@${robot.username}`}
                      placement="top-start"
                      key={index}>
                    <Avatar key={index} src={robot.avatar_url} />
                    </Tooltip>
                ))}
                </AvatarGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  </Paper>
  );
})