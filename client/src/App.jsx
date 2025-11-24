import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SupplyChainProvider } from './context/SupplyChainContext'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import Dashboard from './pages/Dashboard'
import SupplyChainMap from './pages/SupplyChainMap'
import DataInput from './pages/DataInput'
import Simulation from './pages/Simulation'
import Recommendations from './pages/Recommendations'
import Reports from './pages/Reports'
import CompanyProfile from './pages/CompanyProfile'
import Help from './pages/Help'
import NotFound from './pages/NotFound'
import MaterialTable from './components/materials/MaterialTable'
import Suppliers from './pages/Suppliers'

export default function App() {
  return (
    <SupplyChainProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/supply-chain" element={<SupplyChainMap />} />
              <Route path="/data" element={<DataInput />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<CompanyProfile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/materials" element={<MaterialTable />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </SupplyChainProvider>
  )
}
