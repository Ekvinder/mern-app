const express = require('express');
const authMiddleware= require('../middleware/authMiddleware');
const Router = express.Router();

Router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to your profile', user: req.user });
});

module.exports = Router;