import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Upload, Users } from 'lucide-react';
import { DesignSettings } from '@/components/settings/DesignSettings';
import { UserManagement } from '@/components/settings/UserManagement';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          הגדרות מערכת
        </h1>
        <p className="text-muted-foreground">
          ניהול והתאמה אישית של המערכת
        </p>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            עיצוב המערכת
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            ניהול משתמשים
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="mt-6">
          <DesignSettings />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}