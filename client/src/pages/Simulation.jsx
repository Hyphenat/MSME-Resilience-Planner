import { useState } from 'react'
import { useSupplyChain } from '../context/SupplyChainContext'
import { useSimulation } from '../hooks/useSimulation'
import { PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function Simulation() {
  const { suppliers } = useSupplyChain()
  const { runSimulation, isLoading } = useSimulation()
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [impactType, setImpactType] = useState('complete_shutdown')
  const [duration, setDuration] = useState(30)
  const [results, setResults] = useState(null)

  const handleRunSimulation = async () => {
    if (!selectedSupplier) {
      toast.error('Please select a supplier to simulate disruption')
      return
    }

    try {
      const supplier = suppliers.find(s => s._id === selectedSupplier)
      
      const simulationData = {
        disruption_type: impactType,
        affected_supplier: {
          id: supplier._id,
          name: supplier.name,
          location: supplier.location,
          materials: supplier.materials || [],
          isCritical: supplier.isCritical
        },
        duration_days: duration,
        all_suppliers: suppliers.map(s => ({
          id: s._id,
          name: s.name,
          location: s.location,
          materials: s.materials || [],
          costPerUnit: s.costPerUnit || 0,
          leadTimeDays: s.leadTimeDays || 0,
          isCritical: s.isCritical,
          riskFactors: s.riskFactors
        }))
      }

      const response = await runSimulation(simulationData)
      setResults(response)
      toast.success('Simulation completed successfully')
    } catch (error) {
      console.error('Simulation error:', error)
      toast.error('Failed to run simulation')
    }
  }

  const getRiskLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Disruption Simulation</h1>
      <p className="text-gray-600 mb-8">
        Simulate supplier disruptions to understand potential impacts on your supply chain
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Simulation Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Supplier to Disrupt</label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  disabled={suppliers.length === 0}
                >
                  <option value="">Choose a supplier...</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name} {supplier.isCritical && '(Critical)'}
                    </option>
                  ))}
                </select>
                {suppliers.length === 0 && (
                  <p className="text-sm text-red-600 mt-1">No suppliers available. Add suppliers first.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Disruption Type</label>
                <select
                  value={impactType}
                  onChange={(e) => setImpactType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="complete_shutdown">Complete Shutdown</option>
                  <option value="partial_delay">Partial Delay</option>
                  <option value="quality_issue">Quality Issues</option>
                  <option value="price_increase">Price Increase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration (days): {duration}
                </label>
                <input
                  type="range"
                  min="1"
                  max="180"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>180 days</span>
                </div>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isLoading || !selectedSupplier}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {!results ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Configure parameters and run a simulation to see results</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Impact Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Impact Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Affected Materials</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.impacted_materials?.length || 0}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Production Delay</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {results.total_delay_days || 0} days
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Cost Impact</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      ${results.cost_impact || 0}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                    <p className={`text-lg font-bold px-3 py-1 rounded inline-block ${getRiskLevelColor(results.risk_level)}`}>
                      {results.risk_level || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Impacted Materials */}
              {results.impacted_materials && results.impacted_materials.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Impacted Materials</h2>
                  <div className="space-y-2">
                    {results.impacted_materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">{material}</span>
                        <span className="text-sm text-red-600">At Risk</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {results.recommendations && results.recommendations.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Recommended Actions</h2>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative Suppliers */}
              {results.alternative_suppliers && results.alternative_suppliers.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Alternative Suppliers</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Supplier</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Location</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Score</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Lead Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {results.alternative_suppliers.map((alt, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{alt.name}</td>
                            <td className="px-4 py-3">{alt.location}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                {alt.score?.toFixed(2) || 'N/A'}
                              </span>
                            </td>
                            <td className="px-4 py-3">{alt.leadTimeDays || 0} days</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
