import React from "react"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  TableRow,
} from "@mui/material"
import TableCell from "@mui/material/TableCell"

export const MatchesList = (props) => {
  return (
    <Box alignItems="center"
      sx={{ height: props.height, width: "100%", overflow: "hidden" }} 
    >
      <TableContainer sx={{ height: "100%" }} component={Box}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell><b>Partida</b></TableCell>
              <TableCell></TableCell>
              <TableCell><b>Creador</b></TableCell>
              <TableCell><b>Juegos</b></TableCell>
              <TableCell><b>Rondas</b></TableCell>
              <TableCell><b>Jugadores</b></TableCell>
              <TableCell><b>Min/Max</b></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.children}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
