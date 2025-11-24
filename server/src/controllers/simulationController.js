const Scenario = require('../models/Scenario');
const Supplier = require('../models/Supplier');
const { callPythonAPI } = require('../services/pythonBridge');

exports.runDisruptionSimulation = async (req, res, next) => {
  try {
    const { supplierIds, scenarioType, parameters } = req.body;
    const suppliers = await Supplier.find({ companyId: req.user.companyId });
    
    const result = await callPythonAPI('/simulation/disrupt', {
      suppliers, affectedIds: supplierIds, scenarioType, parameters
    });
    
    res.json(result);
  } catch (err) { next(err); }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const { affectedSupplierId, criteria } = req.body;
    const allSuppliers = await Supplier.find({ companyId: req.user.companyId });
    
    const result = await callPythonAPI('/recommendation/alternatives', {
      affectedSupplierId, allSuppliers, criteria
    });
    
    res.json(result);
  } catch (err) { next(err); }
};

exports.compareStrategies = async (req, res, next) => {
  try {
    const { currentSuppliers, recommendedSuppliers } = req.body;
    
    const result = await callPythonAPI('/recommendation/compare', {
      current: currentSuppliers, recommended: recommendedSuppliers
    });
    
    res.json(result);
  } catch (err) { next(err); }
};

exports.getScenarios = async (req, res, next) => {
  try {
    const scenarios = await Scenario.find({ companyId: req.user.companyId, isSaved: true });
    res.json(scenarios);
  } catch (err) { next(err); }
};

exports.saveScenario = async (req, res, next) => {
  try {
    const scenario = new Scenario({ ...req.body, companyId: req.user.companyId, isSaved: true });
    await scenario.save();
    res.status(201).json(scenario);
  } catch (err) { next(err); }
};
