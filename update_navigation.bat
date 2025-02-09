@echo off
setlocal enabledelayedexpansion

set "WEBSITE_DIR=C:\Users\Admin\Desktop\TRIBAL WEBSITE"
set "NAVIGATION_HTML=<header class=\"main-header\"><div class=\"container\"><nav class=\"main-nav\"><div class=\"logo\"><h1>Tribal Technologies</h1></div><ul class=\"nav-links\"><li class=\"nav-item\"><a href=\"index.html\" class=\"nav-link\"><i class=\"fas fa-home\"></i><span>Home</span></a></li><li class=\"nav-item dropdown\"><a href=\"services.html\" class=\"nav-link\"><i class=\"fas fa-briefcase\"></i><span>Services</span><i class=\"fas fa-caret-down dropdown-icon\"></i></a><ul class=\"dropdown-menu\"><li><a href=\"services.html#consulting\">Consulting</a></li><li><a href=\"services.html#development\">Development</a></li><li><a href=\"services.html#training\">Training</a></li></ul></li><li class=\"nav-item dropdown\"><a href=\"solutions.html\" class=\"nav-link\"><i class=\"fas fa-puzzle-piece\"></i><span>Solutions</span><i class=\"fas fa-caret-down dropdown-icon\"></i></a><ul class=\"dropdown-menu\"><li><a href=\"solutions.html#enterprise\">Enterprise</a></li><li><a href=\"solutions.html#startup\">Startup</a></li><li><a href=\"solutions.html#custom\">Custom</a></li></ul></li><li class=\"nav-item\"><a href=\"technologies.html\" class=\"nav-link\"><i class=\"fas fa-laptop-code\"></i><span>Technologies</span></a></li><li class=\"nav-item\"><a href=\"contact.html\" class=\"nav-link\"><i class=\"fas fa-envelope\"></i><span>Contact</span></a></li></ul><div class=\"mobile-menu-toggle\"><span></span><span></span><span></span></div></nav></div></header>"

set "SCRIPT_TAG=<script src=\"navigation.js\"></script>"
set "FONT_AWESOME=<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css\">"
set "META_VIEWPORT=<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">"
set "META_PERFORMANCE=<meta http-equiv=\"x-dns-prefetch-control\" content=\"on\"><link rel=\"preconnect\" href=\"https://cdnjs.cloudflare.com\">"
set "META_ACCESSIBILITY=<div id=\"screen-reader-announcer\" class=\"sr-only\" aria-live=\"polite\"></div>"

cd /d "%WEBSITE_DIR%"

for %%F in (*.html) do (
    echo Processing %%F
    powershell -Command "(Get-Content '%%F') | ForEach-Object { $_ -replace '<header.*?</header>', '%NAVIGATION_HTML%' } | Set-Content '%%F'"
    powershell -Command "(Get-Content '%%F') | ForEach-Object { $_ -replace '</head>', '%META_VIEWPORT%%META_PERFORMANCE%%FONT_AWESOME%</head>' } | Set-Content '%%F'"
    powershell -Command "(Get-Content '%%F') | ForEach-Object { $_ -replace '</body>', '%META_ACCESSIBILITY%%SCRIPT_TAG%</body>' } | Set-Content '%%F'"
)

echo Navigation updated for all HTML files
pause
