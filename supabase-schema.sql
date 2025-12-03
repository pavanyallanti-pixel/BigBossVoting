-- Discussions table (matching your existing schema)
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id TEXT DEFAULT 'main',
  parent_id UUID,
  parent_type TEXT,
  author_name TEXT DEFAULT 'Anonymous',
  author_email TEXT,
  text TEXT NOT NULL,
  item_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_discussions_parent_id ON discussions(parent_id);
CREATE INDEX idx_discussions_poll_id ON discussions(poll_id);
CREATE INDEX idx_discussions_item_type ON discussions(item_type);

-- Votes table (unified likes and dislikes)
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  vote_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(discussion_id, session_id, vote_type)
);

-- Enable RLS
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies - PUBLIC ACCESS
CREATE POLICY "discussions_read" ON discussions FOR SELECT USING (true);
CREATE POLICY "discussions_insert" ON discussions FOR INSERT WITH CHECK (true);
CREATE POLICY "votes_read" ON votes FOR SELECT USING (true);
CREATE POLICY "votes_insert" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "votes_delete" ON votes FOR DELETE USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE discussions;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
