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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function DogDetails() {
  const params = useParams();

  // ⛵️ Navigate
  const navigate = useNavigate()

  // 📦 Estados
  // control de inputs:
  const [dogDetails, setDogDetails] = useState(null);
  //const [img, setImg] = useState("");
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
      setImageUrl(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  // 🕹️ funciones de control
  const handleName = (e) => {
    setName(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleBreed = (e) => {
    setBreed(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleDateOfAdquisition = (e) => {
    setDateOfAdquisition(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleSex = (e) => {
    setSex(e.target.value);
    setIsButtonDisabled(false);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
    setIsButtonDisabled(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // actualizamos datos del documento
    const updatedDog = {
      name,
      breed,
      age,
      weight,
      dateOfAdquisition,
      sex,
      size,
      description,
      image: imageUrl
    };

    try {
      const response = await service.put(`/dog/${params.dogId}`, updatedDog);
      console.log(response);
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
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // cláusula de guardia
  if (dogDetails === null) {
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
        <Box
          className="containerBorderRow"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            paddingBottom: "12px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: "12px" }}>
            <CardMedia
              component="img"
              height="40"
              image={imageUrl}
              alt="img"
              sx={{ borderRadius: "20px", width: "40px" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" gutterBottom>
                {dogDetails.name}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Dueño:{" "}
                <Link to="/my-profile"> {dogDetails.dogOwner.name} </Link>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              disabled={isButtonDisabled}
              onClick={handleSaveChanges}
            >
              {" "}
              Guardar cambios{" "}
            </Button>
          </Box>
        </Box>

        <form
          className="container containerBorder"
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            width: "100%",
          }}
        >
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileUpload}
              disabled={isUploading}
              onClick={() => setIsButtonDisabled(false)}
            >
              Cambiar foto
              <VisuallyHiddenInput type="file" />
            </Button>
            {/* <label>Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            /> */}
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
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={handleName}
            />
            <TextField
              label="Raza"
              variant="outlined"
              value={breed}
              onChange={handleBreed}
              //onClick={handleIsButtonDisabled}
            />
            <TextField
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
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default DogDetails;
