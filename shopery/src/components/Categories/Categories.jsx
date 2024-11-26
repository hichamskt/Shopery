import React from 'react'
import '../Categories/Categories.css'
import img1 from "../../assets/img1.png"
import img2 from "../../assets/img2.png"
import img3 from "../../assets/img3.png"
import img4 from "../../assets/img4.png"
import img5 from "../../assets/img5.png"
import img6 from "../../assets/img6.png"
import img7 from "../../assets/img7.png"
import { Link } from 'react-router-dom'

const dummydata = [
    {
    name:'Fresh Fruit',
    image:img1
},
    {
    name:'Fresh Vegetables',
    image:img2
},
    {
    name:'Meat & Fish',
    image:img3
},
    {
    name:'Snacks',
    image:img4
},
    {
    name:'Beverages',
    image:img5
},
    {
    name:'Beauty & Health',
    image:img6
},
    {
    name:'Bread & Bakery',
    image:img7
},
]

function Categories() {
  return (
    <div className='container'>
        
        <div className='categories'>
            {
                dummydata.map((item,index)=>(
                    <Link to='' key={index}>
                    <Categorie name={item.name}  image={item.image} />
                    </Link> 
                ))
            }
        </div>

        </div>
  )
}

export default Categories

function Categorie ({image,name}){

    return <div className='categorie'>
        <img src={image} alt='categorie'/>
        <p>{name}</p>
    </div>
}