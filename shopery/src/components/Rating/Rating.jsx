import React from 'react'
import { FaStar } from "react-icons/fa";
import "../Rating/Rating.css"


const Rating = ({rating}) => {
  
    const items = [];
  
    for (let i = 1; i <= rating; i++) {
      items.push(<FaStar className='start-yellow1' key={rating-i} />);
    }
    for (let i = 1; i <= Math.ceil(5 - rating); i++) {
      items.push(<FaStar key={100+i} className='star-grey1'></FaStar>);
    }
    
  
    return <div className='pc-rating1'>{items}</div>;
  };
  

export default Rating