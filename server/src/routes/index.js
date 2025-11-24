const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const supplierRoutes = require('./supplierRoutes');
const materialRoutes = require('./materialRoutes');
const customerRoutes = require('./customerRoutes');
const simulationRoutes = require('./simulationRoutes');
const reportRoutes = require('./reportRoutes');
const companyRoutes = require('./companyRoutes');

router.use('/auth', authRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/materials', materialRoutes);
router.use('/customers', customerRoutes);
router.use('/simulation', simulationRoutes);
router.use('/reports', reportRoutes);
router.use('/company', companyRoutes);

router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;