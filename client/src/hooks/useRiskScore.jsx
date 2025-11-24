import { useState, useEffect } from 'react'
import api from '../services/api'

export function useRiskScore(suppliers) {
  const [riskScore, setRiskScore] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!suppliers || suppliers.length === 0) {
      setRiskScore(0)
      return
    }

    const calculateRisk = async () => {
      setLoading(true)
      try {
        const res = await api.post('/simulation/risk-score', { suppliers })
        setRiskScore(res.data.overallScore || 0)
      } catch (err) {
        // Calculate locally if API fails
        const avgRisk = suppliers.reduce((acc, s) => {
          const rf = s.riskFactors || {}
          return acc + ((10 - rf.financialStability || 5) + (10 - rf.deliveryReliability || 5)) / 2
        }, 0) / suppliers.length
        setRiskScore(avgRisk)
      } finally {
        setLoading(false)
      }
    }

    calculateRisk()
  }, [suppliers])

  return { riskScore, loading }
}