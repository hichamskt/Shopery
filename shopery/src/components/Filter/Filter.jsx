import React, { useEffect, useState } from "react";
import "../Filter/Filter.css";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axiosInstance from "../../axios/axiosInstance";
import { DoubleScrollBar } from "../DoubleScrollBar/DoubleScrollBar";

function Filter() {
  return (
    <div className="filtercontainer">
      <div className="fliterbtn">
        <p>Filter</p>
        <IoFilter />
      </div>
      <AllCategories />
      <PriceRange />
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