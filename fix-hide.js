const fs = require("fs");
const p = "C:/Users/1st choice group/rise-africa-skills/course-lock.js";

let raw = fs.readFileSync(p, "utf8");
const origSize = raw.length;

const needle = "document.documentElement.style.visibility = 'hidden';";
const count = raw.split(needle).length - 1;
console.log("Occurrences of hide line:", count);

if (count !== 1) {
    console.log("STOP: expected exactly 1");
    process.exit(1);
}

const replacement = [
    "if (/-module-?\\d+\\.html$/i.test(window.location.pathname)) {",
    "    document.documentElement.style.visibility = 'hidden';",
    "  }"
].join("\n");

raw = raw.replace(needle, replacement);

if (raw === fs.readFileSync(p, "utf8")) {
    console.log("STOP: no change");
    process.exit(1);
}

fs.writeFileSync(p, raw, "utf8");
console.log("WROTE. Size:", origSize, "->", raw.length);
console.log("=== DONE ===");