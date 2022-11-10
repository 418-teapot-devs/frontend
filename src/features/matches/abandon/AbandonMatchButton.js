import { React, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Button,
} from "@mui/material";

const ConfirmAbandon = ({
  open,
  handleClose,
  handleAbandon,
  error,
  notFound,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>¿Quieres abandonar la partida?</DialogTitle>
      <DialogActions spacing={2}>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleAbandon}>Sí, abandonar</Button>
      </DialogActions>
      {error && (
        <Alert severity="error" fullwidth="true">
          <AlertTitle>Ocurrió un error</AlertTitle>
        </Alert>
      )}
      {notFound && (
        <Alert severity="error" fullwidth="true">
          <AlertTitle>No se encontró la partida</AlertTitle>
        </Alert>
      )}
    </Dialog>
  );
};

export const AbandonButton = ({
  handleAbandon,
  error,
  notFound,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<ExitToAppIcon />}
        onClick={handleClickOpen}
      >
        Abandonar
      </Button>
      <ConfirmAbandon
        open={open}
        handleClose={handleClose}
        handleAbandon={
          () => {
            handleAbandon()
            setOpen(false);
          }
        }
        error={error}
        notFound={notFound}
      />
    </Grid>
  );
};
