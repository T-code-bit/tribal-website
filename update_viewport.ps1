# PowerShell script to update viewport meta tags in HTML files

$baseDir = "C:\Users\Admin\Desktop\TRIBAL WEBSITE"

Get-ChildItem -Path $baseDir -Recurse -Filter *.html | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Remove existing viewport tags
    $content = $content -replace '<meta\s+name="viewport"[^>]*>', ''

    # Add new responsive viewport tag
    $newViewportTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
    $content = $content -replace '<head>', "<head>`n    $newViewportTag"

    # Write updated content
    $content | Set-Content $filePath -Encoding UTF8
    Write-Host "Updated viewport in $($_.Name)"
}
