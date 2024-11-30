const Category = require("../models/categoryModel");
const fs = require("fs");
const path = require("path");



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

  module.exports = { addNewCategory , getAllCategories };
