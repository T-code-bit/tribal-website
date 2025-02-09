# GitHub Deployment Script for Tribal Tech Website

# Function to check if a command exists
function Test-CommandExists {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try { if (Get-Command $command) { return $true } }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

# Check for Git installation
if (-not (Test-CommandExists git)) {
    Write-Host "Git is not installed. Please download and install Git from https://git-scm.com/downloads" -ForegroundColor Red
    exit
}

# Ensure we're in the correct directory
Set-Location "C:\Users\Admin\Desktop\TRIBAL WEBSITE"

# Prompt for GitHub details
Write-Host "GitHub Deployment for Tribal Tech Website" -ForegroundColor Cyan
$githubUsername = Read-Host "Enter your GitHub username"
$githubEmail = Read-Host "Enter your GitHub email"

# Configure Git user
git config --global user.email "$githubEmail"
git config --global user.name "$githubUsername"

# Repository name
$repoName = "tribal-tech-website"

# Add all files
git add .

# Commit changes
$commitMessage = "Deploy Tribal Tech website - $(Get-Date)"
git commit -m "$commitMessage"

# Create repository (requires GitHub CLI)
Write-Host "Creating GitHub repository..." -ForegroundColor Green
try {
    gh repo create $repoName --public --source=. --remote=origin
}
catch {
    Write-Host "GitHub CLI not found. Please manually create a repository on GitHub." -ForegroundColor Yellow
    Write-Host "Then run these commands:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/$githubUsername/$repoName.git" -ForegroundColor Yellow
    Write-Host "git branch -M main" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Yellow
}

# Push to GitHub
git branch -M main
git push -u origin main

# Create GitHub Pages configuration
$ghpagesContent = @"
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=index.html">
    <title>Tribal Tech Website</title>
  </head>
  <body>
    <p>Redirecting to main site...</p>
  </body>
</html>
"@

$ghpagesContent | Out-File -FilePath "index.html" -Encoding UTF8

# Create .nojekyll file to allow dotfiles
New-Item -Path ".nojekyll" -ItemType File

# Commit and push GitHub Pages configuration
git add .nojekyll
git add index.html
git commit -m "Add GitHub Pages configuration"
git push origin main

Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Your website will be available at: https://$githubUsername.github.io/$repoName" -ForegroundColor Cyan
Write-Host "Repository URL: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan

# Open browser to repository
Start-Process "https://github.com/$githubUsername/$repoName"
