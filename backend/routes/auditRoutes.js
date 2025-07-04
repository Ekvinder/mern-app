const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getAuditLogs, saveAuditLog  } = require('../controllers/auditController');

const router = express.Router();

// Protected route to fetch audit logs for a document
router.get('/:docId', auth, getAuditLogs);
router.post('/', saveAuditLog,(req,res)=>{
console.log("Saving audit:", req.body);
}); 
module.exports = router;
