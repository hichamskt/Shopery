import React from 'react'
import '../Breadcrumbs/Breadcrumbs.css'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

function Breadcrumbs({location}) {
  return (
    <div className='breadcramb' >
        <div className='container'>
        <Locations location={location}/>
        </div>
    </div>
  )
}

export default Breadcrumbs



function Locations({location}){

    const items = [];
    items.push(<IoHomeOutline key={90}/>)
    items.push(<MdOutlineArrowForwardIos key={100}/>)

    for (let i = 0; i < location.length; i++) {
        if(i===location.length-1) {items.push(<p key={i}>{location[i]}</p>)}
        else{
            items.push(<p key={location[i]}>{location[i]}</p>)
            items.push(<MdOutlineArrowForwardIos key={i} />)
        }

    }
    
    
  
    return <div className='breadlocation'>{items}</div>;
    
}