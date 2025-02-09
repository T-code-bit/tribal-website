# GitHub Deployment Wizard for Tribal Tech Website

function Show-Banner {
    Write-Host @"
 ______ _   _ _____ _____ ___________ 
 | ___ \ | | |_   _|  __ \  _  | ___ \
 | |_/ / |_| | | | | |  \/ | | | |_/ /
 |    /|  _  | | | | | __|  | | |  __/
 | |\ \| | | |_| |_| |_\ \ \_/ / |    
 \_| \_\_| |_/\___/ \____/\___/\_|    
                                      
 Tribal Tech Website Deployment Wizard
"@ -ForegroundColor Cyan
}

function Validate-GitInstallation {
    try {
        $gitVersion = git --version
        Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Git is not installed. Please download from https://git-scm.com/downloads" -ForegroundColor Red
        return $false
    }
}

function Get-GitHubCredentials {
    $global:githubUsername = Read-Host "Enter your GitHub username"
    $global:githubEmail = Read-Host "Enter your GitHub email address"
    
    git config --global user.name "$global:githubUsername"
    git config --global user.email "$global:githubEmail"
}

function Initialize-Repository {
    Set-Location "C:\Users\Admin\Desktop\TRIBAL WEBSITE"
    
    # Initialize Git if not already initialized
    if (-not (Test-Path .git)) {
        git init
    }

    # Stage all files
    git add .

    # Commit changes
    $commitMessage = "Initial deployment of Tribal Tech website - $(Get-Date)"
    git commit -m "$commitMessage"
}

function Create-GitHubRepository {
    $repoName = "tribal-tech-website"
    
    try {
        # Try using GitHub CLI
        gh repo create $repoName --public --source=. --remote=origin
    }
    catch {
        Write-Host "GitHub CLI not found. Please manually create a repository:" -ForegroundColor Yellow
        Write-Host "1. Go to https://github.com/new" -ForegroundColor Cyan
        Write-Host "2. Create a new repository named 'tribal-tech-website'" -ForegroundColor Cyan
        Write-Host "3. Do NOT initialize with README, .gitignore, or license" -ForegroundColor Cyan
        
        $continue = Read-Host "Press Enter after creating the repository, or type 'cancel' to exit"
        if ($continue -eq 'cancel') {
            exit
        }
    }

    # Add remote and push
    git branch -M main
    git push -u origin main
}

function Setup-GitHubPages {
    # Create GitHub Pages redirect
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
    New-Item -Path ".nojekyll" -ItemType File

    git add index.html .nojekyll
    git commit -m "Add GitHub Pages configuration"
    git push origin main
}

function Main {
    Clear-Host
    Show-Banner

    if (-not (Validate-GitInstallation)) {
        return
    }

    Get-GitHubCredentials
    Initialize-Repository
    Create-GitHubRepository
    Setup-GitHubPages

    $websiteUrl = "https://$global:githubUsername.github.io/tribal-tech-website"
    $repoUrl = "https://github.com/$global:githubUsername/tribal-tech-website"

    Write-Host "`n🎉 Deployment Complete! 🎉" -ForegroundColor Green
    Write-Host "Website URL: $websiteUrl" -ForegroundColor Cyan
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan

    # Optional: Open URLs
    Start-Process $websiteUrl
    Start-Process $repoUrl
}

Main
