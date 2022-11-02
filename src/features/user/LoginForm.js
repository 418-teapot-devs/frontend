import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material"

const validationSchema = yup.object({
  username: yup
    .string("Ingrese su nombre de usuario")
    .max(32, "El nombre de usuario debe tener menos de 32 caracteres")
    .required("El nombre de usuario es requerido"),
  password: yup
    .string("Ingrese su contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres")
    .required("La contraseña es requerida"),
})

export const LoginForm = ({ onSubmit, loading, error }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
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
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Nombre de usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {Boolean(error) && <Alert severity="error">{error}</Alert>}
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
          <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Iniciar Sesión
          </Button>
          </Box>
          </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  )
}
