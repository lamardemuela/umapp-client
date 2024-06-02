// estilos
import './App.css'
import { Routes, Route } from "react-router";

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



function App() {

  return (
    <>
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
    </>
  )
}

export default App
