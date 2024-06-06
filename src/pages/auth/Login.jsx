//* ⤵️ IMPORTS
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import service from "../../services/config.services";
import { AuthContext } from "../../context/auth.context";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Login() {
  // 🌐 context
  const { authenticateUser } = useContext(AuthContext);

  // ⛵️ navigate
  const navigate = useNavigate();

  // 📦 estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  // 🕹️ funciones de control
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // validación de credenciales
    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await service.post("/auth/login", userCredentials);
      console.log(response);

      // almacenamos el token
      localStorage.setItem("authToken", response.data.authToken);

      // validamos el token y actualizamos estados
      authenticateUser();

      // redireccionamos
      navigate("/");
    } catch (error) {
      console.log(error);
      if(error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center">

        <h1> Iniciar sesión </h1>

        <form onSubmit={handleLogin}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="24px"
          >
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
            />

            {errorMessage && <p style={{color:"red", fontSize:"12px"}}> {errorMessage} </p>}

            <Button type="submit" variant="contained" color="primary">
              Iniciar sesión
            </Button>
            <Typography variant="body2" gutterBottom>
                ¿Todavía no tienes una cuenta?
                <Button component={RouterLink} to="/signup/0"> Regístrate </Button>
            </Typography> 
          </Box>
        </form>
      </Box>
    </Container>
  );
}

//* ⤴️ EXPORTS
export default Login;
