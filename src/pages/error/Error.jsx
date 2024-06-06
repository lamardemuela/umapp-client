import React from 'react'
import Container from '@mui/material/Container';
import error500 from "../../assets/images/500.jpg"
import Typography from '@mui/material/Typography';

function Error() {
  return (
    <Container maxWidth="md">
       <Typography variant="h6" gutterBottom>
          Uy... algo ha fallado, nuestro servidor se ha convertido en este perrete 
        </Typography>
        <img className="imgError" src={error500} alt="error 404" />
    </Container>
  )
}

export default Error