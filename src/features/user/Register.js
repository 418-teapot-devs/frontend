import { React, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { register } from './api/register.mock' // TESTING ONLY
// import { register } from './api/register' // CONNECTION W/BACKEND
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import YupPassword from 'yup-password';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Stack,
  Alert,
  AlertTitle
} from "@mui/material"

YupPassword(yup) // CHECK

const FILE_SIZE = 4400000
const SUPPORTED_IMG_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
]

const validationSchema = () => yup.object({
    username: yup
      .string("Ingrese un nombre de usuario") 
      .required("El nombre de usuario es requerido"),

    email: yup
      .string("Ingrese su correo electrónico")
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    
    avatar: yup.mixed()
    .notRequired()
    .test(
      "fileSize", "El archivo es demasiado grande.", value => (value? (value && value.size <= FILE_SIZE) : true))
    .test(
      "fileFormat", "Formato incorrecto", value => (!value || (value && SUPPORTED_IMG_FORMATS.includes(value.type)))),

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
      .oneOf([yup.ref("password"), null], 'Las contraseñas no coinciden')
  })

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [duplicate, setDuplicate] = useState(false)
  
    const formik = useFormik({
      initialValues: {
        username: "",
        email: "",
        avatar: null,
        password: "",
        confirmPassword: ""
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoading(true)
        const response = await register(values)
        switch(response.status) {
          case(200):
            setLoading(false)
            setSuccess(true)
            setError(false)
            setDuplicate(false)
            break
          case(409): // TODO: DISTINGUISH EMAIL/USERNAME DUPLICATES
            setLoading(false)
            setSuccess(false)
            setError(false)
            setDuplicate(true)
            break
          default:
            setLoading(false)
            setSuccess(false)
            setError(true)
            setDuplicate(false)
        }
      },
      });
  
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
              Registrarse
            </Typography>
            <Stack spacing={2}>
            <Button 
                  variant="outlined" 
                  component="label"
                  fullWidth
                  startIcon={<CameraAltIcon />}
                >
                  Subir avatar
                  <input 
                    hidden accept="image/*"
                    id="avatar" 
                    name="avatar"
                    aria-label="avatar"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                />
            </Button>
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
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  textAlign="center"
                >
                  {Boolean(formik.values.avatar) && formik.values.avatar.name}
                </Typography>
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
                id="email"
                name="email"
                label="Correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Reingrese la contraseña"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ padding: 2 }}>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
            >
              Registrarse
            </Button>
          </CardActions>
        {success &&      
          <Alert severity="success">
              <AlertTitle>
                Se creó el usuario con éxito.
              </AlertTitle>
            </Alert>}
        {error &&
          <Alert severity="error">
            <AlertTitle>
              No se pudo crear el usuario.
            </AlertTitle>
          </Alert>}
        {duplicate &&      
        <Alert severity="error">
            <AlertTitle>
              El correo electrónico o nombre de usuario ya está en uso.
            </AlertTitle>
          </Alert>}
        </form>
      </Card>
    )
}
