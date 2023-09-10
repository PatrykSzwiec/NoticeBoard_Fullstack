const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await User.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};