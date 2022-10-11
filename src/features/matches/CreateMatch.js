import React from "react"
import { useFormik } from "formik"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material"

const validationSchema = () => null

const cancelCreateMatch = () => {
    // FIXME: volver a la página principal
    console.log("Cancelado")
}

export const CreateMatch = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      min_players: null,
      max_players: null,
      games: null,
      rounds: null,
      password: "",
      confirm_password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { },
  })

  return (
    <Card variant="outlined">
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Crear Partida
          </Typography>
          <Stack spacing={2}>
          <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre de la partida"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="min_players"
              name="min_players"
              label="Cantidad mínima de jugadores"
              type="number"
              value={formik.values.min_players}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="max_players"
              name="max_players"
              label="Cantidad máxima de jugadores"
              type="number"
              value={formik.values.max_players}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="games"
              name="games"
              label="Cantidad de juegos"
              type="number"
              value={formik.values.games}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="rounds"
              name="rounds"
              label="Cantidad de rondas"
              type="number"
              value={formik.values.rounds}
              onChange={formik.handleChange}
            />  
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña de partida"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="confirm_password"
              name="confirm_password"
              label="Confirmar contraseña de partida"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={ () => cancelCreateMatch() }
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Crear
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
