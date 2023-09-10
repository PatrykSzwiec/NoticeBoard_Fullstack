const Ads = require('../models/ads.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {
  try {
    const advert = await Ads.findById(req.params.id);
    if(!advert) res.status(404).json({ message: 'Not found' });
    else res.json(advert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { title, content, publishDate, price, location, seller } = req.body;
    const newAds = new Ads({ title: title, content: content, publishDate: publishDate, price: price, location: location, seller: seller });
    await newAds.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { title, content, publishDate, price, location, seller } = req.body;
  try {
    const advert = await Ads.findById(req.params.id);
    if(advert) {
      await Ads.updateOne({ _id: req.params.id }, { $set: { title: title, content: content, publishDate: publishDate, price: price, location: location, seller: seller }});
      res.json(advert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const advert = await Ads.findById(req.params.id);
    if(advert) {
      await Ads.deleteOne({ _id: req.params.id });
      res.json(advert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};