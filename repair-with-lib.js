const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST_MODE = process.argv.includes("--test");

function walk(dir, results) {
    results = results || [];
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, results);
        else if (/^module-\d+\.json$/.test(e.name)) results.push(p);
    }
    return results;
}

const files = walk(ROOT);
console.log("Total module files:", files.length);

const broken = [];
for (const f of files) {
    try {
        const raw = fs.readFileSync(f, "utf8").replace(/^\uFEFF/, "");
        JSON.parse(raw);
    } catch (e) {
        broken.push(f);
    }
}
console.log("Broken files:", broken.length);

const toFix = TEST_MODE ? broken.slice(0, 1) : broken;
const backupDir = "C:/Users/1st choice group/rise-africa-skills/_jsonrepair_backup_" + Date.now();
fs.mkdirSync(backupDir, { recursive: true });

let fixed = 0, err = 0;
for (const f of toFix) {
    const rel = path.relative(ROOT, f);
    try {
        const raw = fs.readFileSync(f, "utf8").replace(/^\uFEFF/, "");
        const repaired = jsonrepair(raw);
        const parsed = JSON.parse(repaired);
        const bak = path.join(backupDir, rel);
        fs.mkdirSync(path.dirname(bak), { recursive: true });
        fs.copyFileSync(f, bak);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2), "utf8");
        console.log("FIXED:", rel);
        fixed++;
    } catch (e) {
        console.log("STILL BROKEN:", rel);
        console.log("   ", e.message.split("\n")[0]);
        err++;
    }
}

console.log("");
console.log("Fixed:", fixed, "| Errors:", err);
console.log("Backups:", backupDir);