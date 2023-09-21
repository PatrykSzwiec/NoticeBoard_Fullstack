const Ads = require('../models/ads.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

// Get all ads
exports.getAll = async (req, res) => {
  try {
    // Fetch all ads from the database and send them as JSON
    res.json(await Ads.find());
  }
  catch(err) {
    // Handle any errors that occur during the operation and send a 500 (Internal Server Error) response
    res.status(500).json({ message: err });
  }
};

// Get an ad by its ID
exports.getById = async (req, res) => {
  try {
    // Find an ad in the database by its ID
    const advert = await Ads.findById(req.params.id);

    // If the ad is not found, send a 404 (Not Found) response
    if(!advert){
    res.status(404).json({ message: 'Not found' });
    // Send the ad as JSON if it's found
    } else {
      // Send the ad as JSON if it's found
      res.json(advert);
    }
  }
  catch(err) {
    // Send the ad as JSON if it's found
    res.status(500).json({ message: err });
  }
};

// Search for ads by a search phrase
exports.getSearched = async (req, res) => {
  try {
    const advert = await Ads.find({ searchPhrase: req.params.title });
    if(!advert) res.status(404).json({ message: 'Not found' });
    else res.json(advert);
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {

    console.log('Received POST request to create ad');
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    const { title, content, publishDate, price, location } = req.body;

    // Determine the file type of the uploaded image (if present)
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
		if (
      title && typeof title === 'string' &&
      content && typeof content === 'string' &&
      publishDate && typeof publishDate === 'string' &&
      price && typeof price === 'string' &&
      location && typeof location === 'string' &&
      req.file && ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)
      )
    {
       // Access the user's login from req.user.login
       const userLogin = req.user.login;

       // Find the user by username and retrieve their ID
       const existingUser = await User.findOne({ login: userLogin });

       if (!existingUser) {
         // If the user doesn't exist, respond with an error
         res.status(404).json({ message: 'User not found' });
         return;
       }

       console.log('User ID:', existingUser._id);
      const newAd = await Ads.create({
        title: title,
        content: content,
        publishDate: publishDate,
        price: price,
        location: location,
        user: existingUser._id, // Store the user's ID
        image: req.file.filename
      });
      res.status(201).send({ message: 'New ad added' })
    } else {
      if (req.file) {
        // If the request is not valid and an image was uploaded, delete the uploaded image
				fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(400).send({ message: 'Bad request' });
      }
    }
  } 
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};


exports.edit = async (req, res) => {
  const { title, content, publishDate, price, location, user } = req.body;

  try {

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const advert = await Ads.findById(req.params.id);

    if (advert) {
      // Find the user by username and retrieve their ID
      const existingUser = await User.findOne({ login: user });

      if (!existingUser) {
        // If the user doesn't exist, respond with an error
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await Ads.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            content: content,
            publishDate: publishDate,
            price: price,
            location: location,
            user: existingUser._id, // Store the user's ID
            image: req.file,
          },
        }
      );
      res.status(201).send({ message: 'Ad updated' });
    }
    else {
      res.status(400).send({ message: 'Bad request' });
      }
    }
  catch(err) {
    if (req.file) {
      fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const advert = await Ads.findById(req.params.id);
    if(advert) {
      await Ads.deleteOne({ _id: req.params.id });
      res.status(201).send({ message: 'Ad deleted' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};