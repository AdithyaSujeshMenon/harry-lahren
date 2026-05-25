import os
import glob
import re

dir_path = '/Users/lt_gh0sttt/Desktop/Projects/Harry Lahren'

# 1. Update prices in products.js
prices = {
    1: 249, 2: 349, 3: 249, 4: 399, 5: 55, 6: 64, 7: 84, 8: 59, 9: 69,
    10: 149, 11: 89, 12: 124, 13: 99, 14: 59, 15: 124, 16: 74, 17: 349,
    18: 449, 19: 99, 20: 149, 21: 249, 22: 299, 23: 199, 24: 49, 25: 49,
    26: 89, 27: 299, 28: 39, 29: 54, 30: 39, 31: 64, 32: 49, 33: 174,
    34: 24, 35: 64, 36: 34, 37: 199, 38: 174, 39: 64, 40: 29, 41: 349,
    42: 149, 43: 124, 44: 174, 45: 199, 46: 124, 47: 74, 48: 174, 49: 84,
    50: 124, 51: 89, 52: 149, 53: 249, 54: 74, 55: 124, 56: 249, 57: 124,
    58: 174, 59: 99, 60: 299, 61: 399, 62: 299, 63: 449, 64: 174, 65: 299,
    66: 124, 67: 199, 68: 224, 69: 74, 70: 274, 71: 84, 72: 174, 73: 224,
    74: 74, 75: 149, 76: 199, 77: 149, 78: 64, 79: 174, 80: 299, 81: 29,
    82: 34, 83: 49, 84: 69, 85: 39, 86: 29, 87: 44, 88: 29, 89: 39, 90: 34,
    91: 54, 92: 24, 93: 34, 94: 29, 95: 24, 96: 34, 97: 49, 98: 34, 99: 74,
    100: 39, 101: 49, 102: 84, 103: 29, 104: 39, 105: 54
}

prod_path = os.path.join(dir_path, 'js/products.js')
if os.path.exists(prod_path):
    with open(prod_path, 'r') as f:
        content = f.read()

    def replacer(match):
        id_val = int(match.group(1))
        if id_val in prices:
            return f"{{ id: {id_val}, name: \"{match.group(2)}\", price: {prices[id_val]}, category:"
        return match.group(0)

    new_content = re.sub(r'\{ id:\s*(\d+),\s*name:\s*"([^"]+)",\s*price:\s*(\d+),\s*category:', replacer, content)
    
    # Keep establishment references normalized.
    new_content = new_content.replace('since 1981', 'Est. 1981')

    if new_content != content:
        with open(prod_path, 'w') as f:
            f.write(new_content)
        print("Updated products.js prices.")


# 2. Update HTML files
html_files = glob.glob(os.path.join(dir_path, '*.html'))
html_files += glob.glob(os.path.join(dir_path, '*/*.html'))

replacements = [
    (r'>Men<', '>Gents<'),
    (r'>\s*Men\s*<', '>Gents<'),
    (r'>Men\n', '>Gents\n'),
    (r'\bShop Men\b', 'Shop Gents'),
    (r"Men's Collection", "Gents Collection"),
    (r"Men's", "Gents'"),
    (r'since 1981', 'Est. 1981'),
    (r'data-category="men">Men<', 'data-category="men">Gents<'),
]

for file_path in html_files:
    if not os.path.isfile(file_path): continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = content
    for old_pat, new_str in replacements:
        new_content = re.sub(old_pat, new_str, new_content)
        
    # Handle mobile nav "Men" with trailing space/newline
    new_content = re.sub(r'(<div class="mobile-nav-link">\s*)Men(\s*<i)', r'\1Gents\2', new_content)
    # Handle mobile chip filters (if any missed)
    new_content = re.sub(r'data-category="men">Men</div>', 'data-category="men">Gents</div>', new_content)

    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

# 3. Update carousel.js
carousel_path = os.path.join(dir_path, 'js/carousel.js')
if os.path.exists(carousel_path):
    with open(carousel_path, 'r') as f:
        c_content = f.read()
    nc_content = c_content.replace("'Shop Men'", "'Shop Gents'")
    nc_content = nc_content.replace("since 1981", "Est. 1981")
    if nc_content != c_content:
        with open(carousel_path, 'w') as f:
            f.write(nc_content)
        print("Updated carousel.js")
