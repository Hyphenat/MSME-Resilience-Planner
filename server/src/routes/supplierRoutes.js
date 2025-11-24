const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSuppliers, getSupplierById, createSupplier,
  updateSupplier, deleteSupplier, uploadCSV, getSupplierRisk
} = require('../controllers/supplierController');

router.use(auth);
router.get('/', getSuppliers);
router.get('/:id', getSupplierById);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);
router.post('/upload-csv', uploadCSV);
router.get('/:id/risk', getSupplierRisk);

module.exports = router;
