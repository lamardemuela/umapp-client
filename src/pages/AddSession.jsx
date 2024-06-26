import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function AddSession() {
  //const params = useParams();

  const navigate = useNavigate()

  // 📦 estados
  const [dogOwner, setDogOwner] = useState("");
  const [dog, setDog] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [dogsData, setDogsData] = useState([]);
  const [dogOwnersData, setDogOwnersData] = useState(null);
  const [openDogOwner, setOpenDogOwner] = React.useState(false);
  const [openDog, setOpenDog] = React.useState(false);

  useEffect(() => {
    getDogOwnerUsers();
  }, []);

  // 🕹️ funciones de control
  const handleCloseDogOwerSelect = () => setOpenDogOwner(false);
  const handleOpenDogOwerSelect = () => setOpenDogOwner(true);
  const handleCloseDogsSelect = () => setOpenDog(false);
  const handleOpenDogsSelect = () => setOpenDog(true);

  // data para select dogOwner
  const getDogOwnerUsers = async () => {
    try {
      const response = await service.get("/user?role=dogOwner");
      setDogOwnersData(response.data);
    } catch (error) {
      navigate("/error")
    }
  };

  const handleDogOwnerChange = async (e) => {
    setDogOwner(e.target.value);

    // 🔗 GET "api/dog/:userId" => cogemos todos los perros del usuario seleccionado
    const response = await service.get(`/dog/dogOwner/${e.target.value}`);
    setDogsData(response.data);
  };

  const handleAddSession = async (e) => {
    e.preventDefault();

    const newSession = {
      dogOwner,
      dog,
      day,
      hour,
      location,
      notes,
    };

    try {
      await service.post("/session", newSession);
      navigate("/session")
    } catch (error) {
      navigate("/error")
    }
  };

  if (dogOwnersData === null) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box
        className="container"
        sx={{
          borderRadius: "24px",
          marginTop: "24px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <form
          className="container containerBorder"
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            width: "100%",
          }}
          onSubmit={handleAddSession}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              <Link to="/session"> Volver a sesiones </Link>
            </Typography>
            <Typography variant="h4" gutterBottom>
              Nueva Sesión
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-controlled-open-select-label">
                Propietario del perro
              </InputLabel>
              <Select
                id="demo-controlled-open-select"
                open={openDogOwner}
                onClose={handleCloseDogOwerSelect}
                onOpen={handleOpenDogOwerSelect}
                value={dogOwner}
                label="Selecciona al propietario"
                onChange={handleDogOwnerChange}
              >
                {dogOwnersData.map((eachUser) => {
                  return (
                    <MenuItem key={eachUser._id} value={eachUser._id}>
                      {" "}
                      {eachUser.name}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-controlled-open-select-label">
                Perro
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openDog}
                onClose={handleCloseDogsSelect}
                onOpen={handleOpenDogsSelect}
                value={dog}
                label="Servicios/especialidades"
                onChange={(e) => setDog(e.target.value)}
              >
                {dogsData.map((eachDog) => {
                  return (
                    <MenuItem key={eachDog._id} value={eachDog._id}>
                      {eachDog.name}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <InputLabel id="demo-controlled-open-select-label">
              Cuándo y dónde será la sesión
            </InputLabel>
            <Box
              className="containerCardInfoImg"
              sx={{
                gap: "24px",
                alignItems: "center",
                width:"100%"
              }}
            >
              <TextField
                required
                type="date"
                variant="outlined"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                sx={{ width: "100%" }}
              />

              <TextField
                required
                label="Hora (00:00)"
                variant="outlined"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                sx={{ width: "100%" }}
              />
              <TextField
                required
                label="Lugar"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <TextField
              id="outlined-multiline-static"
              label="Notas"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>

          <Button
            sx={{ borderRadius: "100px", boxShadow: "none" }}
            type="submit"
            variant="contained"
          >
            {" "}
            Añadir{" "}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddSession;
