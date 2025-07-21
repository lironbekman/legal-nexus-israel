
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EmailChart() {
  return (
    <div className="modern-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-900 font-display">התפלגות תיקים</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">השבוע</span>
          <button className="text-sm text-blue-600 hover:text-blue-700">↓</button>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-between">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {/* Primary segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray="75 25"
              strokeDashoffset="0"
            />
            {/* Secondary segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="8"
              strokeDasharray="15 85"
              strokeDashoffset="-75"
            />
            {/* Tertiary segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray="10 90"
              strokeDashoffset="-90"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">71%</div>
            </div>
          </div>
        </div>

        <div className="flex-1 mr-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-blue-600">נזיקין (35%)</span>
              </div>
              <span className="text-sm font-semibold text-blue-900">47</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-sm text-blue-600">מקרקעין (25%)</span>
              </div>
              <span className="text-sm font-semibold text-blue-900">32</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-600">משפחה (23%)</span>
              </div>
              <span className="text-sm font-semibold text-blue-900">29</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-blue-600">פלילי (17%)</span>
              </div>
              <span className="text-sm font-semibold text-blue-900">21</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
