import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, User } from 'lucide-react';
import { getClients, updateClient } from '@/lib/dataManager';

export default function EditClientPage() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    clientType: 'individual',
    notes: '',
    status: 'פעיל'
  });

  useEffect(() => {
    if (clientId) {
      const clients = getClients();
      const client = clients.find(c => c.id === clientId);
      
      if (client) {
        setFormData({
          name: client.name,
          email: client.email,
          phone: client.phone,
          idNumber: client.idNumber,
          address: client.address,
          city: client.city,
          postalCode: client.postalCode,
          clientType: client.clientType,
          notes: client.notes,
          status: client.status
        });
        setLoading(false);
      } else {
        // Client not found, redirect back
        alert('לקוח לא נמצא');
        navigate('/clients');
      }
    }
  }, [clientId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId) return;
    
    // Update the client using dataManager
    const updatedClient = updateClient(clientId, formData);
    
    if (updatedClient) {
      console.log('Client updated:', updatedClient);
      alert('הלקוח עודכן בהצלחה');
      // Navigate back to clients page
      navigate('/clients');
    } else {
      alert('שגיאה בעדכון הלקוח');
    }
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center">
          <p>טוען נתוני לקוח...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">עריכת לקוח</h1>
          <p className="text-blue-600 mt-2">עדכן פרטי הלקוח במערכת</p>
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
                <Label htmlFor="idNumber" className="text-blue-900">תעודת זהות</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  placeholder="123456789"
                  required
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-blue-900">עיר</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="תל אביב"
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

              <div className="space-y-2">
                <Label htmlFor="clientType" className="text-blue-900">סוג לקוח</Label>
                <Select value={formData.clientType} onValueChange={(value) => setFormData({...formData, clientType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">פרטי</SelectItem>
                    <SelectItem value="business">עסקי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-blue-900">סטטוס</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="פעיל">פעיל</SelectItem>
                  <SelectItem value="לא פעיל">לא פעיל</SelectItem>
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
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 ml-2" />
                עדכן לקוח
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
