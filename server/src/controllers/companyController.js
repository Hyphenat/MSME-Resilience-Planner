const Company = require('../models/Company');

exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.user.companyId);
    res.json(company || {});
  } catch (err) { next(err); }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.user.companyId, req.body, { new: true });
    res.json(company);
  } catch (err) { next(err); }
};
