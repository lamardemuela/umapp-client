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

function DogOwnerSessionCard(props) {
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
        <CardContent>
          <Typography component="div" variant="h6">
            Educador: {props.eachSession.dogTrainer.name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: "4px", maxHeight: "200px" }}
            image={props.eachSession.dogTrainer.picProfile}
            alt={props.eachSession.dogTrainer.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent className="cardInfo" sx={{ flex: "1 0 auto" }}>
            <Typography>
                <b>Perro:</b> {props.eachSession.dog.name}{" "}
              </Typography>
            <Typography>
                <b>Día:</b> {props.eachSession.day.slice(0,10)}{" "}
              </Typography>
              <Typography>
                <b>Hora:</b> {props.eachSession.hour}{" "}
              </Typography>
              <Typography>
                <b>Lugar:</b> {props.eachSession.location}{" "}
              </Typography>
              <Typography>
                <b>Notas de la sesión:</b> {props.eachSession.notes}{" "}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </Card>
      </Box>
  )
}

export default DogOwnerSessionCard