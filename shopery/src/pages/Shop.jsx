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
            <ShopProducts />
        </div>
       </div>
    </div>
  )
}

export default Shop


function ShopProducts(){

  return(<div>
      <div className='shop-product-header'>
        <div className='shop-header-sort'>Sort by:  
          
          <select>
            <option value="latest">Latest</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
        <p>
          <span>52 </span>
           Results Found
        </p>
      </div>
  </div>)
}