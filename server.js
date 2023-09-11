const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const connectToDB = require('./db');

// start express server
const app = express();

// Initialize a session with a secret key
app.use(session({ secret: 'Kodilla' }));

connectToDB();

// standard middleware
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session with a secret key and MongoStore for session management
app.use(session
  ({ 
  secret: 'xyz567', 
  store: MongoStore.create(mongoose.connection), 
  resave: false, 
  saveUninitialized: false,
}));

// Serve static files from specified directories
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// Define routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

// For any other route, serve the React app
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//  Handle 404 (Not Found) errors
app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

// Start the server
const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = app;