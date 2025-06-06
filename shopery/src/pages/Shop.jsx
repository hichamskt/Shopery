import React, { useEffect, useState } from "react";
import "../styles/Shop.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Filter from "../components/Filter/Filter";
import axiosInstance from "../axios/axiosInstance";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";
import { Link } from "react-router-dom";
import ProductQuickView from "../components/ProductQuickView/ProductQuickView";
import { RxCross1 } from "react-icons/rx";
import ShoppingCardPopup from "../components/ShoppingCardPopup/ShoppingCardPopup";
import { useCardContext } from "../contexts/CardContext";
import useAuth from "../hooks/useAuth";

function Shop() {
  const [products, setProducts] = useState([]);
  const [productOverview, setProductOverView] = useState();
  const [isProdctView,setIsProductView]=useState(false);
  const [showFilter,setShowFilter]=useState(true);
  const [category,setCategory]=useState([]);
  const [price,setprice]=useState({minPrice:2,maxPrice:10});
  const [minRating,setMinRating]=useState(0);
  const [tags,setTags]=useState([]);
  const [likedPrds,setLikedPrds]=useState([]);


const { auth } = useAuth();


  const {showCard, setShowCard, items , setItems} = useCardContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/user/getLikedProducts",{
         email:auth.email
      });
        setLikedPrds(response.data.likedProducts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(likedPrds)
  
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

  


 
  return (
    <div >
      { showCard && <div className="shoping-ovlay" style={{
        opacity:showCard? 1 : "",
        zIndex:showCard?10:""
      }}></div>}
       <ShoppingCardPopup />

      {
        isProdctView && <div className="ovr-overlay"  >
      <div className="shop-ov-p"> < RxCross1 className="ov-x" onClick={()=>setIsProductView(false)} />
        <ProductQuickView product={productOverview} />
      </div>
      </div>
      }
      <HeaderWhite />
      <Breadcrumbs location={["categories"]} />
      <div className="container">
        <div className="shopcontainer" style={{
          gridTemplateColumns:!showFilter?"1fr":""
        }}>
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} category={category} setCategory={setCategory} setprice={setprice}  price={price} minRating={minRating} setMinRating={setMinRating} tags={tags} setTags={setTags}/>
          <ShopProducts  products={products} setProductOverView={setProductOverView} setIsProductView={setIsProductView} />
        </div>
      </div>
    </div>
  );
}

export default Shop;

function ShopProducts({products , setProductOverView , setIsProductView}) {
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
           
            // <Link to={`/product/${product._id}`} key={i} style={{ textDecoration: "none" , display:"flex" ,width:"100%"}}>
            <ShopProductCard key={i}  product={product} setProductOverView={setProductOverView} setIsProductView={setIsProductView} />
              //  </Link>
          ))
        }
      </div>
    </div>
  );
}
