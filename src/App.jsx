// estilos
import './App.css'
import { Routes, Route } from "react-router";

// pages
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

// componentes
import Navbar from "./components/Navbar"
import MyProfile from './pages/MyProfile';
import DogDetails from './pages/DogDetails';



function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/dog/:dogId" element={ <DogDetails /> } />
        <Route path="/my-profile" element={ <MyProfile /> } />
        <Route path="/signup" element = { <Signup /> }  />
        <Route path="/login" element = { <Login /> }  />
      </Routes>
    </>
  )
}

export default App
