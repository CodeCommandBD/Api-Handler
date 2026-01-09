import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // check if user is logged in runs on every route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [location]);

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <div>
      <nav>
        <div className="flex justify-center gap-4 bg-blue-500 text-white p-4 font-bold">
          <Link to="/">Home</Link>
          {isLogin ? (
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
