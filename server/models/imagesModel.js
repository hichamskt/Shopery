
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, required: true },
  relatedId: { type: mongoose.Schema.Types.ObjectId,  } 
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;