const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";

// Pages that should NEVER load course-lock.js
const SAFE_PAGES = [
    "index.html",
    "all-courses.html",
    "course-info.html",
    "enroll.html",
    "verify.html",
    "404.html",
    "support-us.html",
    "pricing.html"
];

let touched = 0;

for (const file of SAFE_PAGES) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) { console.log("skip (not found): " + file); continue; }

    let raw = fs.readFileSync(full, "utf8");
    const origSize = raw.length;

    // Remove the course-lock.js script tag (any form)
    raw = raw.replace(/<script[^>]*src=["']\/?course-lock\.js["'][^>]*><\/script>\s*/gi, "");
    // Also remove any inline loader that pulls it
    raw = raw.replace(/<script>\s*[^<]*course-lock\.js[^<]*<\/script>\s*/gi, "");

    if (raw.length !== origSize) {
        fs.writeFileSync(full, raw, "utf8");
        console.log("cleaned: " + file + " (" + (origSize - raw.length) + " bytes removed)");
        touched++;
    } else {
        console.log("clean already: " + file);
    }
}

console.log("");
console.log("=== DONE ===");
console.log("Files cleaned: " + touched);