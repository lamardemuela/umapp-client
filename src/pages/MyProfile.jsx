import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import service from "../services/config.services";
import DogCard from "../components/DogCard";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function MyProfile() {
  // 🌐 context
  const { userInfo } = useContext(AuthContext);

  // 📦 estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dogs, setDogs] = useState(null);

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      getDogsData();
    }
  }, [userInfo]);

  //🔗 GET "/api/dog" => listar perros
  const getDogsData = async () => {
    try {
      const response = await service.get("/dog");
      setDogs(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (userInfo === null || dogs === null) {
    return <CircularProgress />;
  }

  return (
    <Box className="container">
      <Box className="containerBorder">
        <h2>Tu perfil</h2>
        <form className="container">
          <Box className="containerInputs">
            <TextField label="Nombre" variant="outlined" value={name} />
            <TextField label="Email" variant="outlined" value={email} />
          </Box>
        </form>
            <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="secondary">
              Guardar cambios
            </Button>
      </Box>
      <Box className="containerBorder" sx={{ width: "100%" }}>
        <h2>Tus perros</h2>
        <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="primary" component={RouterLink} to="/add-dog">
              + Añadir perro
            </Button>
        {dogs.map((eachDog) => {
          return (
            eachDog.dogOwner === userInfo._id && (
              <DogCard key={eachDog._id} eachDog={eachDog} getDogsData={getDogsData} />
            )
          );
        })}
      </Box>
    </Box>
  );
}

export default MyProfile;
