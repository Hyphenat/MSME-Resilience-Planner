const axios = require('axios');
const { PYTHON_API_URL } = require('../config/env');

exports.callPythonAPI = async (endpoint, data) => {
  try {
    const response = await axios.post(`${PYTHON_API_URL}${endpoint}`, data, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Python API Error:', error.message);
    
    // Return mock data if Python service is unavailable
    if (endpoint.includes('/risk/supplier')) {
      return { 
        supplierId: data.supplier?._id || 'unknown', 
        riskScore: 5, 
        riskLevel: 'medium' 
      };
    }
    if (endpoint.includes('/simulation/disrupt')) {
      return {
        impactedSuppliers: data.affectedIds || [],
        impactedCount: data.affectedIds?.length || 0,
        estimatedDelayDays: 7,
        estimatedCostIncrease: 1000,
        productionImpact: '20%',
        severity: 'moderate'
      };
    }
    if (endpoint.includes('/recommendation/alternatives')) {
      return { recommendations: [] };
    }
    if (endpoint.includes('/recommendation/compare')) {
      return {
        before: { riskScore: 5, totalCost: 10000, avgLeadTime: 7 },
        after: { riskScore: 3, totalCost: 12000, avgLeadTime: 5 },
        delta: { riskReduction: 2, costChange: 2000, leadTimeChange: -2 },
        recommendation: 'proceed'
      };
    }
    
    return { error: 'Algorithm service unavailable', fallback: true };
  }
};