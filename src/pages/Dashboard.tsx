
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentCases } from '@/components/dashboard/RecentCases';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { ProjectStats } from '@/components/dashboard/ProjectStats';
import { EmailChart } from '@/components/dashboard/EmailChart';
import { ContactsList } from '@/components/dashboard/ContactsList';
import { Scale, Users, Clock, TrendingUp, Calendar, AlertCircle, Search, Bell, Settings, Briefcase, Gavel, FileCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Dashboard() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Beautiful Blue Header */}
      <motion.div 
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-b border-blue-500 px-6 py-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
              >
                <Scale className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white">מערכת ניהול משפטית</h1>
                <p className="text-blue-100 text-sm">פורטל ניהול תיקים ולקוחות</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
              <Input 
                placeholder="חיפוש תיקים, לקוחות או מסמכים..."
                className="w-80 pl-4 pr-10 h-11 bg-white bg-opacity-20 border-blue-400 text-white placeholder:text-blue-200 focus:border-white backdrop-blur-sm"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="h-11 w-11 text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-20">
                <Bell className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="h-11 w-11 text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-20">
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">₪ 247,850</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-8">
        {/* Professional Legal Stats Cards */}
        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-900 font-display">127</span>
            </div>
            <p className="text-sm text-blue-600 font-medium">תיקים פעילים</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">+12% מהחודש הקודם</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-900 font-display">342</span>
            </div>
            <p className="text-sm text-blue-600 font-medium">לקוחות פעילים</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-blue-600 font-medium">+8% מהחודש הקודם</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-900 font-display">89</span>
            </div>
            <p className="text-sm text-blue-600 font-medium">תיקים שהסתיימו</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-xs text-cyan-600 font-medium">+15% מהחודש הקודם</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-900 font-display">1,247</span>
            </div>
            <p className="text-sm text-blue-600 font-medium">מסמכים שנסרקו</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">+23% מהחודש הקודם</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProjectStats />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <EmailChart />
            </motion.div>
          </div>

          {/* Right Column - Legal Status and Lists */}
          <div className="space-y-6">
            {/* Legal Case Status */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-blue-900 font-display">סטטוס תיקים</h3>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">תיקים דחופים</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-red-600">23 תיקים</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{width: '18%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">תיקים בטיפול</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-medium text-blue-600">67 תיקים</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '53%'}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">תיקים שהושלמו</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600">37 תיקים</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '29%'}}></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ContactsList />
            </motion.div>
            
            {/* Legal Proceedings Progress */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-blue-900 font-display mb-6">הליכים בתיקים</h3>
              <div className="space-y-5">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-blue-900">תיק נזיקין - רכב</p>
                    <p className="text-xs text-blue-600">בדיקות מומחה וערכאות</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-blue-900">תיק מקרקעין</p>
                    <p className="text-xs text-blue-600">הכנת חוזה ובדיקות טאבו</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-blue-900">תיק משפחה</p>
                    <p className="text-xs text-blue-600">הליכי גירושין ומזונות</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
