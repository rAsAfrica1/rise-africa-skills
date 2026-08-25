-- ============================================================
-- STEP 1 of 3 — RESET
-- Paste all of this into the SQL Editor and Run once.
--
-- What it does:
--   a) deletes the slug-keyed content (wrong catalog, all orphaned)
--   b) de-duplicates courses  92 -> 46
-- It keeps exactly the 46 courses your correct SQL files point at.
-- ============================================================

BEGIN;

-- a) Clear every content table. All current rows are slug-keyed
--    ('agro-forestry', 'plumbing', ...) and match no course.
DELETE FROM quiz_questions;
DELETE FROM quizzes;
DELETE FROM videos;
DELETE FROM case_studies;
DELETE FROM resources;
DELETE FROM seed_record_templates;
DELETE FROM viability_checklists;
DELETE FROM startup_templates;
DELETE FROM course_business_profiles;

-- b) De-duplicate courses: keep the lowest id per title.
--    (Verified: those 46 ids are exactly the ones the data files use.)
DELETE FROM courses c
WHERE c.id <> (SELECT MIN(c2.id) FROM courses c2 WHERE c2.title = c.title);

COMMIT;


-- ---- CHECK — must read 46 courses, 0 everywhere else ----
SELECT 'courses' AS t, COUNT(*) FROM courses
UNION ALL SELECT 'course_business_profiles', COUNT(*) FROM course_business_profiles
UNION ALL SELECT 'quizzes', COUNT(*) FROM quizzes
UNION ALL SELECT 'videos', COUNT(*) FROM videos
ORDER BY 1;

-- Also confirm no title is doubled any more (should return 0 rows):
SELECT title, COUNT(*) FROM courses GROUP BY title HAVING COUNT(*) > 1;
