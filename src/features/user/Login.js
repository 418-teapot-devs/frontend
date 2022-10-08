import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormGroup,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  CardMedia,
  Box
} from "@mui/material"
import {
  loginAsync,
  logout,
  selectToken,
  selectLoginLoading,
  selectLoginErrors,
} from "./userSlice"

const validationSchema = yup.object({
  username: yup
    .string("Ingrese su nombre de usuario")
    .required("El nombre de usuario es requerido"),
  password: yup
    .string("Ingrese su contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
})

export const Login = () => {
  const dispatch = useDispatch()

  const token = useSelector(selectToken)
  const loading = useSelector(selectLoginLoading)
  const errors = useSelector(selectLoginErrors)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginAsync(values.username, values.password))
    },
  })

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <Card variant="outlined">
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                Login
              </Typography>
              <Box>
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
              </Box>
            </CardContent>
            <CardActions sx={{ padding: 2 }}>
              <Button
                disabled={!Boolean(token) || loading}
                variant="contained"
                fullWidth
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
              <Button
                disabled={Boolean(token) || loading}
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={token}
          />
          <CardContent>
            {
              loading ? <CircularProgress /> : <React.Fragment>
                <Typography gutterBottom variant="h5" component="div">
                  Perfil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Token: {token}
                </Typography>
              </React.Fragment>
            }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
