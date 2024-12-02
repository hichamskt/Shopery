const express = require("express");
const router = express.Router();
const { addNewCategory ,getAllCategories, getCategoriesWithProductCount } = require("../controllers/categoryController");
const upload = require("../middlewares/multerConfig");


router.route('/addnewcategory').post(
  upload.fields([
    { name: 'categoryimg', maxCount: 1 } 
  ]),
  addNewCategory 
);
router.route('/getallcategories').get(
  
  getAllCategories
);
router.route('/getcategorieswithproductcount').get(
  getCategoriesWithProductCount
);
router.route('/getallcategories').get(
  
  getAllCategories
);

  module.exports = router;