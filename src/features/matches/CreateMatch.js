import React, {useState} from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { creatematch } from "./api/creatematch"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  FormHelperText
} from "@mui/material"

const validationSchema = () => yup.object({
    name: yup
      .string()
      .required("El nombre de partida es obligatorio")
      .max(30 , "El nombre de la partida es demasiado largo"),
    
    min_players: yup
      .number()
      .integer("La cantidad mínima de jugadores debe ser un entero")
      .min(2, "Las partidas deben incluir al menos 2 jugadores")
      .max(4, "Se permiten hasta 4 jugadores")
      .required("La cantidad mínima de jugadores es obligatoria"),
  
    max_players: yup
      .number()
      .integer("La cantidad máxima de jugadores debe ser un entero positivo")
      .required("La cantidad máxima de jugadores es obligatoria")
      .max(4, "Se permiten hasta 4 jugadores")
      .min(yup.ref("min_players"), "La cantidad máxima de jugadores no debe ser menor que la cantidad mínima"),
      
    games: yup
      .number()
      .positive("La cantidad de juegos debe ser un entero positivo")
      .integer("La cantidad de juegos debe ser un entero positivo")
      .max(200, "Se permiten hasta 200 juegos")
      .required("La cantidad de juegos es obligatoria"),
  
    rounds: yup
      .number()
      .positive("La cantidad de rondas debe ser un entero positivo")
      .integer("La cantidad de rondas debe ser un entero positivo")
      .max(10000, "Se permiten hasta 10000 rondas")
      .required("La cantidad de rondas es obligatoria"),
  
    password: yup
      .string(),
    
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], 'Las contraseñas deben ser iguales'),
  
    robot_name: yup
      .string().required("Elegir un robot es obligatorio")
  })


const cancelCreateMatch = () => {
    // FIXME: volver a la página principal
    console.log("Cancelado")   
}



export const CreateMatch = ({userRobots}) => {
  userRobots.map( (r) => console.log(r.name))
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: "",
      min_players: "",
      max_players: "",
      games: "",
      rounds: "",
      password: "",
      confirm_password: "",
      robot_name: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        setLoading(true)
        const response = await creatematch(values)
        switch(response.status){
          case(201): 
            setLoading(false)
            window.alert("Se creó la partida con éxito.")
            console.log(values)
            break
          default:
            setLoading(false)
            window.alert("No se pudo crear la partida.")
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
            Crear Partida
          </Typography>
          <Stack spacing={2}>
          <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre de la partida"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="min_players"
              name="min_players"
              label="Cantidad mínima de jugadores"
              type="number"
              value={formik.values.min_players}
              onChange={formik.handleChange}
              error={formik.touched.min_players && Boolean(formik.errors.min_players)}
              helperText={formik.touched.min_players && formik.errors.min_players}
            />
            <TextField
              fullWidth
              id="max_players"
              name="max_players"
              label="Cantidad máxima de jugadores"
              type="number"
              value={formik.values.max_players}
              onChange={formik.handleChange}
              error={formik.touched.max_players && Boolean(formik.errors.max_players)}
              helperText={formik.touched.max_players && formik.errors.max_players}
            />
            <TextField
              fullWidth
              id="games"
              name="games"
              label="Cantidad de juegos"
              type="number"
              value={formik.values.games}
              onChange={formik.handleChange}
              error={formik.touched.games && Boolean(formik.errors.games)}
              helperText={formik.touched.games && formik.errors.games}
            />
            <TextField
              fullWidth
              id="rounds"
              name="rounds"
              label="Cantidad de rondas"
              type="number"
              value={formik.values.rounds}
              onChange={formik.handleChange}
              error={formik.touched.rounds && Boolean(formik.errors.rounds)}
              helperText={formik.touched.rounds && formik.errors.rounds}
            />  
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña de partida"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirm_password"
              name="confirm_password"
              label="Confirmar contraseña de partida"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
              helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
            <Select
              labelId="selectRobotLabel"
              value={formik.values.robot_name} 
              label="Elegir Robot"
              onChange={formik.handleChange}
              inputProps={{
                name: "robot_name",
                id: "robot-s"
              }}
              error={formik.touched.robot_name && Boolean(formik.errors.robot_name)}
              helperText={formik.touched.robot_name && formik.errors.robot_name}
            >
                {userRobots.map((robot) => (
                  <MenuItem value={robot.name} key={robot.name} {...robot}>
                    {robot.name}
                  </MenuItem>
                ))}
              </Select>
              { (formik.touched.robot_name  && formik.errors.robot_name &&
                <FormHelperText error> {formik.errors.robot_name}</FormHelperText>
              ) ||
                <FormHelperText>Elegir Robot</FormHelperText>
              }
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={ () => cancelCreateMatch() }
          >
            Cancelar
          </Button>
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
