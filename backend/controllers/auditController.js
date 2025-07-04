
const Audit = require('../model/Audit');

exports.getAuditLogs = async (req, res) => {
  const { docId } = req.params;
  const logs = await Audit.find({ documentId: docId });
  res.status(200).json(logs);
};
exports.saveAuditLog = async (req, res) => {
  try {
    const { userId, documentId, action, ip } = req.body;

    const audit = new Audit({
      userId,
      documentId,
      action,
      ip: ip || req.ip,
    });

    await audit.save();
    res.status(201).json({ message: 'Audit log saved.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save audit log.', error });
  }
};
