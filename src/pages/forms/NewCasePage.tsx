import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Save, X, Users, Plus } from 'lucide-react';
import { addCase, getClients, Client, addClient } from '@/lib/dataManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function NewCasePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    caseType: '',
    priority: 'medium',
    description: '',
    estimatedDuration: '',
    budget: ''
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    clientType: 'individual',
    notes: ''
  });

  // Load clients on component mount
  useEffect(() => {
    const loadedClients = getClients();
    setClients(loadedClients);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the case using dataManager
    const newCase = addCase({
      ...formData,
      status: 'בטיפול'
    });
    
    console.log('Case saved:', newCase);
    
    // Navigate back to cases page
    navigate('/cases');
  };

  const handleCancel = () => {
    navigate('/cases');
  };

  const handleCreateNewClient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newClient = addClient(newClientData);
      setClients([...clients, newClient]);
      setFormData({ ...formData, client: newClient.name });
      setShowNewClientDialog(false);
      setNewClientData({
        name: '',
        email: '',
        phone: '',
        idNumber: '',
        address: '',
        city: '',
        postalCode: '',
        clientType: 'individual',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating client:', error);
      alert('שגיאה ביצירת הלקוח');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">תיק חדש</h1>
          <p className="text-blue-600 mt-2">צור תיק משפטי חדש</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-blue-900">פרטי התיק</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-blue-900">כותרת התיק</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="כותרת התיק"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client" className="text-blue-900">שם הלקוח</Label>
                <div className="flex gap-2">
                  <Select value={formData.client} onValueChange={(value) => setFormData({...formData, client: value})}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="בחר לקוח קיים או צור חדש" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.name}>
                          <div className="flex items-center gap-2">
                            <span>{client.name}</span>
                            <span className="text-xs text-gray-500">({client.phone})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="icon" title="צור לקוח חדש">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>לקוח חדש</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateNewClient} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newClientName">שם מלא *</Label>
                            <Input
                              id="newClientName"
                              value={newClientData.name}
                              onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                              placeholder="שם מלא"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newClientPhone">טלפון</Label>
                            <Input
                              id="newClientPhone"
                              value={newClientData.phone}
                              onChange={(e) => setNewClientData({...newClientData, phone: e.target.value})}
                              placeholder="05X-XXXXXXX"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newClientEmail">אימייל</Label>
                            <Input
                              id="newClientEmail"
                              type="email"
                              value={newClientData.email}
                              onChange={(e) => setNewClientData({...newClientData, email: e.target.value})}
                              placeholder="example@email.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newClientId">ת.ז.</Label>
                            <Input
                              id="newClientId"
                              value={newClientData.idNumber}
                              onChange={(e) => setNewClientData({...newClientData, idNumber: e.target.value})}
                              placeholder="123456789"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newClientAddress">כתובת</Label>
                          <Input
                            id="newClientAddress"
                            value={newClientData.address}
                            onChange={(e) => setNewClientData({...newClientData, address: e.target.value})}
                            placeholder="רחוב ומספר"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newClientCity">עיר</Label>
                            <Input
                              id="newClientCity"
                              value={newClientData.city}
                              onChange={(e) => setNewClientData({...newClientData, city: e.target.value})}
                              placeholder="עיר"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newClientType">סוג לקוח</Label>
                            <Select value={newClientData.clientType} onValueChange={(value) => setNewClientData({...newClientData, clientType: value})}>
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
                          <Label htmlFor="newClientNotes">הערות</Label>
                          <Textarea
                            id="newClientNotes"
                            value={newClientData.notes}
                            onChange={(e) => setNewClientData({...newClientData, notes: e.target.value})}
                            placeholder="הערות נוספות"
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="h-4 w-4 ml-2" />
                            שמור לקוח
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setShowNewClientDialog(false)}>
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseType" className="text-blue-900">סוג התיק</Label>
                <Select value={formData.caseType} onValueChange={(value) => setFormData({...formData, caseType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג תיק" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civil">תביעה אזרחית</SelectItem>
                    <SelectItem value="real-estate">עסקאות מקרקעין</SelectItem>
                    <SelectItem value="criminal">פלילי</SelectItem>
                    <SelectItem value="tax">מיסים</SelectItem>
                    <SelectItem value="labor">דיני עבודה</SelectItem>
                    <SelectItem value="family">דיני משפחה</SelectItem>
                    <SelectItem value="corporate">חברות</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-blue-900">עדיפות</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">נמוכה</SelectItem>
                    <SelectItem value="medium">בינונית</SelectItem>
                    <SelectItem value="high">גבוהה</SelectItem>
                    <SelectItem value="urgent">דחופה</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-900">תיאור התיק</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="תיאור מפורט של התיק"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration" className="text-blue-900">משך משוער</Label>
                <Input
                  id="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
                  placeholder="למשל: 3 חודשים"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-blue-900">תקציב משוער</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="₪"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 ml-2" />
                שמור תיק
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
