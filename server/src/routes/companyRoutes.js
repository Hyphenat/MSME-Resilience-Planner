const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCompany, updateCompany } = require('../controllers/companyController');

router.use(auth);
router.get('/', getCompany);
router.put('/', updateCompany);

module.exports = router;