$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
function Write-PortableZip($directory, $destination, $prefix) {
 $stream = [IO.File]::Open($destination, [IO.FileMode]::Create)
 $archive = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Create)
 try {
  foreach ($file in Get-ChildItem -LiteralPath $directory -File -Recurse) {
   $relative = $file.FullName.Substring($directory.Length + 1).Replace('\', '/')
   [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, "$prefix$relative", [IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
 } finally { $archive.Dispose(); $stream.Dispose() }
}
$root = Split-Path $PSScriptRoot -Parent
$module = Join-Path $root 'foundry-module/wild-atlas'
$manifestPath = Join-Path $module 'module.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$version = $manifest.version
if ($version -notmatch '^\d+\.\d+\.\d+$') { throw 'Use a numeric major.minor.patch version.' }
$repo = 'https://github.com/direbun/Hexplorer-Map'
$manifest | Add-Member url $repo -Force
$manifest | Add-Member manifest "$repo/releases/latest/download/module.json" -Force
$manifest | Add-Member download "$repo/releases/download/v$version/wild-atlas-$version.zip" -Force
$manifest | Add-Member bugs "$repo/issues" -Force
$manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding UTF8
foreach ($required in @('dist/index.html','foundry-module/wild-atlas/editor/index.html','foundry-module/wild-atlas/scripts/core.js')) {
 if (!(Test-Path -LiteralPath (Join-Path $root $required))) { throw "Missing build: $required. Run both builds first." }
}
Copy-Item -LiteralPath (Join-Path $root 'foundry-module/README.md') -Destination (Join-Path $module 'README.md') -Force
Copy-Item -LiteralPath (Join-Path $root 'THIRD-PARTY-NOTICES.txt') -Destination $module -Force
$output = Join-Path $root "release/v$version"
New-Item -ItemType Directory -Path $output -Force | Out-Null
Copy-Item -LiteralPath $manifestPath -Destination $output -Force
Write-PortableZip $module (Join-Path $output "wild-atlas-$version.zip") 'wild-atlas/'
$staging = Join-Path $root ('github-upload/' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $staging | Out-Null
foreach ($item in @('src','scripts','launcher','.gitignore','index.html','package.json','package-lock.json','README.md','PUBLISHING.md','RELEASE-NOTES.md','THIRD-PARTY-NOTICES.txt','tsconfig.json','vite.config.ts','Start Wild Atlas.vbs','Stop Wild Atlas.vbs')) {
 Copy-Item -LiteralPath (Join-Path $root $item) -Destination $staging -Recurse
}
New-Item -ItemType Directory -Path (Join-Path $staging 'foundry-module') | Out-Null
Copy-Item -LiteralPath $module -Destination (Join-Path $staging 'foundry-module') -Recurse
Copy-Item -LiteralPath (Join-Path $root 'foundry-module/README.md') -Destination (Join-Path $staging 'foundry-module')
$desktop = Join-Path $root ('release/desktop-staging-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $desktop | Out-Null
foreach ($item in @('dist','launcher','README.md','THIRD-PARTY-NOTICES.txt','Start Wild Atlas.vbs','Stop Wild Atlas.vbs')) {
 Copy-Item -LiteralPath (Join-Path $root $item) -Destination $desktop -Recurse
}
Write-PortableZip $desktop (Join-Path $output "wild-atlas-editor-$version-windows.zip") ''
$hashes = Get-ChildItem -LiteralPath $output -File | Where-Object Name -ne 'SHA256SUMS.txt' | ForEach-Object { "{0}  {1}" -f (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant(), $_.Name }
$hashes | Set-Content -LiteralPath (Join-Path $output 'SHA256SUMS.txt') -Encoding ASCII
Write-Output "Upload repository contents from: $staging"
Write-Output "Attach release assets from: $output"
