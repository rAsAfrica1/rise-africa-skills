const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const OUT = "C:/Users/1st choice group/rise-africa-skills";

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildVideos(videos) {
    if (!Array.isArray(videos) || videos.length === 0) return "";
    let h = "<div class='section'><h2>Learning Videos</h2>";
    videos.forEach((v, i) => {
        const q = encodeURIComponent(v.query || "");
        const t = esc(v.title || v.query || ("Video " + (i + 1)));
        h += "<div class='video-container'><h3>" + (i + 1) + ". " + t + "</h3>";
        h += "<div style='padding:12px;background:#f5f5f5;border-radius:6px;margin:8px 0'>";
        h += "<a href='https://www.youtube.com/results?search_query=" + q + "' target='_blank' rel='noopener' style='display:inline-block;background:#cc0000;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:bold'>&gt;&gt; Search on YouTube</a>";
        h += "<p style='margin:8px 0 0;font-size:.85rem;color:#666'>Search query: " + esc(v.query || "") + "</p></div></div>";
    });
    return h + "</div>";
}

function buildLessons(lessons) {
    if (!Array.isArray(lessons)) return "";
    let h = "<div class='section'><h2>Lessons</h2>";
    lessons.forEach((l, i) => {
        h += "<div class='implementation-step'>";
        h += "<h3>" + (i + 1) + ". " + esc(l.title) + "</h3>";
        const raw = String(l.body || "");
        const isHtml = /^\s*<section/i.test(raw) || raw.includes("<h2>Practical Reference") || raw.includes("<section>");
        const body = isHtml ? raw : esc(raw).replace(/\r?\n/g, "<br>");
        h += "<div>" + body + "</div></div>";
    });
    return h + "</div>";
}

function buildQuiz(quiz, moduleNum) {
    if (!Array.isArray(quiz) || quiz.length === 0) return "";
    let h = "<div class='section'><div class='quiz-section'><h3>Module " + moduleNum + " Quiz</h3>";
    const letters = ["A","B","C","D"];
    quiz.forEach((q, i) => {
        const qid = "q" + (i + 1);
        h += "<div class='quiz-question'><p>" + (i + 1) + ". " + esc(q.q) + "</p>";
        const opts = Array.isArray(q.options) ? q.options : [];
        opts.forEach((opt, j) => {
            const val = letters[j] || String(j);
            const oc = String(opt).replace(/^[A-D]\)\s*/, "");
            h += "<div class='quiz-option'><input type='radio' name='" + qid + "' value='" + val + "'><label>" + val + ") " + esc(oc) + "</label></div>";
        });
        const ans = String(q.answer || "A").trim().toUpperCase();
        const expl = esc(q.explanation || "").replace(/'/g, "\\'");
        h += "<button onclick=\"checkAnswer('" + qid + "','" + ans + "','" + expl + "')\">Check Answer</button>";
        h += "<div id='feedback-" + qid + "' class='feedback'></div></div>";
    });
    return h + "</div></div>";
}

function buildPage(json, slug, moduleNum) {
    const ct = esc(json.course);
    const mt = esc(json.module_title || ("Module " + moduleNum));
    const title = ct + " - Module " + moduleNum + ": " + mt;
    const next = moduleNum < 12 ? (slug + "-module-" + (moduleNum + 1) + ".html") : null;

    const css = "*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f7f7f7;color:#222;line-height:1.6}.container{max-width:900px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#006c35,#008a44);color:#fff;padding:30px;border-radius:10px;margin-bottom:20px}.header h1{font-size:1.8rem;margin-bottom:8px}.section{background:#fff;padding:24px;margin-bottom:20px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,.05)}.section h2{color:#006c35;margin-bottom:16px;border-bottom:2px solid #e0e0e0;padding-bottom:8px}.section h3{color:#333;margin:14px 0 8px}.video-container{margin-bottom:16px}.video-container h3{font-size:1rem;margin-bottom:8px}.implementation-step{background:#fafafa;padding:14px;border-left:4px solid #006c35;margin-bottom:14px;border-radius:4px}.implementation-step p{margin-top:6px}.quiz-question{background:#fafafa;padding:14px;margin-bottom:14px;border-radius:6px}.quiz-question p{font-weight:500;margin-bottom:10px}.quiz-option{display:flex;align-items:center;padding:6px 0}.quiz-option input{margin-right:10px}.quiz-option label{cursor:pointer}.quiz-question button{margin-top:10px;background:#006c35;color:#fff;border:none;padding:8px 18px;border-radius:5px;cursor:pointer}.feedback{margin-top:10px;padding:10px;border-radius:5px;display:none}.feedback.show{display:block}.feedback.correct{background:#d4edda;color:#155724}.feedback.incorrect{background:#f8d7da;color:#721c24}.next-module{text-align:center;margin:30px 0}table{width:100%;border-collapse:collapse;margin:14px 0}th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#f1f8e9}figure{margin:24px 0;text-align:center}figcaption{font-size:.85rem;color:#6f6759;margin-top:6px}footer{text-align:center;padding:20px;font-size:.85rem;color:#888}";

    let h = "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" + title + "</title>";
    h += "<script src=\"https://unpkg.com/@supabase/supabase-js@2\"></script><script src=\"/course-lock.js\"></script>";
    h += "<style>" + css + "</style></head><body><div class='container'>";
    h += "<div class='header'><h1>" + ct + "</h1><p>Module " + moduleNum + ": " + mt + "</p></div>";
    h += buildVideos(json.videos);
    h += buildLessons(json.lessons);
    h += buildQuiz(json.quiz, moduleNum);
    if (next) {
        h += "<div class='next-module'><p><a href='" + next + "' style='display:inline-block;background:#006c35;color:white;padding:12px 30px;text-decoration:none;border-radius:5px;font-weight:bold'>Next Module &gt;&gt;</a></p></div>";
    } else {
        h += "<div class='next-module'><p><a href='/all-courses.html' style='display:inline-block;background:#006c35;color:white;padding:12px 30px;text-decoration:none;border-radius:5px;font-weight:bold'>&lt;&lt; Back to All Courses</a></p></div>";
    }
    h += "</div><footer>rise AFRICA skills - Free practical training for Africa</footer>";
    h += "<script>function checkAnswer(q,a,f){var s=document.querySelector('input[name=\"'+q+'\"]:checked');var e=document.getElementById('feedback-'+q);if(!s){alert('Select an answer');return;}e.className='feedback show '+(s.value===a?'correct':'incorrect');e.textContent=(s.value===a?'Correct! ':'Not quite. ')+f;}</script>";
    h += "</body></html>";
    return h;
}

(async () => {
    const courses = fs.readdirSync(ROOT).filter(n => fs.statSync(path.join(ROOT, n)).isDirectory());
    let generated = 0, errors = 0;
    for (const slug of courses) {
        const dir = path.join(ROOT, slug);
        const files = fs.readdirSync(dir).filter(f => /^module-\d+\.json$/.test(f)).sort();
        for (const f of files) {
            const n = parseInt(f.match(/module-(\d+)/)[1]);
            const target = path.join(OUT, slug + "-module-" + n + ".html");
            try {
                const json = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, ""));
                const html = buildPage(json, slug, n);
                fs.writeFileSync(target, html, "utf8");
                generated++;
                if (generated % 500 === 0) console.log("Generated " + generated + "...");
            } catch (e) { errors++; }
        }
    }
    console.log("");
    console.log("=== DONE ===");
    console.log("Generated:", generated);
    console.log("Errors:", errors);
})();