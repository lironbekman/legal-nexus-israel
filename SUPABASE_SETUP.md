# הגדרת Supabase למערכת ניהול המשתמשים

## סקירה כללית
המערכת מוכנה לעבוד עם Supabase Auth וטבלאות משתמשים. כרגע היא פועלת במצב mock, אבל ניתן להתחבר לSupabase אמיתי.

## שלבי ההגדרה

### 1. יצירת פרויקט Supabase
1. היכנס לאתר [Supabase](https://supabase.com)
2. צור פרויקט חדש
3. השג את ה-URL וה-API Key מהגדרות הפרויקט

### 2. הגדרת משתני סביבה
צור קובץ `.env` בשורש הפרויקט:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. יצירת טבלאות בSupabase

#### טבלת profiles (פרופילי משתמשים)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('client', 'assistant', 'lawyer', 'admin')) NOT NULL DEFAULT 'client',
  phone TEXT,
  department TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  birth_date DATE,
  id_number TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

#### טבלת user_permissions (הרשאות משתמשים)
```sql
CREATE TABLE user_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  can_view_dashboard BOOLEAN DEFAULT true,
  can_view_cases BOOLEAN DEFAULT false,
  can_edit_cases BOOLEAN DEFAULT false,
  can_delete_cases BOOLEAN DEFAULT false,
  can_view_clients BOOLEAN DEFAULT false,
  can_edit_clients BOOLEAN DEFAULT false,
  can_view_reports BOOLEAN DEFAULT false,
  can_edit_reports BOOLEAN DEFAULT false,
  can_view_documents BOOLEAN DEFAULT false,
  can_edit_documents BOOLEAN DEFAULT false,
  can_view_calendar BOOLEAN DEFAULT false,
  can_edit_calendar BOOLEAN DEFAULT false,
  can_view_billing BOOLEAN DEFAULT false,
  can_edit_billing BOOLEAN DEFAULT false,
  can_view_time_tracking BOOLEAN DEFAULT false,
  can_edit_time_tracking BOOLEAN DEFAULT false,
  can_view_legal_library BOOLEAN DEFAULT false,
  can_edit_legal_library BOOLEAN DEFAULT false,
  can_view_disability_calculator BOOLEAN DEFAULT false,
  can_edit_disability_calculator BOOLEAN DEFAULT false,
  can_manage_users BOOLEAN DEFAULT false,
  can_manage_permission_groups BOOLEAN DEFAULT false,
  can_manage_system_settings BOOLEAN DEFAULT false,
  can_view_audit_logs BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own permissions" ON user_permissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all permissions" ON user_permissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage permissions" ON user_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

#### טבלת permission_groups (קבוצות הרשאות)
```sql
CREATE TABLE permission_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE permission_groups ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Admins can manage permission groups" ON permission_groups
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default permission groups
INSERT INTO permission_groups (name, description) VALUES
  ('מנהלים', 'הרשאות מלאות למערכת'),
  ('עורכי דין', 'הרשאות לעריכת תיקים ולקוחות'),
  ('עוזרים', 'הרשאות מוגבלות לצפייה ועריכה בסיסית'),
  ('לקוחות', 'הרשאות צפייה בלבד');
```

### 4. הגדרת פונקציות (Functions)
```sql
-- Function to create profile automatically when user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 'client');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_permissions_updated_at BEFORE UPDATE ON user_permissions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_permission_groups_updated_at BEFORE UPDATE ON permission_groups
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

### 5. הגדרת Auth Policies
ב-Supabase Dashboard:
1. עבור ל-Authentication > Settings
2. ודא ש-"Enable email confirmations" מופעל
3. הגדר "Site URL" לכתובת האתר שלך
4. הגדר "Redirect URLs" אם נדרש

### 6. בדיקת החיבור
לאחר הגדרת משתני הסביבה, המערכת תתחבר אוטומטית לSupabase.
תוכל לבדוק את החיבור בקונסול הדפדפן - אמור להיות כתוב "Supabase client initialized successfully".

## תכונות זמינות

### יצירת משתמשים
- הטופס ליצירת משתמש חדש כולל שדות סיסמה
- המשתמש נוצר בטבלת auth.users של Supabase
- פרופיל נוצר אוטומטית בטבלת profiles
- הרשאות ברירת מחדל מוגדרות לפי התפקיד

### ניהול הרשאות
- הרשאות מפורטות לכל חלק במערכת
- קבוצות הרשאות מוכנות מראש
- אפשרות להגדיר הרשאות אישיות

### אבטחה
- Row Level Security (RLS) מופעל על כל הטבלאות
- משתמשים רואים רק את המידע המותר להם
- מנהלים יכולים לנהל את כל המשתמשים

## פתרון בעיות

### בעיות חיבור
1. ודא שמשתני הסביבה מוגדרים נכון
2. בדוק שה-URL וה-API Key נכונים
3. ודא שהטבלאות נוצרו בSupabase

### בעיות הרשאות
1. ודא ש-RLS מופעל על הטבלאות
2. בדוק שה-Policies מוגדרות נכון
3. ודא שיש משתמש admin במערכת

### בעיות יצירת משתמשים
1. ודא שיש הרשאות admin במערכת
2. בדוק שהפונקציה handle_new_user פועלת
3. ודא שהטריגר on_auth_user_created קיים

## הערות חשובות
- המערכת תמשיך לפעול במצב mock עד להגדרת משתני הסביבה
- כל הנתונים במצב mock נשמרים ב-localStorage
- לאחר החיבור לSupabase, כל הנתונים יעברו למסד הנתונים האמיתי