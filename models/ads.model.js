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

  adsSchema.plugin(fuzzySearch, { fields: [ 'title' ] });

  
module.exports = mongoose.model('Ads', adsSchema);