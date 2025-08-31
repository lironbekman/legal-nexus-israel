import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, User } from 'lucide-react';
import { addClient } from '@/lib/dataManager';

export default function NewClientPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    clientType: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the client using dataManager
    const newClient = addClient({
      ...formData,
      status: 'פעיל'
    });
    
    console.log('Client saved:', newClient);
    
    // Navigate back to clients page
    navigate('/clients');
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">לקוח חדש</h1>
          <p className="text-blue-600 mt-2">הוסף לקוח חדש למערכת</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <User className="h-5 w-5" />
            פרטי הלקוח
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-900">שם מלא</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="שם מלא"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-900">אימייל</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-900">טלפון</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="050-1234567"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-blue-900">מספר תעודת זהות</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  placeholder="123456789"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-blue-900">כתובת</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="רחוב ומספר בית"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-blue-900">עיר</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="עיר"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-blue-900">מיקוד</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientType" className="text-blue-900">סוג לקוח</Label>
              <Select value={formData.clientType} onValueChange={(value) => setFormData({...formData, clientType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג לקוח" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">פרטי</SelectItem>
                  <SelectItem value="business">עסקי</SelectItem>
                  <SelectItem value="government">ממשלתי</SelectItem>
                  <SelectItem value="non-profit">ארגון ללא מטרות רווח</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-blue-900">הערות</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="הערות נוספות על הלקוח"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 ml-2" />
                שמור לקוח
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                ביטול
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
