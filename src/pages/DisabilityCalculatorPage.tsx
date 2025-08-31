import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2, Plus, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DisabilityEntry {
  id: string;
  percentage: number;
  previousCondition: number;
}

type CommitteeType = 'work-injury' | 'income-tax' | 'general-disability' | 'special-services' | 'hostility-victims';

const COMMITTEE_TYPES = {
  'work-injury': 'נפגעי עבודה',
  'income-tax': 'מס הכנסה',
  'general-disability': 'נכות כללית',
  'special-services': 'שירותים מיוחדים',
  'hostility-victims': 'נפגעי איבה'
};

export default function DisabilityCalculatorPage() {
  const [committeeType, setCommitteeType] = useState<CommitteeType | ''>('');
  const [currentPercentage, setCurrentPercentage] = useState('');
  const [currentPrevious, setCurrentPrevious] = useState('');
  const [entries, setEntries] = useState<DisabilityEntry[]>([]);
  const [regulation15Addition, setRegulation15Addition] = useState<'none' | '1/4' | '1/3' | '1/2'>('none');
  const { toast } = useToast();

  const addEntry = () => {
    if (!currentPercentage || Number(currentPercentage) < 0 || Number(currentPercentage) > 100) {
      toast({
        title: "שגיאה",
        description: "אנא הכנס אחוז נכות תקין (0-100)",
        variant: "destructive"
      });
      return;
    }

    const newEntry: DisabilityEntry = {
      id: Date.now().toString(),
      percentage: Number(currentPercentage),
      previousCondition: Number(currentPrevious) || 0
    };

    setEntries([...entries, newEntry]);
    setCurrentPercentage('');
    setCurrentPrevious('');
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const calculateWeightedDisability = () => {
    if (entries.length === 0) return { intermediate: 0, final: 0 };

    // חישוב נכות משוקללת לפי הנוסחה הרפואית
    let totalDisability = 0;
    let remainingCapacity = 100;

    // מיון הערכים בסדר יורד
    const sortedEntries = [...entries].sort((a, b) => 
      (b.percentage - b.previousCondition) - (a.percentage - a.previousCondition)
    );

    for (const entry of sortedEntries) {
      const actualDisability = entry.percentage - entry.previousCondition;
      if (actualDisability > 0) {
        const weightedAddition = (actualDisability * remainingCapacity) / 100;
        totalDisability += weightedAddition;
        remainingCapacity -= weightedAddition;
      }
    }

    // תוספת תקנה 15 (רק לנפגעי עבודה)
    let finalDisability = totalDisability;
    if (committeeType === 'work-injury' && regulation15Addition !== 'none') {
      const additionMultiplier = {
        '1/4': 0.25,
        '1/3': 0.33333,
        '1/2': 0.5
      }[regulation15Addition];
      
      finalDisability = totalDisability + (totalDisability * additionMultiplier);
    }

    // עיגול לפי הכללים
    let roundedFinal = finalDisability;
    if (committeeType === 'work-injury') {
      // עיגול ל-5% הקרובים ביותר
      roundedFinal = Math.round(finalDisability / 5) * 5;
    } else {
      // עיגול רגיל למספר שלם
      roundedFinal = Math.round(finalDisability);
    }

    return {
      intermediate: Math.round(totalDisability * 100) / 100,
      final: Math.min(100, roundedFinal)
    };
  };

  const resetCalculation = () => {
    setEntries([]);
    setCurrentPercentage('');
    setCurrentPrevious('');
    setRegulation15Addition('none');
  };

  const result = calculateWeightedDisability();

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-blue-600" />
          מחשבון נכות משוקללת
        </h1>
        <p className="text-black">
          מחשבון לחישוב נכות משוקללת בהתאם לתקנות הביטוח הלאומי ורשות המסים
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* הגדרות ראשיות */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-black">בחירת סוג וועדה</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div>
              <Label htmlFor="committee-type" className="text-black">סוג הוועדה הרפואית</Label>
              <Select value={committeeType} onValueChange={(value: CommitteeType) => setCommitteeType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג וועדה" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COMMITTEE_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {committeeType === 'work-injury' && (
              <div>
                <Label className="text-black">תוספת תקנה 15</Label>
                <RadioGroup value={regulation15Addition} onValueChange={(value: string) => setRegulation15Addition(value as 'none' | '1/4' | '1/3' | '1/2')}>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="text-black">ללא</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="1/4" id="quarter" />
                    <Label htmlFor="quarter" className="text-black">1/4</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="1/3" id="third" />
                    <Label htmlFor="third" className="text-black">1/3</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="1/2" id="half" />
                    <Label htmlFor="half" className="text-black">1/2</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </CardContent>
        </Card>

        {/* הוספת נכויות */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-black">הוספת נכויות</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="percentage" className="text-black">אחוז הנכות (%)</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={currentPercentage}
                  onChange={(e) => setCurrentPercentage(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="previous" className="text-black">מצב קודם (%)</Label>
                <Input
                  id="previous"
                  type="number"
                  min="0"
                  max="100"
                  value={currentPrevious}
                  onChange={(e) => setCurrentPrevious(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <Button onClick={addEntry} disabled={!committeeType || !currentPercentage} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 ml-2" />
              הוסף נכות
            </Button>
          </CardContent>
        </Card>

        {/* רשימת נכויות */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-black">רשימת נכויות שהוכנסו</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            {entries.length === 0 ? (
              <p className="text-black text-center py-4">לא הוכנסו נכויות עדיין</p>
            ) : (
              <div className="space-y-2">
                {entries.map((entry, index) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex gap-4">
                      <span className="font-medium text-black">נכות {index + 1}:</span>
                      <span className="text-black">{entry.percentage}%</span>
                      {entry.previousCondition > 0 && (
                        <span className="text-gray-600">(מצב קודם: {entry.previousCondition}%)</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* תוצאות */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-black">תוצאות החישוב</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-black">תוצאת ביניים (אריתמטית)</Label>
                <p className="text-2xl font-bold text-black">{result.intermediate}%</p>
              </div>
              
              {committeeType === 'work-injury' && regulation15Addition !== 'none' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Label className="text-sm font-medium text-blue-700">תוספת תקנה 15</Label>
                  <p className="text-lg font-medium text-blue-700">{regulation15Addition}</p>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Label className="text-sm font-medium text-blue-700">נכות משוקללת סופית</Label>
                <p className="text-3xl font-bold text-blue-600">{result.final}%</p>
              </div>
            </div>
            
            <Button onClick={resetCalculation} variant="outline" className="w-full bg-white text-black border-gray-300 hover:bg-gray-50">
              חישוב חדש
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* הסברים והערות */}
      <Card className="mt-6 bg-white border border-gray-200">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-black">הערות חשובות</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="prose prose-sm max-w-none">
            <ul className="space-y-2 text-black">
              <li>• מחשבון הנכות המשוקללת מציג שתי תוצאות: תוצאת ביניים (אריתמטית) ונכות משוקללת ומעוגלת</li>
              <li>• נכות משוקללת עבור פגיעה בעבודה, פטור ממס הכנסה ונכות כללית נקבעת על פי ספר המבחנים</li>
              <li>• במחשבון נכות לנפגעי עבודה מוצגת נכות משוקללת מעוגלת לאחר הפחתת נכות בגין מצב קודם ותוספת נכות בגין תקנה 15</li>
              <li>• נכות משוקללת בעניין נפגעי איבה נקבעת על פי תקנות הנכים (מבחנים לקביעת דרגת נכות)</li>
              <li>• בעת השימוש במחשבון נכות כללית ובמחשבון נכות לשירותים מיוחדים, יש לשים לב לא לכלול בחישוב סעיפי ליקוי מנופים</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}