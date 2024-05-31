// estilos
import './App.css'
import { Routes, Route } from "react-router";

// pages
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

// componentes
import Navbar from "./components/Navbar"
import NavBarPrueba from './components/NavBarPrueba';


function App() {

  return (
    <>
    <NavBarPrueba />
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element = { <Signup /> }  />
        <Route path="/login" element = { <Login /> }  />
      </Routes>
    </>
  )
}

export default App
