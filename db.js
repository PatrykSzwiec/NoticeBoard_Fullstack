const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
  // connect to DB
  const dbUri = process.env.MONGODB_URL;

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', (err) => console.log('Error ' + err));
};

module.exports = connectToDB;