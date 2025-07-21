import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, FileText, Search, Filter, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockCases = [
  {
    id: '2024-001',
    title: 'תביעת נזיקין - אברהם נגד החברה הכלכלית',
    client: 'יוסף אברהם',
    attorney: 'עו"ד דוד לוי',
    type: 'תביעה אזרחית',
    status: 'בטיפול',
    statusColor: 'bg-blue-500',
    lastUpdated: '10/06/2024',
    nextDeadline: '15/06/2024',
  },
  {
    id: '2024-002',
    title: 'הסכם מקרקעין - רכישת דירה',
    client: 'משפחת לוי',
    attorney: 'עו"ד רחל כהן',
    type: 'עסקאות מקרקעין',
    status: 'ממתין לחתימה',
    statusColor: 'bg-blue-500',
    lastUpdated: '09/06/2024',
    nextDeadline: '20/06/2024',
  },
  {
    id: '2024-003',
    title: 'תיק פלילי - הגנה על נהג',
    client: 'דוד כהן',
    attorney: 'עו"ד משה גרינברג',
    type: 'פלילי',
    status: 'הושלם',
    statusColor: 'bg-green-500',
    lastUpdated: '07/06/2024',
    nextDeadline: '-',
  },
  {
    id: '2024-004',
    title: 'ערעור מס הכנסה',
    client: 'חברת אלפא בע"מ',
    attorney: 'עו"ד שרה לוי',
    type: 'מיסים',
    status: 'בהמתנה',
    statusColor: 'bg-blue-500',
    lastUpdated: '05/06/2024',
    nextDeadline: '30/06/2024',
  },
  {
    id: '2024-005',
    title: 'סכסוך עבודה - פיטורין שלא כדין',
    client: 'רונית אברהם',
    attorney: 'עו"ד דוד לוי',
    type: 'דיני עבודה',
    status: 'בטיפול',
    statusColor: 'bg-blue-500',
    lastUpdated: '02/06/2024',
    nextDeadline: '25/06/2024',
  },
];

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCases, setFilteredCases] = useState(mockCases);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value) {
      setFilteredCases(mockCases);
      return;
    }
    
    const filtered = mockCases.filter(
      (case_) => 
        case_.title.includes(value) || 
        case_.client.includes(value) ||
        case_.id.includes(value)
    );
    
    setFilteredCases(filtered);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'בטיפול': return 'bg-blue-500';
      case 'ממתין לחתימה': return 'bg-blue-500';
      case 'הושלם': return 'bg-green-500';
      case 'בהמתנה': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-900">ניהול תיקים</h1>
          <p className="text-muted-foreground mt-2">
            צפייה, עריכה וניהול של תיקי המשרד
          </p>
        </div>
        <div className="flex gap-2 self-end">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" /> תיק חדש
          </Button>
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" /> הוסף לקוח
          </Button>
        </div>
      </div>

      <Card className="bg-slate-50 border-slate-400 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חפש לפי שם תיק, לקוח או מספר..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-9 pr-4"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="סוג תיק" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסוגים</SelectItem>
                  <SelectItem value="civil">תביעה אזרחית</SelectItem>
                  <SelectItem value="real-estate">עסקאות מקרקעין</SelectItem>
                  <SelectItem value="criminal">פלילי</SelectItem>
                  <SelectItem value="tax">מיסים</SelectItem>
                  <SelectItem value="labor">דיני עבודה</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="סטטוס" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסטטוסים</SelectItem>
                  <SelectItem value="in-progress">בטיפול</SelectItem>
                  <SelectItem value="waiting">ממתין לחתימה</SelectItem>
                  <SelectItem value="completed">הושלם</SelectItem>
                  <SelectItem value="pending">בהמתנה</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border border-slate-400 bg-white shadow-md">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow className="border-slate-300">
                  <TableHead className="w-[100px] text-slate-800 font-semibold">מספר תיק</TableHead>
                  <TableHead className="text-slate-800 font-semibold">שם תיק</TableHead>
                  <TableHead className="hidden lg:table-cell text-slate-800 font-semibold">לקוח</TableHead>
                  <TableHead className="hidden lg:table-cell text-slate-800 font-semibold">עו"ד מטפל</TableHead>
                  <TableHead className="hidden md:table-cell text-slate-800 font-semibold">סוג</TableHead>
                  <TableHead className="text-slate-800 font-semibold">סטטוס</TableHead>
                  <TableHead className="hidden md:table-cell text-slate-800 font-semibold">עדכון אחרון</TableHead>
                  <TableHead className="text-right text-slate-800 font-semibold">דדליין</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id} className="hover:bg-slate-100 border-slate-200 transition-colors">
                    <TableCell className="font-medium text-slate-800">{case_.id}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-slate-800">{case_.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-slate-700">{case_.client}</TableCell>
                    <TableCell className="hidden lg:table-cell text-slate-700">{case_.attorney}</TableCell>
                    <TableCell className="hidden md:table-cell text-slate-700">{case_.type}</TableCell>
                    <TableCell>
                      <Badge className={`${case_.statusColor} text-white`}>
                        {case_.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-slate-700">{case_.lastUpdated}</TableCell>
                    <TableCell className="text-right text-slate-700">{case_.nextDeadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
