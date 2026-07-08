# AGENT Notes

This file serves as a brief overview of the project's result and the correct procedure for packaging the Zotero plugin.

## Project Result
- **Plugin Name:** CSVenue (v1.0.3)
- **Compatibility:** Fully compatible with Zotero 7 and Zotero 9.
- **Functionality:** 
  - Automatically matches CS papers with a built-in CCF A/B/C database (160+ venues) using `src/venues.js`.
  - Registers two custom columns in the Zotero item list: `Venue` and `CCF`.
  - Injects a context menu item ("Lookup venue via DBLP") to dynamically query missing venues from the DBLP API and saves the results to the `Extra` field.
- **Localization:** 100% English UI and documentation (`README.md`).
- **Fixes Applied:** 
  - Added the `update_url` field in `manifest.json` which is strictly required by Zotero 9.
  - Used string formatting for `width` in column registration and added proper DOM null-checks for `renderCell`.

## How to Package the Plugin

Zotero plugins (`.xpi` files) are fundamentally standard `.zip` archives. However, **the directory structure inside the ZIP is critical**. The files `manifest.json` and `bootstrap.js`, as well as the `src/` folder, must be at the **root** of the archive.

### ⚠️ Common Pitfalls
1. **Using `tar -a -c -f CSVenue.xpi`**: Windows `tar` relies on the file extension. If you output to `.xpi`, it creates a `.tar` archive instead of a `.zip`, which Zotero's `nsIZipReader` will reject.
2. **Absolute paths in PowerShell**: Using `Compress-Archive d:\path\to\folder\*` might include absolute paths or wrap everything inside an unnecessary parent folder.

### ✅ Correct Packaging Command (PowerShell)
To safely pack the XPI file without structural errors, navigate directly into the project directory and compress the files using relative paths, then rename the `.zip` to `.xpi`:

```powershell
cd d:\codes\zotero-CSVenue

# 1. Clean up any existing packages
Remove-Item -Force CSVenue.zip -ErrorAction SilentlyContinue
Remove-Item -Force CSVenue.xpi -ErrorAction SilentlyContinue

# 2. Compress the specific files into a standard ZIP archive using relative paths
Compress-Archive -Path manifest.json, bootstrap.js, src, update.json -DestinationPath CSVenue.zip -Force

# 3. Rename the archive to .xpi
Rename-Item CSVenue.zip CSVenue.xpi -Force
```

This ensures the generated `CSVenue.xpi` is structurally perfect and readily accepted by Zotero.
