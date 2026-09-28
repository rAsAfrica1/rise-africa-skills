const fs = require("fs");
const path = "C:/Users/1st choice group/rise-africa-skills/index.html";

let raw = fs.readFileSync(path, "utf8");
const origSize = raw.length;
console.log("Original size:", origSize);

// 1. Remove the robot emoji
const beforeBot = (raw.match(/🤖/g) || []).length;
raw = raw.replace(/🤖\s*/g, "");
const afterBot = (raw.match(/🤖/g) || []).length;
console.log("Robot emoji:", beforeBot, "->", afterBot);

// 2. Fix "225" -> "227" in course-count contexts
const before225 = (raw.match(/\b225\b/g) || []).length;
raw = raw.replace(/\b225 courses\b/g, "227 courses");
raw = raw.replace(/\b225 Courses\b/g, "227 Courses");
raw = raw.replace(/\b225 Practical Courses\b/g, "227 Practical Courses");
raw = raw.replace(/Search 225 courses/g, "Search 227 courses");
raw = raw.replace(/Showing all 225 courses/g, "Showing all 227 courses");
raw = raw.replace(/\b225 complete courses\b/g, "227 complete courses");
raw = raw.replace(/\bwe have 225\b/g, "we have 227");
raw = raw.replace(/\ball 225\b/g, "all 227");
raw = raw.replace(/\bAll 225\b/g, "All 227");
// Fix the "Looking for all 225 courses?" text
raw = raw.replace(/Looking for all 225 courses/g, "Looking for all 227 courses");
raw = raw.replace(/View All 225 courses/g, "View All 227 courses");
const after225 = (raw.match(/\b225 courses\b|\b225 Practical Courses\b|\b225 complete courses\b/g) || []).length;
console.log("Course-count 225 occurrences fixed. Remaining 225 in course context:", after225);

// 3. Renumber all course-card h3s sequentially
// Match: <div class="course-card" data-cat="...">
//          <div class="course-category">...</div>
//          <h3>NNN. TITLE</h3>
const cardRegex = /(<div class="course-card"[^>]*>\s*<div class="course-category">[^<]*<\/div>\s*<h3>)\d+\.(\s*[^<]*<\/h3>)/g;

let counter = 0;
let bad = 0;
raw = raw.replace(cardRegex, (match, prefix, suffix) => {
    counter++;
    return prefix + counter + "." + suffix;
});

console.log("Course cards renumbered:", counter);

if (counter < 200) {
    console.log("STOP: too few cards found, expected 200+");
    process.exit(1);
}

// 4. Fix the search placeholder and "Showing all" text (should now be 227)
const searchMatch = raw.match(/placeholder="Search \d+ courses/);
console.log("Search placeholder:", searchMatch ? searchMatch[0] : "not found");

fs.writeFileSync(path, raw, "utf8");
console.log("New size:", raw.length, "| Delta:", raw.length - origSize);
console.log("=== DONE ===");