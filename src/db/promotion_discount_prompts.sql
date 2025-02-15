-- Create promotion_discount_prompts table
CREATE TABLE promotion_discount_prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id TEXT NOT NULL,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_promotion_discount_prompts_updated_at
    BEFORE UPDATE ON promotion_discount_prompts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();