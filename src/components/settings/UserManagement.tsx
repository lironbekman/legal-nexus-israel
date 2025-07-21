import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, ExternalLink } from 'lucide-react';

export function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          ניהול משתמשים
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-6 rounded-lg border-2 border-dashed border-border text-center">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            נדרש חיבור למסד נתונים
          </h3>
          <p className="text-muted-foreground mb-4">
            כדי לנהל משתמשים והרשאות, יש צורך בחיבור ל-Supabase לאחסון המידע במסד נתונים
          </p>
          <div className="space-y-3">
            <div className="bg-card p-4 rounded-lg border text-right">
              <h4 className="font-medium text-foreground">תכונות זמינות עם Supabase:</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• מערכת התחברות (email/password)</li>
                <li>• ניהול משתמשים והרשאות</li>
                <li>• מסד נתונים לאחסון פרטי משתמשים</li>
                <li>• בטיחות מידע ואבטחה</li>
                <li>• APIs לניהול המשתמשים</li>
              </ul>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              חיבור ל-Supabase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}