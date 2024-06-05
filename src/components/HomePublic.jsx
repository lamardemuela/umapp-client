import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import dogOwnerVector from "../assets/images/dog-owner-vector.svg"
import dogTrainerVector from "../assets/images/dog-trainer-vector.svg"

function HomePublic() {
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", gap: "24px", width:"100%"}}>
      <Box className="containerBorder" sx={{paddingRight:"0px", paddingLeft:"0"}}>
        <Typography variant="h6" gutterBottom>
                ¿Qué es umapp?
        </Typography>
        <Typography variant="body1" gutterBottom>
                1️⃣ 🔍 Busca un educador canino en tu ciudad
        </Typography>
        <Typography variant="body1" gutterBottom>
                2️⃣ 🗓️ Gestiona con él una sesión para tu perro
        </Typography>
        <Typography variant="body1" gutterBottom>
                3️⃣ 🦮 ¡Disfrutad del aprendizaje y del progreso!
        </Typography>
      </Box>

      <Box sx={{display:"flex", justifyContent:"center", gap: "24px", alignItems:"center"}}>
        {/* ACCESO DUEÑO PERRO */}
        <Box className="containerBorder" sx={{width:"100%"}} >
        <Box sx={{display: "flex", flexDirection:"column", gap:"0"}}>
            <Typography variant="h6" gutterBottom>
              Soy educador canino
            </Typography>
            <Typography variant="body2" gutterBottom>
              Contacta y gestiona tus sesiones con personas que necesitan un educador para su mascota
            </Typography>
          </Box>
          <img src={dogTrainerVector} alt="educador canino" width={300} />
          <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="secondary" component={RouterLink} to="/signup/1">
                Gestiona tus sesiones
          </Button>
        </Box>

        {/* ACCESO EDUCADOR CANINO */}
        <Box className="containerBorder" sx={{width:"100%"}}>
          <Box sx={{display: "flex", flexDirection:"column", gap:"0"}}>
            <Typography variant="h6" gutterBottom>
              ¿Buscas un educador canino?
            </Typography>
            <Typography variant="body2" gutterBottom>
              Encuentra un educador canino en tu provincia y podrás contactar para gestionar las sesiones para tu mascota.
            </Typography>
          </Box>
          <img src={dogOwnerVector} alt="dueño de perro" width={300} />
          <Button sx={{borderRadius: "100px", boxShadow:"none"}} type="submit" variant="contained" color="primary" component={RouterLink} to="/signup/0">
                Ir al buscador
          </Button>
        </Box>
    </Box>

      {/* {isDogOwner === true && <DogOwnerHome />}
      {isDogTrainer === true && <DogTrainerHome />} */}
    </Box>
  )
}

export default HomePublic