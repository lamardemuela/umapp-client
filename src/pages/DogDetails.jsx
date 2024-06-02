import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../services/config.services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  // 🧱 useEffect => llamada al backend (componentDidMount)
  useEffect(() => {
    getDogData();
  }, []);

  const getDogData = async () => {
    try {
      const response = await service.get(`/dog/${params.dogId}`);
      console.log("mi perro", response.data);
      setDogDetails(response.data);
      setName(response.data.name);
      setBreed(response.data.breed);
      setAge(response.data.age);
      setWeight(response.data.weight);
      setDateOfAdquisition(response.data.dateOfAdquisition);
      setDescription(response.data.description);
      setSex(response.data.sex);
      setSize(response.data.size);
    } catch (error) {
      console.log(error);
    }
  };

  // 🕹️ funciones de control

  const handleName = (e) => {
    setName(e.target.value)
    setIsButtonDisabled(true)
  } 
  const handleBreed = (e) => setBreed(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleWeight = (e) => setWeight(e.target.value);
  const handleDateOfAdquisition = (e) => setDateOfAdquisition(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleSex = (e) => setSex(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  //const handleIsButtonDisabled = () => setIsButtonDisabled(false)

  const handleSaveChanges = async (e) => {
    e.preventDefault()

    // actualizamos datos del documento
    const updatedDog = {
      name,
      breed,
      age,
      weight,
      dateOfAdquisition,
      sex,
      size,
      description
    }

    try {
      const response = await service.put(`/dog/${params.dogId}`, updatedDog)
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }

  if (dogDetails === null) {
    return <CircularProgress />;
  }

  return (
    <Box >
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
        <Box
          className="containerShadow"
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", paddingBottom: "12px", width: "100%" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems:"flex-start" }}>
            <Typography variant="h4" gutterBottom>
              {dogDetails.name}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Dueño: <Link to="/my-profile"> {dogDetails.dogOwner.name} </Link>
            </Typography>
          </Box>
          <Box>
          </Box>
        </Box>
        <form
          className="container containerShadow"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            marginTop: "24px",
          }}
          onSubmit={()=>{handleSaveChanges}}
        >
          <div className="containerInputs">
            <TextField
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={handleName}
              //onClick={handleIsButtonDisabled}
            />
            <TextField
              label="Raza"
              variant="outlined"
              value={breed}
              onChange={handleBreed}
              //onClick={handleIsButtonDisabled}
            />
            <TextField
              type="number"
              label="Edad"
              variant="outlined"
              value={age}
              onChange={handleAge}
              //onClick={handleIsButtonDisabled}
            />
          </div>
          <div className="containerInputs">
            <TextField
              type="number"
              label="Peso (kg)"
              variant="outlined"
              value={weight}
              onChange={handleWeight}
              //onClick={handleIsButtonDisabled}
            />
            <TextField
              label="Fecha de adquisición"
              variant="outlined"
              value={dateOfAdquisition}
              onChange={handleDateOfAdquisition}
              //onClick={handleIsButtonDisabled}
            />
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Descripción"
            multiline
            rows={3}
            value={description}
            onChange={handleDescription}
            //onClick={handleIsButtonDisabled}
            sx={{ width: "100%" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={sex}
              onChange={handleSex}
            >
              <FormControlLabel
                value="hembra"
                control={<Radio />}
                label="Hembra"
                //onClick={handleIsButtonDisabled}
              />
              <FormControlLabel
                value="macho"
                control={<Radio />}
                label="Macho"
                //onClick={handleIsButtonDisabled}
              />
            </RadioGroup>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Tamaño
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={size}
              onChange={handleSize}
            >
              <FormControlLabel
                value="pequeño"
                control={<Radio />}
                label="Pequeño"
                //onClick={handleIsButtonDisabled}
              />
              <FormControlLabel
                value="mediano"
                control={<Radio />}
                label="Mediano"
                //onClick={handleIsButtonDisabled}
              />
              <FormControlLabel
                value="grande"
                control={<Radio />}
                label="Grande"
                //onClick={handleIsButtonDisabled}
              />
            </RadioGroup>
          </div>
          <Button type="submit" variant="contained" disabled = {isButtonDisabled}> Guardar cambios </Button>

        </form>
      </Box>
    </Box>
  );
}

export default DogDetails;
