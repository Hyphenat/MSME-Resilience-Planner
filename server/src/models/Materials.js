const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['raw_material', 'component', 'packaging', 'consumable', 'other']
  },
  suppliers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  specifications: {
    quantity: Number,
    unit: String,
    quality_standard: String,
    lead_time_days: Number
  },
  pricing: {
    unit_cost: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    minimum_order_quantity: Number
  },
  risk_metrics: {
    criticality_score: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    supplier_concentration: Number,
    availability_risk: Number
  },
  status: {
    type: String,
    enum: ['active', 'discontinued', 'under_review'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
materialSchema.index({ company: 1, category: 1 });
materialSchema.index({ name: 1, company: 1 });

module.exports = mongoose.models.Material || mongoose.model('Material', materialSchema);
