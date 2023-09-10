const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    publishDate: { type: Date, required: true }, 
    price: { type: Number, required: true },
    location: { type: String, required: true },
    user: { type: String, required: true, ref: 'User' },
    image: { type: String, required: false }
  });

module.exports = mongoose.model('Ads', adsSchema);