import React, { useEffect, useState } from "react";
import "../styles/Shop.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Filter from "../components/Filter/Filter";
import axiosInstance from "../axios/axiosInstance";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const [showFilter,setShowFilter]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/getallproducts");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

 
  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["categories"]} />
      <div className="container">
        <div className="shopcontainer" style={{
          gridTemplateColumns:!showFilter?"1fr":""
        }}>
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
          <ShopProducts  products={products} />
        </div>
      </div>
    </div>
  );
}

export default Shop;

function ShopProducts({products}) {
  return (
    <div>
      <div className="shop-product-header">
        <div className="shop-header-sort">
          Sort by:
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
      <div className="shopproducts-body">
        {
          products.map((product,i)=>(
            <ShopProductCard key={i} product={product} />
          ))
        }
      </div>
    </div>
  );
}
