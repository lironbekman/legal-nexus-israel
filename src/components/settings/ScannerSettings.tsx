import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Scan, 
  Settings, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Monitor,
  Printer
} from 'lucide-react';

interface ScannerConfig {
  scannerPath: string;
  resolution: string;
  colorMode: string;
  fileFormat: string;
  autoSave: boolean;
  outputFolder: string;
  enableOCR: boolean;
  ocrLanguage: string;
  compressionLevel: string;
  scannerName: string;
}

export function ScannerSettings() {
  const [config, setConfig] = useState<ScannerConfig>({
    scannerPath: 'C:\\Windows\\System32\\WiaAcmgr.exe',
    resolution: '300',
    colorMode: 'color',
    fileFormat: 'pdf',
    autoSave: true,
    outputFolder: 'C:\\Users\\Documents\\ScannedDocuments',
    enableOCR: false,
    ocrLanguage: 'hebrew',
    compressionLevel: 'medium',
    scannerName: 'ברירת מחדל'
  });

  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Load scanner settings from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('scannerConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Save scanner settings to localStorage
  const saveConfig = () => {
    localStorage.setItem('scannerConfig', JSON.stringify(config));
    alert('הגדרות הסורק נשמרו בהצלחה!');
  };

  // Test scanner connection
  const testScanner = async () => {
    setIsTesting(true);
    setIsConnected(null);
    
    try {
      // Simulate scanner test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - in real implementation, this would test actual scanner
      const success = Math.random() > 0.3; // 70% success rate for demo
      setIsConnected(success);
      
      if (success) {
        alert('הסורק מחובר ופועל תקין!');
      } else {
        alert('לא ניתן להתחבר לסורק. אנא בדוק את החיבור והגדרות.');
      }
    } catch (error) {
      setIsConnected(false);
      alert('שגיאה בבדיקת הסורק');
    } finally {
      setIsTesting(false);
    }
  };

  const resetToDefaults = () => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך לאפס את הגדרות הסורק לברירת המחדל?');
    if (confirmed) {
      setConfig({
        scannerPath: 'C:\\Windows\\System32\\WiaAcmgr.exe',
        resolution: '300',
        colorMode: 'color',
        fileFormat: 'pdf',
        autoSave: true,
        outputFolder: 'C:\\Users\\Documents\\ScannedDocuments',
        enableOCR: false,
        ocrLanguage: 'hebrew',
        compressionLevel: 'medium',
        scannerName: 'ברירת מחדל'
      });
    }
  };

  const getConnectionStatus = () => {
    if (isConnected === null) return null;
    
    return isConnected ? (
      <Badge className="bg-green-500 text-white">
        <CheckCircle className="h-3 w-3 ml-1" />
        מחובר
      </Badge>
    ) : (
      <Badge className="bg-red-500 text-white">
        <XCircle className="h-3 w-3 ml-1" />
        לא מחובר
      </Badge>
    );
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-end">
          <Scan className="h-5 w-5" />
          הגדרות סורק
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanner Connection Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-gray-600" />
            <div className="text-right">
              <p className="font-medium">סטטוס סורק</p>
              <p className="text-sm text-gray-600">{config.scannerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getConnectionStatus()}
            <Button
              variant="outline"
              size="sm"
              onClick={testScanner}
              disabled={isTesting}
            >
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                  בודק...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 ml-2" />
                  בדוק חיבור
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 justify-end">
            <Settings className="h-5 w-5" />
            הגדרות בסיסיות
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scannerPath" className="text-right block">נתיב תוכנת הסריקה</Label>
              <Input
                id="scannerPath"
                value={config.scannerPath}
                onChange={(e) => setConfig({...config, scannerPath: e.target.value})}
                placeholder="C:\\Windows\\System32\\WiaAcmgr.exe"
                className="text-right"
              />
              <p className="text-xs text-gray-500 text-right">
                נתיב לתוכנה שתבצע את הסריקה (WIA או TWAIN)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scannerName" className="text-right block">שם הסורק</Label>
              <Input
                id="scannerName"
                value={config.scannerName}
                onChange={(e) => setConfig({...config, scannerName: e.target.value})}
                placeholder="שם הסורק"
                className="text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resolution" className="text-right block">רזולוציה (DPI)</Label>
              <Select value={config.resolution} onValueChange={(value) => setConfig({...config, resolution: value})}>
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150 DPI - איכות בסיסית</SelectItem>
                  <SelectItem value="300">300 DPI - איכות סטנדרטית</SelectItem>
                  <SelectItem value="600">600 DPI - איכות גבוהה</SelectItem>
                  <SelectItem value="1200">1200 DPI - איכות מקסימלית</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorMode" className="text-right block">מצב צבע</Label>
              <Select value={config.colorMode} onValueChange={(value) => setConfig({...config, colorMode: value})}>
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">צבעוני</SelectItem>
                  <SelectItem value="grayscale">גווני אפור</SelectItem>
                  <SelectItem value="blackwhite">שחור לבן</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileFormat" className="text-right block">פורמט קובץ</Label>
              <Select value={config.fileFormat} onValueChange={(value) => setConfig({...config, fileFormat: value})}>
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="jpg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="tiff">TIFF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-right">הגדרות מתקדמות</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="outputFolder" className="text-right block">תיקיית שמירה</Label>
              <Input
                id="outputFolder"
                value={config.outputFolder}
                onChange={(e) => setConfig({...config, outputFolder: e.target.value})}
                placeholder="C:\\Users\\Documents\\ScannedDocuments"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compressionLevel" className="text-right block">רמת דחיסה</Label>
              <Select value={config.compressionLevel} onValueChange={(value) => setConfig({...config, compressionLevel: value})}>
                <SelectTrigger className="text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">נמוכה - איכות גבוהה</SelectItem>
                  <SelectItem value="medium">בינונית - מאוזן</SelectItem>
                  <SelectItem value="high">גבוהה - קובץ קטן</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 text-right">
                <Label>שמירה אוטומטית</Label>
                <p className="text-sm text-gray-500">
                  שמור מסמכים סרוקים אוטומטית בתיקייה
                </p>
              </div>
              <Switch
                checked={config.autoSave}
                onCheckedChange={(checked) => setConfig({...config, autoSave: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 text-right">
                <Label>זיהוי טקסט (OCR)</Label>
                <p className="text-sm text-gray-500">
                  המר טקסט במסמכים סרוקים לטקסט ניתן לחיפוש
                </p>
              </div>
              <Switch
                checked={config.enableOCR}
                onCheckedChange={(checked) => setConfig({...config, enableOCR: checked})}
              />
            </div>

            {config.enableOCR && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="ocrLanguage" className="text-right block">שפה לזיהוי טקסט</Label>
                <Select value={config.ocrLanguage} onValueChange={(value) => setConfig({...config, ocrLanguage: value})}>
                  <SelectTrigger className="w-[200px] text-right">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hebrew">עברית</SelectItem>
                    <SelectItem value="english">אנגלית</SelectItem>
                    <SelectItem value="arabic">ערבית</SelectItem>
                    <SelectItem value="auto">זיהוי אוטומטי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={saveConfig} className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 ml-2" />
            שמור הגדרות
          </Button>
          <Button variant="outline" onClick={resetToDefaults}>
            איפוס לברירת מחדל
          </Button>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium text-blue-900">עזרה</p>
              <p className="text-sm text-blue-700">
                • וודא שהסורק מחובר למחשב ומותקנים דרייברים מתאימים
              </p>
              <p className="text-sm text-blue-700">
                • לסריקה ישירה, המערכת תשתמש בתוכנת WIA של Windows
              </p>
              <p className="text-sm text-blue-700">
                • ניתן להתאים את הגדרות הסריקה בהתאם לסוג המסמכים
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

