import { useSupplyChain } from '../context/SupplyChainContext'
import { Link } from 'react-router-dom'
import { 
  UsersIcon, 
  CubeIcon, 
  ExclamationTriangleIcon,
  BeakerIcon 
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const { suppliers, materials } = useSupplyChain()

  const criticalSuppliers = suppliers.filter(s => s.isCritical).length
  const lowStockMaterials = materials.filter(m => 
    m.currentStock <= m.reorderLevel
  ).length

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Total Suppliers</h3>
            <UsersIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{suppliers.length}</p>
          <Link to="/suppliers" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Active Materials</h3>
            <CubeIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{materials.length}</p>
          <Link to="/materials" className="text-sm text-green-600 hover:underline mt-2 inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Critical Suppliers</h3>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{criticalSuppliers}</p>
          <p className="text-sm text-gray-600 mt-2">Require attention</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Low Stock Alerts</h3>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{lowStockMaterials}</p>
          <p className="text-sm text-gray-600 mt-2">Below reorder level</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/data"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
          >
            <UsersIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold">Add Data</p>
              <p className="text-sm text-gray-600">Add suppliers & materials</p>
            </div>
          </Link>

          <Link 
            to="/simulation"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all"
          >
            <BeakerIcon className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-semibold">Run Simulation</p>
              <p className="text-sm text-gray-600">Test disruption scenarios</p>
            </div>
          </Link>

          <Link 
            to="/supply-chain"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all"
          >
            <CubeIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-semibold">View Network</p>
              <p className="text-sm text-gray-600">Visualize supply chain</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity or Alerts */}
      {lowStockMaterials > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 mr-3" />
            <div>
              <p className="font-semibold text-orange-800">Low Stock Alert</p>
              <p className="text-sm text-orange-700">
                {lowStockMaterials} material(s) are below reorder level. Consider reordering soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
