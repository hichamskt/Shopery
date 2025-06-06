

const express = require('express');
const {  register  , login, handleRefreshToken ,handleLogout ,  getUserBillingInfo , getUserInfo , updateAcountSettings,updateBillingAddress,changePassword, getLikedProducts,toggleLikedProduct} = require ("../controllers/userController.js");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').get(handleRefreshToken);
router.route('/changePassword').post(changePassword);
router.route('/logout').get(handleLogout);
router.route('/getuserbillinginfo').post(getUserBillingInfo);
router.route('/getUserInfo').post(getUserInfo);
router.route('/getLikedProducts').post(getLikedProducts);
router.route('/toggleLikedProduct').post(toggleLikedProduct);
router.route('/updateBillingAddress').post(updateBillingAddress);
router.route('/updateAcountSettings').post(
    upload.fields([
        { name: 'images', maxCount: 10 }, 
      ]),
    updateAcountSettings);




module.exports = router ;