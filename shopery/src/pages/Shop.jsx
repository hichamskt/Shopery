import React from 'react'
import '../styles/Shop.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Filter from '../components/Filter/Filter'





function Shop() {
    


  return (
    <div >
        <HeaderWhite />
        <Breadcrumbs location={['categories']} />
       <div className='container'>

        <div className='shopcontainer'>
            <Filter />
        </div>
       </div>
    </div>
  )
}

export default Shop