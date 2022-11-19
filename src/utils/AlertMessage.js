import { Snackbar, Alert } from "@mui/material"
import React, { useState } from "react"

export const SuccessMessage = ({ message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}
