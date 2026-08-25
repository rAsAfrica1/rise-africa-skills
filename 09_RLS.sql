-- Enable Row Level Security with public read access (content is reference data).
-- Run AFTER all data is loaded.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['course_business_profiles','startup_templates','viability_checklists',
                           'seed_record_templates','resources','quizzes','quiz_questions',
                           'case_studies','videos']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', t||'_read', t);
    EXECUTE format('CREATE POLICY %I ON %I FOR SELECT TO anon, authenticated USING (true)', t||'_read', t);
  END LOOP;
END $$;
