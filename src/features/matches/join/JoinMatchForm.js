import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { RobotSelect } from "../../robots/RobotsSelect"

import {
  Button,
  TextField,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import { Stack } from "@mui/system"

const validationSchema = yup.object({
  password: yup.string().max(40, "La contraseña es demasiado larga"),
  robot_id: yup.number().required("Elegir un robot es obligatorio")
})


export const JoinMatchForm = (props) => {
  //Props= {onSubmit, open, setOpen, match, error, loading}
  const formik = useFormik({
    initialValues: {
      password: "",
      robot_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.onSubmit(values)
      formik.resetForm();
    },
  })

  return (
    <Dialog open={props.open}>
      <form onSubmit={formik.handleSubmit}> 
        <DialogTitle> Unirme a partida: {props.match.name} </DialogTitle>
        <DialogContent >
          <Stack spacing={2} sx={{marginTop: 1}}>
            {Boolean(props.match.is_private) &&
              <TextField
                fullWidth
                value={formik.values.password}
                id="password"
                name="password"
                label="Contraseña de partida"
                data-testid={"match-password-"+ props.match.id}
                type="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            }
            <RobotSelect
              select
              value={formik.values.robot_id}
              id="robot_id"
              name="robot_id"
              label="Elegir Robot"
              data-testid={"select-robot-"+ props.match.id}
              onChange={formik.handleChange}
              inputProps={{
                name: "robot_id",
                id: "robot-s",
              }}
              error={ formik.touched.robot_id && Boolean(formik.errors.robot_id) }
              helperText={ formik.touched.robot_id && formik.errors.robot_id }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.loading}
            data-testid={'submit-joinform-'+ props.match.id}>
            Unirme
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={props.loading}
            onClick={() => {
              props.setOpen(false);
              formik.resetForm();
              props.setError(null)
            }}
            data-testid={'cancel-joinform-'+ props.match.id}>
            Cancelar
          </Button>
        </DialogActions>
        {Boolean(props.error) && 
          <Alert severity="error">{props.error}</Alert>
        }
      </form>
    </Dialog>
  )
}