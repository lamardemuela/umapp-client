import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import provincesData from "../assets/data/provinces.json";
import Container from "@mui/system/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function DogOwnerHome() {
  // 🌐 Context
  const { authenticateUser, userInfo } = useContext(AuthContext);
  console.log(userInfo);

  // 📦 estados
  const [provinces, setProvinces] = useState(provincesData);

  //console.log(provinces);

  return (
    <Container>
      <h1> Hola </h1>
      <h3> Encuentra al mejor amigo de tu mejor amigo </h3>
      <p>Buscador de educadores caninos</p>
      <Box
        sx={{display:"flex",
        flexDirection:"column",
        gap:"24px",
        justifyContent:"center",
        alignItems:"center"}}
      >
        
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={towns.map((eachTown) => {
            return eachTown.label;
          })}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Localidad" />}
        /> */}

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={provinces.map((eachProvince) => {
            return eachProvince.label;
          })}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Provincia" />}
        />

        <Button variant="contained" color="primary"> Buscar </Button>

      </Box>
    </Container>
  );
}

export default DogOwnerHome;
