<#
    rise AFRICA skills - deploy to GitHub
    Uploads the files in a folder to the repo root as ONE atomic commit.

    Why one commit: your homepage was destroyed on 31 Aug by a commit that
    touched more than it claimed. One commit, one clear message, easy to revert
    with a single `git revert` if anything looks wrong.

    USAGE
      1. Create a token: https://github.com/settings/tokens/new
         - Note: "rAs deploy"      - Expiration: 7 days
         - Tick the "repo" checkbox    - Generate, then COPY it
      2. Run:
         .\deploy-to-github.ps1 -Folder "C:\Users\1st choice group\Downloads\riseafricadeploy (1)"
      3. Paste the token when asked (it will not be echoed to the screen).
#>

param(
    [Parameter(Mandatory = $true)]  [string] $Folder,
    [string] $Owner  = "rAsAfrica1",
    [string] $Repo   = "rise-africa-skills",
    [string] $Branch = "main",
    [string] $Message = "Add complete Pig Feed course (12 modules), feed course modules 9-12, video library; restore homepage kids band"
)

$ErrorActionPreference = "Stop"
$ProgressPreference    = "SilentlyContinue"

function Fail($m) { Write-Host "`nERROR: $m" -ForegroundColor Red; exit 1 }

# ---------- checks ----------
if (-not (Test-Path -LiteralPath $Folder)) { Fail "Folder not found:`n  $Folder" }

$files = Get-ChildItem -LiteralPath $Folder -File |
         Where-Object { $_.Extension -in '.html', '.svg', '.png', '.js', '.json', '.css' }

if ($files.Count -eq 0) {
    Fail "No deployable files directly inside that folder.`nIf the files are in a sub-folder, point -Folder at that sub-folder instead."
}

Write-Host ""
Write-Host "Repository : $Owner/$Repo  (branch $Branch)" -ForegroundColor Cyan
Write-Host "Source     : $Folder"      -ForegroundColor Cyan
Write-Host "Files      : $($files.Count)" -ForegroundColor Cyan
Write-Host ""
$files | ForEach-Object { "   {0,-42} {1,8:N0} bytes" -f $_.Name, $_.Length } | Write-Host

if ($files.Name -contains 'index.html') {
    Write-Host ""
    Write-Host "NOTE: index.html is included. This REPLACES your live homepage" -ForegroundColor Yellow
    Write-Host "      (restores the gold design, the kids band and Zola)."      -ForegroundColor Yellow
}

Write-Host ""
if ((Read-Host "Type YES to upload") -ne "YES") { Write-Host "Cancelled."; exit 0 }

$sec   = Read-Host "GitHub token" -AsSecureString
$token = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
           [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
if ([string]::IsNullOrWhiteSpace($token)) { Fail "No token entered." }

$H = @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json";
        "User-Agent" = "ras-deploy"; "X-GitHub-Api-Version" = "2022-11-28" }
$API = "https://api.github.com/repos/$Owner/$Repo"

function Git-Api($Method, $Url, $Body) {
    $p = @{ Method = $Method; Uri = $Url; Headers = $H }
    if ($Body) { $p.Body = ($Body | ConvertTo-Json -Depth 10 -Compress); $p.ContentType = "application/json" }
    try { Invoke-RestMethod @p }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        switch ($code) {
            401 { Fail "Token rejected (401). Create a new one and tick the 'repo' scope." }
            403 { Fail "Forbidden (403). The token lacks write access to this repo." }
            404 { Fail "Not found (404). Check the repo name, or the token cannot see it." }
            default { Fail "GitHub API $code on $Method $Url`n$($_.Exception.Message)" }
        }
    }
}

# ---------- one atomic commit ----------
Write-Host "`nReading branch $Branch ..." -ForegroundColor Cyan
$ref        = Git-Api GET "$API/git/ref/heads/$Branch"
$baseSha    = $ref.object.sha
$baseCommit = Git-Api GET "$API/git/commits/$baseSha"
Write-Host "  current head: $($baseSha.Substring(0,7))"

Write-Host "`nUploading file contents ..." -ForegroundColor Cyan
$tree = @()
$i = 0
foreach ($f in $files) {
    $i++
    Write-Host ("  [{0}/{1}] {2}" -f $i, $files.Count, $f.Name)
    $b64  = [Convert]::ToBase64String([IO.File]::ReadAllBytes($f.FullName))
    $blob = Git-Api POST "$API/git/blobs" @{ content = $b64; encoding = "base64" }
    $tree += @{ path = $f.Name; mode = "100644"; type = "blob"; sha = $blob.sha }
}

Write-Host "`nCreating commit ..." -ForegroundColor Cyan
$newTree   = Git-Api POST "$API/git/trees"   @{ base_tree = $baseCommit.tree.sha; tree = $tree }
$newCommit = Git-Api POST "$API/git/commits" @{ message = $Message; tree = $newTree.sha; parents = @($baseSha) }
Git-Api PATCH "$API/git/refs/heads/$Branch"  @{ sha = $newCommit.sha; force = $false } | Out-Null

Write-Host ""
Write-Host "DONE - one commit, $($files.Count) files." -ForegroundColor Green
Write-Host "  commit : $($newCommit.sha.Substring(0,7))"
Write-Host "  view   : https://github.com/$Owner/$Repo/commit/$($newCommit.sha)"
Write-Host ""
Write-Host "GitHub Pages rebuilds in 1-3 minutes. Then check:" -ForegroundColor Cyan
Write-Host "  https://www.riseafricaskills.com/                        (kids band + Zola back)"
Write-Host "  https://www.riseafricaskills.com/pig-feed-lessons.html   (all 12 modules)"
Write-Host "  https://www.riseafricaskills.com/video-library.html      (video library)"
Write-Host ""
Write-Host "To undo everything this did:" -ForegroundColor Yellow
Write-Host "  https://github.com/$Owner/$Repo/commit/$($newCommit.sha)  ->  Revert"
