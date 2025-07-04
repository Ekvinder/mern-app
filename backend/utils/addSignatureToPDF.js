const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const addSignatureToPDF = async (pdfPath, signaturePath, outputPath) => {
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const signatureImageBytes = fs.readFileSync(signaturePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const signatureImage = await pdfDoc.embedPng(signatureImageBytes); // or embedJpg if JPG
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const pngDims = signatureImage.scale(0.3); // scale the signature

  // Change position as needed (from bottom left)
  firstPage.drawImage(signatureImage, {
    x: 50,
    y: 100,
    width: pngDims.width,
    height: pngDims.height,
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};

module.exports = addSignatureToPDF;
