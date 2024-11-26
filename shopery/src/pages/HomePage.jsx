import React from 'react'
import "../styles/HomePage.css"
import Header from '../components/Header/Header'
import Bannar from '../components/Bannar/Bannar'
import Featured from '../components/Featured/Featured'
import Heading from '../components/Heading/Heading'
import Categories from '../components/Categories/Categories'

function HomePage() {
  return (
    <div>
        <Header/>
        <Bannar />
        <Featured />
        <Heading heading='Popular Categories' navigatto='/'/>
        <Categories />
        <Heading heading='Popular Products' navigatto='/'/>
    </div>
  )
}

export default HomePage