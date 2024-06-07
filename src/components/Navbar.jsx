//* ⤵️ IMPORTS
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/images/umapp-logo.png"
import { AuthContext } from "../context/auth.context";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
  marginLeft: "12px",
  marginRight: "12px"
};

function AppAppBar() {
  // 🌐 context
  const { authenticateUser, isLoggedIn, userInfo } =
    useContext(AuthContext);
  
  // 📦 estados
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState(null);
  const [picProfile, setPicProfile] = useState("")

  // ⛵️ navigate
  const navigate = useNavigate();

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    if(userInfo !== null){
      setUserName(userInfo.name)
      setPicProfile(userInfo.picProfile)
    }
  }, [userInfo])
 

  // 🕹️ funciones de control
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = async (e) => {
    e.preventDefault()
    // 1. removemos el token del localStorage
    localStorage.removeItem("authToken");

    // 2. actualizamos los estados
    await authenticateUser();

    // 3. redireccionamos
    navigate("/");
  };


  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "12px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={logo}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component={RouterLink}
                    to="/"
                  >
                    Inicio
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component={RouterLink}
                    to={isLoggedIn === true ? "/session" : "/session-public"}
                  >
                    Sesiones
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component={RouterLink}
                    to="/about"
                  >
                    Sobre nosotros
                  </Typography>
                </MenuItem>
              </Box>
            </Box>

            {/* CUANDO EL USUARIO NO ESTÁ LOGEADO */}
            {isLoggedIn === false && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={RouterLink}
                  to="/login"
                >
                  Iniciar sesión
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={RouterLink}
                  to="/signup/0"
                >
                  Regístrate
                </Button>
              </Box>
            )}
            {/* CUANDO EL USUARIO ESTÁ LOGEADO */}
            {isLoggedIn === true && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <Tooltip title="Mi perfil">
                  <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    {/* {userInfo && userInfo.name && <Avatar
                      component={RouterLink}
                      to="/my-profile"
                      sx={{ width: 32, height: 32, textDecoration:"none" }}> {userInfo.name[0].toUpperCase()} </Avatar>                          
                    } */}
                    {userInfo && userInfo.name && <Avatar
                      component={RouterLink}
                      to="/my-profile"
                      sx={{ width: 32, height: 32, textDecoration:"none" }}
                      src= {picProfile} />                        
                    }
                  </IconButton>
                </Tooltip>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={RouterLink}
                  to="/login"
                  onClick={handleLogOut}
                >
                  Cerrar sesión
                </Button>
              </Box>
            )}

            {/* DRAWER RESPONSIVE */}
            {isLoggedIn === false && (
              <Box sx={{ display: { sm: "", md: "none" } }}>
                <Button
                  variant="text"
                  color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ minWidth: "30px", p: "4px" }}
                >
                  <MenuIcon />
                </Button>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{
                      minWidth: "60dvw",
                      p: 2,
                      backgroundColor: "background.paper",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        flexGrow: 1,
                      }}
                    ></Box>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to="/"
                      >
                        Inicio
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to={isLoggedIn === true ? "/session" : "/session-public"}
                      >
                        Sesiones
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to="/about"
                      >
                        Sobre nosotros
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component={RouterLink}
                        to="/signup/0"
                        sx={{ width: "100%" }}
                      >
                        Regístrate
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        component={RouterLink}
                        to="/login"
                        sx={{ width: "100%" }}
                      >
                        Iniciar sesión
                      </Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            )}

            {isLoggedIn === true && (
              <Box sx={{ display: { sm: "", md: "none" } }}>
                <Button
                  variant="text"
                  color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ minWidth: "30px", p: "4px" }}
                >
                  <MenuIcon />
                </Button>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{
                      minWidth: "60dvw",
                      p: 2,
                      backgroundColor: "background.paper",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        flexGrow: 1,
                      }}
                    ></Box>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to="/"
                      >
                        Inicio
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to={isLoggedIn === true ? "/session" : "/session-public"}
                      >
                        Sesiones
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to="/about"
                      >
                        Sobre nosotros
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component={RouterLink}
                        to="/my-profile"
                      >
                        Mi perfil
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        component={RouterLink}
                        to="/login"
                        sx={{ width: "100%" }}
                        onClick={handleLogOut}
                      >
                        Cerrar sesión
                      </Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

//* ⤴️ EXPORTS
export default AppAppBar;
