//* ⤵️ IMPORTS
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from "react-router";

// estilos
import './App.css'

// pages
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import SessionList from './pages/SessionList'
import About from './pages/About'

// componentes
import MyProfile from './pages/MyProfile';
import DogDetails from './pages/DogDetails';
import Navbar from "./components/Navbar"
import { Container } from '@mui/material';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#577B8D",
        //contrastText: "#60E0B1"
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });

  return (
    <Container sx={{mt: 8}}>
    <ThemeProvider theme={theme}>
    <Navbar />
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/session" element={ <SessionList /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/dog/:dogId" element={ <DogDetails /> } />
        <Route path="/my-profile" element={ <MyProfile /> } />

        {/* RUTAS AUTH */}
        <Route path="/signup" element = { <Signup /> }  />
        <Route path="/login" element = { <Login /> }  />
      </Routes>
    </ThemeProvider>
    </Container>
  )
}

export default App
