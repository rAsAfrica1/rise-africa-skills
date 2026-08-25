-- ============================================================
-- RISE AFRICA SKILLS — SCHEMA (matches the SIMPLE_LAYER data files)
-- Run this FIRST in the Supabase SQL Editor.
-- Safe to re-run: everything is IF NOT EXISTS.
-- ============================================================

-- Prereq: your `courses` table must already contain the 46 courses
-- whose UUIDs the data files reference. Check before loading:
--   SELECT count(*) FROM courses;   -- expect >= 46

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS course_business_profiles (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  business_description TEXT,
  market_size TEXT,
  target_customer TEXT,
  competitive_landscape TEXT,
  unique_selling_proposition TEXT,
  revenue_model TEXT,
  scalability_potential TEXT,
  success_rate INTEGER CHECK (success_rate BETWEEN 0 AND 100),
  time_to_profitability_months INTEGER,
  avg_startup_investment INTEGER,
  avg_monthly_revenue INTEGER,
  profitability_timeline TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (course_id)
);
CREATE INDEX IF NOT EXISTS idx_cbp_course ON course_business_profiles(course_id);

-- 2 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS startup_templates (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  initial_investment_breakdown JSONB,
  equipment_checklist JSONB,
  material_sourcing_guide JSONB,
  week_by_week_timeline JSONB,
  critical_success_factors JSONB,
  common_mistakes JSONB,
  supplier_contacts JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (course_id)
);
CREATE INDEX IF NOT EXISTS idx_st_course ON startup_templates(course_id);

-- 3 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS viability_checklists (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  prerequisite_skills JSONB,
  capital_requirement_min INTEGER,
  capital_requirement_recommended INTEGER,
  capital_requirement_ideal INTEGER,
  space_requirements JSONB,
  time_commitment_hours_per_week INTEGER,
  legal_requirements JSONB,
  safety_considerations JSONB,
  family_lifestyle_impact TEXT,
  risk_assessment JSONB,
  resource_availability TEXT,
  market_validation_steps JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (course_id)
);
CREATE INDEX IF NOT EXISTS idx_vc_course ON viability_checklists(course_id);

-- 4 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS seed_record_templates (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  template_description TEXT,
  expense_categories JSONB,
  revenue_categories JSONB,
  tracking_metrics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_srt_course ON seed_record_templates(course_id);

-- 5 ---------------------------------------------------------
-- NOTE: the data file inserts into `resources` (not `seed_resources`)
-- and includes description / pricing / link_url columns.
CREATE TABLE IF NOT EXISTS resources (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  resource_type TEXT,
  resource_name TEXT NOT NULL,
  description TEXT,
  supplier_name TEXT,
  contact_info JSONB,
  pricing TEXT,
  estimated_delivery_days INTEGER,
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  availability_status TEXT,
  link_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_res_course ON resources(course_id);
CREATE INDEX IF NOT EXISTS idx_res_type ON resources(resource_type);

-- 6 ---------------------------------------------------------
-- NOTE: quiz_category / difficulty_level / quiz_sequence are required
-- by the data file and were missing from the earlier schema draft.
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score FLOAT DEFAULT 70.0 CHECK (passing_score BETWEEN 0 AND 100),
  duration_minutes INTEGER,
  quiz_category TEXT,
  difficulty_level TEXT,
  quiz_sequence INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS quiz_category   TEXT;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS difficulty_level TEXT;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS quiz_sequence    INTEGER;
CREATE INDEX IF NOT EXISTS idx_quiz_course ON quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_seq ON quizzes(course_id, quiz_sequence);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  order_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_qq_quiz ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_qq_order ON quiz_questions(quiz_id, order_number);

-- 7 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_studies (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  founder_name TEXT,
  founder_location TEXT,
  founder_background TEXT,
  initial_investment INTEGER,
  startup_timeline_days INTEGER,
  year_1_revenue INTEGER,
  year_1_profit INTEGER,
  year_2_revenue INTEGER,
  year_3_revenue INTEGER,
  current_monthly_income INTEGER,
  current_employees INTEGER,
  key_success_factors JSONB,
  challenges_faced JSONB,
  solutions_implemented JSONB,
  lessons_learned JSONB,
  photos_url TEXT,
  testimonial TEXT,
  contact_info TEXT,
  available_for_mentorship BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS photos_url TEXT;
CREATE INDEX IF NOT EXISTS idx_cs_course ON case_studies(course_id);

-- 8 ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_type TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  key_takeaways TEXT,
  status TEXT DEFAULT 'Draft',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_vid_course ON videos(course_id);
CREATE INDEX IF NOT EXISTS idx_vid_featured ON videos(is_featured);
