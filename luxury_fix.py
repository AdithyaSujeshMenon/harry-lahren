import os
import glob
import re
import random

dir_path = '/Users/lt_gh0sttt/Desktop/Projects/Harry Lahren'

# --- 1. Extract RL Images ---
content_md_path = '/Users/lt_gh0sttt/.gemini/antigravity/brain/8c911fd9-b329-497a-833d-699a68460361/.system_generated/steps/92/content.md'
with open(content_md_path, 'r') as f:
    content_md = f.read()

urls = re.findall(r'https://dtcralphlauren\.scene7\.com/is/image/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-]+', content_md)
rl_images = list(set(urls))

# Separate lifestyle from product shots if possible
lifestyle_images = [url + '?$plpDeskRF$' for url in rl_images if 'lifestyle' in url.lower() or 'alternate10' in url.lower()]
product_images = [url + '?$plpDeskRF$' for url in rl_images if 'lifestyle' not in url.lower()]

if not lifestyle_images:
    lifestyle_images = product_images[:10]

random.shuffle(product_images)

# --- 2. Update products.js ---
prod_path = os.path.join(dir_path, 'js/products.js')
if os.path.exists(prod_path):
    with open(prod_path, 'r') as f:
        prod_content = f.read()
    
    img_idx = 0
    def prod_replacer(match):
        global img_idx
        img = product_images[img_idx % len(product_images)]
        img_idx += 1
        return f'image: "{img}"'
    
    new_prod_content = re.sub(r'image:\s*"https://dtcralphlauren[^"]+"', prod_replacer, prod_content)
    # also catch unsplash just in case
    new_prod_content = re.sub(r'image:\s*"https://images\.unsplash\.com/[^"]+"', prod_replacer, new_prod_content)

    with open(prod_path, 'w') as f:
        f.write(new_prod_content)
    print("Updated products.js with unique RL images.")

# --- 3. Fix index.html ---
index_path = os.path.join(dir_path, 'index.html')
with open(index_path, 'r') as f:
    index_content = f.read()

# Fix syntax error
index_content = index_content.replace('<div class="hero-content">iv class="hero-content">', '<div class="hero-content" style="text-align: center; margin: 0 auto; max-width: 900px;">')

# Remove carousel
index_content = re.sub(r'<div class="carousel-slides" id="heroCarousel">.*?</div>', '', index_content, flags=re.DOTALL)
index_content = re.sub(r'<div class="carousel-indicators" id="carouselIndicators">.*?</div>', '', index_content, flags=re.DOTALL)
index_content = index_content.replace('<script src="js/carousel.js"></script>', '')

# Center hero actions
index_content = index_content.replace('<div class="hero-actions">', '<div class="hero-actions" style="justify-content: center; margin-top: 3rem;">')
# Make subtitle look better
index_content = index_content.replace('<p class="hero-subtitle">', '<p class="hero-subtitle" style="letter-spacing: 0.3em; font-size: 0.85rem; text-transform: uppercase;">')

# Replace the fabric strips with real RL textures
# Let's use some nice RL fabric textures or lifestyle images for the strips, 
# or just high quality texture links. Since we want RL images, let's use the lifestyle RL images.
def strip_replacer(match):
    return f'<div class="fabric-strip" style="background-image: url(\'{random.choice(lifestyle_images)}\');"></div>'
index_content = re.sub(r'<div class="fabric-strip" style="background-image: url\([^)]+\);"></div>', strip_replacer, index_content)

with open(index_path, 'w') as f:
    f.write(index_content)
print("Fixed index.html and removed carousel.")

# --- 4. Update style.css ---
css_path = os.path.join(dir_path, 'css/style.css')
with open(css_path, 'r') as f:
    css_content = f.read()

# Import Playfair Display
import_statement = "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap');\n"
if "Playfair+Display" not in css_content:
    css_content = import_statement + css_content

# Update fonts
css_content = css_content.replace("--font-display: 'Inter', sans-serif;", "--font-display: 'Playfair Display', serif;")
css_content = css_content.replace("--font-display: 'Outfit', serif;", "--font-display: 'Playfair Display', serif;")

# Update body text
css_content = css_content.replace("font-size: 16px;\n    line-height: 1.6;", "font-size: 15px;\n    line-height: 1.8;")

# Update padding
css_content = css_content.replace("padding: var(--spacing-xl) 0;", "padding: calc(var(--spacing-xl) * 2.5) 0;")
css_content = css_content.replace("gap: 2rem;", "gap: 4rem;") # More breathing room in grids

# Make hero title huge and elegant
if "font-size: 6rem;" not in css_content:
    css_content = css_content.replace(".hero-title {\n    font-family: var(--font-display);", 
                                      ".hero-title {\n    font-family: var(--font-display);\n    font-size: clamp(3rem, 8vw, 7rem);\n    line-height: 1.05;\n    font-weight: 400;\n    margin-bottom: 2rem;")

# Refine fabrics interactive bg
css_content = css_content.replace("opacity: 0.85;", "opacity: 0.45; border-radius: 0; filter: contrast(1.1) grayscale(0.2);")

with open(css_path, 'w') as f:
    f.write(css_content)
print("Updated style.css for Billion Dollar aesthetic.")

# --- 5. Update HTML files to replace any remaining Unsplash with RL Lifestyle ---
html_files = glob.glob(os.path.join(dir_path, '*.html')) + glob.glob(os.path.join(dir_path, '*/*.html'))
for file_path in html_files:
    if not os.path.isfile(file_path): continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = content
    def html_img_replacer(match):
        return random.choice(lifestyle_images)
    
    # Replace unsplash images
    new_content = re.sub(r'https://images\.unsplash\.com/[^"\']+', html_img_replacer, new_content)
    
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Replaced images in {file_path}")

print("All tasks completed.")
