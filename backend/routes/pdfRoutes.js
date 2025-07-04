const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/authMiddleware');
const addSignatureToPDF = require('../utils/addSignatureToPDF');

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/signature/';
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// PDF-only filter
const uploadPDF = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

const pdfRouter = express.Router();


pdfRouter.post('/sign', auth, uploadPDF.single('pdf'), async (req, res) => {
  try {
    const { x, y, page, signatureImage } = req.body;

    if (!req.file || !signatureImage) {
      return res.status(400).json({ message: 'Missing PDF or Signature Image' });
    }

    const pdfPath = req.file.path;
    const outputPath = `uploads/signed-${Date.now()}.pdf`;

    await addSignatureToPDF(pdfPath, signatureImage, outputPath, x, y, page);

    res.status(200).json({
      message: 'PDF signed successfully',
      signedFile: outputPath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to sign PDF' });
  }
});

module.exports =pdfRouter;
