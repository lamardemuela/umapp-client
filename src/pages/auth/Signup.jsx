import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Signup() {

    const navigate = useNavigate()

  // estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");

  // control de estados
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleProvinceChange = (e) => setProvince(e.target.value);
  const handleTownChange = (e) => setTown(e.target.value);

  // submit control
  const handleSignup = async (e) => {
    e.preventDefault()

    // nuevo usuario
    const newUser = {
        name,
        email,
        password,
        province,
        town
    }

    try {
        await axios.post("http://localhost:5005/api/auth/signup", newUser)
        navigate("/login")
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center"> 
      <h1> Regístrate </h1>
      <form onSubmit={handleSignup}>
        <TextField
          label="Nombre"
          variant="outlined"
          required
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          label="Provincia"
          variant="outlined"
          required
          value={province}
          onChange={handleProvinceChange}
        />
        <TextField
          label="Municipio"
          variant="outlined"
          required
          value={town}
          onChange={handleTownChange}
        />
        <Button type="submit" variant="contained">Crear cuenta</Button>
      </form>
    </Box>
  );
}

export default Signup;
