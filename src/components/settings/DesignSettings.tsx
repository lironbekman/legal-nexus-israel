import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Palette, RotateCcw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DesignSettings() {
  const [logo, setLogo] = useState<string | null>(null);
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#eff6ff',
    accent: '#dbeafe',
    background: '#f0f9ff'
  });
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Load saved colors or use clean defaults
  useEffect(() => {
    const savedColors = localStorage.getItem('app-colors');
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors);
        setColors(parsedColors);
        applyColors(parsedColors);
      } catch (e) {
        // If parsing fails, use default clean colors
        const defaultColors = {
          primary: '#3b82f6',
          secondary: '#f8fafc',
          accent: '#f8fafc',
          background: '#f9fafb'
        };
        setColors(defaultColors);
        applyColors(defaultColors);
      }
    }
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "שגיאה",
          description: "קובץ הלוגו גדול מדי. מקסימום 2MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogo(result);
        localStorage.setItem('app-logo', result);
        toast({
          title: "הצלחה",
          description: "הלוגו הועלה בהצלחה"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorKey: string, value: string) => {
    const newColors = { ...colors, [colorKey]: value };
    setColors(newColors);
    
    if (previewMode) {
      applyColors(newColors);
    }
  };

  const applyColors = (colorSet: typeof colors) => {
    const root = document.documentElement;
    
    // Convert hex to HSL and apply
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s;
      const l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHsl(colorSet.primary));
    root.style.setProperty('--secondary', hexToHsl(colorSet.secondary));
    root.style.setProperty('--accent', hexToHsl(colorSet.accent));
    root.style.setProperty('--background', hexToHsl(colorSet.background));
  };

  const saveColors = () => {
    localStorage.setItem('app-colors', JSON.stringify(colors));
    applyColors(colors);
    toast({
      title: "הצלחה",
      description: "צבעי המערכת נשמרו בהצלחה"
    });
  };

  const resetColors = () => {
    const defaultColors = {
      primary: '#3b82f6',
      secondary: '#eff6ff',
      accent: '#dbeafe',
      background: '#f0f9ff'
    };
    setColors(defaultColors);
    localStorage.removeItem('app-colors');
    
    // Reset to default CSS variables
    const root = document.documentElement;
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--background');
    
    toast({
      title: "הצלחה",
      description: "הצבעים אופסו לברירת המחדל"
    });
  };

  const removeLogo = () => {
    setLogo(null);
    localStorage.removeItem('app-logo');
    toast({
      title: "הצלחה",
      description: "הלוגו הוסר"
    });
  };

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            לוגו המערכת
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="logo-upload">העלאת לוגו (PNG, JPG - מקסימום 2MB)</Label>
              <input
                ref={fileInputRef}
                id="logo-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full mt-2"
              >
                <Upload className="h-4 w-4 ml-2" />
                בחר קובץ
              </Button>
            </div>
            
            {logo && (
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
                <img
                  src={logo}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>

          {logo && (
            <Button onClick={removeLogo} variant="destructive">
              הסר לוגו
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            צבעי המערכת
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color">צבע ראשי</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="primary-color"
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1"
                  placeholder="#6366f1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">צבע משני</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="secondary-color"
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1"
                  placeholder="#f3f4f6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent-color">צבע הדגשה</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="accent-color"
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1"
                  placeholder="#f5f7fa"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="background-color">רקע ראשי</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="background-color"
                  type="color"
                  value={colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1"
                  placeholder="#f9fafb"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => {
                setPreviewMode(!previewMode);
                if (!previewMode) {
                  applyColors(colors);
                }
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {previewMode ? 'עצור תצוגה מקדימה' : 'תצוגה מקדימה'}
            </Button>
            
            <Button onClick={saveColors} className="flex items-center gap-2">
              שמור צבעים
            </Button>
            
            <Button onClick={resetColors} variant="destructive" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              איפוס לברירת מחדל
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}