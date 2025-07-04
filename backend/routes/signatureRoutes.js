const express = require('express');
const auth = require('../middleware/authMiddleware');
const { finalizeSignature } = require('../controllers/signatureControllers');
const Signature = require('../model/Signature');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { documentId, x, y, page } = req.body;

    const signature = await Signature.create({
      documentId,
      userId: req.user.id,
      x,
      y,
      page,
      status: 'pending'
    });

    res.status(201).json({ message: 'Signature position saved', signature });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//useing coordinates saved or draws all login in /controllers/signatureController
router.post('/finalize', auth, finalizeSignature);

// in this api stauts like update 
router.post('/status', auth, async (req, res) => {
  try {
    const { signatureId, status, reason } = req.body;

    const updated = await Signature.findByIdAndUpdate(signatureId, {
      status,
      reason
    }, { new: true });

    res.json({ message: 'Signature status updated', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
