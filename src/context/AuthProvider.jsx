// Import Statements
import axios from "axios"
import { createContext, useEffect, useState } from "react"

// Create AuthContext
// The code creates a React context called AuthContext using the createContext function. 
// This context will be used to share authentication-related information between components.
const AuthContext = createContext()



// Auth Provider Component:
// The AuthProvider component is a functional component that serves as the provider for the AuthContext. 
// It receives children as a prop, which represents the child components that will be wrapped by this provider.
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

        const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            // return {respuesta:error.response?.data.msg,tipo:false}
            console.log(error)
        }
    }

    

    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            return { respuesta: respuesta.data.msg, tipo: true }
        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }

    //Fetch User Profile on Component Mount
    // The useEffect hook is used to fetch the user profile when the component is mounted ([] as dependency array).
    // It retrieves the token from the local storage and calls the perfil function if the token is present.
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                actualizarPerfil,
                actualizarPassword              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext 