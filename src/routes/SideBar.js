import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material"

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"

import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined"
import PublicIcon from "@mui/icons-material/Public"
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined"

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useSettings } from "../hooks/useSettings"

const mainOptions = [
  {
    title: "Inicio",
    to: "",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Robots",
    to: "robots",
    icon: <SmartToyOutlinedIcon />,
  },
  {
    title: "Mis partidas",
    to: "matches",
    icon: <PlayCircleOutlineOutlinedIcon />,
  },
  {
    title: "Partidas públicas",
    to: "matches/public",
    icon: <PublicIcon />,
  },
  {
    title: "Historial de partidas",
    to: "matches/started",
    icon: <FactCheckOutlinedIcon />,
  },
  {
    title: "Simulación",
    to: "simulation",
    icon: <GridOnOutlinedIcon />,
  },
]

const extraOptions = [
  {
    title: "Perfil",
    to: "/profile",
    icon: <PersonOutlinedIcon />,
  },
]

export const SIDEBAR_WIDTH = 64

const SideBarItem = (props) => {
  return (
    <ListItem disablePadding>
      <Tooltip title={props.title} placement="right">
        <ListItemButton
          sx={{ justifyContent: "center" }}
          onClick={props.onClick}
        >
          {props.icon}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  )
}

export const SideBar = () => {
  const { logout } = useAuth()
  const { settings, toggleDarkMode } = useSettings()
  const navigate = useNavigate()

  return (
    <Box sx={{ padding: 1, position: "fixed", top: 0, left: 0 }}>
      <Paper
        sx={{ height: "calc(100vh - 16px)", width: `${SIDEBAR_WIDTH}px` }}
        variant="outlined"
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <List>
            {mainOptions.map((option) => (
              <SideBarItem
                key={option.title}
                {...option}
                onClick={() => navigate(option.to)}
              />
            ))}
          </List>
          <List>
            <SideBarItem
              title={settings.darkMode ? "Light Mode" : "Dark Mode"}
              onClick={toggleDarkMode}
              icon={
                settings.darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />
              }
            />
            {extraOptions.map((option) => (
              <SideBarItem
                key={option.title}
                {...option}
                onClick={() => navigate(option.to)}
              />
            ))}
            <SideBarItem
              title="Cerrar Sesión"
              icon={<LogoutOutlinedIcon />}
              onClick={logout}
            />
          </List>
        </Stack>
      </Paper>
    </Box>
  )
}

export default SideBar
