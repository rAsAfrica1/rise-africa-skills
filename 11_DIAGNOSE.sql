-- ============================================================
-- DIAGNOSE — run all of this, paste the output back.
-- Read-only. Changes nothing.
-- ============================================================

-- A) Are courses duplicated, or are there genuinely 92 courses?
SELECT COUNT(*) AS total_courses,
       COUNT(DISTINCT title) AS distinct_titles
FROM courses;

-- A2) Show any title that appears more than once
SELECT title, COUNT(*) AS copies
FROM courses GROUP BY title HAVING COUNT(*) > 1
ORDER BY copies DESC, title LIMIT 20;

-- B) resources: 644 = 322 x 2? Confirm exact duplication
SELECT COUNT(*) AS total,
       COUNT(DISTINCT (course_id, resource_name)) AS distinct_rows,
       COUNT(DISTINCT course_id) AS courses_covered
FROM resources;

-- C) seed_record_templates: which 3 are extra?
SELECT course_id, COUNT(*) AS n
FROM seed_record_templates GROUP BY course_id HAVING COUNT(*) <> 7
ORDER BY n DESC;

-- D) videos: 322 rows over how many courses, how many each?
SELECT COUNT(*) AS total,
       COUNT(DISTINCT course_id) AS courses_covered
FROM videos;

SELECT n AS videos_per_course, COUNT(*) AS num_courses
FROM (SELECT course_id, COUNT(*) AS n FROM videos GROUP BY course_id) s
GROUP BY n ORDER BY n;

-- E) Which of the 46 content courses have NO videos at all?
SELECT COUNT(*) AS courses_missing_videos
FROM course_business_profiles p
WHERE NOT EXISTS (SELECT 1 FROM videos v WHERE v.course_id = p.course_id);
