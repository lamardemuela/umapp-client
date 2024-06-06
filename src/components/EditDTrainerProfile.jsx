import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import provincesData from "../assets/data/provinces.json";
import service from "../services/config.services";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DogCard from "../components/DogCard";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from '@mui/material/Chip';
import MenuItem from "@mui/material/MenuItem";

function EditDTrainerProfile() {
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
  // 🌐 Context
  const { userInfo } = useContext(AuthContext);

  // 📦 Estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [telephone, setTelephone] = useState("")
  const [rates, setRates] = useState("");
  const [services, setServices] = useState([]);
  // estados imagen
  const [picProfile, setPicProfile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // dogs
  const [dogs, setDogs] = useState(null);
  // provincias
  const [provincesDataSelect, setProvincesDataSelect] = useState(provincesData);
  // snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setProvince(userInfo.province);
      setPicProfile(userInfo.picProfile);
      setTelephone(userInfo.telephone)
      setServices(userInfo.services)
      setRates(userInfo.rates)
    }
  }, [userInfo]);

  // envio de datos actualizados
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    //actualizamos el documento
    const updatedUser = {
      name,
      email,
      province,
      picProfile,
      telephone,
      services,
      rates
    };

    // enviamos documento actualizado al BE
    try {
      // 🔗 PUT "api/user/owner"
      await service.put("/user/owner", updatedUser);
      setOpenSnackBar(true);
    } catch (error) {
      console.log(error);
    }
  };

  // gestion de imagen de perfil
  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);
      setPicProfile(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // styles hiddenInput
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // cierre de snackbar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
        OK
      </Button>
    </>
  );

  // cláusula de guardia
  if (userInfo === null) {
    return <CircularProgress />;
  }
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        useFlexGap
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #f7f2f7",
          padding: "32px",
        }}
      >
        <h2>Tu perfil</h2>
        {/*  */}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleFileUpload}
          disabled={isUploading}
        >
          Foto perfil
          <VisuallyHiddenInput type="file" />
        </Button>
        {isUploading ? <CircularProgress /> : null}
        {picProfile ? (
          <Box>
            <img
              src={picProfile}
              alt="img"
              width={200}
              style={{ borderRadius: "16px" }}
            />
          </Box>
        ) : null}

          <TextField
            label="Nombre"
            variant="outlined"
            sx={{width:"600px"}}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{width:"600px"}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <Autocomplete
          disablePortal
          sx={{ width: "600px" }}
          id="controllable-states-demo"
          options={provincesDataSelect.map((eachProvince) => {
            return eachProvince.label;
          })}
          renderInput={(params) => <TextField {...params} label="Provincia" />}
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
                sx={{width:"600px"}}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                helperText="Usaremos tu teléfono para que los dueños de perros puedan contactar contigo"
              />
              <TextField
                label="Tarifa (€/sesión)"
                variant="outlined"
                sx={{width:"600px"}}
                value={rates}
                onChange={(e) => setRates(e.target.value)}
              />
              <FormControl>
                <InputLabel id="demo-multiple-chip-label">
                  Servicios/especialidades
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  sx={{width:"600px"}}
                  value={services}
                  label="Servicios/especialidades"
                  onChange={(e) => setServices(e.target.value)}
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
        {/*  */}
        <Button
          sx={{ borderRadius: "100px", boxShadow: "none" }}
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isUploading}
          onClick={handleSaveChanges}
        >
          Guardar cambios
        </Button>
      </Stack>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Los cambios se han guardado correctamente"
        action={action}
      />
    </Stack>
  );
}

export default EditDTrainerProfile;
