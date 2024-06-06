import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function DogOwnerSessionCard(props) {
  return (
    <Box>
      <Card
      className="card"
        sx={{
          border: "1px solid #f7f2f7",
          borderRadius: "12px",
          boxShadow:
            "0 0 1px rgba(85, 222, 246, 0.1), 1px 1px 1px -1px rgba(85, 222, 246, 0.15), 2px 4px 8px -2.5px rgba(85, 222, 246, 0.15)",
          padding: "16px",
        }}
      >
        <CardContent sx={{display:"flex", justifyContent:"flex-start"}}>
          <Typography variant="h6">
            Educador: {props.eachSession.dogTrainer.name}
          </Typography>
        </CardContent>
        <Box className="containerCardInfoImg">
          <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: "4px", maxHeight: "200px" }}
            image={props.eachSession.dogTrainer.picProfile}
            alt={props.eachSession.dogTrainer.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"flex-start" }}>
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