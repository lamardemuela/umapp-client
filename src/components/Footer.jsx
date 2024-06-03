//* ⤵️ IMPORTS
import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import linkedinLogo from '../assets/images/linkedin.png'
import gitHubLogo from '../assets/images/github.png'

function Footer() {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '45vh',
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: "#EDE8ED"
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2">
              Desarrollado por Águeda Muela
            </Typography>
            <Box sx={{display:"flex", gap: "12px", justifyContent:"center", padding:"12px"}}>
               <a href="https://www.linkedin.com/in/agueda-muela/" target='blank'> <img src={linkedinLogo} alt="perfil linkedin" width={28} /> </a> 
               <a href="https://github.com/lamardemuela" target='blank'> <img src={gitHubLogo} alt="perfil github" width={28} /> </a> 
            </Box>
          </Container>
        </Box>
      </Box>
  )
}

//* ⤴️ EXPORTS
export default Footer