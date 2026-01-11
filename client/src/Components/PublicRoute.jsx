import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Public route - only accessible when NOT logged in
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={"/profile"}></Navigate>;
  }

  return children;
};

export default PublicRoute;
