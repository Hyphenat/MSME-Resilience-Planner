const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  category: String,
  unit: String,
  criticalityLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  minimumStock: { type: Number, default: 0 },
  currentStock: { type: Number, default: 0 },
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }]
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
