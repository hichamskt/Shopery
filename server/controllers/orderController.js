const User = require("../models/userModel.js");
const Order = require("../models/orderModel.js");
const Product = require("../models/productsModel.js");

const createOrder = async (req, res) => {
  try {
    const { email, items, totalAmount, billingInfos, shippingInfos } = req.body;

    const order = await Order.create({
      items,
      totalAmount,
      billingInfos,
      shippingInfos,
    });

    for (let i = 0; i < items.length; i++) {
      const product = await Product.findById(items[i].productId);
      if (!product) {
        throw new Error(`Product with ID ${items[i].id} not found`);
      }
      product.stock -= items[i].qnt;

      if (product.stock === 0) {
        product.status = "OutOfStock";
      }
      await product.save();
    }

    if (email) {
      await User.findOneAndUpdate({ email }, { $push: { orders: order._id } });
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).populate("orders");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const ordersData = user.orders.map((order) => ({
      orderId: order._id,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items,
    }));

    res.status(201).json({ ordersData });
  } catch (error) {
    console.error("Error fetching user orders by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('userId').populate('items.productId');;

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
    


  } catch (error) {
    console.error("Error fetching user orders by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = { createOrder, getUserOrders, getOrderById };
