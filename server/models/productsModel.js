const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number,  default: 0, min: 0 },
    likedCount:{type:Number, default: 0},
    tags: [{ type: String }],
    bulletPoint: [{ type: String }],
    images: [{ type: String }],
    discount: {
        type:Number,
    },
    popularty:{
        type:Number,
        default:0
    },
    branddescription:{
        type:String,
    },
    brandLogo:{
        type:String,
    },
    weigth:{
        type:Number,
    },
    color:{
        type:String,
    },
    type:{
        type:String,
    },
    rating:[{
        user_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
        rating:{type:Number}
     }],
    review:[{
        user_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
        review:{type:String}
     }],
    

    status:{type: String,
        enum: ['Sold', 'Available', 'OutOfStock'], 
        default: 'Available'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
