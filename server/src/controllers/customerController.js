const Customer = require('../models/Customer');

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ companyId: req.user.companyId });
    res.json(customers);
  } catch (err) { next(err); }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = new Customer({ ...req.body, companyId: req.user.companyId });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) { next(err); }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (err) { next(err); }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) { next(err); }
};
