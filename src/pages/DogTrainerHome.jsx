import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

function DogTrainerHome() {
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", gap: "24px"}}>
      <Box className="containerBorder" sx={{paddingRight:"0px", paddingLeft:"0", width:"100%"}}>
        <Typography variant="h6" gutterBottom>
                Recuerda cómo funciona
        </Typography>
        <Typography variant="body1" gutterBottom>
                1️⃣ 🔍 Tus clientes buscarán por ciudad un educador canino en umapp
        </Typography>
        <Typography variant="body1" gutterBottom>
                1️⃣ 🏙️ Recuerda que si cambias de ciudad es muy importante que la cambies en tu información de perfil.
        </Typography>
        <Typography variant="body1" gutterBottom>
                2️⃣ 🗓️ Llega a un acuerdo por mensajería y crea tus sesiones.
        </Typography>
        <Typography variant="body1" gutterBottom>
                3️⃣ ❤️‍🩹 Lleva un seguimiento y anota los avances o comentarios de cada sesión
        </Typography>
      </Box>
      <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="primary" component={RouterLink} to="/session">
                Ir a sesiones
      </Button>
    </Box>
  )
}

export default DogTrainerHome