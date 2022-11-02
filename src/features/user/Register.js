import { React, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
//import { register } from "./api/register.mock" // TESTING ONLY
import { register } from './api/register' // CONNECTION W/BACKEND
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import YupPassword from "yup-password"
import { grey } from '@mui/material/colors';

import {
  Avatar,
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
  AlertTitle,
} from "@mui/material"

YupPassword(yup)

const FILE_SIZE = 4400000
const SUPPORTED_IMG_FORMATS = ["image/png"]

const validationSchema = () =>
  yup.object({
    username: yup
      .string("Ingrese un nombre de usuario")
      .required("El nombre de usuario es requerido"),

    email: yup
      .string("Ingrese su correo electrónico")
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),

    avatar: yup
      .mixed()
      .notRequired()
      .test("fileSize", "El archivo es demasiado grande.", (value) =>
        value ? value && value.size <= FILE_SIZE : true
      )
      .test(
        "fileFormat",
        "Formato incorrecto",
        (value) =>
          !value || (value && SUPPORTED_IMG_FORMATS.includes(value.type))
      ),

    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .minLowercase(1, "La contraseña debe tener al menos una letra minúscula")
      .minUppercase(1, "La contraseña debe tener al menos una letra mayúscula")
      .minNumbers(1, "La contraseña debe tener al menos un número")
      .required("La contraseña es requerida"),

    confirmPassword: yup
      .string()
      .required("La contraseña es requerida")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  })

export const Register = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [duplicateUsername, setDuplicateUsername] = useState(false)
  const [duplicateEmail, setDuplicateEmail] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      avatar: null,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await register(values)
      switch (response.status) {
        case 201:
          setSuccess(true)
          setError(false)
          setDuplicateEmail(false)
          setDuplicateUsername(false)
          break
        case 409:
          setSuccess(false)
          setError(false)
          const body = await response.json()
          setDuplicateEmail(body["detail"].toString().includes("E-Mail was taken!"))
          setDuplicateUsername(body["detail"].toString().includes("Username was taken!"))
          break
        default:
          setSuccess(false)
          setError(true)
          setDuplicateEmail(false)
          setDuplicateUsername(false)
      }
    },
  })

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Registrarse
          </Typography>
          <Stack spacing={2}>
            <Avatar 
              src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : "avatar.png"}
              sx={{ width: 80, height: 80, margin: "auto", bgcolor: grey[400] }}
            />
            <Box textAlign="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CameraAltIcon />}
            >
              Subir avatar
              <input
                hidden
                accept="image/*"
                id="avatar"
                name="avatar"
                aria-label="avatar"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("avatar", event.currentTarget.files[0])
                }}
              />
            </Button>
            </Box>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              textAlign="center"
              color="error"
              onChange={formik.handleChange}
            >
              {formik.touched.avatar && formik.errors.avatar}
            </Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Nombre de usuario *"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo electrónico *"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña *"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Reingrese la contraseña *"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
          <Box textAlign="center">
          <Button type="submit" variant="contained">
            Registrarse
          </Button>
          </Box>
          </Grid>
          </Grid>
        </CardActions>
        {success && (
          <Alert severity="success">
            <AlertTitle>Se creó el usuario con éxito</AlertTitle>
          </Alert>
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>No se pudo crear el usuario</AlertTitle>
          </Alert>
        )}
        {duplicateEmail && (
          <Alert severity="error">
            <AlertTitle>El correo electrónico ya está en uso</AlertTitle>
          </Alert>
        )}
        {duplicateUsername && (
          <Alert severity="error">
            <AlertTitle>El nombre de usuario ya está en uso</AlertTitle>
          </Alert>
        )}
      </form>
    </Box>
  )
}