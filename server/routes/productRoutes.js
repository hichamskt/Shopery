const express = require("express");
const router = express.Router();
const { addNewProduct } = require("../controllers/productController");
const upload = require("../middlewares/multerConfig");


router.route('/addnewproduct').post(
  upload.fields([
    { name: 'images', maxCount: 10 }, // Up to 10 product images
    { name: 'brandLogo', maxCount: 1 } // One brand logo
  ]),
  addNewProduct // Controller function to process the product creation
);

  module.exports = router;