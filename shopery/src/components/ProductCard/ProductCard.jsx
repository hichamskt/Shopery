import React, { useState } from 'react'
import '../ProductCard/ProductCard.css'
import { FiEye } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";

function ProductCard({product}) {

  const [rating,setRating]=useState(
    product.rating?.length>0?
    product.rating?.reduce((acc, rate) => acc + rate.rating, 0)/product.rating.length
    :0
  );
  
  console.log(rating)
    

  return (
    <div className='productcard'>
      {product.discount>0 && <p className='productcard-discount'>Sale {product.discount}%</p>}
        <span className='eye'><FiEye/></span>
        <span className='heart'><CiHeart/></span>
        <img src={product.images} alt='product' />
        <div className='productcard-bottom'>
          <div className='productcard-texts'>
            <p className='pname'>{product.name}</p>
            {product.discount>0? <span className='pcprices'><p>{product.price - product.price*product.discount/100}$</p><p>{product.price}$</p> </span>:<p className='p-price'>${product.price}</p>}
            <Rating rating={Math.floor(rating)} />
          </div>
          <span className='pc-shopingcard'>
            <IoBagHandleOutline />
          </span>
        </div>
    </div>
  )
}

export default ProductCard


const Rating = ({rating}) => {
  
  const items = [];

  for (let i = 1; i <= rating; i++) {
    items.push(<FaStar className='start-yellow' key={rating-i} />);
  }
  for (let i = 1; i <= Math.ceil(5 - rating); i++) {
    items.push(<FaStar key={100+i} className='star-grey'></FaStar>);
  }
  

  return <div className='pc-rating'>{items}</div>;
};
