import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import provincesData from "../assets/data/provinces.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import DogTrainerCard from "../components/DogTrainerCard";
import { useNavigate } from "react-router-dom";
import animation from "../assets/images/animation-purple.gif"

function DogOwnerHome() {

  const navigate = useNavigate()

  // 📦 estados
  const [provinceValue, setProvinceValue] = useState(null);
  const [provinces, setProvinces] = useState(provincesData);
  const [dogTrainerUsers, setDogTrainerUsers] = useState([]);
  const [provinceSearch, setProvinceSearch] = useState("")

  const getAllTrainers = async () => {
    try {
      const response = await service.get("/dog-trainer");
      setDogTrainerUsers(response.data);
    } catch (error) {
      navigate("/error")
    }
  };

  useEffect(() => {
    getAllTrainers()
  }, [])

  const handleSearchClick = () => {
    setProvinceSearch(provinceValue)
  }

  return (
      <Box sx={{display:"flex", flexDirection:"column", gap:"16px", justifyContent:"center", alignItems:"center"}}>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundColor:"#ffffff", gap:"24px", padding: "40px", border:"1px solid #f7f2f7", borderRadius:"12px"}}>

          <img src={animation} alt="animacion" style={{marginBottom:"-50px", height:"100px"}} />

          <h3> Encuentra al mejor amigo de tu mejor amigo </h3>
          <p>Buscador de educadores caninos</p>

          <Autocomplete
            disablePortal
            id="controllable-states-demo"
            className="inputs"
            value={provinceValue}
            onChange={(event, newValue) => {
              setProvinceValue(newValue);
            }}
            options={provinces.map((eachProvince) => {
              return eachProvince.label;
            })}
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
