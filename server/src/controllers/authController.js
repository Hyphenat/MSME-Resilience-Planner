const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const { JWT_SECRET } = require('../config/env');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, companyName } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const company = new Company({ name: companyName || `${name}'s Company` });
    await company.save();

    const user = new User({ name, email, password, companyId: company._id });
    await user.save();

    company.userId = user._id;
    await company.save();

    const token = jwt.sign({ id: user._id, companyId: company._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, companyId: company._id }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, companyId: user.companyId }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, companyId: user.companyId }
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};