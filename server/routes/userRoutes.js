

const express = require('express');
const {  register  , login, handleRefreshToken ,handleLogout ,  getUserBillingInfo , getUserInfo} = require ("../controllers/userController.js");


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').get(handleRefreshToken);
router.route('/logout').get(handleLogout);
router.route('/getuserbillinginfo').post(getUserBillingInfo);
router.route('/getUserInfo').post(getUserInfo);


module.exports = router ;