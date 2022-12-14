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
      .max(10000, "Se permiten hasta 10000 rondas")
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
              rounds: 1000,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, touched, errors }) => (
              <Form>
                <CardContent>
                  <Stack spacing={2} justifyContent="center" textAlign="center">
                    <Typography variant="h5" gutterBottom>
                      Simulación
                    </Typography>
                    <Field name="rounds">
                      {({ field }) => (
                        <TextField
                          data-testid="simulation-form-rounds"
                          fullWidth
                          label="Cantidad de rondas *"
                          type="number"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          error={touched.rounds && Boolean(errors.rounds)}
                          helperText={touched.rounds && errors.rounds}
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
                                    data-testid={`robots-select-${index}`}
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
                  <Button
                    data-testid="simulation-form-start-button"
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={values.robots.some((robot) => robot === "")}
                  >
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
