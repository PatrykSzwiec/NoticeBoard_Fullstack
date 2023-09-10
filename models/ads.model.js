const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    publishDate: { type: Date, required: true }, 
    price: { type: Number, required: true },
    location: { type: String, required: true },
    seller: { type: String, required: true }
  });

module.exports = mongoose.model('Ads', adsSchema);