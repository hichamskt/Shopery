

const express = require('express');
const {  createOrder, getUserOrders , getOrderById } = require ("../controllers/orderController");


const router = express.Router();

router.route('/createorder').post(createOrder);
router.route('/getuserorders').post(getUserOrders);
router.route('/getOrderById/:id').get(getOrderById);



module.exports = router ;