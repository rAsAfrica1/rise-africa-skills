# =====================================================================
#  rise AFRICA skills - deploy Bakery, Butchery and assignment uploads
#
#  What it does:
#    1. finds rise-africa-assignments.zip in your Downloads
#    2. extracts it
#    3. copies the 95 site files into your local repo
#    4. commits and pushes
#
#  It never deletes anything. Files with the same name are replaced;
#  every other file in the repo is left alone.
# =====================================================================

$ErrorActionPreference = "Stop"

function Note($msg) { Write-Host $msg -ForegroundColor Cyan }
function Good($msg) { Write-Host $msg -ForegroundColor Green }
function Stop2($msg) { Write-Host ""; Write-Host "STOPPED: $msg" -ForegroundColor Red; exit 1 }

# ---- 1. find the zip -------------------------------------------------
$zipName = "rise-africa-assignments.zip"
$searchIn = @(
    (Join-Path $env:USERPROFILE "Downloads"),
    (Join-Path $env:USERPROFILE "Desktop"),
    (Join-Path $env:USERPROFILE "Documents")
)
$zipItem = $null
foreach ($folder in $searchIn) {
    if (Test-Path -LiteralPath $folder) {
        $found = Get-ChildItem -LiteralPath $folder -Filter $zipName -File -ErrorAction SilentlyContinue |
                 Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($found) { $zipItem = $found; break }
    }
}
if (-not $zipItem) {
    Stop2 "Could not find $zipName in Downloads, Desktop or Documents.`nDownload it from the chat first, then run this again."
}
Note "Found zip : $($zipItem.FullName)"
Note "Size      : $([math]::Round($zipItem.Length/1MB,2)) MB"

# ---- 2. find the repo ------------------------------------------------
$repoPath = $null
$repoGuesses = @(
    (Join-Path $env:USERPROFILE "rise-africa-skills"),
    "C:\Users\1st choice group\rise-africa-skills",
    (Join-Path (Join-Path $env:USERPROFILE "Documents") "rise-africa-skills")
)
foreach ($guess in $repoGuesses) {
    if (Test-Path -LiteralPath (Join-Path $guess ".git")) { $repoPath = $guess; break }
}
if (-not $repoPath) {
    Write-Host ""
    Write-Host "I could not find your local copy of the repo." -ForegroundColor Yellow
    $typed = Read-Host "Paste the full folder path (or press Enter to clone a fresh copy)"
    if ($typed -and (Test-Path -LiteralPath (Join-Path $typed ".git"))) {
        $repoPath = $typed
    } else {
        $repoPath = Join-Path $env:USERPROFILE "rise-africa-skills"
        Note "Cloning a fresh copy into $repoPath ..."
        git clone https://github.com/rAsAfrica1/rise-africa-skills.git $repoPath
        if ($LASTEXITCODE -ne 0) { Stop2 "git clone failed. Is git installed and are you signed in?" }
    }
}
Note "Repo      : $repoPath"

# ---- 3. extract ------------------------------------------------------
$workDir = Join-Path $env:TEMP ("ras_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
New-Item -ItemType Directory -Path $workDir -Force | Out-Null
Note "Extracting ..."
Expand-Archive -LiteralPath $zipItem.FullName -DestinationPath $workDir -Force

$siteDir = Join-Path $workDir "site"
if (-not (Test-Path -LiteralPath $siteDir)) { Stop2 "The zip did not contain a 'site' folder. Re-download it." }

$newFiles = Get-ChildItem -LiteralPath $siteDir -File
Note "Files in zip: $($newFiles.Count)  (expecting 95)"
if ($newFiles.Count -lt 90) { Stop2 "Only $($newFiles.Count) files extracted. The download is incomplete - download it again." }

# ---- 4. copy in ------------------------------------------------------
Note "Copying into the repo ..."
Copy-Item -Path (Join-Path $siteDir "*") -Destination $repoPath -Force
Good "Copied $($newFiles.Count) files."

# ---- 5. commit and push ---------------------------------------------
Push-Location $repoPath
try {
    git add -A
    $pending = git status --porcelain
    if (-not $pending) {
        Good "Nothing changed - the repo already has these files."
        Pop-Location; exit 0
    }
    Write-Host ""
    Note "About to commit these changes:"
    git status --short | Select-Object -First 20 | Write-Host
    $total = ($pending -split "`n").Count
    if ($total -gt 20) { Write-Host "   ...and $($total - 20) more" }

    Write-Host ""
    $go = Read-Host "Type YES to commit and push"
    if ($go -ne "YES") { Write-Host "Cancelled. Files are copied but not pushed."; Pop-Location; exit 0 }

    git commit -m "Add Bakery and Butchery courses (12 modules each); student assignment video submissions; fix course-lock -lessons redirect"
    if ($LASTEXITCODE -ne 0) { Stop2 "git commit failed. Scroll up for the reason." }

    git push
    if ($LASTEXITCODE -ne 0) { Stop2 "git push failed. If it asks for a password, use a personal access token, not your GitHub password." }
}
finally { Pop-Location }

Write-Host ""
Good "DONE. GitHub Pages rebuilds in 1-3 minutes."
Write-Host ""
Write-Host "Then check these:" -ForegroundColor Cyan
Write-Host "  https://www.riseafricaskills.com/bakery-lessons.html"
Write-Host "  https://www.riseafricaskills.com/butchery-lessons.html"
Write-Host "  https://www.riseafricaskills.com/butchery-module-1.html   (submission box under the capstone)"
Write-Host "  https://www.riseafricaskills.com/assignment-review.html   (your marking page)"
Write-Host ""
Write-Host "REMINDER: the submission box saves nothing until you run sql\submissions.sql" -ForegroundColor Yellow
Write-Host "          in the Supabase SQL Editor. That step is not automatic."
