const mongoose = require('mongoose');
//const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
    },
    phoneNumber:{
        type:String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      //minlength: 8,
      //select: false
    },
    image:{
        type: String,
    },
    billingAdresse:{
        type: String,
    },
    billingFirstName:{
        type: String,
    },
    billingLastName:{
        type: String,
    },
    companyName:{
        type: String,
    },
    streetAdresse:{
        type: String,
    },
    state:{
        type: String,
    },
    zipCode:{
        type: String,
    },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User;