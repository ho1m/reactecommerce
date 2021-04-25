const mongoose = require('mongoose');

const productsModel = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  shortDesc: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Product', productsModel);
