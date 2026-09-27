const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills/deep_courses";
const TEST_MODE = process.argv.includes("--test");

function walk(dir, results) {
    results = results || [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
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
        const raw = fs.readFileSync(f, "utf8");
        const clean = raw.replace(/^\uFEFF/, "");
        JSON.parse(clean);
    } catch (e) {
        broken.push({ file: f, error: e.message });
    }
}
console.log("Broken files:", broken.length);

if (broken.length > 0 && broken.length < 10) {
    for (const b of broken) {
        console.log("  BROKEN:", path.relative(ROOT, b.file), "-", b.error.split("\n")[0]);
    }
}

const toFix = TEST_MODE ? broken.slice(0, 1) : broken;
const backupDir = "C:/Users/1st choice group/rise-africa-skills/_node_fix_backup_" + Date.now();
fs.mkdirSync(backupDir, { recursive: true });

let fixed = 0, err = 0;
for (const b of toFix) {
    const rel = path.relative(ROOT, b.file);
    try {
        const raw = fs.readFileSync(b.file, "utf8");
        const clean = raw.replace(/^\uFEFF/, "").replace(/^\uFEFF/, "");
        const parsed = JSON.parse(clean);
        const bak = path.join(backupDir, rel);
        fs.mkdirSync(path.dirname(bak), { recursive: true });
        fs.copyFileSync(b.file, bak);
        fs.writeFileSync(b.file, JSON.stringify(parsed, null, 2), "utf8");
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