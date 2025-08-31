-- Legal Nexus Israel - Database Setup
-- Run this script in your Supabase SQL Editor

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
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

-- Create permission_groups table
CREATE TABLE IF NOT EXISTS public.permission_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_permissions table
CREATE TABLE IF NOT EXISTS public.user_permissions (
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

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for permission_groups (allow all for now)
CREATE POLICY "Permission groups are viewable by everyone" ON public.permission_groups
  FOR SELECT USING (true);

CREATE POLICY "Permission groups can be inserted by anyone" ON public.permission_groups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permission groups can be updated by anyone" ON public.permission_groups
  FOR UPDATE USING (true);

-- Create policies for user_permissions (allow all for now)
CREATE POLICY "User permissions are viewable by everyone" ON public.user_permissions
  FOR SELECT USING (true);

CREATE POLICY "User permissions can be inserted by anyone" ON public.user_permissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "User permissions can be updated by anyone" ON public.user_permissions
  FOR UPDATE USING (true);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 'client');
  
  -- Create default permissions for the user
  INSERT INTO public.user_permissions (user_id, can_view_dashboard)
  VALUES (NEW.id, true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
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
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_permissions_updated_at ON public.user_permissions;
CREATE TRIGGER update_user_permissions_updated_at 
  BEFORE UPDATE ON public.user_permissions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_permission_groups_updated_at ON public.permission_groups;
CREATE TRIGGER update_permission_groups_updated_at 
  BEFORE UPDATE ON public.permission_groups
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert default permission groups
INSERT INTO public.permission_groups (name, description) VALUES
  ('מנהלים', 'הרשאות מלאות למערכת'),
  ('עורכי דין', 'הרשאות לעריכת תיקים ולקוחות'),
  ('עוזרים', 'הרשאות מוגבלות לצפייה ועריכה בסיסית'),
  ('לקוחות', 'הרשאות צפייה בלבד')
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully!' as result;
