# Publishing Wild Atlas manually

The repository is https://github.com/direbun/Hexplorer-Map. Nothing is uploaded automatically.

## First upload

1. Open the newest timestamped folder inside `github-upload` on your computer. Upload **its contents**, not the containing folder, to the repository root using GitHub's Add file → Upload files (or your usual Git client). Include `.gitignore` if your file picker hides dotfiles.
2. Open GitHub Releases → Draft a new release. Create the tag **v0.2.0**, targeting the branch containing your upload. Title it **Wild Atlas 0.2.0**.
3. Copy the contents of `RELEASE-NOTES.md` into the release description.
4. Attach all files from the local `release/v0.2.0` folder: **module.json**, **wild-atlas-0.2.0.zip**, **wild-atlas-editor-0.2.0-windows.zip**, and **SHA256SUMS.txt**. Keep these filenames unchanged.
5. Publish it as the latest release. GitHub's `/releases/latest/` link requires a published release that is not marked as a prerelease. This first version is described as experimental in the notes even when published as latest.
6. Test the manifest URL below in a browser and then in Foundry's Install Module dialog. Before publication the links may return 404; this is expected.

Manifest URL to give users:

```text
https://github.com/direbun/Hexplorer-Map/releases/latest/download/module.json
```

The manifest links to the ZIP for its exact version, so downloading an older manifest still retrieves the matching code. Do not rename the module ID or its `wild-atlas` directory; existing worlds use that identity.

## Future releases

Install Node.js 22+ and run `npm ci` once. Change `version` in `foundry-module/wild-atlas/module.json`, update `RELEASE-NOTES.md`, then run:

```powershell
npm test
npm run build
npm run build:foundry
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/prepare-release.ps1
```

The packaging script sets the version-specific download URL, copies the module guide and dependency notices, and creates fresh timestamped source-upload folders and release assets. Upload the new source contents and publish a matching `vVERSION` tag with the new assets. It does not upload files or modify your installed Foundry module.

## What to upload

Use the prepared upload folder. It excludes node_modules, installed module backups, local test images/maps, local build-status notes, release archives and local machine settings. The release ZIPs contain prebuilt code, so players and GMs do not need to compile anything. The standalone Windows download requires Node.js on PATH; the Foundry download does not.

No open-source license has been selected for the project's own source. Downloading/running the release does not imply permission to redistribute or modify the source. If you want those permissions, choose a license and add it before publishing. Third-party bundled dependency licenses are supplied separately in THIRD-PARTY-NOTICES.txt.
