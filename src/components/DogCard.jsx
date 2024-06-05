import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import service from "../services/config.services";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DogCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded)

  const handleClickOpen = () => setOpenDialog(true)

  const handleClose = () => setOpenDialog(false)
  console.log(props.eachDog._id);

  //🔗 DELETE "/api/dog/:dogId" => eliminar un perro
  const deleteDog = async () => {
    try {
      await service.delete(`dog/${props.eachDog._id}`)
      setOpenDialog(false)
      props.getDogsData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Card
        sx={{
          width: 525,
          border: "1px solid #f7f2f7",
          borderRadius: "12px",
          boxShadow:
            "0 0 1px rgba(85, 222, 246, 0.1), 1px 1px 1px -1px rgba(85, 222, 246, 0.15), 2px 4px 8px -2.5px rgba(85, 222, 246, 0.15)",
          padding: "16px",
        }}
      >
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* CARD ICONOS */}
          <Typography component="div" variant="h6">
            {props.eachDog.name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Link to={`/dog/${props.eachDog._id}`}>
              <IconButton aria-label="editar">
                <EditRoundedIcon />
              </IconButton>
            </Link>
            <IconButton aria-label="eliminar" onClick={handleClickOpen}>
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        </CardActions>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: "4px", maxHeight: "200px" }}
            image={props.eachDog.image}
            alt={props.eachDog.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent className="cardInfo" sx={{ flex: "1 0 auto" }}>
              <Typography>
                <b>Raza:</b> {props.eachDog.breed}{" "}
              </Typography>
              <Typography>
                <b>Sexo:</b> {props.eachDog.sex}{" "}
              </Typography>
              <Typography>
                <b>Tamaño:</b> {props.eachDog.size}{" "}
              </Typography>
              <Typography>
                <b>Edad:</b> {props.eachDog.age}{" "}
              </Typography>
              <Typography>
                <b>Peso:</b> {props.eachDog.weight}{" "}
              </Typography>
              <Typography>
                <b>Fecha de adquisición:</b> {props.eachDog.dateOfAdquisition}{" "}
              </Typography>
            </CardContent>
          </Box>
        </Box>

        <CardActions disableSpacing>
          <Typography sx={{ marginLeft: "12px" }}> Descripción </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph> {props.eachDog.description} </Typography>
          </CardContent>
        </Collapse>
      </Card>

      {/* DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Estás seguro de que quieres eliminar a este perro: ${props.eachDog.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si haces click en Aceptar se borrará toda la información de este perro.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" onClick={deleteDog} autoFocus>
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DogCard;
