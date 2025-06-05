const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qnt: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  billingInfos: {
    billingFirstName: { type: String, required: true },
    billingLastName: { type: String, required: true },
    companyName: { type: String },
    billingAdresse: { type: String, required: true },
    billingRegion: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    billingEmail: { type: String, required: true },
    billingphoneNumber: { type: String, required: true },
    OrderNotes: { type: String },
  },
  shippingInfos:{
    shippingFirstName: { type: String,},
    shippingLastName: { type: String,},
    shippingName: { type: String,},
    shippingAdresse: { type: String,},
    shippingRegion:{ type: String,},
    shippingCity: { type: String,},
    shippingzipCode: { type: String,},
    shippingEmail: { type: String,},
    shippingphoneNumber: { type: String,},
    shippingNotes: { type: String,},
    shippingCompanyName:{ type: String,},
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },

  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
