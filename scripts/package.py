import os
import zipfile
import json
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, 'dist')
PACKAGE_JSON = os.path.join(BASE_DIR, 'package.json')
MANIFEST_PATH = os.path.join(DIST_DIR, 'manifest.json')

if not os.path.exists(MANIFEST_PATH):
    print("❌ Error: dist/manifest.json not found! Please run 'npm run build' first.")
    exit(1)

with open(PACKAGE_JSON, 'r', encoding='utf-8') as f:
    pkg = json.load(f)

version = pkg.get('version', '1.0.0')
output_zip = os.path.join(BASE_DIR, f"leetcode-ebbinghaus-tracker-v{version}.zip")

# Create zip file with files relative to dist/
with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(DIST_DIR):
        for f in files:
            # Skip any existing zip or hidden files
            if f.endswith('.zip') or f.startswith('.'):
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, DIST_DIR)
            z.write(full_path, rel_path)

file_size_kb = os.path.getsize(output_zip) / 1024

print("=" * 60)
print(f"📦 Extension package created successfully!")
print(f"📁 Output file: {output_zip}")
print(f"📊 Package size: {file_size_kb:.1f} KB")
print("-" * 60)
print("Files included in ZIP root (compliant with Chrome Web Store):")
with zipfile.ZipFile(output_zip, 'r') as z:
    for info in z.infolist():
        print(f"  ✓ {info.filename} ({info.file_size / 1024:.1f} KB)")
print("=" * 60)
