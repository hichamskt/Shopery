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

function Filter({showFilter,setShowFilter,category,setCategory,setprice,price,minRating,setMinRating,tags,setTags}) {


 

  return (
    <div className="filtercontainer">
      <div className="fliterbtn" onClick={()=>setShowFilter(!showFilter)}>
        <p>Filter</p>
        <IoFilter />
      </div>
      {showFilter && <div className="filtercontainer">

      <AllCategories  category={category} setCategory={setCategory} />
      <hr/>
      <PriceRange setprice={setprice} price={price} />
      <hr/>
      <RatingFilter minRating={minRating} setMinRating={setMinRating} />
      <hr/>
      <PopularTag tags={tags} setTags={setTags} />
      <Banner />
      <SaleProducts />
      </div>}
    </div>
  );
}

export default Filter;

function AllCategories({category,setCategory}) {
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
            <input type="checkbox" value={categorie.name}
             checked={category === categorie.name} onChange={()=>setCategory((prv)=> prv===categorie.name? "" : categorie.name)} />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>}
    </div>
  );
}



function PriceRange({setprice,price}){
  
  const [showBox,setShowBox]=useState(true);


  console.log(price)
  return (
    <div className="pricerangbox">
      <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Price</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>

        {showBox && <div className="wrapper-1">
        <DoubleScrollBar
        min={0}
        max={100}
        step={1}     
        className="SB-1"
        onChange={(minPrice,maxPrice)=>{
          setprice({minPrice,maxPrice});
        }}

        />
        <div id="display1">
        Price: <span> {price.minPrice}</span> 
           -<span>{price.maxPrice}</span></div>
      </div>}

    </div>
  )
}



function RatingFilter({minRating,setMinRating}){
  const [showBox,setShowBox]=useState(true);

  return<div className="ratingf-box">
 <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Price</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>
      {showBox && <div>
     < StarLabel minRating={minRating} setMinRating={setMinRating} orange={5} gray={0} text={ 5.0} />
     < StarLabel  minRating={minRating} setMinRating={setMinRating} orange={4} gray={1} text={'4.0 & up'} />
     < StarLabel minRating={minRating} setMinRating={setMinRating} orange={3} gray={2} text={"3.0 & up"} />
     < StarLabel minRating={minRating} setMinRating={setMinRating} orange={2} gray={3} text={ "2.0 & up"} />
     < StarLabel minRating={minRating} setMinRating={setMinRating} orange={1} gray={4} text={ "1.0 & up"} />
      
      </div>}
  </div>
}

function StarLabel ({orange,gray,text , minRating ,setMinRating}){
  return(
    <label className="label--checkbox">
        <input type="checkbox" checked={minRating=== orange} value={orange} className="checkbox"  onChange={()=>(setMinRating((prv)=>(prv===orange?"":orange)))} />
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


function PopularTag({tags,setTags}){
  const [showBox,setShowBox]=useState(true);
  const populairtags = ["Healthy","Low fat", "Vegetarian","Kid foods","Vitamins","Bread",'Meat',"Snacks","Tiffin","Launch","Dinner","Breackfast","Fruit"]



  return(
    <div className="populartagbox">
      <div className="filterboxheader" onClick={()=>setShowBox(!showBox)}>
        <p>Popular Tag</p>
        {showBox ?<IoIosArrowUp />:<IoIosArrowDown/>}
      </div>
      {
        showBox && <div className="ptagscontainer">
{
  populairtags.map((tag,i)=> 
    <Tag key={i} tag={tag} tags={tags} setTags={setTags} />
    )
}
        </div>
      }

    </div>
  )
}

function Tag ({tag , tags,setTags}){
const [clicked,setClicked]=useState(false);

const handleclick = (tag)=>{
  setClicked(!clicked);
  setTags((prev)=>
    prev.includes(tag)?
    prev.filter((item)=>item!==tag)
    : [...prev , tag]

  )
}
  return(
    <div className="tag" onClick={()=>handleclick(tag)}
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