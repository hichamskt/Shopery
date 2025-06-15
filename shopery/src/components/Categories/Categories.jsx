import React, { useEffect, useState } from "react";
import "../Categories/Categories.css";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import img7 from "../../assets/img7.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";

const dummydata = [
  {
    name: "Fresh Fruit",
    image: img1,
  },
  {
    name: "Fresh Vegetables",
    image: img2,
  },
  {
    name: "Meat & Fish",
    image: img3,
  },
  {
    name: "Snacks",
    image: img4,
  },
  {
    name: "Beverages",
    image: img5,
  },
  {
    name: "Beauty & Health",
    image: img6,
  },
  {
    name: "Bread & Bakery",
    image: img7,
  },
];

function Categories() {
  const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("category/getallcategories");
        setCategories(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    fetchData();
  }, []);

   const handleClick = (categ) => {
    navigate('/shop', {
      state: {
        from: 'homepage',
        cat: categ,
       
      }
    });
  };
  return (
    <div className="container">
      <div className="categories">
        {categories.map((item, index) => (
          <div key={index} onClick={()=>handleClick(item.name)} >
            <Categorie name={item.name} image={item.categoryimg} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

function Categorie({ image, name }) {
  return (
    <div className="categorie">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
        alt="categorie"
      />
      <p>{name}</p>
    </div>
  );
}
