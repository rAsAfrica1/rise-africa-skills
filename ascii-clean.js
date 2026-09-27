const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/1st choice group/rise-africa-skills";

function toAscii(s) {
    let out = "";
    for (const ch of s) {
        const code = ch.codePointAt(0);
        if (code >= 32 && code <= 126) { out += ch; }
        else if (code === 10 || code === 13 || code === 9) { out += ch; }
        else if (code === 0x2014 || code === 0x2013) { out += "-"; }
        else if (code === 0x2018 || code === 0x2019) { out += "'"; }
        else if (code === 0x201C || code === 0x201D) { out += '"'; }
        else if (code === 0x2026) { out += "..."; }
        else if (code === 0x00A0) { out += " "; }
        else if (code === 0x2192) { out += "->"; }
        else if (code === 0x25B6) { out += ">>"; }
        else { /* drop */ }
    }
    return out;
}

const files = fs.readdirSync(ROOT).filter(f => /-module-\d+\.html$/.test(f));
console.log("HTML files to clean: " + files.length);

let cleaned = 0, unchanged = 0, err = 0;
for (const f of files) {
    const full = path.join(ROOT, f);
    try {
        const original = fs.readFileSync(full, "utf8");
        const cleaned_text = toAscii(original);
        if (cleaned_text === original) { unchanged++; continue; }
        fs.writeFileSync(full, cleaned_text, "utf8");
        cleaned++;
        if (cleaned % 500 === 0) console.log("  Cleaned " + cleaned + "...");
    } catch (e) {
        console.log("ERR:", f, e.message.split("\n")[0]);
        err++;
    }
}

console.log("");
console.log("=== DONE ===");
console.log("Cleaned: " + cleaned);
console.log("Unchanged: " + unchanged);
console.log("Errors: " + err);