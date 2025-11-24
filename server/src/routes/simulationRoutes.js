const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  runDisruptionSimulation, getScenarios, saveScenario,
  getRecommendations, compareStrategies
} = require('../controllers/simulationController');

router.use(auth);
router.post('/disrupt', runDisruptionSimulation);
router.get('/scenarios', getScenarios);
router.post('/scenarios', saveScenario);
router.post('/recommendations', getRecommendations);
router.post('/compare', compareStrategies);

module.exports = router;