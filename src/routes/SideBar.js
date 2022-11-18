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
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"

import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const mainOptions = [
  // {
  //   title: "Inicio",
  //   to: "",
  //   icon: <HomeOutlinedIcon />,
  // },
  {
    title: "Robots",
    to: "robots",
    icon: <SmartToyOutlinedIcon />,
  },
  {
    title: "Partidas",
    to: "matches",
    icon: <PlayCircleOutlineOutlinedIcon />,
  },
  {
    title: "Historial de partidas",
    to: "matches/started",
    icon: <FactCheckOutlinedIcon/>,
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
        <ListItemButton onClick={props.onClick}>{props.icon}</ListItemButton>
      </Tooltip>
    </ListItem>
  )
}

export const SideBar = () => {
  const { logout } = useAuth()
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
