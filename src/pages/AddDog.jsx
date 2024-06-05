//* ⤵️ IMPORTS
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import CardMedia from "@mui/material/CardMedia";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";


function AddDog() {
  // ⛵️ Navigate
  const navigate = useNavigate();

  // 📦 Estados
  // control de inputs:
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [dateOfAdquisition, setDateOfAdquisition] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // control cloudinary
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // 🕹️ funciones de control
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBreed = (e) => {
    setBreed(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleDateOfAdquisition = (e) => {
    setDateOfAdquisition(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSex = (e) => {
    setSex(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleAddDog = async (e) => {
    e.preventDefault();

    const newDog = {
      name,
      breed,
      age,
      weight,
      dateOfAdquisition,
      sex,
      size,
      description,
      image: imageUrl,
    };

    try {
      const response = await service.post("/dog", newDog);
      // console.log(response);
      navigate("/my-profile")
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // styles hiddenInput
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
          onSubmit={handleAddDog}
        >
          <Box>
          <Typography variant="subtitle2" gutterBottom>
                <Link to="/my-profile"> Volver al perfil </Link>
              </Typography>
            <Typography variant="h4" gutterBottom>
              Nuevo perro
            </Typography>
            <Button
            sx={{borderRadius: "100px", boxShadow:"none"}}
            color="secondary"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileUpload}
              disabled={isUploading}
              onClick={() => setIsButtonDisabled(false)}
            >
              Cargar foto
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          {isUploading ? <h3>... uploading image</h3> : null}
          {imageUrl ? (
            <Box>
              <img
                src={imageUrl}
                alt="img"
                width={200}
                style={{ borderRadius: "16px" }}
              />
            </Box>
          ) : null}
          <Box className="containerInputs">
            <TextField
                required
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={handleName}
            />
            <TextField
            required
              label="Raza"
              variant="outlined"
              value={breed}
              onChange={handleBreed}
              //onClick={handleIsButtonDisabled}
            />
            <TextField
            required
              label="Edad"
              variant="outlined"
              value={age}
              onChange={handleAge}
              //onClick={handleIsButtonDisabled}
            />
          </Box>
          <Box className="containerInputs">
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
          </Box>

          <TextField
          required
            id="outlined-multiline-static"
            label="Descripción"
            multiline
            rows={3}
            value={description}
            onChange={handleDescription}
            //onClick={handleIsButtonDisabled}
            sx={{ width: "100%" }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Tamaño
            </FormLabel>
            <RadioGroup
            required
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
          </Box>
          <Button
            sx={{borderRadius: "100px", boxShadow:"none"}}
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

//* ⤴️ EXPORTS
export default AddDog;
