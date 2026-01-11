import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout, checkAuth } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Check authentication on mount and route change
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, location]);

  // logout handler
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <div className="flex justify-center gap-4 bg-blue-500 text-white p-4 font-bold">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <button
                onClick={handleLogout}
                className="hover:bg-blue-600 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
