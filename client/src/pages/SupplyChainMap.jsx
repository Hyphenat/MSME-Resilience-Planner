import { useEffect, useRef, useState } from 'react'
import { useSupplyChain } from '../context/SupplyChainContext'
import ForceGraph2D from 'react-force-graph-2d'

export default function SupplyChainMap() {
  const { suppliers } = useSupplyChain()
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const graphRef = useRef()

  useEffect(() => {
    if (suppliers.length === 0) return

    // Create nodes
    const nodes = [
      { id: 'manufacturer', name: 'Your Company', group: 'manufacturer', val: 30 },
      ...suppliers.map(s => ({
        id: s._id,
        name: s.name,
        group: 'supplier',
        val: s.isCritical ? 20 : 10,
        location: s.location,
        materials: s.materials
      }))
    ]

    // Create links
    const links = suppliers.map(s => ({
      source: s._id,
      target: 'manufacturer',
      value: s.isCritical ? 5 : 2
    }))

    setGraphData({ nodes, links })
  }, [suppliers])

  const getNodeColor = (node) => {
    if (node.group === 'manufacturer') return '#3b82f6'
    if (node.group === 'supplier') return node.val > 15 ? '#ef4444' : '#10b981'
    return '#gray'
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Supply Chain Network Map</h1>
      
      {suppliers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No suppliers to visualize yet</p>
          <p className="text-sm text-gray-500">Add suppliers to see your supply chain network</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span>Your Company</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Critical Supplier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Normal Supplier</span>
            </div>
          </div>

          <div className="border rounded-lg" style={{ height: '600px' }}>
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel="name"
              nodeColor={getNodeColor}
              nodeRelSize={6}
              linkWidth={link => link.value}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={2}
              onNodeClick={(node) => {
                if (node.group === 'supplier') {
                  alert(`Supplier: ${node.name}\nLocation: ${node.location}\nMaterials: ${node.materials?.join(', ') || 'None'}`)
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
