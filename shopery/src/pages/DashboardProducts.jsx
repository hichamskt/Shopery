import React, { useEffect, useRef, useState } from "react";
import "../styles/DashboardProducts.css";
import SideBar from "../components/SideBar/SideBar";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import axiosInstance from "../axios/axiosInstance";

function DashboardProducts() {
  return (
    <div>
      <div className="dashboard-container">
        <SideBar />
        <ProductsPage />
      </div>
    </div>
  );
}

export default DashboardProducts;

function ProductsPage() {
  const [showAddProduct, setShowAddProduct] = useState(true);
  return (
    <div>
      {!showAddProduct && <ProductsTopPart />}
      <AddProductForm />
    </div>
  );
}

function ProductsTopPart() {
  return (
    <div className="ProductsTopPart">
      <div>
        <IoSearch />
        <input type="text" placeholder="Search" />
      </div>
      <div>
        <p>show</p>
        <select>
          <option value="All Products">All Products</option>
          <option value="All Products">All Products</option>
        </select>
      </div>
      <div>
        <p>Sort by</p>
        <select>
          <option value="All Products">Default</option>
          <option value="All Products">All Products</option>
        </select>
      </div>
      <span>
        <p>Filtter</p>
        <CiFilter />
      </span>
      <button>+ Add new product</button>
    </div>
  );
}

function AddProductForm() {
  const [images, setImages] = useState([]);
  const [categoryimg, setCategoryimg] = useState([]);
  const [tags, setTags] = useState([]);
  const [bulletPoint, setBulletPoint] = useState([]);
  const [allCategories,setAllCategories]=useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description:"",
    sku:"",
    price:"",
    category:"",
    stock:"",
    discount:"",
    branddescription:"",
    weigth:"",
    color:"",
    type:"",
  });

  const fileInputRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/category/getallcategories");
        setAllCategories(response.data);
      } catch (err) {
        console.log(err)
      } 
    };

    fetchData();

  }, []);



  const handleSubmitData = async (e) => {
    e.preventDefault();
    
    console.log(formData)
    
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });
  
    for (let i = 0; i < images.length; i++) {
      fd.append('images', images[i].file); 
    }

    fd.append("tags",tags);
    fd.append("brandLogo", categoryimg[0].file);
    fd.append("bulletPoint",bulletPoint);
    

    try {
      const response = await axiosInstance.post(
        "product/addnewproduct",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // if (response.status === 201) {
      //   setAddDogForm(false);
      //   setRefresh((prv)=>!prv);
      // }
    } catch (error) {
      console.log(error.response?.data);
      console.log(fd)
    }
    
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };





  function selectFiles() {
    fileInputRef.current.click();
  }

  function deletBrandimg() {
    setCategoryimg([]);
  }

  function onFileSelect(event) {
    const file = event.target.files;

    if (file.length === 0) return;

    setCategoryimg([
      {
        file: file[0],
        name: file[0].name,
        url: URL.createObjectURL(file[0]),
      },
    ]);
  }

  const hundlKeyDown = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const hundlDeletTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };
  const hundBulletKeyDown = (e) => {
    if (e.key === "Enter") {
      setBulletPoint([...bulletPoint, e.target.value]);
      e.target.value = "";
    }
  };

  const hundlDeletBullet = (bullet) => {
    setBulletPoint(bulletPoint.filter((item) => item !== bullet));
  };

 
  return (
    <div style={{display: "flex",
          flexDirection: "column"}}>
      <div className="formTopside">
        <p>Add Product</p>
        <div>
          <button>Cancel</button>
          <button onClick={(e)=>handleSubmitData(e)}>Save</button>
        </div>
      </div>
      <div className="pform-body">
        <div className="pf-leftside">
          <p className="pf-heading">Information</p>
          <div>
            <p className="pf-label">Product Name</p>
            <input type="text" name="name" value={formData.name} onChange={(e)=>handleInputChange(e)} placeholder="Product Name" />
          </div>
          <div>
            <p className="pf-label">Product Description</p>
            <textarea name="description"  value={formData.description}  onChange={(e)=>handleInputChange(e)} placeholder="Product Description" />
          </div>
          <hr />
          <p className="pf-heading">Images</p>
          <DragandDropSection images={images} setImages={setImages} />

          <hr />
          <p className="pf-heading">Price</p>

          <div className="pf-price">
            <div>
              <p className="pf-label">Product price</p>
              <input type="number" min={0} name="price" value={formData.price} onChange={(e)=>handleInputChange(e)} placeholder="Price" />
            </div>
            <div>
              <p className="pf-label">Discount</p>
              <input type="number" min={0} max={100} name="discount" value={formData.discount} onChange={(e)=>handleInputChange(e)} placeholder="%" />
            </div>
          </div>

          <hr />
          <p className="pf-heading">Brand Logo</p>
          <input
            name="images"
            ref={fileInputRef}
            type="file"
            className="ddp-file"
            onChange={onFileSelect}
          ></input>

          {categoryimg.length > 0 ? (
            <div className="pf-brand">
              {" "}
              <RxCross2 onClick={() => deletBrandimg()} />{" "}
              <img src={categoryimg[0]?.url} alt="brand"></img>
            </div>
          ) : (
            <div onClick={selectFiles} className="addbrand">
              <FaPlus />
            </div>
          )}

          <div>
            <p className="pf-label">Brand Description</p>
            <textarea name="branddescription" value={formData.branddescription} onChange={(e)=>handleInputChange(e)} placeholder="Brand Discription" />
          </div>
        </div>

        <div className="pf-righttop">
          <p className="pf-heading">Aditional info</p>
          <div>
            <p className="pf-label">Product Name</p>
            <select
            name="category"
            value={formData.category}
            onChange={(e)=>handleInputChange(e)}
            >
              {
                allCategories.map((category,index)=>(
                  <option key={index} value={category._id}>{category.name}</option>

                ))
              }
            </select>
          </div>
          <div>
            <p className="pf-label">Color</p>
            <select
            name="color"
            value={formData.color}
            onChange={(e)=>handleInputChange(e)}


            >
              <option value="Red">Red</option>
              <option value="Yellow">Yellow</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Brown">Brown</option>
              <option value="White ">White </option>
            </select>
          </div>
          <div>
            <p className="pf-label">type</p>
            <select name="type" value={formData.type} onChange={(e)=>handleInputChange(e)}>
              <option value="Organic">Organic</option>
              <option value="Organic">Organic</option>
            </select>
          </div>
          <div>
            <p className="pf-label">SKU</p>
            <input type="text" placeholder="sku" name="sku" value={formData.sku} onChange={(e)=>handleInputChange(e)} />
          </div>
          <div>
            <p className="pf-label">stock</p>
            <input type="number" placeholder="0" min={0} value={formData.stock} name="stock" onChange={(e)=>handleInputChange(e)} />
          </div>
          <div>
            <p className="pf-label">Weight:</p>
            <input type="number" placeholder="0" name="weigth" value={formData.weigth} onChange={(e)=>handleInputChange(e)} />
          </div>
        </div>
        <div>
          <div className="pftagsbox">
            <p className="pf-heading">Tags</p>
            <p className="pf-label">Product Tags</p>
            <input
              type="text"
              placeholder="Enter Tag name"
              onKeyDown={hundlKeyDown}
            />

            <div className="pftags">
              {tags.map((tag, i) => (
                <span key={i}>
                  <p style={{ lineBreak: "anywhere" }}>{tag}</p>{" "}
                  <RxCross2 onClick={() => hundlDeletTag(tag)} />{" "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pftBullets  pftagsbox">
          <p className="pf-heading">Product Bullet Point</p>
          <p className="pf-label">Bullet Point</p>
          <input
            type="text"
            placeholder="Enter Bullet point"
            onKeyDown={hundBulletKeyDown}
          />

          <div className="pf-bulletsbox">
            {bulletPoint.map((bullet, i) => (
              <div key={i}>
                {" "}
                <p style={{ lineBreak: "anywhere" }}>{bullet}</p>{" "}
                <RxCross2 onClick={() => hundlDeletBullet(bullet)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr/>
      <div className="form-buttom">
            <button>Cancel</button>
            <button>Save</button>
      </div>
    </div>
  );
}

function DragandDropSection({ images, setImages }) {
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            file: files[i],
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }
  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "Copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            file: files[i],
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  return (
    <div className="ddp-card">
      <div className="ddp-top">
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging ? (
            <span className="ddp-select">Drop images here</span>
          ) : (
            <>
              Drag & Drop image here <div>or </div>
              <span className="ddp-select" role="button" onClick={selectFiles}>
                Browse
              </span>
            </>
          )}

          <input
            name="images"
            ref={fileInputRef}
            type="file"
            className="ddp-file"
            multiple
            onChange={onFileSelect}
          ></input>
        </div>
        <div className="ddp-container">
          {images.map((images, index) => (
            <div className="ddp-image" key={index}>
              <span className="ddp-delete" onClick={() => deleteImage(index)}>
                <RxCross2 />
              </span>
              <img src={images.url} alt={images.name}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
