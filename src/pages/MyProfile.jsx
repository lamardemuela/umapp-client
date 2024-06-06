import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import service from "../services/config.services";
import DogCard from "../components/DogCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EditDOwnerProfile from "../components/EditDOwnerProfile";
import EditDTrainerProfile from "../components/EditDTrainerProfile";

function MyProfile() {
  // 🌐 context
  const { userInfo, isDogOwner, isDogTrainer } = useContext(AuthContext);

  // // 📦 estados
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dogs, setDogs] = useState(null);

  // // 🧱 useEffect => llamada al backend (componentDidMount)
  // useEffect(() => {
  //   if (userInfo) {
  //     setName(userInfo.name);
  //     setEmail(userInfo.email);
  //     getDogsData();
  //   }
  // }, [userInfo]);

  // //🔗 GET "/api/dog" => listar perros
  // const getDogsData = async () => {
  //   try {
  //     const response = await service.get("/dog");
  //     setDogs(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (userInfo === null || dogs === null) {
  //   return <CircularProgress />;
  // }

  return (
    <>
      { isDogOwner === true && <EditDOwnerProfile /> }
      { isDogTrainer === true && <EditDTrainerProfile /> }
    
    </>
  );
}

export default MyProfile;
