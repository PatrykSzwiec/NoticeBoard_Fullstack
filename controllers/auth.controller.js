const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
	try {

		const { login, password } = req.body;
		 console.log('Received login:', login);
    console.log('Received password:', password);

		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
		if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)) {

			const userWithLogin = await User.findOne({ login });
			if (userWithLogin) {
				fs.unlinkSync(`./public/uploads/${req.file.filename}`);
				return res.status(409).send({ message: 'User with this login already exists'})
			}

			const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
			res.status(201).send({ message: 'User created ' + user.login })
		} else {
			res.status(400).send({ message: 'Bad request' });
		}

	} catch (err) {
		res.status(500).send({ message: err.message });
	}
}

exports.login = async (req, res) => {
  try {	
		
		const { login, password, avatar } = req.body;
		if (login && typeof login === 'string' && password && typeof password === 'string') {
			const user = await User.findOne({ login });
			if (!user) {
				return res.status(400).send({ message: 'Login or password are incorrect'});
			} 
			else {
				if (bcrypt.compareSync(password, user.password)) {
					req.session.login = user.login;
					res.status(200).send({ message: 'User logged ' + user.login });
					console.log('User logged in:', user.login);
				}
				else {
				res.status(400).send({ message: 'Login or password are incorrect'});
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' });
		}

	} catch (err) {
		res.status(500).send({ message: err.message });
	}
}

exports.getUser = async (req, res) => {
	if (req.session.login) {
		try {
      // Find the user in the database based on their login
      const user = await User.findOne({ login: req.session.login });

      if (user) {
        // Include the _id field in the response
        const userData = { login: user.login, _id: user._id };
        res.send(userData);
      } else {
        res.status(404).send({ message: '3User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }else {
		res.status(401).send({ message: 'You are not authorized '});
	}
};

exports.logout = async (req, res) => {
  try {
		req.session.destroy();
    res.send('Yeah, You\'ve just logged out');
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  if (req.session.login) {
    try {
      // Find the user in the database based on their login
      const user = await User.findOne({ login: req.session.login });

      if (user) {
        // Return the user's profile data, including the avatar
        const userData = { login: user.login, avatar: user.avatar, _id: user._id };
        res.send(userData);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  } else {
    res.status(401).send({ message: 'You are not authorized' });
  }
};