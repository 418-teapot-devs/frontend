import { React, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { uploadBot } from "./api/uploadBot" // CONNECTION W/BACKEND
//import { uploadBot } from './api/uploadBot.mock'; // TESTING ONLY
import AddIcon from "@mui/icons-material/Add"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import { useAuth } from "../../hooks/useAuth"

import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Avatar,
  Alert,
  AlertTitle,
  Typography,
  Stack,
} from "@mui/material"

const FILE_SIZE = 4400000
const SUPPORTED_IMG_FORMATS = ["image/png"]

const validationSchema = () =>
  yup.object({
    name: yup
      .string("Ingrese el nombre de su robot")
      .required("El nombre del robot es requerido"),

    code: yup
      .mixed()
      .required("El código de su robot es requerido")
      .test(
        "fileSize",
        "El archivo es demasiado grande",
        (value) => value && value.size <= FILE_SIZE
      ),

    avatar: yup
      .mixed()
      .notRequired()
      .test("fileSize", "El archivo es demasiado grande.", (value) =>
        value ? value && value.size <= FILE_SIZE : true
      )
      .test("fileFormat", "Formato incorrecto", (value) =>
        value ? value && SUPPORTED_IMG_FORMATS.includes(value.type) : true
      ),
  })

export const UploadBot = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [duplicate, setDuplicate] = useState(false)

  const { user } = useAuth()

  const formik = useFormik({
    initialValues: {
      name: "",
      code: null,
      avatar: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const response = await uploadBot(values, user.token)
      switch (response.status) {
        case 201:
          setLoading(false)
          setSuccess(true)
          setError(false)
          setDuplicate(false)
          break
        case 409:
          setLoading(false)
          setSuccess(false)
          setError(true)
          setDuplicate(true)
          break
        default:
          setLoading(false)
          setSuccess(false)
          setError(true)
          setDuplicate(false)
      }
    },
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
            Crear robot <SmartToyIcon />
          </Typography>
          <Stack spacing={2}>
            <Box alignItems="center">
              <Avatar 
                src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : "avatar.png"}
                sx={{ width: 80, height: 80, margin: "auto" }}
                // alignItems="center"
              />
            </Box>
            <Box alignItems="center">
              <Button
                variant="outlined"
                component="label"
                aria-label="avatar"
                fullWidth
                startIcon={<CameraAltIcon />}
              >
                Subir avatar
                <input
                  hidden
                  accept="image/*"
                  id="avatar"
                  name="avatar"
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
              id="name"
              name="name"
              label="Nombre *"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Button
              variant="outlined"
              component="label"
              aria-label="code"
              fullWidth
              startIcon={<AddIcon />}
            >
              Subir código *
              <input
                hidden
                accept=".py"
                id="code"
                name="code"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("code", event.currentTarget.files[0])
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
              {formik.touched.code && formik.errors.code}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              textAlign="center"
            >
              {Boolean(formik.values.code) && formik.values.code.name}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          <Button type="submit" fullWidth variant="contained">
            Crear
          </Button>
        </CardActions>
        {success && (
          <Alert severity="success">
            <AlertTitle>Se subió el robot con éxito</AlertTitle>
          </Alert>
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>No se pudo subir el robot</AlertTitle>
          </Alert>
        )}
        {duplicate && (
          <Alert severity="error">
            <AlertTitle>Ya cuentas con un robot con ese nombre</AlertTitle>
          </Alert>
        )}
      </form>
    </Card>
  )
}