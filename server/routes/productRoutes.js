const express = require("express");
const router = express.Router();
const { addNewProduct , getTopDiscountedProducts ,getAllProducts } = require("../controllers/productController");
const upload = require("../middlewares/multerConfig");


router.route('/addnewproduct').post(
  upload.fields([
    { name: 'images', maxCount: 10 }, 
    { name: 'brandLogo', maxCount: 1 } 
  ]),
  addNewProduct 
);
router.route('/gettopdiscountedproducts').get(
  getTopDiscountedProducts
);
router.route('/getallproducts').get(
  getAllProducts
);

  module.exports = router;