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

function EditSessionDetails() {
  const params = useParams();

  const navigate = useNavigate();

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

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    getSessionData();
    getDogOwnerUsers();
  }, []);

  const getSessionData = async () => {
    try {
      // 🔗 GET "/api/session/:sessionId" => detalles de una Session
      const response = await service.get(`/session/${params.sessionId}`);

      // 🔗 GET "api/dog/:userId" => cogemos todos los perros del usuario seleccionado
      const responseDogs = await service.get(
        `/dog/dogOwner/${response.data.dogOwner}`
      );
      setDogsData(responseDogs.data);
      setDogOwner(response.data.dogOwner);
      setDog(response.data.dog._id);
      setDay(response.data.day.slice(0, 10));
      setHour(response.data.hour);
      setLocation(response.data.location);
      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // data para select dogOwner
  const getDogOwnerUsers = async () => {
    try {
      const response = await service.get("/user?role=dogOwner");
      setDogOwnersData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🕹️ funciones de control
  const handleCloseDogOwerSelect = () => setOpenDogOwner(false);
  const handleOpenDogOwerSelect = () => setOpenDogOwner(true);
  const handleCloseDogsSelect = () => setOpenDog(false);
  const handleOpenDogsSelect = () => setOpenDog(true);

  const handleDogOwnerChange = async (e) => {
    setDogOwner(e.target.value);

    try {
      // 🔗 GET "api/dog/:userId" => cogemos todos los perros del usuario seleccionado
      const response = await service.get(`/dog/dogOwner/${e.target.value}`);
      setDogsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // actualizamos el documento
    const updatedSession = {
      dogOwner,
      dog,
      day,
      hour,
      location,
      notes,
    };

    try {
      await service.put(`/session/${params.sessionId}`, updatedSession);
      navigate("/session");
    } catch (error) {
      console.log(error);
    }
  };

  if (dogOwnersData === null || dogsData === null) {
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
          // width: "100%"
        }}
      >
        <form
          className="container containerBorder"
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            width: "100%",
          }}
          onSubmit={handleSaveChanges}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              <Link to="/session"> Volver a sesiones </Link>
            </Typography>
            <Typography variant="h4" gutterBottom>
              Editar Sesión
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
                Selecciona al propietario del perro
              </InputLabel>
              <Select
                //labelId="demo-controlled-open-select-label"
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
                Selecciona al perro
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
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <TextField
                required
                type="date"
                // label="Día"
                variant="outlined"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  console.log(e.target.value);
                }}
                sx={{ width: "31%" }}
              />

              <TextField
                required
                label="Hora (00:00)"
                variant="outlined"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                sx={{ width: "31%" }}
              />
              <TextField
                required
                label="Lugar"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{ width: "31%" }}
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
            Guardar cambios{" "}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default EditSessionDetails;
