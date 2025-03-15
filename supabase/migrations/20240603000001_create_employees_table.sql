CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  start_date DATE NOT NULL,
  phone_number TEXT,
  address TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view all employees" ON employees;
CREATE POLICY "Users can view all employees"
  ON employees FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert employees" ON employees;
CREATE POLICY "Authenticated users can insert employees"
  ON employees FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update employees" ON employees;
CREATE POLICY "Authenticated users can update employees"
  ON employees FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Add to realtime publication
alter publication supabase_realtime add table employees;
