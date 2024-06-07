//* ⤵️ IMPORTS
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import service from "../../services/config.services";
import RoleTabs from "../../components/RoleTabs";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import provincesData from "../../assets/data/provinces.json";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

function Signup() {
  // services arr
  const servicesArr = [
    "Servicio a domicilio",
    "Adiestramiento y educación",
    "Educación temprana",
    "Corrección de conductas",
    "Orientación del cachorro",
    "Obediencia",
    "Socialización",
    "Entreamiento con correa",
    "Entrenamiento en casa",
    "Ansiedad por separación",
    "Manejo de la agresión",
    "Entrenamientos de perros de terapia",
    "Enrenamiento de perros de servicio",
    "Manejo de miedos y fobias",
  ];

  const navigate = useNavigate();
  const params = useParams();

  // 📦 estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState(null);
  const [provincesDataSelect, setProvincesDataSelect] = useState(provincesData);
  const [role, setRole] = useState(
    params.tab === "0" ? "dogOwner" : "dogTrainer"
  );
  const [telephone, setTelephone] = useState("");
  const [rates, setRates] = useState("");
  const [services, setServices] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 🕹️ funciones de control
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRatesChange = (e) => setRates(e.target.value);
  const handleTelephoneChange = (e) => setTelephone(e.target.value);

  const handleServicesChange = (event) => {
    const {
      target: { value },
    } = event;
    setServices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // nuevo usuario
    const newUser = {
      name,
      email,
      password,
      province,
      telephone,
      role,
      rates,
      services,
    };

    try {
      await service.post("/auth/signup", newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }else{
        navigate("/error")
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <RoleTabs role={role} setRole={setRole} />

      {/* ROLE DOGOWNER */}
      {role === "dogOwner" && (
        <Box display="flex" flexDirection="column" justifyContent="center">
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
              {errorMessage && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {" "}
                  {errorMessage}{" "}
                </p>
              )}
              <Button type="submit" variant="contained" sx={{ borderRadius: "100px", boxShadow: "none" }}>
                Crear cuenta
              </Button>
            </Box>
          </form>
        </Box>
      )}

      {/* ROLE DOGTRAINER */}
      {role === "dogTrainer" && (
        <Box display="flex" flexDirection="column" justifyContent="center">
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
                helperText="Mín. 8 caracteres, una minúscula, una mayúscula y un número"
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
              <TextField
                required
                type="number"
                label="Teléfono"
                variant="outlined"
                value={telephone}
                onChange={handleTelephoneChange}
                helperText="Usaremos tu teléfono para que los dueños de perros puedan contactar contigo"
              />
              <TextField
                label="Tarifa (€/sesión)"
                variant="outlined"
                value={rates}
                onChange={handleRatesChange}
              />
              <FormControl>
                <InputLabel id="demo-multiple-chip-label">
                  Servicios/especialidades
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={services}
                  label="Servicios/especialidades"
                  onChange={handleServicesChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {servicesArr.map((eachService) => {
                    return (
                      <MenuItem key={eachService} value={eachService}>
                        {" "}
                        {eachService}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {errorMessage && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {" "}
                  {errorMessage}{" "}
                </p>
              )}
              <Button type="submit" variant="contained">
                Crear cuenta
              </Button>
            </Box>
          </form>
        </Box>
      )}
      <Typography variant="body2" gutterBottom>
        ¿Ya tienes una cuenta?
        <Button component={RouterLink} to="/login">
          {" "}
          Inicia sesión{" "}
        </Button>
      </Typography>
    </Container>
  );
}

//* ⤴️ EXPORTS
export default Signup;
