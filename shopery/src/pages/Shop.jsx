import React, { useEffect, useState } from "react";
import "../styles/Shop.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Filter from "../components/Filter/Filter";
import axiosInstance from "../axios/axiosInstance";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";

function Shop() {
  const [products, setProducts] = useState([]);

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

  console.log(products);

  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["categories"]} />
      <div className="container">
        <div className="shopcontainer">
          <Filter />
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
