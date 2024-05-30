import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link as RouterLink } from "react-router-dom";

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link sx={{ minWidth: 100 }} href="#" color="inherit" underline="none">
          {"umapp"}
        </Link>
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

        {/* SOLO CUANDO EL USUARIO ESTÁ LOGEADO */}
        {/* <Tooltip title="Mi perfil">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip> */}
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
            href="#"
            color="inherit"
            underline="none"
          >
            {"Buscador"}
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
      </Menu>
    </React.Fragment>
  );
}

export default Navbar;
