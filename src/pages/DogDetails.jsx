import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from '@mui/material/Typography';

function DogDetails() {
  const params = useParams();
  console.log(params);

  // 📦 Estados
  const [dogDetails, setDogDetails] = useState(null);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [dateOfAdquisition, setDateOfAdquisition] = useState("");
  const [description, setDescription] = useState("");

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    getDogData();
  }, []);

  const getDogData = async () => {
    try {
      const response = await service.get(`/dog/${params.dogId}`);
      console.log("mi perro", response.data);
      setDogDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (dogDetails === null) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Box className="container" sx={{backgroundColor:"#fff", borderRadius:"24px", marginTop: "24px", paddingTop:"24px", paddingBottom: "24px"}}>
      <div style={{display:"flex", flexDirection: "column"}}>
        <Typography variant="h4" gutterBottom>
        {dogDetails.name}
      </Typography>
        <Typography variant="subtitle2" gutterBottom>
        Dueño: {dogDetails.dogOwner.name}
      </Typography>
      </div>
        <form className="container" sx={{backgroundColor:"#fff", borderRadius:"24px", marginTop: "24px"}}>
          <div className="containerInputs">
            <TextField
              label="Nombre"
              variant="outlined"
              value={dogDetails.name}
            />
            <TextField
              label="Raza"
              variant="outlined"
              value={dogDetails.breed}
            />
            <TextField
              type="number"
              label="Edad"
              variant="outlined"
              value={dogDetails.age}
            />
          </div>
          <div className="containerInputs">
            <TextField
              type="number"
              label="Peso (kg)"
              variant="outlined"
              value={dogDetails.weight}
            />
            <TextField
              label="Fecha de adquisición"
              variant="outlined"
              value={dogDetails.dateOfAdquisition}
            />
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={3}
              value={dogDetails.description}
            />
          </div>

          <div style={{display:"flex", flexDirection: "column", gap:"8px"}}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Sexo
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={dogDetails.sex}
            >
              <FormControlLabel
                value="hembra"
                control={<Radio />}
                label="Hembra"
              />
              <FormControlLabel
                value="macho"
                control={<Radio />}
                label="Macho"
              />
            </RadioGroup>
          </div>
          <div style={{display:"flex", flexDirection: "column", gap:"8px"}}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Tamaño
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={dogDetails.weight}
            >
              <FormControlLabel
                value="pequeño"
                control={<Radio />}
                label="Pequeño"
              />
              <FormControlLabel
                value="mediano"
                control={<Radio />}
                label="Mediano"
              />
              <FormControlLabel
                value="grande"
                control={<Radio />}
                label="Grande"
              />
            </RadioGroup>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default DogDetails;
