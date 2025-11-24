import { 
  HomeIcon, MapIcon, CloudArrowUpIcon, BoltIcon,
  LightBulbIcon, DocumentChartBarIcon, BuildingOfficeIcon, QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

import { 
  HomeIcon, MapIcon, CloudArrowUpIcon, BoltIcon,
  LightBulbIcon, DocumentChartBarIcon, BuildingOfficeIcon, QuestionMarkCircleIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

export const routes = [
  { path: '/', name: 'Dashboard', icon: HomeIcon },
  { path: '/supply-chain', name: 'Supply Chain Map', icon: MapIcon },
  { path: '/data', name: 'Data Input', icon: CloudArrowUpIcon },
  { path: '/simulation', name: 'Simulation', icon: BoltIcon },
  { path: '/recommendations', name: 'Recommendations', icon: LightBulbIcon },
  { path: '/reports', name: 'Reports', icon: DocumentChartBarIcon },
  { path: '/profile', name: 'Company Profile', icon: BuildingOfficeIcon },
  { path: '/help', name: 'Help', icon: QuestionMarkCircleIcon },
  { path: '/materials', name: 'Materials', icon: BeakerIcon }
]
