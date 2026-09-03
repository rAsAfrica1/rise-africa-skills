# Student assignment videos — deploy in 3 steps

Do them in this order. Step 1 must come first or the page will save nothing.

---

## STEP 1 — Create the database table (5 minutes, do this first)

1. Go to **https://supabase.com/dashboard** and open your project
   (`lsvmykrentkbcdrzsaqj`).
2. In the left sidebar click **SQL Editor**.
3. Click **New query**.
4. Open `sql/submissions.sql` from this folder, copy the whole file, paste it in.
5. Click **Run** (bottom right).

You should see *Success. No rows returned.*

**Check it worked.** In the same editor, run this on its own:

```sql
select policyname from pg_policies where tablename = 'submissions';
select * from public.admins;
```

The first should list 4 policies. The second should show
`tindocheng@yandex.com`. If you want another person to review assignments, add
them: `insert into public.admins (email) values ('them@example.com');`

---

## STEP 2 — Upload the website files

Go to **https://github.com/rAsAfrica1/rise-africa-skills**, click
**Add file → Upload files**, and drag in **everything inside the `site/`
folder** of this zip. Commit with a message like
*"Add student assignment video submissions"*.

`site/` contains:

| File | What it is |
|---|---|
| `assignment-submit.js` | **New.** The submission box students see. |
| `assignment-review.html` | **New.** Your private page for watching and marking. |
| `course-lock.js` | **Replaces** the existing one. Fixes a bug — see below. |
| `index.html` | Homepage with Bakery and Butchery pointing at the real courses. |
| 84 `*-module-*.html` | All 7 courses, rebuilt with the submission box. |
| 7 `*-lessons.html` | The course contents pages. |

GitHub Pages rebuilds in 1–3 minutes.

### The course-lock bug this fixes

Every course contents page (`pig-feed-lessons.html`, `bakery-lessons.html`, and
the other five) was checking enrollment against the wrong course name — it read
`pig-feed-lessons` instead of `pig-feed`. No enrollment ever matched, so it
redirected to `pig-feed-lessons-course.html`, which does not exist. **Every
paying student hit a 404 on the contents page of every course.** The new
`course-lock.js` strips the `-lessons` suffix as well as `-module-N`.

---

## STEP 3 — Check it end to end

1. Open `https://www.riseafricaskills.com/butchery-module-1.html` while logged
   in as an enrolled student. Scroll past the capstone — the purple
   **"📹 Submit your assignment video"** box should be there.
2. Paste any YouTube link and submit.
3. Open `https://www.riseafricaskills.com/assignment-review.html` while logged
   in as **tindocheng@yandex.com**. The submission should be listed. Type
   feedback and click **Save & mark passed**.
4. Go back to the module page and refresh. Your feedback appears under the
   student's submission.

If step 3 shows *"Could not load submissions"*, your login email is not in the
`admins` table — go back to Step 1 and check.

---

## How students actually get a video link

They do **not** upload a file to your site. They upload to their own YouTube
account and paste the link. The instructions are written into the page as six
numbered steps they can tap open, and there is a WhatsApp button as a fallback
for anyone who cannot manage it.

This is deliberate. Video is heavy — a three-minute phone recording is roughly
100 MB. If those files went to Supabase Storage, the free tier's 1 GB would fill
after about ten students, and every view would draw down the 5 GB monthly
egress. On YouTube it costs you nothing, forever, and YouTube automatically
drops the quality for students on weak connections, which Supabase Storage
cannot do.

**One thing to be aware of:** each student needs a Google account and the
YouTube app. Most Android phones already have both, but some students will
struggle, which is why the WhatsApp button is there. If you find a lot of them
using WhatsApp instead, tell me and I will add direct file upload as a second
option.

---

## Security notes

- The `anon` key in these files is *meant* to be public. What protects the data
  is Row Level Security, which Step 1 turns on.
- A student can read **only their own** submissions, and can only submit for a
  course they are **actively enrolled in** — the paywall applies to submissions
  too.
- A student can delete their own submission only while it is still unreviewed.
  Once you have marked it, they cannot remove or alter it.
- Only emails in the `admins` table can read all submissions or write feedback.
- `assignment-review.html` carries `noindex,nofollow` so it stays out of search
  results. Anyone can open the URL, but without an admin login they see nothing.

---

## Still outstanding from earlier

- **Revoke the two leaked GitHub tokens** at https://github.com/settings/tokens
- Do **not** delete `bakery-course.html` or `butchery-course.html`. They are the
  sales pages that locked-out visitors get redirected to.
