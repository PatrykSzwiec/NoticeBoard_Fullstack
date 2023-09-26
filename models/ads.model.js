const User = require('../models/user.model');
const mongoose = require('mongoose');
const fuzzySearch = require('mongoose-fuzzy-searching');

const adsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    publishDate: { type: Date, required: true }, 
    price: { type: Number, required: true },
    location: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, required: false }
  });

  // Enable fuzzy searching on the 'title' field
  adsSchema.plugin(fuzzySearch, { fields: [ 'title' ] });

  
module.exports = mongoose.model('Ads', adsSchema);