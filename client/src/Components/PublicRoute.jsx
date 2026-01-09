import { Navigate } from "react-router-dom";

// Public route - only accessible when NOT logged in
const PublicRoute = ({children}) => {
     const token = localStorage.getItem("token");
     if(token){
       return <Navigate to={'/profile'}></Navigate>
     }
  return children
}

export default PublicRoute