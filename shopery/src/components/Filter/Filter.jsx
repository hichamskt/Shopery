import React, { useEffect, useState } from "react";
import "../Filter/Filter.css";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axiosInstance from "../../axios/axiosInstance";
import { DoubleScrollBar } from "../DoubleScrollBar/DoubleScrollBar";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from 'react-icons/fa6'
import Rating from "../Rating/Rating";

function Filter() {
  return (
    <div className="filtercontainer">
      <div className="fliterbtn">
        <p>Filter</p>
        <IoFilter />
      </div>
      <AllCategories />
      <hr/>
      <PriceRange />
      <hr/>
      <RatingFilter />
      <hr/>
      <PopularTag />
      <Banner />
      <SaleProducts />
    </div>
  );
}

export default Filter;

function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [showBox,setShowBox]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/category/getcategorieswithproductcount"
        );
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="filterbox">
      <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>All Categories</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>

      {showBox && <div className="categoriefilter">
        {categories.map((categorie, index) => (
          <label className="containere" key={index}>
            {categorie.name}
            <span className="prdctcount">({categorie.productCount})</span>
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>}
    </div>
  );
}



function PriceRange(){
  const [data1, setData1] = useState({from:2,to:10});
  const [showBox,setShowBox]=useState(true);

  return (
    <div className="pricerangbox">
      <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Price</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>

        {showBox && <div className="wrapper-1">
        <DoubleScrollBar
        min={0}
        max={500}
        step={1}     
        className="SB-1"
        onChange={(from,to)=>{
            setData1({from,to});
        }}

        />
        <div id="display1">
        Price: <span> {data1.from}</span> 
           -<span>{data1.to}</span></div>
      </div>}

    </div>
  )
}



function RatingFilter(){
  const [showBox,setShowBox]=useState(true);

  return<div className="ratingf-box">
 <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Price</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>
      {showBox && <div>
     < StarLabel orange={5} gray={0} text={ 5.0} />
     < StarLabel orange={4} gray={1} text={'4.0 & up'} />
     < StarLabel orange={3} gray={2} text={"3.0 & up"} />
     < StarLabel orange={2} gray={3} text={ "2.0 & up"} />
     < StarLabel orange={1} gray={4} text={ "1.0 & up"} />
      
      </div>}
  </div>
}

function StarLabel ({orange,gray,text}){
  return(
    <label className="label--checkbox">
        <input type="checkbox" className="checkbox"  />
        <span>
        {Array.from({ length: orange }).map((_,i)=>(
          <FaStar key={i} className="orangestar"/>
        ))}
        {Array.from({ length: gray }).map((_,i)=>(
          <FaStar key={i} className="graystar"/>
        ))}
        
         <p>{text}</p>
        </span>
      </label>
  )
}


function PopularTag(){
  const [showBox,setShowBox]=useState(true);
  const tags = ["Healthy","Low fat", "Vegetarian","Kid foods","Vitamins","Bread",'Meat',"Snacks","Tiffin","Launch","Dinner","Breackfast","Fruit"]

  return(
    <div className="populartagbox">
      <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Popular Tag</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>
      {
        showBox && <div className="ptagscontainer">
{
  tags.map((tag,i)=> 
    <Tag key={i} tag={tag} />
    )
}
        </div>
      }

    </div>
  )
}

function Tag ({tag}){
const [clicked,setClicked]=useState(false);
  return(
    <div className="tag" onClick={()=>setClicked(!clicked)}
    style={{
      backgroundColor: clicked? "#00b207" :"",
      color: clicked? "#fff" :"",
      
    }}
    >
      {tag}
    </div>
  )
}


function Banner (){

  return(<div className="filterBanner">
    <p><span>79%</span> Discount</p>
    <p>on your first order</p>
    <p>Shop Now <FaArrowRightLong/>  </p>
  </div>)

}

function SaleProducts (){
  
  const [tophotproducts,setTophotProducts]=useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "product/gettopdiscountedproducts"
        );
        setTophotProducts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  

  return(
    <div className="populartagbox">
      <div className="filterboxheader" style={{cursor:"auto"}} >
      <p>Sale Products</p>
        
      </div>
      <div className="dalepr-container">
        {tophotproducts.map((product,i)=>(
          <SaleProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  )
}


function SaleProductCard ({product}){

const discount = product.price * product.discount / 100;
  return(
    <div className="saleprd-box">
              <img src={`${process.env.REACT_APP_BACKEND_URL}${product.images[0]}`} alt='product'/>
              <div>
                <p>{product.name}</p>
                <p>${(product.price * discount ).toFixed(2)} <span>${product.price}</span></p>
                <Rating rating={product.rating} />
              </div>
    </div>
  )
}