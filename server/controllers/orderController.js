const User = require("../models/userModel.js");
const Order = require("../models/orderModel.js");
const Product = require('../models/productsModel.js')




const createOrder = async (req, res) => {
    try {
      const { userId, items, totalAmount,billingInfos, shippingInfos, } = req.body;

      const order = await Order.create({ userId, items, totalAmount , billingInfos ,  shippingInfos});

      for(let i = 0 ; i < items.length ; i++){
        const product = await Product.findById(items[i].productId);
        if(!product){
          throw new Error(`Product with ID ${items[i].id} not found`);
        }
        product.stock -= items[i].quantity;
        if(product.stock===0){
          product.status = 'OutOfStock';
        }
        await product.save();
      }

  
     if(userId){
       await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });
     }
  
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  module.exports= {createOrder};
  