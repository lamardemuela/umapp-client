//* ⤵️ IMPORTS
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";
import CircularProgress from '@mui/material/CircularProgress';

// componente que comparte el contexto
const AuthContext = createContext();

// componente envoltorio
function AuthWrapper(props) {

  // 📦 estados
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isDogOwner, setIsDogOwner] = useState(true);
  const [isDogTrainer, setIsDogTrainer] = useState(false);
  const [userInfo, setUserInfo] = useState(null)

  // validación del token
  const authenticateUser = async () => {
    // 1. buscamos el token
    const authToken = localStorage.getItem("authToken");

    // cláusula de guardia: si no hay token/usuario no logeado, no hay que hacer la llamada
    if (!authToken) {
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false);
      setIsDogOwner(true);
      setIsDogTrainer(false);
      return;
    }

    // 2. 🔗 GET "/api/auth/verify" => enviamos el token al backend para validarlo
    try {
      const response = await service.get("/auth/verify");

      // si el token es válido:
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setIsAuthenticating(false);
      getUserInfo()

      if (response.data.payload.role === "dogTrainer") {
        setIsDogTrainer(true);
        setIsDogOwner(false);
      } else if (response.data.payload.role === "dogOwner") {
        setIsDogTrainer(false);
        setIsDogOwner(true);
      }
    } catch (error) {
      // si el token no es válido o ha expirado:
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAuthenticating(false);
      setIsDogOwner(true);
      setIsDogTrainer(false);
      setTabsValue(0);
    }
  };

  
  // información del usuario
  const getUserInfo = async () => {
    try {
        const response = await service.get(`/user/owner`);
        setUserInfo(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isDogOwner,
    isDogTrainer,
    getUserInfo,
    userInfo,
    setIsDogTrainer,
    setIsDogOwner
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // cláusula de guardia
  if (isAuthenticating === true) {
    return <CircularProgress />
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

//* ⤴️ EXPORTS
export { AuthContext, AuthWrapper };
