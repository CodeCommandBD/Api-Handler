import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Protected route - only accessible when logged in
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/login"}></Navigate>;
  }

  // Logged in, show the protected page
  return children;
};

export default ProtectedRoute;
