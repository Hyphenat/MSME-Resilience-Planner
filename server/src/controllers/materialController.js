const Material = require('../models/Materials');

exports.getMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find({ companyId: req.user.companyId }).populate('suppliers');
    res.json(materials);
  } catch (err) { next(err); }
};

exports.createMaterial = async (req, res, next) => {
  try {
    const material = new Material({ ...req.body, companyId: req.user.companyId });
    await material.save();
    res.status(201).json(material);
  } catch (err) { next(err); }
};

exports.updateMaterial = async (req, res, next) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(material);
  } catch (err) { next(err); }
};

exports.deleteMaterial = async (req, res, next) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted' });
  } catch (err) { next(err); }
};
