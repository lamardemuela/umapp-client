//* ⤵️ IMPORTS
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from "react-router-dom";

function SessionPublic() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center">

      <Typography variant="h6" gutterBottom>
                Sesiones
        </Typography>
        <Typography variant="body1" gutterBottom>
                Para conseguir una sesión con un educador canino sólo tienes que seguir estos pasos:
        </Typography>
        <Typography variant="body1" gutterBottom>
                1️⃣ 🔍 Busca un educador canino en tu ciudad
        </Typography>
        <Typography variant="body1" gutterBottom>
                2️⃣ 📱 Contacta con el educador que más se encaje a lo que buscas desde el buscador
        </Typography>
        <Typography variant="body1" gutterBottom>
                3️⃣ 🗓️ Concreta con el educador o educadora una sesión. Se encargará de gestionarla en umapp 
        </Typography>
        <Typography variant="body1" gutterBottom>
                4️⃣ 📓 Cuando estés logeado podrás ver todas tus sesiones en esta sección 
        </Typography>
        <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="primary" component={RouterLink} to="/signup/0">
                Regístrate
          </Button>
      </Box>
    </Container>
  )
}

export default SessionPublic