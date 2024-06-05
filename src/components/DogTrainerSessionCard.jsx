import React, { useEffect, useState } from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
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

function SessionCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  //🔗 DELETE "/session/dog/:sessionId" => eliminar una sesion
  const deleteSession = async () => {
    try {
      await service.delete(`session/${props.eachSession._id}`)
      setOpenDialog(false)
      props.getSessionData()
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
            Propietario: {props.eachSession.dogOwner.name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Link to={`/session/${props.eachSession._id}`}>
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
            image={props.eachSession.dog.image}
            alt={props.eachSession.dog.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent className="cardInfo" sx={{ flex: "1 0 auto" }}>
            <Typography>
                <b>Nombre del perro:</b> {props.eachSession.dog.name}{" "}
              </Typography>
              <Typography>
                <b>Raza:</b> {props.eachSession.dog.breed}{" "}
              </Typography>
              <Typography>
                <b>Sexo:</b> {props.eachSession.dog.sex}{" "}
              </Typography>
              <Typography>
                <b>Tamaño:</b> {props.eachSession.dog.size}{" "}
              </Typography>
              <Typography>
                <b>Edad:</b> {props.eachSession.dog.age}{" "}
              </Typography>
              <Typography>
                <b>Peso:</b> {props.eachSession.dog.weight}{" "}
              </Typography>
            </CardContent>
          </Box>
        </Box>

        <Box sx={{display:"flex", gap:"20px", justifyContent: "flex-start", alignItems:"start", padding: "20px", flexWrap:"wrap"}}>
          <Typography sx={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"start"}}>
            <b>Día:</b> {props.eachSession.day.slice(0,10)}{" "}
          </Typography>
          <Typography sx={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"start"}}>
            <b>Hora:</b> {props.eachSession.hour}{" "}
          </Typography>
          <Typography sx={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"start"}}>
            <b>Lugar:</b> {props.eachSession.location}{" "}
          </Typography>
        </Box>

        <CardActions disableSpacing>
          <Typography sx={{ marginLeft: "12px" }}> Más información </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit >
          <b>Descripción del perro</b>
          <CardContent >
            <Typography paragraph>
              {" "}
              {props.eachSession.dog.description}{" "}
            </Typography>
          </CardContent>
          <b>Notas de la sesión</b>
          <CardContent>
            <Typography paragraph> {props.eachSession.notes} </Typography>
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
          {`¿Estás seguro de que quieres eliminar la sesión?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si haces click en Aceptar se borrará toda la información de esta
            sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type="submit"
             onClick={deleteSession}
            autoFocus
          >
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SessionCard;
