
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User } from 'lucide-react';

const recentCases = [
  {
    id: '2024-001',
    title: 'תביעת נזיקין - אברהם נגד החברה הכלכלית',
    client: 'יוסף אברהם',
    status: 'בטיפול',
    statusColor: 'bg-blue-600',
    lastActivity: 'לפני 2 שעות',
    nextDeadline: '15/06/2024',
  },
  {
    id: '2024-002',
    title: 'הסכם מקרקעין - רכישת דירה',
    client: 'משפחת לוי',
    status: 'ממתין לחתימה',
    statusColor: 'bg-blue-600',
    lastActivity: 'לפני יום',
    nextDeadline: '20/06/2024',
  },
  {
    id: '2024-003',
    title: 'תיק פלילי - הגנה על נהג',
    client: 'דוד כהן',
    status: 'הושלם',
    statusColor: 'bg-green-600',
    lastActivity: 'לפני 3 ימים',
    nextDeadline: '-',
  },
];

export function RecentCases() {
  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-blue-900 font-display">
            תיקים אחרונים
          </CardTitle>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            צפה בכל התיקים
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((case_) => (
            <div
              key={case_.id}
              className="flex items-center justify-between p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-1 text-base">
                    {case_.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-blue-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{case_.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{case_.nextDeadline}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <Badge className={`${case_.statusColor} text-white mb-2 font-medium`}>
                  {case_.status}
                </Badge>
                <p className="text-xs text-blue-500 font-medium">{case_.lastActivity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
