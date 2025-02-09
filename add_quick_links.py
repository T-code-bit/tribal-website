import os
import re

def add_quick_links_section(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if quick links section already exists
    if 'quick-links-section' in content:
        print(f"Quick links section already exists in {file_path}")
        return
    
    # Define the quick links HTML to insert before the closing footer
    quick_links_html = '''
    <div class="footer-section quick-links-section">
        <canvas id="quick-links-particles" class="hero-particles"></canvas>
        <h4>Quick Links</h4>
        <ul>
            <li><a href="services.html">Services</a></li>
            <li><a href="solutions.html">Solutions</a></li>
            <li><a href="technologies.html">Technologies</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="projects.html">Projects</a></li>
        </ul>
    </div>
    '''
    
    # Find the position to insert the quick links section
    footer_match = re.search(r'<footer\s+class="main-footer">(.*?)</footer>', content, re.DOTALL)
    if footer_match:
        footer_content = footer_match.group(1)
        footer_sections_match = re.search(r'<div\s+class="footer-sections">(.*?)</div>', footer_content, re.DOTALL)
        
        if footer_sections_match:
            # Insert quick links section inside footer-sections
            updated_footer_sections = footer_sections_match.group(1).replace(
                '</div>', 
                f'{quick_links_html}\n                    </div>'
            )
            updated_content = content.replace(footer_sections_match.group(1), updated_footer_sections)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Added quick links section to {file_path}")
        else:
            print(f"Could not find footer-sections in {file_path}")
    else:
        print(f"Could not find footer in {file_path}")

def main():
    html_files = [
        'about.html', 'contact.html', 'debug.html', 'education.html', 
        'experience.html', 'project-universe.html', 'projects.html', 
        'services.html', 'skills.html', 'solutions.html', 
        'tech-constellation.html', 'tech-showcase.html', 'technologies.html', 
        'thank-you.html', 'validate.html'
    ]
    
    for filename in html_files:
        file_path = os.path.join(r'c:\Users\Admin\Desktop\TRIBAL WEBSITE', filename)
        add_quick_links_section(file_path)

if __name__ == '__main__':
    main()
