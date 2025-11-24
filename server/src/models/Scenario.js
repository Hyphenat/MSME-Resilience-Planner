const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['supplier_failure', 'pandemic', 'port_strike', 'natural_disaster', 'import_ban', 'custom'] },
  affectedSuppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
  parameters: { duration: Number, severity: Number },
  results: {
    impactedNodes: [String],
    costIncrease: Number,
    delayDays: Number,
    riskScoreBefore: Number,
    riskScoreAfter: Number
  },
  recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
  isSaved: { type: Boolean, default: false }
}, { timestamps: true });
