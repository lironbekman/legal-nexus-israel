
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, Calendar } from 'lucide-react';

const upcomingDeadlines = [
  {
    id: 1,
    title: 'הגשת כתב הגנה - תיק אברהם',
    date: '2024-06-15',
    time: '17:00',
    priority: 'high',
    daysLeft: 2,
  },
  {
    id: 2,
    title: 'פגישה עם לקוח - משפחת לוי',
    date: '2024-06-16',
    time: '10:00',
    priority: 'medium',
    daysLeft: 3,
  },
  {
    id: 3,
    title: 'דיון בבית משפט - תיק כהן',
    date: '2024-06-18',
    time: '09:30',
    priority: 'high',
    daysLeft: 5,
  },
  {
    id: 4,
    title: 'סיום הכנת הסכם',
    date: '2024-06-20',
    time: '16:00',
    priority: 'low',
    daysLeft: 7,
  },
];

export function UpcomingDeadlines() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-blue-600';
      case 'low':
        return 'bg-green-600';
      default:
        return 'bg-slate-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'דחוף';
      case 'medium':
        return 'בינוני';
      case 'low':
        return 'נמוך';
      default:
        return 'רגיל';
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2 font-display">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          מועדים קרובים
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between p-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors bg-white shadow-sm"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1 text-base">
                  {deadline.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-blue-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{deadline.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{deadline.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <Badge className={`${getPriorityColor(deadline.priority)} text-white mb-1 font-medium`}>
                  {getPriorityText(deadline.priority)}
                </Badge>
                <p className="text-xs text-blue-500 font-medium">
                  בעוד {deadline.daysLeft} ימים
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
