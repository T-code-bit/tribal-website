# GitHub Deployment Script

# IMPORTANT: Replace 'yourusername' with your actual GitHub username
$githubUsername = "yourusername"

# Ensure you're in the correct directory
Set-Location "C:\Users\Admin\Desktop\TRIBAL WEBSITE"

# Prompt for GitHub username and email
$githubUsername = Read-Host "Enter your GitHub username"
$githubEmail = Read-Host "Enter your GitHub email"

# Configure Git user
git config --global user.email "$githubEmail"
git config --global user.name "$githubUsername"

# Create repository name
$repoName = "tribal-tech-website"

# Add remote repository
git remote add origin "https://github.com/$githubUsername/$repoName.git"

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

Write-Host "Deployment complete! Visit https://github.com/$githubUsername/$repoName to verify."
