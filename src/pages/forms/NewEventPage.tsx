import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Calendar, Clock, MapPin, User } from 'lucide-react';

export default function NewEventPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    client: '',
    priority: 'medium',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן יהיה הלוגיקה לשמירת האירוע
    console.log('Saving event:', formData);
    navigate('/calendar');
  };

  const handleCancel = () => {
    navigate('/calendar');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">אירוע חדש</h1>
          <p className="text-blue-600 mt-2">צור אירוע חדש ביומן</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            פרטי האירוע
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-blue-900">כותרת האירוע</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="כותרת האירוע"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-blue-900">סוג האירוע</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג אירוע" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="court">דיון בבית משפט</SelectItem>
                    <SelectItem value="meeting">פגישת לקוח</SelectItem>
                    <SelectItem value="deadline">מועד אחרון</SelectItem>
                    <SelectItem value="consultation">ייעוץ</SelectItem>
                    <SelectItem value="internal">פגישה פנימית</SelectItem>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-blue-900">תאריך</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-blue-900">שעת התחלה</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-blue-900">שעת סיום</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client" className="text-blue-900">לקוח</Label>
                <Select value={formData.client} onValueChange={(value) => setFormData({...formData, client: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר לקוח" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">יוסף אברהם</SelectItem>
                    <SelectItem value="client2">משפחת לוי</SelectItem>
                    <SelectItem value="client3">דוד כהן</SelectItem>
                    <SelectItem value="none">ללא לקוח</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-900 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                מיקום
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="כתובת או מיקום"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-900">תיאור</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="תיאור מפורט של האירוע"
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 ml-2" />
                שמור אירוע
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


