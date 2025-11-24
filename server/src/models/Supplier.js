const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  location: {
    city: String,
    state: String,
    country: String,
    coordinates: { lat: Number, lng: Number }
  },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
  riskFactors: {
    financialStability: { type: Number, min: 0, max: 10, default: 5 },
    deliveryReliability: { type: Number, min: 0, max: 10, default: 5 },
    qualityScore: { type: Number, min: 0, max: 10, default: 5 },
    geographicRisk: { type: Number, min: 0, max: 10, default: 5 }
  },
  leadTimeDays: { type: Number, default: 7 },
  costPerUnit: { type: Number },
  capacity: { type: Number },
  contactInfo: { email: String, phone: String },
  isActive: { type: Boolean, default: true },
  isCritical: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
