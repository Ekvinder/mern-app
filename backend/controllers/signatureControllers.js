
const { PDFDocument, rgb,standardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Signature = require('../model/Signature');
const Document = require('../model/Document');

exports.finalizeSignature = async (req, res) => {
  const { documentId, userId } = req.body;

  try {
    const signatures = await Signature.find({ documentId, userId });
    const docData = await Document.findById(documentId);
    const existingPdfBytes = fs.readFileSync(docData.path);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    for (let sig of signatures) {
      const pages = pdfDoc.getPages();
      const page = pages[sig.page - 1]; // page is 1-indexed in db
      page.drawText('✔ Signed by User', {
        x: sig.x,
        y: sig.y,
        size: 18,
        color: rgb(0, 0.53, 0),
      });
    }

    const finalPdfBytes = await pdfDoc.save();
    const outputPath = path.join('signed_docs', `signed_${docData.filename}`);
    fs.writeFileSync(outputPath, finalPdfBytes);

    res.status(200).json({ msg: 'PDF signed', file: outputPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
