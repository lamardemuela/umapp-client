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
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link } from "react-router-dom";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box className="boxCards">
      <Card sx={{ width: 500 }}>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="div" variant="h6">
            {props.eachDog.name}
          </Typography>
          <Link to={`/dog/${props.eachDog._id}`}>
            <IconButton aria-label="ver detalles">
              <ArrowForwardOutlinedIcon />
            </IconButton>
          </Link>
        </CardActions>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
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
    </Box>
  );
}

export default DogCard;
