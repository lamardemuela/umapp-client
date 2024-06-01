//* ⤵️ IMPORTS
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import service from "../services/config.services";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import CircularProgress from '@mui/material/CircularProgress';

function Navbar(props) {
  // 🌐 context
  const { authenticateUser, isLoggedIn, isDogOwner, tabsValue, userInfo } =
    useContext(AuthContext);

  // ⛵️ navigate
  const navigate = useNavigate();

  // 📦 estados
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState(null)

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    if(userInfo){
      setUserName(userInfo.name)
    }
  }, [])

  console.log(userName);

  // 🕹️ funciones de control
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogOut = async () => {
    // 1. removemos el token del localStorage
    localStorage.removeItem("authToken");

    // 2. actualizamos los estados
    await authenticateUser();

    // 3. redireccionamos
    navigate("/login");
  };

  if (userInfo === null || userName===null) {
    return <CircularProgress />
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl"></Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link
          sx={{ minWidth: 100 }}
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/"
        >
          {"umapp"}
        </Link>

        {/* CUANDO EL USUARIO NO ESTÁ LOGEADO */}
        {isLoggedIn === false && (
          <MenuOutlinedIcon
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </MenuOutlinedIcon>
        )}

        {/* CUANDO EL USUARIO ESTÁ LOGEADO */}
        {isLoggedIn === true && (
          <Tooltip title="Mi perfil">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {userName[0].toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            sx={{ minWidth: 100 }}
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
          >
            {/* if(isDogOwner === true && tabsValue === 0 ){

            } */}
            {isDogOwner && tabsValue === 0
              ? "Buscar Educadores caninos"
              : "Inicio"}
            {/* {isDogTrainer && "Inicio"} */}
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            sx={{ minWidth: 100 }}
            href="#"
            color="inherit"
            underline="none"
          >
            {"Sobre umapp"}
          </Link>
        </MenuItem>

        <Divider />
        {isLoggedIn === false && (
          <Box>
            <MenuItem onClick={handleClose}>
              <Link
                component={RouterLink}
                to="/login"
                color="inherit"
                underline="none"
              >
                <ListItemIcon>
                  <LoginOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Iniciar sesión
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link
                component={RouterLink}
                to="/signup"
                color="inherit"
                underline="none"
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Regístrate
              </Link>
            </MenuItem>
          </Box>
        )}

        {isLoggedIn === true && (
          <Box>
            <MenuItem onClick={handleClose}>
              <Link
                component={RouterLink}
                to="/my-profile"
                color="inherit"
                underline="none"
              >
                <AccountCircleOutlinedIcon fontSize="small" />
                Mi perfil
              </Link>
            </MenuItem>

            <MenuItem>
              <Link color="inherit" underline="none" onClick={handleLogOut}>
                <LogoutOutlinedIcon fontSize="small" />
                Cerrar sesión
              </Link>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </AppBar>
  );
}

//* ⤴️ EXPORTS
export default Navbar;
