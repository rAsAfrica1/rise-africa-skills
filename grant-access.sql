-- ============================================================================
--  rise AFRICA skills — let an admin grant course access by hand
--
--  WHY THIS EXISTS: most Zimbabwean bank cards are domestic-only and cannot
--  pay a Stripe checkout at all. Those buyers pay by EcoCash, bank transfer or
--  cash, and someone has to open the course for them. This makes that possible
--  in ten seconds instead of never.
--
--  Run once in the Supabase SQL editor. Safe to re-run.
--  Run it in the four numbered steps and READ the output of each one.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- STEP 1. Which course slugs does the enrollments table actually accept?
--
-- enrollments.course_id is a foreign key to courses.id. If a course is missing
-- from the courses table, NOBODY can be enrolled in it — not by Stripe, not by
-- you, not by anyone. The insert simply fails.
--
-- Run this on its own first and look at the result.
-- ----------------------------------------------------------------------------
select id, title from public.courses
where id in (
  'pig-feed','cattle-steer-feed','broiler-layers-feed','dog-cat-feed','fish-feed',
  'bakery','butchery','steer-fattening','bee-farming','mushroom-farming',
  'cassava-farming','dairy-production','cattle-farming','leather-working',
  'pig-farming'
)
order by id;

-- Fifteen rows means everything is present and you can skip step 2.
-- Fewer than fifteen means the missing ones cannot be sold. Continue to step 2.


-- ----------------------------------------------------------------------------
-- STEP 2. Add any course that is missing.
--
-- ON CONFLICT DO NOTHING means a course already there is left exactly as it is.
-- If this errors with "null value in column X violates not-null constraint",
-- send me the error — it names a column this table requires that I have not
-- filled in, and I will give you a corrected version rather than guess.
-- ----------------------------------------------------------------------------
insert into public.courses (id, slug, title, price) values
  ('pig-farming',         'pig-farming',         'Pig Farming',                        8),
  ('pig-feed',            'pig-feed',            'Pig Feed Formulation',               8),
  ('cattle-steer-feed',   'cattle-steer-feed',   'Cattle and Steer Feed Formulation',  8),
  ('broiler-layers-feed', 'broiler-layers-feed', 'Broiler and Layer Feed Formulation', 8),
  ('dog-cat-feed',        'dog-cat-feed',        'Dog and Cat Feed Formulation',       8),
  ('fish-feed',           'fish-feed',           'Fish Feed Formulation',              8),
  ('bakery',              'bakery',              'Bakery and Baking Business',         8),
  ('butchery',            'butchery',            'Butchery and Meat Processing',       8),
  ('steer-fattening',     'steer-fattening',     'Steer Fattening',                    8),
  ('bee-farming',         'bee-farming',         'Bee Farming and Honey Production',   8),
  ('mushroom-farming',    'mushroom-farming',    'Mushroom Farming',                   8),
  ('cassava-farming',     'cassava-farming',     'Cassava Farming and Processing',     8),
  ('dairy-production',    'dairy-production',    'Dairy Production',                   8),
  ('cattle-farming',      'cattle-farming',      'Cattle Farming',                     8),
  ('leather-working',     'leather-working',     'Leather Making and Tanning',         8)
on conflict (id) do nothing;

-- Re-run step 1. You should now see fifteen rows.


-- ----------------------------------------------------------------------------
-- STEP 3. Let an admin create and change enrollments.
--
-- Row level security currently lets a student read their own enrollment. It
-- does not let YOU create one. These three policies fix that, and they apply
-- only to email addresses in the admins table — nobody else gains anything.
-- ----------------------------------------------------------------------------
drop policy if exists enrollments_admin_insert on public.enrollments;
create policy enrollments_admin_insert on public.enrollments
  for insert with check (public.is_admin());

drop policy if exists enrollments_admin_update on public.enrollments;
create policy enrollments_admin_update on public.enrollments
  for update using (public.is_admin()) with check (public.is_admin());

-- Admins already read all enrollments via the policy in backoffice.sql. This
-- one is here so the grant page can read back what it just wrote even if that
-- policy was never applied. Duplicates are harmless; Postgres ORs them.
drop policy if exists enrollments_admin_select on public.enrollments;
create policy enrollments_admin_select on public.enrollments
  for select using (public.is_admin());


-- ----------------------------------------------------------------------------
-- STEP 4. Check it worked.
-- ----------------------------------------------------------------------------
select policyname, cmd from pg_policies
where schemaname = 'public' and tablename = 'enrollments'
order by cmd, policyname;

-- You should see the three admin policies above, plus whatever student
-- policies were already there. Nothing needed removing.
