-- ============================================================
-- REPAIR — run ONLY after 11_DIAGNOSE.sql confirms the duplication.
-- Each block is independent. Run them one at a time.
-- ============================================================

-- ---- FIX 1: de-duplicate resources (644 -> 322) --------------
-- Keeps the earliest row of each identical (course_id, resource_name, resource_type).
BEGIN;
DELETE FROM resources a USING resources b
WHERE a.id > b.id
  AND a.course_id = b.course_id
  AND a.resource_name IS NOT DISTINCT FROM b.resource_name
  AND a.resource_type IS NOT DISTINCT FROM b.resource_type;
SELECT COUNT(*) AS resources_after FROM resources;  -- expect 322
COMMIT;   -- ROLLBACK instead if the count is wrong

-- ---- FIX 2: de-duplicate seed_record_templates (325 -> 322) --
BEGIN;
DELETE FROM seed_record_templates a USING seed_record_templates b
WHERE a.id > b.id
  AND a.course_id = b.course_id
  AND a.template_name IS NOT DISTINCT FROM b.template_name;
SELECT COUNT(*) AS templates_after FROM seed_record_templates;  -- expect 322
COMMIT;

-- ---- FIX 3: reload videos cleanly (322 -> 460) ---------------
-- The wrong/partial video file went in. Clear and reload.
-- Step 3a — run this:
DELETE FROM videos;
-- Step 3b — then run the whole of 08_videos.sql in a new query tab.
-- Step 3c — then confirm:
--   SELECT COUNT(*) FROM videos;  -- expect 460

-- ---- FIX 4: courses (92 rows) --------------------------------
-- DO NOT run blind. Only after 11_DIAGNOSE part A2 shows duplicate titles
-- AND you have confirmed the extra 46 are not real, separate courses.
-- Deleting a course cascades to ALL its content (profiles, quizzes, videos...).
--
-- Safe first move: find courses that carry no content at all —
-- these are the likely orphan duplicates.
SELECT c.id, c.title
FROM courses c
WHERE NOT EXISTS (SELECT 1 FROM course_business_profiles p WHERE p.course_id = c.id)
ORDER BY c.title;
-- If that returns exactly 46 rows with titles matching the other 46,
-- they are safe to remove:
--   DELETE FROM courses c
--   WHERE NOT EXISTS (SELECT 1 FROM course_business_profiles p WHERE p.course_id = c.id);
