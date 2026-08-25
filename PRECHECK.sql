-- RUN THIS BEFORE ANYTHING ELSE.
-- 1) Does the courses table exist, and what type is its id?
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'courses' AND column_name = 'id';
-- Must return: id | uuid    (if it returns text, tell Claude before continuing)

-- 2) Do the 46 course UUIDs used by the data files exist?
SELECT COUNT(*) AS matching_courses FROM courses WHERE id IN (
'02dbd3f9-58dd-48ac-ae36-cbc091fb8091'
);
-- Must return 1. If it returns 0, the data files point at a different
-- courses table and the UUIDs need remapping.
