
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const contacts = [
  {
    id: 1,
    name: 'שרה כהן',
    role: 'עורכת דין בכירה',
    avatar: '👩‍💼',
    status: 'online'
  },
  {
    id: 2,
    name: 'דוד לוי',
    role: 'עורך דין',
    avatar: '👨‍💼',
    status: 'offline'
  },
  {
    id: 3,
    name: 'רחל אברהם',
    role: 'עוזרת משפטית',
    avatar: '👩‍💻',
    status: 'online'
  },
  {
    id: 4,
    name: 'משה גרינברג',
    role: 'עורך דין',
    avatar: '👨‍💼',
    status: 'offline'
  },
  {
    id: 5,
    name: 'מירי יוסף',
    role: 'מזכירה משפטית',
    avatar: '👩‍💼',
    status: 'online'
  }
];

export function ContactsList() {
  return (
    <div className="modern-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900 font-display">צוות המשרד</h3>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          צפה עוד
        </Button>
      </div>
      
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  {contact.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
