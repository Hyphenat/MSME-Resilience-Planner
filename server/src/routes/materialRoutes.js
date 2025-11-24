const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getMaterials, createMaterial, updateMaterial, deleteMaterial
} = require('../controllers/materialController');

router.use(auth);
router.get('/', getMaterials);
router.post('/', createMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

module.exports = router;