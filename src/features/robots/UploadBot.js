import { React, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { uploadBot } from "./api/uploadBot" // CONNECTION W/BACKEND
//import { uploadBot } from './api/uploadBot.mock'; // TESTING ONLY
import AddIcon from "@mui/icons-material/Add"
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined"
import { createTheme } from "@mui/material/styles"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { useAuth } from "../../hooks/useAuth"

import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Avatar,
  Alert,
  AlertTitle,
  Typography,
  Stack,
  ThemeProvider,
  Divider,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { TextEditor } from "./TextEditor"

const FILE_SIZE = 4400000
const SUPPORTED_IMG_FORMATS = ["image/png"]

var theme = createTheme({
  typography: {
    htmlFontSize: 11,
  },
})

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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const [code, setCode] = useState("")
  const [readOnly, setReadOnly] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      code: null,
      avatar: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await uploadBot(values, user.token)
      switch (response.status) {
        case 201:
          setSuccess(true)
          setError(false)
          setDuplicate(false)
          navigate("/robots?upload_success=True")
          break
        case 409:
          setSuccess(false)
          setError(true)
          setDuplicate(true)
          break
        default:
          setSuccess(false)
          setError(true)
          setDuplicate(false)
      }
    },
  })

  const createFileFromCode = () => {
    setReadOnly(true)
    const codeFile = new Blob([code], {
      type: "text/plain",
    })
    console.log(codeFile)
    formik.setFieldValue("code", codeFile)
  }

  return (
    <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
      <Grid item xs={10} md={5} lg={4}>
        <Card variant="outlined">
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <ThemeProvider theme={theme}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  textAlign="center"
                >
                  Crear robot
                </Typography>
              </ThemeProvider>
              <Stack spacing={1}>
                <Box alignItems="center">
                  <Avatar
                    src={
                      formik.values.avatar
                        ? URL.createObjectURL(formik.values.avatar)
                        : "avatar.png"
                    }
                    sx={{ width: 80, height: 80, margin: "auto" }}
                  />
                </Box>
                <Box textAlign="center" sx={{ m: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    aria-label="avatar"
                    startIcon={<CameraAltIcon />}
                    fullWidth
                  >
                    Subir avatar
                    <input
                      hidden
                      accept="image/*"
                      id="avatar"
                      name="avatar"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "avatar",
                          event.currentTarget.files[0]
                        )
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
                <Box textAlign="center">
                  <TextField
                    id="name"
                    name="name"
                    label="Nombre *"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                  />
                </Box>
                <Divider>
                  <Typography gutterBottom textAlign="center">
                    Código *
                  </Typography>
                </Divider>
                {!openEditor && (
                  <Stack
                    direction="row"
                    textAlign="center"
                    sx={{ m: 3 }}
                    spacing={1}
                  >
                    <Button
                      variant="outlined"
                      component="label"
                      aria-label="code"
                      startIcon={<AddIcon />}
                      fullWidth
                    >
                      Subir archivo
                      <input
                        hidden
                        accept=".py"
                        id="code"
                        name="code"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "code",
                            event.currentTarget.files[0]
                          )
                        }}
                      />
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CreateOutlinedIcon />}
                      onClick={() => {
                        formik.setFieldValue("code", null)
                        setOpenEditor(true)
                        setReadOnly(false)
                      }}
                    >
                      Abrir editor
                    </Button>
                  </Stack>
                )}
                {openEditor && (
                  <Stack spacing={1}>
                    <TextEditor
                      code={code}
                      setCode={setCode}
                      readOnly={readOnly}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        variant="outlined"
                        disabled={readOnly || code === ""}
                        onClick={createFileFromCode}
                      >
                        Subir Código
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          setOpenEditor(false)
                          setCode("")
                        }}
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  </Stack>
                )}
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
              <Button type="submit" variant="contained" fullWidth>
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
      </Grid>
    </Grid>
  )
}
