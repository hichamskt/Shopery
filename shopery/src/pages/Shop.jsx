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
  const [category,setCategory]=useState([]);
  const [price,setprice]=useState({minPrice:2,maxPrice:10});
  const [minRating,setMinRating]=useState(0);
  const [tags,setTags]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/filtredProducts",{
          params: {
              tags,
              minPrice: price.minPrice,
              maxPrice: price.maxPrice,
              category,
              minRating
          },
      });
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [category,price,minRating,tags]);

  console.log('tags',tags)
 
  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["categories"]} />
      <div className="container">
        <div className="shopcontainer" style={{
          gridTemplateColumns:!showFilter?"1fr":""
        }}>
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} category={category} setCategory={setCategory} setprice={setprice}  price={price} minRating={minRating} setMinRating={setMinRating} tags={tags} setTags={setTags}/>
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
          <span>{products.length} </span>
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
