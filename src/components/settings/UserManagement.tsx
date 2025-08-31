import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, ExternalLink, Users, Shield, Settings } from 'lucide-react'
import { AddUserForm } from './AddUserForm'
import { UsersTable } from './UsersTable'
import { UserStats } from './UserStats'
import { FirstUserSetup } from './FirstUserSetup'
import { SupabaseConnectionTest } from './SupabaseConnectionTest'
import { useState } from 'react'

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'permissions'>('overview')

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-black justify-end">
            <Users className="h-5 w-5" />
            ניהול משתמשים והרשאות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-black text-right">
              ניהול משתמשים, הרשאות ותפריטים במערכת
            </p>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
                size="sm"
              >
                סקירה כללית
              </Button>
              <Button
                variant={activeTab === 'users' ? 'default' : 'outline'}
                onClick={() => setActiveTab('users')}
                size="sm"
              >
                ניהול משתמשים
              </Button>
              <Button
                variant={activeTab === 'permissions' ? 'default' : 'outline'}
                onClick={() => setActiveTab('permissions')}
                size="sm"
              >
                קבוצות הרשאות
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Supabase Connection Test */}
          <SupabaseConnectionTest />
          
          {/* First User Setup */}
          <FirstUserSetup />
          
          {/* User Statistics */}
          <UserStats />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <Shield className="h-5 w-5" />
                פעולות מהירות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">הוסף משתמש חדש</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      צור משתמש חדש עם הרשאות מותאמות
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('users')}
                      className="w-full"
                    >
                      הוסף משתמש
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">צור קבוצת הרשאות</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      הגדר קבוצת הרשאות לשימוש חוזר
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('permissions')}
                      className="w-full"
                    >
                      צור קבוצה
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">הגדרות מערכת</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      הגדר הגדרות כלליות למערכת
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      הגדרות
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <Database className="h-5 w-5" />
                מידע על המערכת
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
                <Database className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  נדרש חיבור למסד נתונים
                </h3>
                <p className="text-black mb-4">
                  כדי לנהל משתמשים והרשאות, יש צורך בחיבור ל-Supabase לאחסון המידע במסד הנתונים
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-right">
                    <h4 className="font-medium text-black">תכונות זמינות עם Supabase:</h4>
                    <ul className="text-sm text-black mt-2 space-y-1">
                      <li>• מערכת התחברות (email/password)</li>
                      <li>• ניהול משתמשים והרשאות מתקדם</li>
                      <li>• קבוצות הרשאות לשימוש חוזר</li>
                      <li>• מסד נתונים לאחסון פרטי משתמשים</li>
                      <li>• בטיחות מידע ואבטחה</li>
                      <li>• APIs לניהול המשתמשים</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-white text-black border-gray-300 hover:bg-gray-50">
                    <ExternalLink className="h-4 w-4" />
                    חיבור ל-Supabase
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Add User Form */}
          <AddUserForm />
          
          {/* Users Table */}
          <UsersTable />
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <Shield className="h-5 w-5" />
                ניהול קבוצות הרשאות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  פיתוח עתידי
                </h3>
                <p className="text-blue-800 mb-4">
                  ניהול קבוצות הרשאות יותקן בגרסה הבאה של המערכת
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 text-right">
                  <h4 className="font-medium text-blue-900 mb-2">תכונות עתידיות:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• יצירת קבוצות הרשאות מותאמות</li>
                    <li>• שיתוף הרשאות בין משתמשים</li>
                    <li>• תבניות הרשאות מוכנות</li>
                    <li>• ניהול הרשאות מתקדם</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}