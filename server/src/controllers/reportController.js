const Report = require('../models/Report');

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ companyId: req.user.companyId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) { next(err); }
};

exports.createReport = async (req, res, next) => {
  try {
    const report = new Report({ ...req.body, companyId: req.user.companyId });
    await report.save();
    res.status(201).json(report);
  } catch (err) { next(err); }
};