import React from 'react'
import Container from '@mui/material/Container';
import error404 from "../../assets/images/404.jpg"
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <Container maxWidth="md">
       <Typography variant="h6" gutterBottom>
          Oops... 🧐 ¿Qué andas buscando? Por aquí no es 
        </Typography>
        <img className="imgError" src={error404} alt="error 404" />
    </Container>
  )
}

export default NotFound