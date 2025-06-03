

const express = require('express');
const {  createOrder, getUserOrders  } = require ("../controllers/orderController");


const router = express.Router();

router.route('/createorder').post(createOrder);
router.route('/getuserorders').post(getUserOrders);



module.exports = router ;