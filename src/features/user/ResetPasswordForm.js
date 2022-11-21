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
import YupPassword from "yup-password"
import * as yup from "yup"
import { resetPassword } from "./api/resetPassword"

YupPassword(yup)

const validationSchema = () =>
  yup.object({
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .minLowercase(1, "La contraseña debe tener al menos una letra minúscula")
      .minUppercase(1, "La contraseña debe tener al menos una letra mayúscula")
      .minNumbers(1, "La contraseña debe tener al menos un número")
      .required("La nueva contraseña es requerida"),
    confirm: yup
      .string()
      .required("La nueva contraseña es requerida")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  })

const ResetPasswordForm = ({ resetToken }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setSuccess(false)

      const error = await resetPassword(resetToken, values.password)

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
    <form data-testid="reset-password-form" onSubmit={formik.handleSubmit}>
      <Card variant="outlined">
        {loading && (
          <Box sx={{ position: "relative" }}>
            <LinearProgress sx={{ position: "absolute", width: "100%" }} />
          </Box>
        )}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h5" gutterBottom>
                Cambiar contraseña
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Nueva contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirm"
                label="Confirmar contraseña"
                type="password"
                value={formik.values.confirm}
                onChange={formik.handleChange}
                error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                helperText={formik.touched.confirm && formik.errors.confirm}
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
                  Se realizó el cambio de contraseña
                </Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                data-testid="reset-password-form-goback"
                fullWidth
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Volver
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                data-testid="reset-password-form-button"
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

export default ResetPasswordForm
