-- Expected: 46 / 46 / 46 / 322 / 322 / 920 / 7360 / 230 / 460  = 10,752
SELECT 'course_business_profiles' AS table_name, COUNT(*) FROM course_business_profiles
UNION ALL SELECT 'startup_templates',    COUNT(*) FROM startup_templates
UNION ALL SELECT 'viability_checklists', COUNT(*) FROM viability_checklists
UNION ALL SELECT 'seed_record_templates',COUNT(*) FROM seed_record_templates
UNION ALL SELECT 'resources',            COUNT(*) FROM resources
UNION ALL SELECT 'quizzes',              COUNT(*) FROM quizzes
UNION ALL SELECT 'quiz_questions',       COUNT(*) FROM quiz_questions
UNION ALL SELECT 'case_studies',         COUNT(*) FROM case_studies
UNION ALL SELECT 'videos',               COUNT(*) FROM videos
ORDER BY 1;

-- Orphan check (must return 0 rows)
SELECT 'orphan_profiles' AS check, course_id FROM course_business_profiles
WHERE course_id NOT IN (SELECT id FROM courses);

-- Every course should have exactly 20 quizzes and 10 videos
SELECT course_id, COUNT(*) AS quiz_count FROM quizzes GROUP BY 1 HAVING COUNT(*) <> 20;
SELECT course_id, COUNT(*) AS video_count FROM videos GROUP BY 1 HAVING COUNT(*) <> 10;
