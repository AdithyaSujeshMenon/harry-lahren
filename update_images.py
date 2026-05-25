import os
import re
import random

rl_images = [
    "assets/images/hero-fabric-composite.jpg",
    "assets/images/women-collection.jpg",
    "assets/images/women-pleated-skirt.jpg",
    "assets/images/women-blazer.jpg",
    "assets/images/women-cardigan.jpg",
    "assets/images/little-lahren-collection.jpg",
    "assets/images/kids-oxford-shirt.jpg",
    "assets/images/kids-party-dress.jpg",
    "assets/images/kids-winter-parka.jpg",
    "assets/images/legacy-atelier.jpg"
]

prod_path = '/Users/lt_gh0sttt/Desktop/Projects/Harry Lahren/js/products.js'
with open(prod_path, 'r') as f:
    content = f.read()

def replacer(match):
    img = rl_images[random.randint(0, len(rl_images)-1)]
    return f'image: "{img}"'

new_content = re.sub(r'image:\s*"https://images\.unsplash\.com/[^"]+"', replacer, content)

with open(prod_path, 'w') as f:
    f.write(new_content)

print("Updated images to RL images.")
