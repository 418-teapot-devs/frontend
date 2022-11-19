import { ToggleButton, Stack } from "@mui/material"
import React, { useState } from "react"

import { CreatedMatches } from "../features/matches/list/CreatedMatches"
import { JoinedMatches } from "../features/matches/list/JoinedMatches"
import { PublicMatches } from "../features/matches/list/PublicMatches"

import { Card, Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { SuccessMessage } from "../utils/AlertMessage"


export const MatchesPage = () => {
  const [alignment, setAlignment] = useState("MyMatches")

  const params = new URLSearchParams(document.location.search)
  const created = params.get("create_success")

  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Fab
        variant="extended"
        onClick={() => navigate("/matches/create")}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear Partida
      </Fab>

      <Stack spacing={2}>
        <ChooseMatchButton alignment={alignment} setAlignment={setAlignment} />
        <Card
          data-testid="created-matches"
          variant="outlined"
        >
          {alignment === "MyMatches" && <CreatedMatches height="100%" />}
          {alignment === "Joined" && <JoinedMatches height="100%" />}
          {alignment === "Public" && <PublicMatches height="100%" />}
        </Card>
      </Stack>
      {created && <SuccessMessage message="La partida se creó con éxito" />}
    </React.Fragment>
  )
}


const ChooseMatchButton = ({ alignment, setAlignment }) => {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <Card sx={{ width: "100%" }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        fullWidth
        onChange={handleChange}
      >
        <ToggleButton value="Joined">Unidas</ToggleButton>
        <ToggleButton value="MyMatches">Creadas</ToggleButton>
        <ToggleButton value="Public">Públicas</ToggleButton>
      </ToggleButtonGroup>
    </Card>
  )
}
