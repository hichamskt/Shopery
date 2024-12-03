const Product = require("../models/productsModel");
const fs = require("fs");
const path = require("path");



const addNewProduct = async (req, res) => {
    try {
     
        const {
            name,
            description,
            sku,
            price,
            category,
            stock,
            tags,
            bulletPoint,
            discount,
            popularity,
            branddescription,
            weight,
            color,
            type,
            status
          } = req.body;
     
  
      const files = req.files;
    //   const brandLogo = req.files?.brandLogo ? req.files.brandLogo[0].path : null;
    // const images = req.files?.images ? req.files.images.map(file => file.path) : [];
    const brandLogo = req.files?.brandLogo 
    ? path.join('uploads', 'logo', req.files.brandLogo[0].filename) 
    : null;
  const images = req.files?.images 
    ? req.files.images.map(file => path.join('uploads', 'images', file.filename)) 
    : [];
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      const newProduct = new Product({
            name,
            description,
            sku,
            price,
            category,
            stock,
            tags,
            bulletPoint,
            discount,
            popularity,
            branddescription,
            weight,
            color,
            type,
            status,
            brandLogo,
            images
      });
  
      
      const savedProduct = await newProduct.save();
  
  
      
            return res.status(201).json({
              message: 'Product added successfully',
              success: true,
              savedProduct
            });
  
  
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message: "An error occurred while adding the Product.",
          error: error.message,
        });
    }
  };
  

  const getTopDiscountedProducts = async (req, res) => {
    try {
      const topDiscountedProducts = await Product.find()
        .sort({ discount: -1 }) 
        .limit(3); 
  
      res.status(200).json({
        success: true,
        data: topDiscountedProducts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching top discounted products',
        error: error.message,
      });
    }
  };
  

  const getAllProducts = async (req,res)=>{
    try {
      
      const AllProducts = await Product.find();

    
    res.status(200).json(AllProducts);


    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message: "An error occurred while getting Products.",
          error: error.message,
        });
    }
  }


  module.exports = { addNewProduct , getTopDiscountedProducts ,getAllProducts };
