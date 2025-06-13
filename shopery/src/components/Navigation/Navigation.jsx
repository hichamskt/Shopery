import React from "react";
import "../Navigation/Navigation.css";
import { MdDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../axios/axiosInstance";

function Navigation() {
  const navigate = useNavigate();
  const {setAuth} = useAuth();
  


  const handleLogout = async () => {
  try {
    // Optional: Inform the backend to invalidate token
    await axiosInstance.get("/user/logout"); // Adjust path if needed

    // Clear auth context or state
    setAuth([]);

    // Optionally clear localStorage/sessionStorage if used
    // localStorage.removeItem("accessToken");

    // Navigate to login or home
    navigate("/login"); // or "/"

  } catch (err) {
    console.error("Logout failed:", err.message);
  }
};



  return (
    <div className="navigation">
      <p className="navigp">Navigation</p>
      <NavLink to="." className={({ isActive }) => (isActive ? "active-link" : "")} end>
      
        <MdDashboard />
        <p>Dashboard</p>
      </NavLink>
      <NavLink to="/account/orderhistory" className={({ isActive }) => (isActive ? "active-link" : "")} >
        <FaHistory />
        <p>Order History</p>
      </NavLink>
      <NavLink to="/account/wishlist" className={({ isActive }) => (isActive ? "active-link" : "")}>
        <IoIosHeartEmpty />
        <p>Wishlist</p>
      </NavLink>
     
      <NavLink to="/account/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
        <IoSettingsOutline />
        <p>Settings</p>
      </NavLink>

      <div onClick={()=> handleLogout()}>
        <IoIosLogOut />
        <p>Log-out</p>
      </div>
    </div>
  );
}

export default Navigation;
