import React from "react";
import "../ShopProductCard/ShopProductCard.css";
import { FiEye } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

import { IoBagHandleOutline } from "react-icons/io5";
import Rating from "../Rating/Rating";

function ShopProductCard({ product }) {
  const productAfterDiscount = product.price - (product.price * product.discount) / 100;
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
        <CiHeart />
        <FiEye />
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${product.images[0]}`}
          alt="productimage"
        />
      </div>
      <div>
        <div>
          <p>{product.name}</p>
          <div>
            <p>${productAfterDiscount}</p>
            {product.discount > 0 && <p>${product.price} </p>}
            <Rating rating={product.rating} />
          </div>
          <IoBagHandleOutline />
        </div>
      </div>
    </div>
  );
}

export default ShopProductCard;
