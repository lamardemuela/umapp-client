//* ⤵️ IMPORTS
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import service from "../../services/config.services";
import RoleTabs from "../../components/RoleTabs";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import provincesData from "../../assets/data/provinces.json";
import { AuthContext } from "../../context/auth.context";

function Signup() {
  const { tabsValue } = useContext(AuthContext)
  console.log(tabsValue);

  const navigate = useNavigate();

  // 📦 estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState(null);
  const [provincesDataSelect, setProvincesDataSelect] = useState(provincesData);
  //const [town, setTown] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 🕹️ funciones de control
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  // const handleProvinceChange = (e) => setProvince(e.target.value);
  //const handleTownChange = (e) => setTown(e.target.value);

      // gestión de rol
      // {tabsValue === 0 && setRole("dogOwner")}
      // {tabsValue === 1 && setRole("dogTrainer")}


  const handleSignup = async (e) => {
    e.preventDefault();

    // nuevo usuario
    const newUser = {
      name,
      email,
      password,
      province,
      role
    };
    console.log(newUser);

    try {
      await service.post("/auth/signup", newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      // => navigate /error page
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <RoleTabs />

        <h1> Regístrate </h1>

        <form onSubmit={handleSignup}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="24px"
          >
            <TextField
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
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

            <Autocomplete
              disablePortal
              id="controllable-states-demo"
              options={provincesDataSelect.map((eachProvince) => {
                return eachProvince.label;
              })}
              renderInput={(params) => (
                <TextField {...params} label="Provincia" />
              )}
              value={province}
              onChange={(event, newValue) => {
                setProvince(newValue);
              }}
            />
            {/* <TextField
            label="Provincia"
            variant="outlined"
            value={province}
            onChange={handleProvinceChange}
          /> */}
            {/* <TextField
            label="Municipio"
            variant="outlined"
            value={town}
            onChange={handleTownChange}
          /> */}
            {errorMessage && (
              <p style={{ color: "red", fontSize: "12px" }}> {errorMessage} </p>
            )}
            <Button type="submit" variant="contained">
              Crear cuenta
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

//* ⤴️ EXPORTS
export default Signup;
