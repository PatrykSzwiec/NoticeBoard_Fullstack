const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');

// start express server
const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// connect to DB
connectToDB();

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));

// at any other Link , just server react app
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res ) => {
  res.status(404).send({ message: 'Not found...'});
});