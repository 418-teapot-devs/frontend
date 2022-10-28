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
      sx={{ height: "100%", width: "100%", overflow: "hidden" }}
      
    >
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Partida</TableCell>
              <TableCell></TableCell>
              <TableCell>Creador</TableCell>
              <TableCell>Juegos</TableCell>
              <TableCell>Rondas</TableCell>
              <TableCell align="right">Jugadores</TableCell>
              <TableCell align="left">Min/Max</TableCell>

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
