const fs = require("fs");
const path = "C:/Users/1st choice group/rise-africa-skills/course-lock.js";

let raw = fs.readFileSync(path, "utf8");
const origSize = raw.length;
console.log("Original size:", origSize);

// The last line is exactly this and possibly nothing after.
const marker = "  checkAccess();";

if (!raw.includes(marker)) {
    console.log("STOP: marker 'checkAccess();' not found with 2-space indent");
    const idx = raw.lastIndexOf("checkAccess();");
    console.log("lastIndexOf checkAccess:", idx);
    console.log("Around it:", JSON.stringify(raw.substring(idx - 40, idx + 20)));
    process.exit(1);
}

// Count occurrences - should be exactly 1
const count = raw.split(marker).length - 1;
console.log("Occurrences of marker:", count);
if (count !== 1) {
    console.log("STOP: expected exactly 1 occurrence");
    process.exit(1);
}

const guard = [
    "  // Only run the enrollment check on module pages. Skip everything else.",
    "  (function() {",
    "    var file = window.location.pathname.split('/').pop();",
    "    if (!/-module-\\d+\\.html$/i.test(file)) return;",
    "    checkAccess();",
    "  })();"
].join("\n");

raw = raw.replace(marker, guard);

const newSize = raw.length;
console.log("New size:", newSize, "| Delta:", newSize - origSize);

if (newSize <= origSize) {
    console.log("STOP: size did not grow");
    process.exit(1);
}

// Verify the guarded version is present and the bare call is gone
if (!raw.includes("Only run the enrollment check")) {
    console.log("STOP: guard text missing after replace");
    process.exit(1);
}
if (raw.includes("\n  checkAccess();\n") || raw.endsWith("\n  checkAccess();")) {
    console.log("STOP: bare call still present");
    process.exit(1);
}

fs.writeFileSync(path, raw, "utf8");
console.log("WROTE course-lock.js");
console.log("=== DONE ===");