import { Link } from 'react-router-dom'
import { DocumentArrowUpIcon, CubeIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function DataInput() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Data Input & Management</h1>
      <p className="text-gray-600 mb-8">
        Add and manage your supply chain data including suppliers, materials, and customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/suppliers" className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
          <UsersIcon className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Suppliers</h2>
          <p className="text-gray-600 mb-4">
            Add and manage your supplier information, costs, and risk factors.
          </p>
          <span className="text-blue-600 font-medium">Manage Suppliers →</span>
        </Link>

        <Link to="/materials" className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
          <CubeIcon className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Materials</h2>
          <p className="text-gray-600 mb-4">
            Track raw materials, link suppliers, and monitor stock levels.
          </p>
          <span className="text-green-600 font-medium">Manage Materials →</span>
        </Link>

        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
          <DocumentArrowUpIcon className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Bulk Upload</h2>
          <p className="text-gray-600 mb-4">
            Upload CSV files to import multiple suppliers or materials at once.
          </p>
          <button className="text-purple-600 font-medium">Upload CSV →</button>
        </div>
      </div>
    </div>
  )
}
