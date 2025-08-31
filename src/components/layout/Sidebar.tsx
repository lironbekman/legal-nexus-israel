
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Home,
  FileText,
  Users,
  Clock,
  Receipt,
  FileImage,
  BarChart3,
  Settings,
  Briefcase,
  Calendar,
  Calculator,
  Scale,
  Gavel,
  BookOpen,
  Shield,
  UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    title: 'לוח הבקרה',
    url: '/',
    icon: Home,
    color: 'text-blue-600'
  },
  {
    title: 'ניהול תיקים משפטיים',
    url: '/cases',
    icon: Briefcase,
    color: 'text-blue-600'
  },
  {
    title: 'מאגר לקוחות',
    url: '/clients',
    icon: UserCheck,
    color: 'text-blue-600'
  },
  {
    title: 'רישום שעות עבודה',
    url: '/time-tracking',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    title: 'חשבונות ותשלומים',
    url: '/billing',
    icon: Receipt,
    color: 'text-blue-600'
  },
  {
    title: 'יומן דיונים',
    url: '/calendar',
    icon: Calendar,
    color: 'text-blue-600'
  },
  {
    title: 'ארכיון מסמכים',
    url: '/documents',
    icon: FileImage,
    color: 'text-blue-600'
  },
  {
    title: 'דוחות מנהלים',
    url: '/reports',
    icon: BarChart3,
    color: 'text-blue-600'
  },
  {
    title: 'חקיקה וספרות',
    url: '/legal-library',
    icon: BookOpen,
    color: 'text-blue-600'
  },
  {
    title: 'מחשבון נכות',
    url: '/disability-calculator',
    icon: Calculator,
    color: 'text-blue-600'
  },
  {
    title: 'הגדרות מערכת',
    url: '/settings',
    icon: Settings,
    color: 'text-blue-600'
  },
];

// Logo component with localStorage support
function LogoDisplay() {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const savedLogo = localStorage.getItem('app-logo');
    if (savedLogo) {
      setLogo(savedLogo);
    }
  }, []);

  // Listen for logo changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLogo = localStorage.getItem('app-logo');
      setLogo(savedLogo);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (logo) {
    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
        <img 
          src={logo} 
          alt="לוגו המערכת" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg"
    >
      <Scale className="h-6 w-6 text-white" />
    </motion.div>
  );
}

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar 
      side="left" 
      collapsible="none" 
      className="border-r border-gray-200 bg-white shadow-xl"
    >
      <SidebarHeader className="border-b border-gray-100 p-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <LogoDisplay />
          <div>
            <h1 className="text-xl font-bold text-blue-900 font-display">
              Legal Nexus Israel
            </h1>
            <p className="text-sm text-blue-600">
              מערכת ניהול משרד עורכי דין
            </p>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.url;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      justify-start gap-3 py-3 px-4 rounded-xl transition-all duration-200 ease-in-out text-sm font-medium
                      ${isActive 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      </motion.div>
                      <span className="font-medium">{item.title}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            );
          })}
        </SidebarMenu>
        
        {/* Beautiful Security Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">מצב מאובטח</span>
          </div>
          <p className="text-xs text-blue-600 leading-relaxed">
            כל הנתונים מוצפנים ומאובטחים בהתאם לתקנות הגנת הפרטיות
          </p>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}
