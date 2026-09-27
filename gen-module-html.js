const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const OUT = "C:/Users/1st choice group/rise-africa-skills";
const TEST = process.argv.includes("--test");

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function escAttr(s) { return esc(s); }

function buildVideosSection(videos) {
    if (!Array.isArray(videos) || videos.length === 0) return "";
    let html = '<div class="section"><h2>🎥 Learning Videos</h2>';
    videos.forEach((v, i) => {
        const q = encodeURIComponent(v.query || "");
        const title = esc(v.title || v.query || ("Video " + (i + 1)));
        html += '<div class="video-container">';
        html += '<h3>' + (i + 1) + '. ' + title + '</h3>';
        html += '<div style="padding:12px;background:#f5f5f5;border-radius:6px;margin:8px 0">';
        html += '<a href="https://www.youtube.com/results?search_query=' + q + '" target="_blank" rel="noopener" ';
        html += 'style="display:inline-block;background:#cc0000;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:bold">';
        html += '▶ Search on YouTube</a>';
        html += '<p style="margin:8px 0 0;font-size:.85rem;color:#666">Search query: ' + esc(v.query || "") + '</p>';
        html += '</div></div>';
    });
    html += '</div>';
    return html;
}

function buildLessonsSection(lessons) {
    if (!Array.isArray(lessons)) return "";
    let html = '<div class="section"><h2>📖 Lessons</h2>';
    lessons.forEach((l, i) => {
        html += '<div class="implementation-step">';
        html += '<h3>' + (i + 1) + '. ' + esc(l.title) + '</h3>';
        const body = esc(l.body || "").replace(/\n/g, "<br>");
        html += '<p>' + body + '</p>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}

function buildQuizSection(quiz, moduleNum) {
    if (!Array.isArray(quiz) || quiz.length === 0) return "";
    let html = '<div class="section"><div class="quiz-section"><h3>🎯 Module ' + moduleNum + ' Quiz</h3>';
    quiz.forEach((q, i) => {
        const qid = "q" + (i + 1);
        html += '<div class="quiz-question">';
        html += '<p>' + (i + 1) + '. ' + esc(q.q) + '</p>';
        const opts = Array.isArray(q.options) ? q.options : [];
        const ansLetter = String(q.answer || "").trim().toUpperCase();
        let ansIdx = 0;
        const L = ["A", "B", "C", "D"];
        if (L.includes(ansLetter)) ansIdx = L.indexOf(ansLetter);
        opts.forEach((opt, j) => {
            const val = L[j] || String(j);
            const optText = String(opt).replace(/^[A-D]\)\s*/, "");
            html += '<div class="quiz-option">';
            html += '<input type="radio" name="' + qid + '" value="' + val + '">';
            html += '<label>' + val + ') ' + esc(optText) + '</label>';
            html += '</div>';
        });
        const expl = esc(q.explanation || "").replace(/'/g, "\\'");
        html += '<button onclick="checkAnswer(\'' + qid + '\', \'' + ansLetter + '\', \'' + expl + '\')">Check Answer</button>';
        html += '<div id="feedback-' + qid + '" class="feedback"></div>';
        html += '</div>';
    });
    html += '</div></div>';
    return html;
}

function buildHtml(json, slug, moduleNum) {
    const courseTitle = esc(json.course);
    const moduleTitle = esc(json.module_title || ("Module " + moduleNum));
    const pageTitle = courseTitle + " - Module " + moduleNum + ": " + moduleTitle;
    const nextModule = moduleNum < 12 ? (slug + "-module-" + (moduleNum + 1) + ".html") : null;

    const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f7f7f7; color: #222; line-height: 1.6; }
.container { max-width: 900px; margin: 0 auto; padding: 20px; }
.header { background: linear-gradient(135deg, #006c35, #008a44); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
.header h1 { font-size: 1.8rem; margin-bottom: 8px; }
.header p { font-size: 1rem; opacity: .9; }
.section { background: white; padding: 24px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,.05); }
.section h2 { color: #006c35; margin-bottom: 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
.section h3 { color: #333; margin: 14px 0 8px; }
.progress-bar { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; margin-bottom: 16px; }
.progress-fill { height: 100%; width: 0; background: #006c35; transition: width .3s; }
.learning-objectives { background: #f0f8f5; padding: 16px; border-radius: 8px; }
.learning-objectives ul { padding-left: 20px; margin-top: 8px; }
.learning-objectives li { margin-bottom: 6px; }
.video-container { margin-bottom: 16px; }
.video-container h3 { font-size: 1rem; margin-bottom: 8px; }
.implementation-step { background: #fafafa; padding: 14px; border-left: 4px solid #006c35; margin-bottom: 14px; border-radius: 4px; }
.implementation-step p { margin-top: 6px; }
.quiz-question { background: #fafafa; padding: 14px; margin-bottom: 14px; border-radius: 6px; }
.quiz-question p { font-weight: 500; margin-bottom: 10px; }
.quiz-option { display: flex; align-items: center; padding: 6px 0; }
.quiz-option input { margin-right: 10px; }
.quiz-option label { cursor: pointer; }
.quiz-question button { margin-top: 10px; background: #006c35; color: white; border: none; padding: 8px 18px; border-radius: 5px; cursor: pointer; font-weight: 500; }
.quiz-question button:hover { background: #005a2c; }
.feedback { margin-top: 10px; padding: 10px; border-radius: 5px; display: none; }
.feedback.show { display: block; }
.feedback.correct { background: #d4edda; color: #155724; }
.feedback.incorrect { background: #f8d7da; color: #721c24; }
.next-module { text-align: center; margin: 30px 0; }
table { width: 100%; border-collapse: collapse; margin: 14px 0; }
th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
th { background: #f0f8f5; }
footer { text-align: center; padding: 20px; font-size: .85rem; color: #888; }
`;

    let html = "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"UTF-8\">";
    html += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    html += "<title>" + esc(pageTitle) + "</title>";
    html += "<meta name=\"description\" content=\"" + escAttr(pageTitle) + " - a free practical course from rise AFRICA skills.\">";
    html += "<link rel=\"icon\" href=\"/og-image.png\" type=\"image/png\">";
    html += "<script src=\"https://unpkg.com/@supabase/supabase-js@2\"></script>";
    html += "<script src=\"/course-lock.js\"></script>";
    html += "<style>" + css + "</style>";
    html += "</head><body>";

    html += "<div class=\"container\">";
    html += "<div class=\"header\"><h1>" + courseTitle + "</h1><p>Module " + moduleNum + ": " + moduleTitle + "</p></div>";
    html += "<div class=\"content\">";
    html += "<div class=\"progress-bar\"><div class=\"progress-fill\" id=\"progressFill\"></div></div>";

    html += buildVideosSection(json.videos);
    html += buildLessonsSection(json.lessons);
    html += buildQuizSection(json.quiz, moduleNum);

    if (nextModule) {
        html += "<div class=\"next-module\"><p><a href=\"" + nextModule + "\" style=\"display:inline-block;background:#006c35;color:white;padding:12px 30px;text-decoration:none;border-radius:5px;font-weight:bold\">→ Next Module</a></p></div>";
    } else {
        html += "<div class=\"next-module\"><p><a href=\"/all-courses.html\" style=\"display:inline-block;background:#006c35;color:white;padding:12px 30px;text-decoration:none;border-radius:5px;font-weight:bold\">← Back to All Courses</a></p></div>";
    }

    html += "</div></div>";

    html += "<footer>rise AFRICA skills · Free practical training for Africa</footer>";

    html += "<script>";
    html += "function checkAnswer(q, a, f) {";
    html += "  const s = document.querySelector('input[name=\"' + q + '\"]:checked');";
    html += "  const e = document.getElementById('feedback-' + q);";
    html += "  if (!s) { alert('Select an answer first'); return; }";
    html += "  e.className = 'feedback show ' + (s.value === a ? 'correct' : 'incorrect');";
    html += "  e.textContent = (s.value === a ? '✓ Correct! ' : '✗ Not quite. ') + f;";
    html += "  updateProgress();";
    html += "}";
    html += "function updateProgress() {";
    html += "  const c = document.querySelectorAll('input[type=\"radio\"]:checked').length;";
    html += "  const t = Math.max(1, document.querySelectorAll('.quiz-question').length);";
    html += "  document.getElementById('progressFill').style.width = ((c / t) * 100) + '%';";
    html += "}";
    html += "window.addEventListener('load', function() {";
    html += "  try { const s = localStorage.getItem('progress_" + slug + "_" + moduleNum + "');";
    html += "  if (s) document.getElementById('progressFill').style.width = s + '%'; } catch(e){}";
    html += "});";
    html += "</script>";

    html += "</body></html>";
    return html;
}

(async () => {
    const courses = fs.readdirSync(ROOT).filter(n => fs.statSync(path.join(ROOT, n)).isDirectory());
    let generated = 0, skipped = 0, errors = 0;
    const limit = TEST ? 1 : Infinity;

    for (const courseFolder of courses) {
        if (generated >= limit) break;
        const slug = courseFolder;
        const dir = path.join(ROOT, courseFolder);
        const files = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();

        for (const f of files) {
            if (generated >= limit) break;
            const moduleNum = parseInt(f.match(/module-(\d+)\.json/)[1]);
            const outFile = path.join(OUT, slug + "-module-" + moduleNum + ".html");

            if (fs.existsSync(outFile)) { skipped++; continue; }

            try {
                const raw = fs.readFileSync(path.join(dir, f), "utf8");
                const json = JSON.parse(raw.replace(/^\uFEFF/, ""));
                const html = buildHtml(json, slug, moduleNum);

                if (html.length < 1000) { console.log("Too small:", slug, moduleNum); errors++; continue; }

                fs.writeFileSync(outFile, html, "utf8");
                generated++;
                if (generated % 100 === 0) console.log("Generated " + generated + " files...");
            } catch (e) {
                console.log("ERROR:", slug, f, e.message.split("\n")[0]);
                errors++;
            }
        }
    }

    console.log("");
    console.log("=== DONE ===");
    console.log("Generated: " + generated);
    console.log("Skipped (already exist): " + skipped);
    console.log("Errors: " + errors);
})();