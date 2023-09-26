const Ads = require('../models/ads.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const User = require('../models/user.model');

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
    res.status(500).json({ message: err.stack });
  }
};

// Search for ads by a search phrase
exports.getSearched = async (req, res) => {
  try {
    const { searchPhrase } = req.params;
    const results = await Ad.fuzzySearch(searchPhrase);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

exports.add = async (req, res) => {
  try {

    const { title, content, publishDate, price, location, user} = req.body;
    console.log(req.body);

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

       // Find the user by username and retrieve their ID
       const existingUser = await User.findOne({ _id: user });

       if (!existingUser) {
         // If the user doesn't exist, respond with an error
         res.status(404).json({ message: '1User not found' });
         return;
       }

       console.log('User ID:', existingUser._id);
      const newAd = await Ads.create({
        title: title,
        content: content,
        publishDate: publishDate,
        price: price,
        location: location,
        user: user, // Store the user's ID
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
    res.status(500).json({ message: err.stack });
  }
};

exports.edit = async (req, res) => {
  const { title, content, publishDate, price, location, user } = req.body;
  const adId = req.params.id;

  try {
    const advert = await Ads.findById(adId);

    if (!advert) {
      // If the ad is not found, respond with a 404 status
      res.status(404).json({ message: 'Ad not found' });
      return;
    }
      const updateFields = {
        title: title,
        content: content,
        publishDate: publishDate,
        price: price,
        location: location,
        user: user, // Store the user's ID
      };

      if (req.file) {
        // Determine the file type of the uploaded image (if present)
        const fileType = await getImageFileType(req.file);

        if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)) {
          // Update the image field only if a valid new image is provided
          updateFields.image = req.file.filename;
        } else {
          // Invalid image file type, respond with a bad request status
          return res.status(400).json({ message: 'Invalid image file type' });
        }

      }

      await Ads.updateOne(
        { _id: adId },
        {
          $set: updateFields,
        }
      );

      res.status(201).send({ message: 'Ad updated' });
    }
  catch(err) {
    if (req.file) {
      fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: err.stack });
  }
};

// DELETE ADS //
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
    res.status(500).json({ message: err.stack });
  }
};