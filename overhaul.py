import os
import glob
import re

dir_path = '/Users/lt_gh0sttt/Desktop/Projects/Harry Lahren'

# 1. Update style.css
css_path = os.path.join(dir_path, 'css/style.css')
with open(css_path, 'r') as f:
    css_content = f.read()

# Update fonts
css_content = css_content.replace("--font-display: 'Outfit', serif;", "--font-display: 'Inter', sans-serif;")

# Add CSS for fabric strips if not exists
fabric_css = """
/* Interactive Fabric Strips */
.fabrics-interactive-bg {
    position: absolute;
    top: -20%;
    left: -10%;
    width: 120%;
    height: 140%;
    z-index: 1;
    display: flex;
    gap: 2rem;
    transform: rotate(-15deg);
    pointer-events: none;
}

.fabric-strip {
    flex: 1;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 30px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    opacity: 0.85;
    will-change: transform;
}
"""
if '.fabrics-interactive-bg' not in css_content:
    css_content += "\n" + fabric_css

with open(css_path, 'w') as f:
    f.write(css_content)

print("Updated style.css")

# 2. Update HTML files
html_files = glob.glob(os.path.join(dir_path, '*.html')) + glob.glob(os.path.join(dir_path, '*/*.html'))

# New premium images to replace the old unsplash ones
# I curated premium fashion/lifestyle Ralph Lauren-esque images
new_images = [
    "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=2000",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2000",
    "https://images.unsplash.com/photo-1594938291221-94e4319c2eb5?q=80&w=2000",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2000",
    "https://images.unsplash.com/photo-1544642004-98448e89535e?q=80&w=2000",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000"
]
import random

motion_scripts = """
    <!-- Framer Motion Vanilla Integration -->
    <script type="module">
        import { animate, scroll, spring, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@11.11.11/+esm";
        window.Motion = { animate, scroll, spring, stagger, inView };
    </script>
    <script type="module" src="js/motion-animations.js"></script>
</body>
"""

for file_path in html_files:
    if not os.path.isfile(file_path): continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = content
    
    # Update Footer inline styles for contrast
    new_content = new_content.replace('style="background-color: var(--color-primary); color: var(--color-white); padding-bottom: 2rem;"', 
                                      'style="background-color: #050505; color: #ffffff; padding-bottom: 2rem;"')
    new_content = new_content.replace('color: rgba(255,255,255,0.7);', 'color: rgba(255,255,255,0.95);')
    new_content = new_content.replace('opacity: 0.8;', 'opacity: 1;')
    new_content = new_content.replace('opacity: 0.6;', 'opacity: 0.9;')
    
    # Replace old unsplash images (except hero background images if we can, but regex will just replace them all to premium ones)
    def img_replacer(match):
        return new_images[random.randint(0, len(new_images)-1)]
    
    # We will replace all unsplash images that are not in products.js.
    new_content = re.sub(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+\?q=80&w=\d+(&auto=format&fit=crop)?', img_replacer, new_content)
    
    # Add motion script before </body>
    if 'motion-animations.js' not in new_content:
        new_content = new_content.replace('</body>', motion_scripts)

    # In index.html, replace the fabrics-bg text with fabric-strip divs
    if 'index.html' in file_path:
        old_fabrics = re.search(r'<div class="fabrics-bg">.*?</div>\s*<div class="hero-content">', new_content, re.DOTALL)
        if old_fabrics:
            new_fabrics = """<div class="fabrics-interactive-bg" id="fabrics-interactive-bg">
            <div class="fabric-strip" style="background-image: url('https://images.unsplash.com/photo-1606170033648-5d55a3edf314?q=80&w=2000');"></div>
            <div class="fabric-strip" style="background-image: url('https://images.unsplash.com/photo-1596526131083-e8c638c9c6c7?q=80&w=2000');"></div>
            <div class="fabric-strip" style="background-image: url('https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2000');"></div>
            <div class="fabric-strip" style="background-image: url('https://images.unsplash.com/photo-1584820927498-cafe2c1c7669?q=80&w=2000');"></div>
            <div class="fabric-strip" style="background-image: url('https://images.unsplash.com/photo-1606170033648-5d55a3edf314?q=80&w=2000');"></div>
        </div>
        <div class="hero-content">"""
            new_content = new_content[:old_fabrics.start()] + new_fabrics + new_content[old_fabrics.end() - 24:]
            
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

print("HTML and styling overhaul complete.")
