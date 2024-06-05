import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import WhatsappButton from "./WhatsappButton";

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

function DogTrainerCard(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Box>
      <Card
        sx={{
          width: 525,
          border: "1px solid #f7f2f7",
          borderRadius: "12px",
          boxShadow:
            "0 0 1px rgba(85, 222, 246, 0.1), 1px 1px 1px -1px rgba(85, 222, 246, 0.15), 2px 4px 8px -2.5px rgba(85, 222, 246, 0.15)",
          padding: "8px",
        }}
      >
        <CardContent sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6">
            Educador: {props.eachDogTrainerUser.name}
          </Typography>
          <WhatsappButton phoneTrainer={props.eachDogTrainerUser.telephone} />
        </CardContent>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: "4px", maxHeight: "200px" }}
            image={props.eachDogTrainerUser.picProfile}
            alt={props.eachDogTrainerUser.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent className="cardInfo" sx={{ flex: "1 0 auto" }}>
              <Typography>
                <b>Ciudad:</b> {props.eachDogTrainerUser.province}{" "}
              </Typography>
              <Typography>
                <b>Tarifa €/sesión:</b> {props.eachDogTrainerUser.rates}{" "}
              </Typography>
            </CardContent>
          </Box>
        </Box>
        <CardActions disableSpacing>
          <Typography sx={{ marginLeft: "12px" }}> Servicios</Typography>
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
            
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", gap: "4px" }}
              >
                {props.eachDogTrainerUser.services.map((eachService) => {
                  return <Chip key={eachService} label={eachService} />;
                })}
              </Stack>
         
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default DogTrainerCard;
