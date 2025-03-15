CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  period TEXT NOT NULL,
  category TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS budget_expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID REFERENCES budgets(id) ON DELETE CASCADE,
  expense_id UUID,
  amount DECIMAL(12,2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

DROP POLICY IF EXISTS "Users can view their own budgets" ON budgets;
CREATE POLICY "Users can view their own budgets"
  ON budgets
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own budgets" ON budgets;
CREATE POLICY "Users can insert their own budgets"
  ON budgets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own budgets" ON budgets;
CREATE POLICY "Users can update their own budgets"
  ON budgets
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own budgets" ON budgets;
CREATE POLICY "Users can delete their own budgets"
  ON budgets
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own budget expenses" ON budget_expenses;
CREATE POLICY "Users can view their own budget expenses"
  ON budget_expenses
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM budgets
    WHERE budgets.id = budget_expenses.budget_id
    AND budgets.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can insert their own budget expenses" ON budget_expenses;
CREATE POLICY "Users can insert their own budget expenses"
  ON budget_expenses
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM budgets
    WHERE budgets.id = budget_expenses.budget_id
    AND budgets.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete their own budget expenses" ON budget_expenses;
CREATE POLICY "Users can delete their own budget expenses"
  ON budget_expenses
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM budgets
    WHERE budgets.id = budget_expenses.budget_id
    AND budgets.user_id = auth.uid()
  ));

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_expenses ENABLE ROW LEVEL SECURITY;

alter publication supabase_realtime add table budgets;
alter publication supabase_realtime add table budget_expenses;