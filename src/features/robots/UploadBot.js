import { React, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { uploadBot } from './api/uploadBot';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';

//const FILE_SIZE = 1;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material"

const validationSchema = () => yup.object({
    name: yup
      .string("Ingrese el nombre de su robot") 
      .required("El nombre del robot es requerido"),
      // TODO: Add validation for the name using endpoint

    code: yup
      .string("Adjunte el código de su robot")
      .required("El código de su robot es requerido")
    //   .test("FILE_SIZE", "El archivo es demasiado grande.", value => value && value.size <= FILE_SIZE)
      .test("FILE_FORMAT", "El archivo debe tener extensión .py.", 
        value => value && ['py'].includes(value.type)),

    avatar: yup
      .string("Adjunte un avatar para su robot")
      .notRequired() // TODO: Add in register form
      // .test("avatar", "El avatar de su robot debe ser un archivo .png", (value) => {
      //   return value.endsWith(".png")
      // }),
  })

export const UploadBot = () => {
    const [loading, setLoading] = useState(false)
  
    const formik = useFormik({
      initialValues: {
        name: "",
        code: "",
        avatar: ""
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
                      formik.setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </Button> 
                <Button 
                  variant="outlined" 
                  component="label"
                  fullWidth
                  startIcon={<AddIcon />}
                >
                  Subir código
                  <input 
                    hidden accept="file/*"
                    id="code" 
                    name="code"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("code", event.currentTarget.files[0]);
                    }}
                  />
                </Button>
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
