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
import AddSession from './pages/AddSession';
import EditSessionDetails from './pages/EditSessionDetails';
import AddDog from './pages/AddDog';
import MyProfile from './pages/MyProfile';
import EditDogDetails from './pages/EditDogDetails';

// componentes
import Navbar from "./components/Navbar"
import { Container } from '@mui/material';
import Footer from './components/Footer';
import SessionPublic from "./components/SessionPublic"
import OnlyPrivate from './components/OnlyPrivate';




function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#515269",
        contrastText: "#FFEEEC"
      },
      secondary: {
        main: '#FFEEEC',
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
          <Route path="/session-public" element={ <SessionPublic /> } />
          <Route path="/" element={ <Home /> } />
          <Route path="/session" element={ <OnlyPrivate> <SessionList /> </OnlyPrivate>  } />
          <Route path="/add-session" element={ <OnlyPrivate> <AddSession /> </OnlyPrivate> } />
          <Route path="/session/:sessionId" element={ <OnlyPrivate> <EditSessionDetails /> </OnlyPrivate> } />

          <Route path="/about" element={ <About /> } />
          <Route path="/my-profile" element={ <OnlyPrivate> <MyProfile /> </OnlyPrivate> } />
          <Route path="/dog/:dogId" element={ <OnlyPrivate> <EditDogDetails /> </OnlyPrivate> } />
          <Route path="/add-dog" element={ <OnlyPrivate> <AddDog /> </OnlyPrivate> } />

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
