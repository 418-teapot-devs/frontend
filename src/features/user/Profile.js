import React, { useState } from "react"
import YupPassword from "yup-password"
import { useFormik } from "formik"
import { changepassword } from "./api/changepassword"
import * as yup from "yup"
import {
  Alert,  
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import { useAuth } from "../../hooks/useAuth"
import { updateavatar } from "./api/updateavatar"

YupPassword(yup)

const validationSchema = () =>
  yup.object({
    oldPassword: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .minLowercase(1, "La contraseña debe tener al menos una letra minúscula")
      .minUppercase(1, "La contraseña debe tener al menos una letra mayúscula")
      .minNumbers(1, "La contraseña debe tener al menos un número")
      .required("La contraseña actual es requerida"),

    newPassword: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .minLowercase(1, "La contraseña debe tener al menos una letra minúscula")
      .minUppercase(1, "La contraseña debe tener al menos una letra mayúscula")
      .minNumbers(1, "La contraseña debe tener al menos un número")
      .required("La nueva contraseña es requerida"),

    confirmPassword: yup
      .string()
      .required("La nueva contraseña es requerida")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  })

export const Profile = () => {
  const { user, setProfile } = useAuth()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await changepassword(user.token, values)
      switch (response.status) {
        case 200:
          setSuccess(true)
          setError(false)
          break
        case 400:
          setSuccess(false)
          setError(true)
          break
        default:
          setSuccess(false)
          setError(true)
      }
    },
  })

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0]
    const response = updateavatar(avatar, user.token)

    switch (response.status) {
      case 200:
        const user = response.json()
        setProfile(user)
        break
      default:
        setError("Error en el servidor...")
        break
    }
  }

  return (
    <Grid container spacing={20} justifyContent="center">
      <Grid item xs={12} md={6} marginTop={10}>
        <Card>
          <CardContent>
            <Box textAlign="center">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="#1876D2"
              >
                Perfil
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton variant="outlined" component="label">
                <Avatar
                  src={user.profile.avatar_url}
                  sx={{ width: 80, height: 80 }}
                />
                <input
                  hidden
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  aria-label="avatar"
                  type="file"
                  onChange={handleAvatarChange}
                />
              </IconButton>
              <Stack direction="column">
                <Typography gutterBottom variant="h6" component="div">
                  Nombre de usuario: @{user.profile.username}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Correo electrónico: {user.profile.email}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  id="password"
                  name="password"
                  label="Contraseña actual *"
                  type="password"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Nueva contraseña *"
                  type="password"
                  onChange={formik.handleChange}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Reingrese la nueva contraseña *"
                  type="password"
                  onChange={formik.handleChange}
                />
              </Stack>
            </form>
          </CardContent>
          <CardActions>
            <Stack direction="column" spacing={2} fullWidth>
            <Button variant="contained" color="primary" type="submit">
              Cambiar contraseña
            </Button>
            {error && (
              <Alert severity="error">Error al cambiar la contraseña</Alert>
            )}
            {success && (
              <Alert severity="success">Contraseña cambiada con éxito</Alert>
            )}
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
