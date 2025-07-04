// /models/Audit.js
const mongoose = require('mongoose');
const AuditSchema = new mongoose.Schema({
  userId: String,
  documentId: String,
  action: String, // e.g., "signed"
  ip: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Audit', AuditSchema);
