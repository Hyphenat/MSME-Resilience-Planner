const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getReports, createReport } = require('../controllers/reportController');

router.use(auth);
router.get('/', getReports);
router.post('/', createReport);

module.exports = router;
