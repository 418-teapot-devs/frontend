import React, { useState } from "react"
import YupPassword from "yup-password"
import { useFormik } from "formik"
import { changepassword } from "./api/changepassword"
import * as yup from "yup"
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
    currentPassword: yup
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
      .oneOf([yup.ref("newPassword"), null], "Las contraseñas no coinciden"),
  })

export const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [pswdError, setPswdError] = useState(false)
  const [duplicatePswd, setDuplicatePswd] = useState(false)
  const [wrongPswd, setWrongPswd] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
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
          setPswdError(false)
          setDuplicatePswd(false)
          setWrongPswd(false)
          break
        case 401:
          setSuccess(false)
          setPswdError(false)
          setDuplicatePswd(false)
          setWrongPswd(true)
          break
        case 409:
          setSuccess(false)
          setPswdError(false)
          setDuplicatePswd(true)
          setWrongPswd(false)
          break
        default:
          setSuccess(false)
          setPswdError(true)
          setDuplicatePswd(false)
          setWrongPswd(false)
          break
      }
    },
  })

  const handleAvatarChange = async (e) => {
    const avatar = e.currentTarget.files[0]
    const response = await updateavatar(user.token, avatar)

    switch (response.status) {
      case 200:
        const profile = await response.json()
        updateProfile(profile)
        break
      default:
        setAvatarError(true)
        break
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={6}>
        <Card variant="outlined">
          <CardContent>
            <Box textAlign="center">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Perfil
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton variant="outlined" component="label">
                <Avatar
                  src={"http://localhost:8000" + user.profile.avatar_url}
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
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  id="currentPassword"
                  name="currentPassword"
                  label="Contraseña actual *"
                  type="password"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.currentPassword &&
                    Boolean(formik.errors.currentPassword)
                  }
                  helperText={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                  }
                />
                <TextField
                  id="newPassword"
                  name="newPassword"
                  label="Nueva contraseña *"
                  type="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Reingrese la nueva contraseña *"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Box sx={{ m: 1, marginLeft: "auto" }}>
                <Button type="submit" variant="contained" color="primary">
                  Cambiar contraseña
                </Button>
              </Box>
            </CardActions>
            {pswdError && (
              <Alert severity="error">
                <AlertTitle>Error al cambiar la contraseña</AlertTitle>
              </Alert>
            )}
            {duplicatePswd && (
              <Alert severity="warning">
                <AlertTitle>La contraseña nueva es igual a la actual</AlertTitle>
              </Alert>
            )}
            {wrongPswd && (
              <Alert severity="error">
                <AlertTitle>La contraseña actual es incorrecta</AlertTitle>
              </Alert>
            )}
            {success && (
              <Alert severity="success">
                <AlertTitle>Contraseña cambiada con éxito</AlertTitle>
              </Alert>
            )}
            {avatarError && (
              <Alert severity="error">
                <AlertTitle>Error al subir el avatar</AlertTitle>
              </Alert>
            )}
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
