// /middleware/auditLogger.js
const Audit = require('../model/Audit');
module.exports = async (req, res, next) => {
  await Audit.create({
    userId: req.user.id,
    documentId: req.body.documentId || req.params.docId,
    action: req.auditAction || 'signed',
    ip: req.ip
  });
  next();
};
