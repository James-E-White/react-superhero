const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/superhero-trivia')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/scores', require('./routes/scores'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 