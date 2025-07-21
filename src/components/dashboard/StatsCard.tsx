
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ title, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) {
  const trendColors = {
    up: 'text-emerald-600',
    down: 'text-red-600',
    neutral: 'text-slate-600',
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-200 rounded-xl">
          <Icon className="h-5 w-5 text-violet-700" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-display text-slate-900 mb-2">{value}</div>
        {change && (
          <p className={`text-sm font-medium ${trendColors[trend]}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
