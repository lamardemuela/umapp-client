//* ⤵️ IMPORTS
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import uma from "../assets/images/uma-perro.jpeg"

function About() {
  return (
    <Box sx={{display:"flex", flexDirection:"column", gap:"16px"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          gap: "24px",
          padding: "80px",
          border: "1px solid #f7f2f7",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sobre umapp
        </Typography>
        <Typography variant="h5" gutterBottom>
          🧐
        </Typography>
        <Typography variant="body1" gutterBottom>
          🌟 Por un lado, umapp nace para conectar usuarios con perro y educadores caninos. A veces se hace difícil encontrar un educador canino en tu ciudad y no sabes por dónde empezar.
        </Typography>
        <Typography variant="body1" gutterBottom>
        🌟 Por el otro, umapp trata de solventar y digitalizar la gestión de los educadores caninos con sus clientes, pudiendo llevar un seguimiento que sirve a ambas partes.
        </Typography>
      </Box>

      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        gap: "24px",
        padding: "80px",
        border: "1px solid #f7f2f7",
        borderRadius: "12px",
      }}
      >
      <Typography variant="h6" gutterBottom>
        Equipo
      </Typography>
      <Typography variant="h5" gutterBottom>
        🧠
      </Typography>
      <Typography variant="body1" gutterBottom>
        💡 App ideada y desarrollada por Águeda Muela. 
      </Typography>
      <Typography variant="body1" gutterBottom>
        🐶 Mención especial a su perrita Uma, propulsora de esta maravillosa idea. 
      </Typography>
      <img src={uma} alt="uma" height="250px" style={{borderRadius:"100px"}} />
      <Button
        sx={{ borderRadius: "100px", boxShadow: "none" }}
        type="submit"
        variant="contained"
        color="primary"
        href="https://www.linkedin.com/in/agueda-muela/"
        target="blank"
      >
        Visitar Linkedin
      </Button>
      </Box>
    </Box>
  )
}

export default About