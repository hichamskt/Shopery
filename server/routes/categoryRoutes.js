const express = require("express");
const router = express.Router();
const { addNewCategory ,getAllCategories } = require("../controllers/categoryController");
const upload = require("../middlewares/multerConfig");


router.route('/addnewcategory').post(
  upload.fields([
    { name: 'categoryimg', maxCount: 1 } 
  ]),
  addNewCategory 
);
router.route('/addallcategories').get(
  
  getAllCategories
);

  module.exports = router;