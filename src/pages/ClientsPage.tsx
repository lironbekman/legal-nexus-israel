import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Building2, 
  User, 
  Phone, 
  Mail,
  FileText,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getClients, Client, deleteClient } from '@/lib/dataManager';

// Mock clients removed - now using real data from dataManager

export default function ClientsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  const loadClients = () => {
    const clients = getClients();
    setAllClients(clients);
    setFilteredClients(clients);
  };

  useEffect(() => {
    // Load clients from dataManager
    loadClients();
  }, []);

  // Refresh data when returning from forms
  useEffect(() => {
    if (location.pathname === '/clients') {
      loadClients();
    }
  }, [location.pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value) {
      setFilteredClients(allClients);
      return;
    }
    
    const filtered = allClients.filter(
      (client) => 
        client.name.includes(value) || 
        client.email.includes(value) ||
        client.phone.includes(value) ||
        client.idNumber.includes(value) ||
        client.id.includes(value)
    );
    
    setFilteredClients(filtered);
  };

  const handleViewClient = (clientId: string) => {
    console.log('צפייה בלקוח:', clientId);
    // TODO: Navigate to client view page
    alert(`צפייה בלקוח ${clientId}`);
  };

  const handleEditClient = (clientId: string) => {
    navigate(`/clients/${clientId}/edit`);
  };

  const handleDeleteClient = (clientId: string, clientName: string) => {
    const confirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את הלקוח "${clientName}"?`);
    if (confirmed) {
      const success = deleteClient(clientId);
      if (success) {
        loadClients(); // Refresh the list
        alert(`לקוח ${clientName} נמחק בהצלחה`);
      } else {
        alert('שגיאה במחיקת הלקוח');
      }
    }
  };

  const handleNewClient = () => {
    navigate('/clients/new');
  };

  const totalClients = allClients.length;
  const activeClients = allClients.filter(c => c.status === 'פעיל').length;
  const totalCases = allClients.reduce((sum, client) => sum + (client.activeCases || 0), 0);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-900 font-display">ניהול לקוחות</h1>
          <p className="text-blue-600 mt-2">
            ניהול מידע לקוחות, מעקב תיקים וקשר עם לקוחות
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="gap-2 self-end bg-blue-600 hover:bg-blue-700" onClick={handleNewClient}>
            <PlusCircle className="h-4 w-4" /> לקוח חדש
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">{totalClients}</p>
                <p className="text-blue-600 text-sm">סה"כ לקוחות</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">{activeClients}</p>
                <p className="text-blue-600 text-sm">לקוחות פעילים</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-blue-900">{totalCases}</p>
                <p className="text-blue-600 text-sm">תיקים פעילים</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-900 font-display">רשימת לקוחות</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="חפש לפי שם, אימייל, טלפון או ת.ז..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-9 pr-4 border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px] border-blue-200">
                    <SelectValue placeholder="סוג לקוח" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הסוגים</SelectItem>
                    <SelectItem value="private">פרטי</SelectItem>
                    <SelectItem value="business">עסקי</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px] border-blue-200">
                    <SelectValue placeholder="סטטוס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הסטטוסים</SelectItem>
                    <SelectItem value="active">פעיל</SelectItem>
                    <SelectItem value="inactive">לא פעיל</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="border-blue-200 hover:bg-blue-50">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        
          <CardContent className="p-0">
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader className="bg-blue-50">
                  <TableRow className="border-blue-200">
                    <TableHead className="w-[120px] text-blue-900 font-semibold">תעודת זהות</TableHead>
                    <TableHead className="text-blue-900 font-semibold">שם</TableHead>
                    <TableHead className="hidden md:table-cell text-blue-900 font-semibold">סוג</TableHead>
                    <TableHead className="hidden md:table-cell text-blue-900 font-semibold">אימייל</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">טלפון</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">תיקים פעילים</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">סטטוס</TableHead>
                    <TableHead className="hidden lg:table-cell text-blue-900 font-semibold">פעילות אחרונה</TableHead>
                    <TableHead className="text-blue-900 font-semibold">פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client, index) => (
                    <TableRow
                      key={client.id}
                      className="hover:bg-blue-50 border-blue-100 transition-colors group"
                    >
                      <TableCell className="font-medium text-blue-900">{client.idNumber || 'לא צוין'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {client.clientType === 'business' ? (
                              <Building2 className="h-4 w-4 text-blue-600" />
                            ) : (
                              <User className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <span className="text-blue-900 font-medium">{client.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {client.clientType === 'individual' ? 'פרטי' : 'עסקי'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-700">{client.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-700">{client.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-900 font-medium">{client.activeCases}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge 
                          className={`${client.status === 'פעיל' ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                        >
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-blue-700">
                        {new Date(client.updatedAt).toLocaleDateString('he-IL')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleViewClient(client.id)}
                            title="צפייה בלקוח"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditClient(client.id)}
                            title="עריכת לקוח"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteClient(client.id, client.name)}
                            title="מחיקת לקוח"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
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
