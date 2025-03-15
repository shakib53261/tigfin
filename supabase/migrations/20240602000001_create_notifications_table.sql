-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('payment', 'project', 'approval', 'system')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  action_required BOOLEAN NOT NULL DEFAULT FALSE,
  related_id TEXT,
  related_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);
CREATE INDEX IF NOT EXISTS notifications_type_idx ON notifications(type);

-- Enable row level security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their notifications
DROP POLICY IF EXISTS "Users can only view their own notifications" ON notifications;
CREATE POLICY "Users can only view their own notifications"
  ON notifications FOR ALL
  USING (auth.uid() = user_id);

-- Enable realtime subscriptions
alter publication supabase_realtime add table notifications;