import { React, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { uploadBot } from './api/uploadBot';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
  Stack,
} from "@mui/material"

const FILE_SIZE = 4400000
//const SUPPORTED_FILE_FORMAT = ["text"]
const SUPPORTED_IMG_FORMATS = [
//  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
]

const validationSchema = () => yup.object({
    name: yup
      .string("Ingrese el nombre de su robot") 
      .required("El nombre del robot es requerido"),
      // TODO: Add validation for the name using endpoint

    code: yup.mixed()
      .required("El código de su robot es requerido")
      .test(
        "fileSize", "El archivo es demasiado grande.", value => (value && value.size <= FILE_SIZE)),
      // .test(
      //   "fileFormat", "Formato incorrecto", value => (value && SUPPORTED_FILE_FORMAT.includes(value.type))),    

    avatar: yup.mixed()
      .notRequired()
      .test(
        "fileSize", "El archivo es demasiado grande.", value => (value? (value && value.size <= FILE_SIZE) : true))
      .test(
        "fileFormat", "Formato incorrecto", value => (value? (value && SUPPORTED_IMG_FORMATS.includes(value.type)) : true))
  });

export const UploadBot = () => {
    const [loading, setLoading] = useState(false)
  
    const formik = useFormik({
      initialValues: {
        name: "",
        code: null,
        avatar: null
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log(values)
        setLoading(true)
        const response = await uploadBot(values)
        switch(response.status) {
            case(200):
                setLoading(false)
                window.alert("Se subió el robot con éxito.")
                break
            case(422):
                setLoading(false)
                window.alert("Ya cuentas con un robot con ese nombre.")
                break
            default:
                setLoading(false)
                window.alert("No se pudo subir el robot.")
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
              Crear robot <SmartToyIcon />
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
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
                    type="file"
                    onChange={(event) => {
                      console.log(event.currentTarget.files[0])
                      formik.setFieldValue("avatar", event.currentTarget.files[0])
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
                <Button 
                  variant="outlined" 
                  component="label"
                  fullWidth
                  startIcon={<AddIcon />}
                >
                  Subir código
                  <input 
                    hidden accept=".py"
                    id="code" 
                    name="code"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("code", event.currentTarget.files[0]);
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Crear
            </Button>
          </CardActions>
        </form>
      </Card>
    )
}
