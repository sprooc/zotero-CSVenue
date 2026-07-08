import os
import zipfile

def create_xpi(source_dir, output_filename):
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                # Exclude unnecessary files
                if file.startswith('.') or file.endswith('.xpi') or file.endswith('.zip') or file in ['build.py', 'AGENT.md', 'README.md'] or 'test_extract' in root:
                    continue
                
                file_path = os.path.join(root, file)
                # Calculate relative path
                rel_path = os.path.relpath(file_path, source_dir)
                # Ensure forward slashes for the zip entry
                arcname = rel_path.replace(os.sep, '/')
                
                zf.write(file_path, arcname)
    print(f"Successfully created {output_filename}")

if __name__ == "__main__":
    create_xpi(".", "CSVenue.xpi")
