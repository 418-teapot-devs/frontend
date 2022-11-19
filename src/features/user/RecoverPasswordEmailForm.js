import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { recoverEmail } from "./api/recoverEmail"

const validationSchema = yup.object({
  email: yup
    .string("Ingrese su email")
    .email("Debe ingresar un email válido")
    .required("Debe ingresar un email"),
})

const RecoverPasswordEmailForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)

      setLoading(true)
      setSuccess(false)

      const error = await recoverEmail(values.email)

      setLoading(false)
      if (error) {
        setError(error)
      } else {
        setError(null)
        setSuccess(true)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card variant="outlined">
        {loading && (
          <Box sx={{ position: "relative" }}>
            <LinearProgress sx={{ position: "absolute", width: "100%" }} />
          </Box>
        )}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Recuperar Contraseña
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Alert severity="success">
                  Se envió un correo al email ingresado
                </Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Volver
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
              >
                Recuperar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default RecoverPasswordEmailForm
