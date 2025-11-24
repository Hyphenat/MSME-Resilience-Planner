const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  generated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  report_type: {
    type: String,
    enum: ['risk_assessment', 'supplier_performance', 'scenario_analysis', 'material_analysis', 'custom'],
    required: true
  },
  period: {
    start_date: Date,
    end_date: Date
  },
  scenario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scenario'
  },
  data: {
    summary: {
      total_suppliers: Number,
      total_materials: Number,
      high_risk_suppliers: Number,
      critical_materials: Number,
      overall_risk_score: Number
    },
    risk_breakdown: [{
      category: String,
      risk_level: String,
      score: Number,
      description: String
    }],
    supplier_analysis: [{
      supplier_id: mongoose.Schema.Types.ObjectId,
      supplier_name: String,
      risk_score: Number,
      performance_score: Number,
      materials_count: Number,
      issues: [String]
    }],
    material_analysis: [{
      material_id: mongoose.Schema.Types.ObjectId,
      material_name: String,
      criticality_score: Number,
      supplier_count: Number,
      risk_factors: [String]
    }],
    recommendations: [{
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical']
      },
      category: String,
      title: String,
      description: String,
      estimated_impact: String,
      implementation_cost: Number
    }],
    charts: [{
      type: String,
      title: String,
      data: mongoose.Schema.Types.Mixed
    }]
  },
  format: {
    type: String,
    enum: ['pdf', 'excel', 'json'],
    default: 'pdf'
  },
  file_url: String,
  file_size: Number,
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'generating'
  },
  views: {
    type: Number,
    default: 0
  },
  shared_with: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    shared_date: Date,
    access_level: {
      type: String,
      enum: ['view', 'download'],
      default: 'view'
    }
  }]
}, {
  timestamps: true
});

reportSchema.index({ company: 1, report_type: 1 });
reportSchema.index({ generated_by: 1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ status: 1 });

module.exports = mongoose.model('Report', reportSchema);