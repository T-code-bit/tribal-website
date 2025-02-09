import os
import re

def update_navigation(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file is an HTML file and contains a navigation section
    if not file_path.endswith('.html') or 'nav-links' in content:
        return
    
    # Define the new navigation HTML
    new_navigation = '''
    <header class="main-header">
        <div class="container">
            <nav class="main-nav">
                <div class="logo">
                    <h1>Tribal Technologies</h1>
                </div>
                <ul class="nav-links">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="services.html" class="nav-link">
                            <i class="fas fa-briefcase"></i>
                            <span>Services</span>
                            <i class="fas fa-caret-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="services.html#consulting">Consulting</a></li>
                            <li><a href="services.html#development">Development</a></li>
                            <li><a href="services.html#training">Training</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="solutions.html" class="nav-link">
                            <i class="fas fa-puzzle-piece"></i>
                            <span>Solutions</span>
                            <i class="fas fa-caret-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="solutions.html#enterprise">Enterprise</a></li>
                            <li><a href="solutions.html#startup">Startup</a></li>
                            <li><a href="solutions.html#custom">Custom</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="technologies.html" class="nav-link">
                            <i class="fas fa-laptop-code"></i>
                            <span>Technologies</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">
                            <i class="fas fa-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </li>
                </ul>
                <div class="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    </header>
    '''
    
    # Replace or insert navigation
    if '<header' in content:
        # Replace existing header
        content = re.sub(r'<header.*?</header>', new_navigation, content, flags=re.DOTALL)
    else:
        # Insert navigation after <body> tag
        content = re.sub(r'(<body[^>]*>)', r'\1' + new_navigation, content, flags=re.DOTALL)
    
    # Ensure navigation.js and Font Awesome are included
    head_insertion = '''
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    '''
    
    if '</head>' in content:
        content = content.replace('</head>', head_insertion + '</head>')
    
    # Ensure script is included before </body>
    script_insertion = '''
    <script src="navigation.js"></script>
    '''
    
    if '</body>' in content:
        content = content.replace('</body>', script_insertion + '</body>')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    directory = r'c:\Users\Admin\Desktop\TRIBAL WEBSITE'
    for filename in os.listdir(directory):
        if filename.endswith('.html'):
            file_path = os.path.join(directory, filename)
            update_navigation(file_path)
            print(f"Updated {filename}")

if __name__ == '__main__':
    main()
