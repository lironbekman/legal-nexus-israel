
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ProjectStats() {
  const data = [
    { month: 'ינו', revenue: 30, visitors: 45 },
    { month: 'פבר', revenue: 45, visitors: 35 },
    { month: 'מרץ', revenue: 25, visitors: 55 },
    { month: 'אפר', revenue: 55, visitors: 40 },
    { month: 'מאי', revenue: 35, visitors: 60 },
    { month: 'יונ', revenue: 40, visitors: 30 },
    { month: 'יול', revenue: 20, visitors: 45 },
  ];

  return (
    <div className="modern-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-900 font-display">סטטיסטיקת תיקים</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-blue-600">הכנסות</span>
            <span className="font-semibold text-blue-900">₪421K</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-blue-600">לקוחות חדשים</span>
            <span className="font-semibold text-blue-900">127</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="metric-badge metric-badge-green">
          <TrendingUp className="h-3 w-3 mr-1" />
          98.2%
        </div>
        <span className="text-sm text-gray-600">השבוע</span>
      </div>

      {/* Simple Chart Representation */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 w-full">
              <div className="relative flex items-end gap-1 h-48">
                <div 
                  className="w-4 bg-blue-500 rounded-t"
                  style={{ height: `${item.revenue}%` }}
                ></div>
                <div 
                  className="w-4 bg-cyan-500 rounded-t"
                  style={{ height: `${item.visitors}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{item.month}</span>
            </div>
          ))}
        </div>
        
        {/* Highlight box */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
          <div className="text-center">
            <div className="font-semibold">85%</div>
            <div className="text-xs opacity-75">שיעור הצלחה</div>
          </div>
        </div>
      </div>
    </div>
  );
}
