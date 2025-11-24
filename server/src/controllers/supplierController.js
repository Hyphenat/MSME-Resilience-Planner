const Supplier = require('../models/Supplier');
const { callPythonAPI } = require('../services/pythonBridge');

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({ companyId: req.user.companyId })
      .populate('materials');
    res.json(suppliers);
  } catch (err) { next(err); }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate('materials');
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (err) { next(err); }
};

exports.createSupplier = async (req, res, next) => {
  try {
    const supplier = new Supplier({ ...req.body, companyId: req.user.companyId });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) { next(err); }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(supplier);
  } catch (err) { next(err); }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted' });
  } catch (err) { next(err); }
};

exports.uploadCSV = async (req, res, next) => {
  try {
    const { data } = req.body;
    const suppliers = data.map(row => ({ ...row, companyId: req.user.companyId }));
    const result = await Supplier.insertMany(suppliers);
    res.json({ inserted: result.length });
  } catch (err) { next(err); }
};

exports.getSupplierRisk = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    const riskData = await callPythonAPI('/risk/supplier', { supplier });
    res.json(riskData);
  } catch (err) { next(err); }
};