-- ============================================================
-- STEP 3 of 3 — build the 460 videos, then verify everything.
-- Run this AFTER step 2 (loading files 01 - 07).
-- No file needed: the videos are generated from your 46 courses.
-- ============================================================

DELETE FROM videos;

INSERT INTO videos
  (course_id, title, description, video_type, video_url,
   duration_minutes, key_takeaways, status, is_featured)
SELECT
  c.course_id,
  CASE WHEN n <= 3 THEN 'Video ' || n
       ELSE 'Founder Story ' || (n - 3) END,
  'Course content and learning material for module ' || n,
  CASE WHEN n = 1 THEN 'intro'
       WHEN n <= 3 THEN 'lesson'
       ELSE 'case_study' END,
  'https://youtu.be/video-' || lpad(c.idx::text, 2, '0')
                            || '-' || lpad(n::text, 2, '0'),
  CASE WHEN n = 1 THEN 12 WHEN n <= 3 THEN 15 ELSE 18 END,
  'Key learnings from video ' || n,
  'Published',
  (n = 1)
FROM (
  SELECT course_id,
         (ROW_NUMBER() OVER (ORDER BY course_id) - 1) AS idx
  FROM course_business_profiles
) c
CROSS JOIN generate_series(1, 10) AS n;


-- ============================================================
-- FINAL VERIFICATION
-- ============================================================
SELECT 'courses'                  AS table_name, COUNT(*) AS rows, 46   AS expected FROM courses
UNION ALL SELECT 'course_business_profiles', COUNT(*), 46   FROM course_business_profiles
UNION ALL SELECT 'startup_templates',        COUNT(*), 46   FROM startup_templates
UNION ALL SELECT 'viability_checklists',     COUNT(*), 46   FROM viability_checklists
UNION ALL SELECT 'seed_record_templates',    COUNT(*), 322  FROM seed_record_templates
UNION ALL SELECT 'resources',                COUNT(*), 322  FROM resources
UNION ALL SELECT 'quizzes',                  COUNT(*), 920  FROM quizzes
UNION ALL SELECT 'quiz_questions',           COUNT(*), 7360 FROM quiz_questions
UNION ALL SELECT 'case_studies',             COUNT(*), 230  FROM case_studies
UNION ALL SELECT 'videos',                   COUNT(*), 460  FROM videos
ORDER BY 1;

-- Orphan check — every one of these must return 0.
SELECT
  (SELECT COUNT(*) FROM course_business_profiles p
     WHERE NOT EXISTS (SELECT 1 FROM courses c WHERE c.id = p.course_id)) AS orphan_profiles,
  (SELECT COUNT(*) FROM videos v
     WHERE NOT EXISTS (SELECT 1 FROM courses c WHERE c.id = v.course_id)) AS orphan_videos,
  (SELECT COUNT(*) FROM quizzes q
     WHERE NOT EXISTS (SELECT 1 FROM courses c WHERE c.id = q.course_id)) AS orphan_quizzes;
