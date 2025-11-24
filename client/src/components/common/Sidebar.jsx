import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  MapIcon, 
  DocumentTextIcon, 
  BeakerIcon, 
  LightBulbIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  QuestionMarkCircleIcon,
  CubeIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Supply Chain Map', href: '/supply-chain', icon: MapIcon },
  { name: 'Data Input', href: '/data', icon: DocumentTextIcon },
  { name: 'Materials', href: '/materials', icon: CubeIcon },
  { name: 'Simulation', href: '/simulation', icon: BeakerIcon },
  { name: 'Recommendations', href: '/recommendations', icon: LightBulbIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Company Profile', href: '/profile', icon: BuildingOfficeIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">MSME Resilience</h1>
        <p className="text-sm text-gray-600">Supply Chain Planner</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
