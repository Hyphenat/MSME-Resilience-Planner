import { useState } from 'react'
import axios from 'axios'

export function useSimulation() {
  const [isLoading, setIsLoading] = useState(false)

  const runSimulation = async (simulationData) => {
    setIsLoading(true)
    try {
      // Try to use Python API if available, otherwise use mock data
      try {
        const response = await axios.post('http://localhost:8000/simulation/disruption', simulationData, {
          timeout: 5000
        })
        return response.data
      } catch (apiError) {
        console.log('Python API not available, using mock simulation')
        // Fallback to local simulation
        return generateMockSimulation(simulationData)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { runSimulation, isLoading }
}

// Mock simulation logic for demo when API is unavailable
function generateMockSimulation(data) {
  const { affected_supplier, duration_days, all_suppliers } = data
  
  // Calculate impact based on supplier criticality
  const impactMultiplier = affected_supplier.isCritical ? 2 : 1
  const baseCost = affected_supplier.costPerUnit || 100
  
  // Find alternative suppliers
  const alternatives = all_suppliers
    .filter(s => s.id !== affected_supplier.id)
    .filter(s => {
      const supplierMaterials = s.materials || []
      const affectedMaterials = affected_supplier.materials || []
      return supplierMaterials.some(m => affectedMaterials.includes(m))
    })
    .slice(0, 3)
    .map(s => ({
      ...s,
      score: Math.random() * 3 + 7 // Random score between 7-10
    }))
    .sort((a, b) => b.score - a.score)

  const totalDelay = duration_days * impactMultiplier
  const costImpact = baseCost * duration_days * impactMultiplier

  let riskLevel = 'low'
  if (totalDelay > 60 || affected_supplier.isCritical) riskLevel = 'critical'
  else if (totalDelay > 30) riskLevel = 'high'
  else if (totalDelay > 14) riskLevel = 'medium'

  return {
    disruption_type: data.disruption_type,
    affected_supplier: affected_supplier.name,
    impacted_materials: affected_supplier.materials || [],
    total_delay_days: totalDelay,
    cost_impact: Math.round(costImpact),
    risk_level: riskLevel,
    alternative_suppliers: alternatives,
    recommendations: [
      `Contact ${alternatives[0]?.name || 'alternative suppliers'} as primary backup`,
      `Increase safety stock for ${affected_supplier.materials?.[0] || 'critical materials'} by ${duration_days * 2}%`,
      affected_supplier.isCritical 
        ? 'This is a critical supplier - establish dual sourcing immediately'
        : 'Consider diversifying suppliers for this material',
      `Expected recovery time: ${Math.ceil(totalDelay / 2)} days with mitigation`,
      alternatives.length > 0
        ? `${alternatives.length} alternative supplier(s) identified`
        : 'No direct alternatives found - consider expanding supplier network'
    ]
  }
}