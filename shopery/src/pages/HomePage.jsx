import React from 'react'
import "../styles/HomePage.css"
import Header from '../components/Header/Header'
import Bannar from '../components/Bannar/Bannar'
import Featured from '../components/Featured/Featured'
import Heading from '../components/Heading/Heading'
import Categories from '../components/Categories/Categories'



import pop1 from "../assets/pop1.png"
import pop2 from "../assets/pop2.png"
import pop3 from "../assets/pop3.png"
import pop4 from "../assets/pop4.png"
import pop5 from "../assets/pop5.png"
import pop6 from "../assets/pop6.png"
import pop7 from "../assets/pop7.png"
import ProductCard from '../components/ProductCard/ProductCard'


function HomePage() {
  return (
    <div>
        <Header/>
        <Bannar />
        <Featured />
        <Heading heading='Popular Categories' navigatto='/'/>
        <Categories />
        <Heading heading='Popular Products' navigatto='/'/>
        <PopularProducts />
    </div>
  )
}

export default HomePage




const dummyPopularProducts = [
  {
    name: "Green Apple",
    price: 20,
    images: pop1,
    discount: 50,
    rating: [
      
    ],
  },
  {
    name: "Red Grapes",
    price: 15,
    images: pop2,
    discount: 30,
    rating: [
      { userid: "user1", rating: 4 },
      { userid: "user2", rating: 5 },
      { userid: "user3", rating: 5 },
      { userid: "user4", rating: 4 },
    ],
  },
  {
    name: "Orange Juice",
    price: 25,
    images: pop3,
    discount: 0,
    rating: [
      { userid: "user5", rating: 0 },
      { userid: "user6", rating: 4 },
      { userid: "user7", rating: 4 },
      { userid: "user8", rating: 3 },
    ],
  },
  {
    name: "Banana",
    price: 10,
    images: pop4,
    discount: 10,
    rating: [
      { userid: "user9", rating: 4 },
      { userid: "user10", rating: 4 },
      { userid: "user11", rating: 5 },
      { userid: "user12", rating: 5 },
    ],
  },
  {
    name: "Strawberries",
    price: 40,
    images: pop5,
    discount: 0,
    rating: [
      { userid: "user13", rating: 5 },
      { userid: "user14", rating: 5 },
      { userid: "user15", rating: 4 },
      { userid: "user16", rating: 3 },
    ],
  },
  {
    name: "Watermelon",
    price: 35,
    images: pop6,
    discount: 0,
    rating: [
      { userid: "user17", rating: 4 },
      { userid: "user18", rating: 4 },
      { userid: "user19", rating: 5 },
      { userid: "user20", rating: 5 },
    ],
  },
  {
    name: "Mango",
    price: 50,
    images: pop7,
    discount: 0,
    rating: [
      { userid: "user21", rating: 5 },
      { userid: "user22", rating: 4 },
      { userid: "user23", rating: 3 },
      { userid: "user24", rating: 5 },
    ],
  },
];



function PopularProducts (){


  return(<div className='container'>
    <div className='popularproducts'>
      {dummyPopularProducts.map((product,index)=>(
        <ProductCard  product={product} key={index} />
      ))}
    </div>
  </div>)
}