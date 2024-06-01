import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import service from "../services/config.services";
import DogCard from "../components/DogCard";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


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

  const getDogsData = async () => {
    try {
      const response = await service.get("/dog");
      setDogs(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dogs);
  if (userInfo === null || dogs === null) {
    return <CircularProgress />
  }

  return (
    <Box className="container">
      <h2>Tu perfil</h2>
      <form className="container">
        <div className="containerInputs">
          <TextField label="Nombre" variant="outlined" value={name} />
          <TextField label="Email" variant="outlined" value={email} />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Guardar cambios
        </Button>
      </form>

      <h2>Tus perros</h2>
      {dogs.map((eachDog) => {
        return (
          eachDog.dogOwner === userInfo._id && (
            <DogCard key={eachDog._id} eachDog ={eachDog} />
          )
        );
      })}
    </Box>
  );
}

export default MyProfile;
