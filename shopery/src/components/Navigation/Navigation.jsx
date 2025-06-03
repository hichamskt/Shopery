import React from "react";
import "../Navigation/Navigation.css";
import { MdDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
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
      <NavLink to="a" className={({ isActive }) => (isActive ? "active-link" : "")}>
        <IoIosHeartEmpty />
        <p>Wishlist</p>
      </NavLink>
      <NavLink to="a" className={({ isActive }) => (isActive ? "active-link" : "")}>
        <IoBagOutline />
        <p>Shopping Cart</p>
      </NavLink>
      <NavLink to="/account/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
        <IoSettingsOutline />
        <p>Settings</p>
      </NavLink>

      <div>
        <IoIosLogOut />
        <p>Log-out</p>
      </div>
    </div>
  );
}

export default Navigation;
