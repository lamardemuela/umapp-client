//* ⤵️ IMPORTS
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

// componente que comparte el contexto
const AuthContext = createContext()

// componente envoltorio
function AuthWrapper(props) {

    // 📦 estados 
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(true)
    const [isDogOwner, setIsDogOwner] = useState(true)
    const [isDogTrainer, setIsDogTrainer] = useState(false)
    const [tabsValue, setTabsValue] = useState(0)

    // validamos el token 
    const authenticateUser = async () => {
        // 1. buscamos el token
        const authToken = localStorage.getItem("authToken")

        // cláusula de guardia: si no hay token/usuario no logeado, no hay que hacer la llamada
        if(!authToken){
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsAuthenticating(false)
            setIsDogOwner(true)
            setIsDogTrainer(false)
            return
        }

        // 2. 🔗 GET "/api/auth/verify" => enviamos el token al backend para validarlo
        try {
            const response = await service.get("/auth/verify")
            console.log(response);

            // si el token es válido:
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setIsAuthenticating(false)

            if(response.data.payload.role === "dogTrainer"){
                setIsDogTrainer(true)
                setIsDogOwner(false)
                setTabsValue(1)
            }else if(response.data.payload.role === "dogOwner"){
                setIsDogTrainer(false)
                setIsDogOwner(true)
                setTabsValue(0)
            }
            
        } catch (error) {
            // si el token no es válido o ha expirado:
            console.log(error);
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsAuthenticating(false)
            setIsDogOwner(true)
            setIsDogTrainer(false)
            setTabsValue(0)
        } 
    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser,
        isDogOwner,
        isDogTrainer,
        tabsValue
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    // cláusula de guardia
    if(isAuthenticating === true) {
        return <h3>... autenticando</h3>
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

//* ⤴️ EXPORTS
export {
    AuthContext,
    AuthWrapper
}