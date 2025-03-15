-- This migration fixes the error with employees already being in the realtime publication
-- by first removing it and then adding it back to ensure consistency

ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS employees;
ALTER PUBLICATION supabase_realtime ADD TABLE employees;
