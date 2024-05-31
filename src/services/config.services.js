//* ⤵️ IMPORTS
import axios from "axios";

// service con base de todas las llamadas al backend
const service = axios.create({
    baseURL: `http://localhost:5005/api`
})

// añadimos el token a todas las llamadas
service.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken")

    if(authToken) {
        config.headers.authorization = `Bearer ${authToken}`
    }

    return config
})

//* ⤴️ EXPORTS
export default service
