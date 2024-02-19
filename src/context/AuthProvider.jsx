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
                setAuth              
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