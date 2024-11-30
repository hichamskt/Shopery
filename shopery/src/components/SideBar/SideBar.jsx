import React from 'react'
import '../SideBar/SideBar.css'
import { FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { IoIosPricetags } from "react-icons/io";
import { BsBorderStyle } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";

function SideBar() {
  return (
    <div className='sidebar'>
<ul>
  <NavLink><li> <FaHome/> <p>Home</p></li></NavLink>  
  <NavLink><li> <BsBorderStyle/> <p>Orders</p></li></NavLink>  
  <NavLink><li> <IoIosPricetags/> <p>Products</p></li></NavLink>  
  <NavLink><li> <TbCategoryFilled/> <p>Categories</p></li></NavLink>  
</ul>
    </div>
  )
}

export default SideBar