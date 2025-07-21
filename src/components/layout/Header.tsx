
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, LogOut, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-violet-600" />
            <Badge 
              variant="outline" 
              className="bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-violet-200 px-4 py-2 text-sm font-semibold"
            >
              מחובר
            </Badge>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-lg text-slate-600 font-medium">
              משרד עורכי דין • כהן ושות'
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-12 w-12 hover:bg-violet-100 rounded-xl transition-all duration-200"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            <Badge className="absolute -top-1 -right-1 h-6 w-6 p-0 text-xs bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
              3
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-12 w-12 hover:bg-violet-100 rounded-xl transition-all duration-200"
              >
                <User className="h-5 w-5 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 shadow-xl border-0 bg-white/95 backdrop-blur-xl">
              <DropdownMenuLabel className="text-lg font-semibold">חשבון משתמש</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base py-3">עו"ד אבי כהן</DropdownMenuItem>
              <DropdownMenuItem className="text-base py-3">פרופיל</DropdownMenuItem>
              <DropdownMenuItem className="text-base py-3">הגדרות</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 text-base py-3">
                <LogOut className="h-4 w-4 mr-3" />
                התנתק
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
