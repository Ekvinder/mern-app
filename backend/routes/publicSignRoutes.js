const express = require('express');
const jwt = require('jsonwebtoken');
const Document = require('../model/Document');
const router = express.Router();

router.get('/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const doc = await Document.findById(decoded.docId);
    res.download(doc.path);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid link' });
  }
});

module.exports = router;