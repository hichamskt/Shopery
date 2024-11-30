import React, { useRef, useState } from "react";
import "../styles/DashboardProducts.css";
import SideBar from "../components/SideBar/SideBar";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";


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
  const [brandImg, setBrandImg] = useState([]);

  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function deletBrandimg(){
    setBrandImg([]);
  }

  function onFileSelect(event) {
    const file = event.target.files;

    if (file.length == 0) return;

    setBrandImg([
      {
        file: file[0],
        name: file[0].name,
        url: URL.createObjectURL(file[0]),
      },
    ]);
  }
  console.log(brandImg);

  return (
    <div>
      <div className="formTopside">
        <p>Add Product</p>
        <div>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
      <div className="pform-body">
        <div className="pf-leftside">
          <p className="pf-heading">Information</p>
          <div>
            <p className="pf-label">Product Name</p>
            <input type="text" placeholder="Product Name" />
          </div>
          <div>
            <p className="pf-label">Product Description</p>
            <textarea placeholder="Product Description" />
          </div>
          <hr />
          <p className="pf-heading">Images</p>
          <DragandDropSection images={images} setImages={setImages} />

          <hr />
          <p className="pf-heading">Price</p>

          <div className="pf-price">
            <div>
              <p className="pf-label">Product price</p>
              <input type="number" placeholder="Price" />
            </div>
            <div>
              <p className="pf-label">Discount</p>
              <input type="number" placeholder="%" />
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

          {brandImg.length > 0 ? (
            <div className="pf-brand">
              {" "}
               <RxCross2 onClick={()=>deletBrandimg()} />{" "}
              <img src={brandImg[0]?.url} alt="brand"></img>
            </div>
          ) : (
            <div onClick={selectFiles} className="addbrand">
              <FaPlus />
            </div>
          )}

            <div>
            <p className="pf-label">Brand Description</p>
            <textarea placeholder="Brand Discription" />
          </div>
          
        </div>

          <div className="pf-righttop">
          <p className="pf-heading">Aditional info</p>
          <div>
            <p className="pf-label">Product Name</p>
            <select>
                <option value="ee">categorie1</option>
            </select>
          </div>
          <div>
            <p className="pf-label">Color</p>
            <select>
                <option value="ee">categorie1</option>
            </select>
          </div>
          <div>
            <p className="pf-label">type</p>
            <select>
                <option value="ee">categorie1</option>
            </select>
          </div>
          <div>
            <p className="pf-label">SKU</p>
            <input type="text" placeholder="sku" />
          </div>
          <div>
            <p className="pf-label">stock</p>
            <input type="number" placeholder="0" />
          </div>
          <div>
            <p className="pf-label">Weight:</p>
            <input type="number" placeholder="0" />
          </div>
          </div>

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
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name == files[i].name)) {
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
      if (!images.some((e) => e.name == files[i].name)) {
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
