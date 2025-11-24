const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  location: { city: String, state: String, country: String },
  demandVolume: Number,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
