const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCustomers, createCustomer, updateCustomer, deleteCustomer
} = require('../controllers/customerController');

router.use(auth);
router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;