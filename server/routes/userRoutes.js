

const express = require('express');
const {  register  , login, handleRefreshToken} = require ("../controllers/userController.js");


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').get(handleRefreshToken);


module.exports = router ;