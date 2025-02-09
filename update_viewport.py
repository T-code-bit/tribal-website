import os
import re

def update_viewport_tag(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove existing viewport tags
    content = re.sub(r'<meta\s+name="viewport"[^>]*>', '', content)
    
    # Add new responsive viewport tag
    new_viewport_tag = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
    
    # Insert new viewport tag in the head section
    content = content.replace('<head>', f'<head>\n    {new_viewport_tag}')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    base_dir = r'c:\Users\Admin\Desktop\TRIBAL WEBSITE'
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                update_viewport_tag(file_path)
                print(f"Updated viewport in {file}")

if __name__ == '__main__':
    main()
