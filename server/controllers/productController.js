const Product = require("../models/productsModel");
const Category = require("../models/categoryModel");
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
    const brandLogo = req.files ?.brandLogo 
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

const filtredProducts = async (req,res)=>{
  try {
    const { category, minPrice, maxPrice, discount, tags, minRating } = req.query;

    const filters = {};

    
    if (category) {
        const categoryDoc = await Category.findOne({ name: category });
        if (categoryDoc) {
            filters.category = categoryDoc._id;
        } else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    }

    
    if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };

    
    

  
    if (tags) {
      // const tagsArray = tags.split(','); 
       const tagsArray = tags
      
      filters.tags = { $in: tagsArray.map((tag) => new RegExp(tag.trim(), 'i')) };
  }

    
    let products = await Product.find(filters).populate('category', 'name description');

   
    if (minRating) {
        const ratingThreshold = parseFloat(minRating);
        products = products.filter((product) => product.averageRating >= ratingThreshold);
    }

    res.status(200).json({ success: true, products });
} catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
}
}
 
const getProductById = async (req,res)=>{

  try {
    const { productid } = req.params;
    
   
    if(!productid){
      return res.status(400).json({ message: 'there is no id' });
    }
    const product = await Product.findById(productid).populate("category");

    if(!product){
      return res.status(400).json({ message: 'no data with id ' });
    }

    return res.status(200).json({
      product
    });
    
  } catch (error) {
    console.log(error)
  }
}


  module.exports = { addNewProduct , getTopDiscountedProducts ,getAllProducts, filtredProducts , getProductById };
