import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import provincesData from "../assets/data/provinces.json";
import Container from "@mui/system/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import DogTrainerCard from "../components/DogTrainerCard";
import { Typography } from "@mui/material";

function DogOwnerHome() {

  // 📦 estados
  const [provinceValue, setProvinceValue] = useState(null);
  const [provinces, setProvinces] = useState(provincesData);
  const [dogTrainerUsers, setDogTrainerUsers] = useState([]);
  const [provinceSearch, setProvinceSearch] = useState("")

  const getAllTrainers = async () => {
    try {
      const response = await service.get("/dog-trainer");
      console.log(response);
      setDogTrainerUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTrainers()
  }, [])

  const handleSearchClick = () => {
    setProvinceSearch(provinceValue)
  }

  return (
    <Box sx={{display:"flex", flexDirection:"column", gap:"16px", justifyContent:"center", flexWrap:"wrap", alignItems:"center"}}>
      <Box className="containerBorder" sx={{paddingLeft:"0", paddingRight:"0", width: "100%", gap:"8px"}}>
        {/* <h1> Hola </h1> */}
        <h3> Encuentra al mejor amigo de tu mejor amigo </h3>
        <p>Buscador de educadores caninos</p>

        <Autocomplete
          disablePortal
          id="controllable-states-demo"
          value={provinceValue}
          onChange={(event, newValue) => {
            setProvinceValue(newValue);
          }}
          options={provinces.map((eachProvince) => {
            return eachProvince.label;
          })}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Provincia" />}
        />

        <Button
          sx={{ borderRadius: "100px", boxShadow: "none" }}
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          {" "}
          Buscar{" "}
        </Button>
      </Box>
      <Box sx={{display:"flex", flexDirection:"column", gap:"16px", justifyContent:"center", flexWrap:"wrap", alignItems:"center"}}>
        {dogTrainerUsers.filter((eachDogTrainerUser) => {
          return provinceSearch === eachDogTrainerUser.province
        })
        .map((eachDogTrainerUser) => {
          return <DogTrainerCard
              key={eachDogTrainerUser._id}
              eachDogTrainerUser={eachDogTrainerUser}
            />
        
        })}
      </Box>
    </Box>
  );
}

export default DogOwnerHome;
