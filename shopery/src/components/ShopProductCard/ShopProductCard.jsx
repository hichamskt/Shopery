import React, { useEffect, useState } from "react";
import "../ShopProductCard/ShopProductCard.css";
import { FiEye } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

import { IoBagHandleOutline } from "react-icons/io5";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";

function ShopProductCard({ product , setProductOverView , setIsProductView , likedPrds , setLikedPrds }) {
  const productAfterDiscount = product.price - (product.price * product.discount) / 100;
  const {auth}= useAuth();
  const navigate = useNavigate();
    
      const handleNav = () => {
        navigate("/login"); 
      };

  const [liked,setLiked]=useState(false);

  const handlequickview=()=>{
    setProductOverView(product);
    setIsProductView(true);
  }
useEffect(() => {
  if (Array.isArray(likedPrds) && product?._id) {
    setLiked(likedPrds.includes(product._id));
  }
}, [likedPrds, product._id]);


const toggleLike = async () => {
  const isAlreadyLiked = likedPrds.includes(product._id);
  let updatedLikedPrds;

  if (isAlreadyLiked) {
    updatedLikedPrds = likedPrds.filter(id => id !== product._id);
  } else {
    updatedLikedPrds = [...likedPrds, product._id];
  }

  
  setLikedPrds(updatedLikedPrds);
  setLiked(!isAlreadyLiked);

  try {
    await axiosInstance.post("/user/toggleLikedProduct", {
      email: auth.email,
      productId: product._id,
    });
  } catch (err) {
    console.error("Server error:", err);
    // Optional: Rollback local changes if server fails
    setLikedPrds(likedPrds);
    setLiked(isAlreadyLiked);
  }
};






useEffect(() => {
  if (product?._id) {
    setLiked(likedPrds.includes(product._id));
  }
}, [likedPrds, product]);

  
const handleLiked =() => {
  if(auth.email){
    toggleLike();
  }else{
    handleNav();
  }

}


  return (
    <div className="ShopProductCard">
      {product.stock <= 0 ? (
        <p className="shopproduct-tags" style={{backgroundColor:"black",color:"white"}}>Out Of Stock</p>
      ) : product.discount >= 0 ? (
        <p className="shopproduct-tags" style={{backgroundColor:"red",color:"white"}} >Sale {product.discount}%</p>
      ) : (
        ""
      )}
      <div className="productshopimgbox">
        <span style={liked?{backgroundColor:"var(--primary)" , color: "white"}:{}} onClick={()=>handleLiked()} >
        <CiHeart />
        </span>
        <span onClick={()=>handlequickview()}>
        <FiEye />
        </span>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${product.images[0]}`}
          alt="productimage"
        />
      </div>
      <div className="productshoptextbox">
        <div>
          <p className="psctext">{product.name}</p>
          <div className="pscpricing">
            <p>${productAfterDiscount}</p>
            {product.discount > 0 && <p>${product.price} </p>}
          </div>
            <Rating rating={product.rating}  />
        </div>
        <span className="ps-baghand">
        <Link to={`/product/${product._id}`}  style={{ textDecoration: "none" , display:"flex" ,width:"100%"}}>
          <IoBagHandleOutline   />
        </Link>
        </span>
      </div>
    </div>
  );
}

export default ShopProductCard;
