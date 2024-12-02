const Category = require("../models/categoryModel");
const fs = require("fs");
const path = require("path");
const Product = require("../models/productsModel");



const addNewCategory = async (req, res) => {
    try {
     
        const {
            name,
          } = req.body;
     
  
      const files = req.files;
      // const categoryimg = req.files?.categoryimg ? req.files.categoryimg[0].path : null;
  
      const categoryimg= req.files?.categoryimg 
      ? path.join('uploads', 'category', req.files.categoryimg[0].filename) 
      : null;

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      const newCategory = new Category({
            name,
           categoryimg
      });
  
      
      const savedCategory = await newCategory.save();
  
  
      
            return res.status(201).json({
              message: 'Category added successfully',
              success: true,
              savedCategory
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
  

  const getAllCategories = async (req,res)=>{
    try {
      
      const AllCategories = await Category.find();

    
    res.status(200).json(AllCategories);


    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message: "An error occurred while getting categories.",
          error: error.message,
        });
    }
  }




  const getCategoriesWithProductCount = async (req, res) => {
    try {
      const categoriesWithProductCount = await Category.aggregate([
        {
          $lookup: {
            from: 'products', 
            localField: '_id', 
            foreignField: 'category', 
            as: 'products' 
          }
        },
        {
          $addFields: {
            productCount: { $size: '$products' } 
          }
        },
        {
          $project: {
            name: 1, 
            productCount: 1 
          }
        }
      ]);
  
      res.status(200).json(categoriesWithProductCount);
    } catch (error) {
      console.error('Error fetching categories with product count:', error);
      res.status(500).json({ error: 'Failed to fetch categories with product count' });
    }
  };
  module.exports = { addNewCategory , getAllCategories , getCategoriesWithProductCount };
