

const express = require('express');
const {  createOrder  } = require ("../controllers/orderController");


const router = express.Router();

router.route('/createorder').post(createOrder);



module.exports = router ;