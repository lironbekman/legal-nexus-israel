import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Upload, Users, Scan } from 'lucide-react';
import { DesignSettings } from '@/components/settings/DesignSettings';
import { UserManagement } from '@/components/settings/UserManagement';
import { ScannerSettings } from '@/components/settings/ScannerSettings';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl bg-white" dir="rtl">
      <div className="mb-8 text-right">
        <h1 className="text-3xl font-bold text-black mb-2 flex items-center gap-3 justify-end">
          <Settings className="h-8 w-8 text-blue-600" />
          הגדרות מערכת
        </h1>
        <p className="text-black">
          ניהול והתאמה אישית של המערכת
        </p>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
          <TabsTrigger value="design" className="flex items-center gap-2 bg-white text-black data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 border-r border-gray-200">
            <Palette className="h-4 w-4" />
            עיצוב המערכת
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2 bg-white text-black data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 border-r border-gray-200">
            <Scan className="h-4 w-4" />
            הגדרות סורק
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 bg-white text-black data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            <Users className="h-4 w-4" />
            ניהול משתמשים
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="mt-6 bg-white">
          <DesignSettings />
        </TabsContent>

        <TabsContent value="scanner" className="mt-6 bg-white">
          <ScannerSettings />
        </TabsContent>

        <TabsContent value="users" className="mt-6 bg-white">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}