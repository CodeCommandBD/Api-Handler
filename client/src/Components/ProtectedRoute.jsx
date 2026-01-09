import { Navigate } from "react-router-dom";

// Protected route - only accessible when logged in
const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to={'/login'}></Navigate>
    }
    // Logged in, show the protected page
    return children

}

export default ProtectedRoute