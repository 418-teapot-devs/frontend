import * as yup from "yup"
import {
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
import { RobotsSelect } from "../robots/RobotsSelect"
import { Field, FieldArray, Form, Formik } from "formik"
import { DeleteOutlined } from "@mui/icons-material"

const validationSchema = () =>
  yup.object({
    robots: yup
      .array()
      .of(yup.number())
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
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined">
          <Formik
            initialValues={{
              robots: [""],
              rounds: 999,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
                <CardContent>
                  <Stack spacing={2} justifyContent="center" textAlign="center">
                    <Typography variant="h5" gutterBottom>
                      Simulación
                    </Typography>
                    <Field name="rounds">
                      {({ field }) => (
                        <TextField
                          fullWidth
                          label="Cantidad de rondas *"
                          type="number"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          error={field.touched && Boolean(field.errors)}
                          helperText={field.touched && field.errors}
                        />
                      )}
                    </Field>
                    <FieldArray
                      name="robots"
                      render={(arrayHelpers) => (
                        <Stack spacing={2}>
                          {values.robots.map((robot, index) => (
                            <Stack direction="row" key={index}>
                              <Field name={`robots.${index}`}>
                                {({ field }) => (
                                  <RobotsSelect
                                    value={field.value}
                                    name={field.name}
                                    onChange={field.onChange}
                                    label="Elegir Robot *"
                                  />
                                )}
                              </Field>
                              {values.robots.length > 1 && (
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteOutlined />
                                </IconButton>
                              )}
                            </Stack>
                          ))}
                          {values.robots.length < 4 && (
                            <Button onClick={() => arrayHelpers.push("")}>
                              Añadir un robot
                            </Button>
                          )}
                        </Stack>
                      )}
                    />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button type="submit" fullWidth variant="contained">
                    Iniciar Simulación
                  </Button>
                </CardActions>
              </Form>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SimulationForm
