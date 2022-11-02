import * as yup from "yup"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { RobotsSelect } from "../robots/RobotsSelect"
import { useFormik } from "formik"

const validationSchema = () =>
  yup.object({
    robots: yup
      .array()
      .required("Los robots son obligatorios")
      .min(1, "El mínimo de robots es 1")
      .max(4, "El máximo de robots es 4"),
    rounds: yup
      .number()
      .positive("La cantidad de rondas debe ser un entero positivo")
      .integer("La cantidad de rondas debe ser un entero positivo")
      .max(999, "Se permiten hasta 999 rondas")
      .required("La cantidad de rondas es obligatoria"),
  })

const SimulationForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      robots: [],
      rounds: 999,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined">
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Stack spacing={2} justifyContent="center" textAlign="center">
                <Typography variant="h5" gutterBottom>
                  Simulación
                </Typography>
                <TextField
                  fullWidth
                  id="rounds"
                  name="rounds"
                  label="Cantidad de rondas *"
                  type="number"
                  value={formik.values.rounds}
                  onChange={formik.handleChange}
                  error={formik.touched.rounds && Boolean(formik.errors.rounds)}
                  helperText={formik.touched.rounds && formik.errors.rounds}
                />
                <RobotsSelect
                  value={formik.values.robots}
                  multiple
                  name="robots"
                  onChange={formik.handleChange}
                  label="Elegir Robot *"
                  error={formik.touched.robots && Boolean(formik.errors.robots)}
                />
                <Typography color="error" variant="caption">{formik.errors.robots}</Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button type="submit" fullWidth variant="contained">
                Iniciar Simulación
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SimulationForm
