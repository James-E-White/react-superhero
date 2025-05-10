const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  }
);

// Get current user
router.get('/current-user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  });
});

module.exports = router; 