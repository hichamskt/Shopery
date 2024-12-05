import React, { useEffect, useState } from 'react'
import '../styles/ProductDetails.css'
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';
import HeaderWhite from '../components/Header/HeaderWhite';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ProductQuickView from '../components/ProductQuickView/ProductQuickView';
import Footer from "../components/Footer/Footer"


function ProductDetails() {
    const [product,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    
console.log("product",product)
    // const { productid } = useParams();
    const  productid = "674c77c6f2b3a06e5015e327"
    useEffect(() => {
        const fetchData = async (id) => {
          try {
            const response = await axiosInstance.get(`/product/getproductbyid/${id}`);
            setProducts(response.data.product);
          } catch (err) {
            console.log(err);
          }finally{
            setLoading(false)
          }
        };
    
        fetchData(productid);
    
      }, [productid]);
    

  return (
    <div>
        <HeaderWhite />
       {!loading &&  <Breadcrumbs location={['Category',product?.category.name, product?.name]} />}
       
        <div className='container'>
        {!loading && <ProductQuickView product={product} />}
        </div>
        <Footer />
    </div>
  )
}

export default ProductDetails