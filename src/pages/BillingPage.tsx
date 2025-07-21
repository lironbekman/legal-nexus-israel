import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Plus,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  Clock,
  Send,
  Download,
  Eye,
  Search,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const mockInvoices = [
  {
    id: 'INV-001',
    invoiceNumber: '2024-001',
    client: 'יוסף אברהם',
    case: 'תביעת נזיקין',
    issueDate: '2024-06-01',
    dueDate: '2024-06-30',
    amount: 12500,
    status: 'שולם',
    statusColor: 'bg-green-500',
    hours: 25,
    rate: 500
  },
  {
    id: 'INV-002',
    invoiceNumber: '2024-002',
    client: 'משפחת לוי',
    case: 'הסכם מקרקעין',
    issueDate: '2024-06-05',
    dueDate: '2024-07-05',
    amount: 8000,
    status: 'ממתין לתשלום',
    statusColor: 'bg-blue-500',
    hours: 20,
    rate: 400
  },
  {
    id: 'INV-003',
    invoiceNumber: '2024-003',
    client: 'דוד כהן',
    case: 'תיק פלילי',
    issueDate: '2024-06-10',
    dueDate: '2024-07-10',
    amount: 15000,
    status: 'נשלח',
    statusColor: 'bg-blue-500',
    hours: 30,
    rate: 500
  },
  {
    id: 'INV-004',
    invoiceNumber: '2024-004',
    client: 'חברת אלפא בע"מ',
    case: 'ערעור מס הכנסה',
    issueDate: '2024-06-12',
    dueDate: '2024-07-12',
    amount: 24000,
    status: 'טיוטה',
    statusColor: 'bg-gray-500',
    hours: 40,
    rate: 600
  },
  {
    id: 'INV-005',
    invoiceNumber: '2024-005',
    client: 'רונית אברהם',
    case: 'סכסוך עבודה',
    issueDate: '2024-06-15',
    dueDate: '2024-06-20',
    amount: 6000,
    status: 'באיחור',
    statusColor: 'bg-red-500',
    hours: 15,
    rate: 400
  }
];

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value) {
      setFilteredInvoices(mockInvoices);
      return;
    }
    
    const filtered = mockInvoices.filter(
      (invoice) => 
        invoice.client.includes(value) || 
        invoice.case.includes(value) ||
        invoice.invoiceNumber.includes(value)
    );
    
    setFilteredInvoices(filtered);
  };

  const totalInvoices = mockInvoices.length;
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === 'שולם').length;
  const overdue = mockInvoices.filter(inv => inv.status === 'באיחור').length;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-900 font-display">חיובים וחשבוניות</h1>
          <p className="text-blue-600 mt-2">
            ניהול חשבוניות, מעקב תשלומים וחיובים ללקוחות
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="gap-2 self-end bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" /> חשבונית חדשה
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">{totalInvoices}</p>
                <p className="text-blue-600 text-sm">סה"כ חשבוניות</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">₪{totalRevenue.toLocaleString()}</p>
                <p className="text-blue-600 text-sm">סה"כ הכנסות</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">{paidInvoices}</p>
                <p className="text-blue-600 text-sm">חשבוניות ששולמו</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-red-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-red-900">{overdue}</p>
                <p className="text-red-600 text-sm">חשבוניות באיחור</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">יצירת חשבונית</h3>
            <p className="text-blue-600 text-sm">יצור חשבונית חדשה מרישומי הזמן</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">שליחת תזכורות</h3>
            <p className="text-green-600 text-sm">שלח תזכורות תשלום ללקוחות</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">ייצוא דוחות</h3>
            <p className="text-purple-600 text-sm">ייצא דוחות חיובים ותשלומים</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-900 font-display">חשבוניות ותשלומים</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="חפש לפי לקוח, תיק או מספר חשבונית..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-9 pr-4 border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[130px] border-blue-200">
                    <SelectValue placeholder="סטטוס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הסטטוסים</SelectItem>
                    <SelectItem value="paid">שולם</SelectItem>
                    <SelectItem value="pending">ממתין</SelectItem>
                    <SelectItem value="overdue">באיחור</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[130px] border-blue-200">
                    <SelectValue placeholder="תקופה" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">החודש</SelectItem>
                    <SelectItem value="quarter">הרבעון</SelectItem>
                    <SelectItem value="year">השנה</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader className="bg-blue-50">
                  <TableRow className="border-blue-200">
                    <TableHead className="text-blue-900 font-semibold">מספר חשבונית</TableHead>
                    <TableHead className="text-blue-900 font-semibold">לקוח</TableHead>
                    <TableHead className="hidden md:table-cell text-blue-900 font-semibold">תיק</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">תאריך הנפקה</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">תאריך פירעון</TableHead>
                    <TableHead className="text-blue-900 font-semibold">סכום</TableHead>
                    <TableHead className="text-blue-900 font-semibold">סטטוס</TableHead>
                    <TableHead className="text-right text-blue-900 font-semibold">פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice, index) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50 border-blue-100 transition-colors group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-900 font-medium">{invoice.invoiceNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-900 font-medium">{invoice.client}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-blue-700">{invoice.case}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-700">{invoice.issueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-700">{invoice.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-900 font-bold">₪{invoice.amount.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${invoice.statusColor} text-white`}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100">
                            <Download className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100">
                            <Send className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}