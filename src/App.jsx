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
import NotFound from './pages/error/NotFound';
import Error from './pages/error/Error'

// componentes
import MyProfile from './pages/MyProfile';
import EditDogDetails from './pages/EditDogDetails';
import Navbar from "./components/Navbar"
import { Container } from '@mui/material';
import AddDog from './pages/AddDog';
import Footer from './components/Footer';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#515269",
        contrastText: "#FFEEEC"
      },
      secondary: {
        main: '#FFEEEC',
        //light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#515269',
      },
    },
  });

  return (
    <Container sx={{mt: 8}}>
      <ThemeProvider theme={theme}>

        {/* NAVBAR */}
        <Navbar />

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/session" element={ <SessionList /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/my-profile" element={ <MyProfile /> } />
          <Route path="/dog/:dogId" element={ <EditDogDetails /> } />
          <Route path="/add-dog" element={ <AddDog /> } />

          {/* RUTAS AUTH */}
          <Route path="/signup/:tab" element = { <Signup /> }  />
          <Route path="/login" element = { <Login /> }  />

          {/* RUTAS ERROR */}
          <Route path="*" element={ <NotFound /> } />
          <Route path="/error" element={ <Error /> } />

        </Routes>

        {/* FOOTER */}
        <Footer />
        
      </ThemeProvider>
    </Container>
  )
}

export default App
