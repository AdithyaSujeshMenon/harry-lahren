import os

# Directory to scan
root_dir = "/Users/lt_gh0sttt/Desktop/Projects/Harry Lahren"

# HTML snippet to inject for mobile icons
mobile_icons_template = """
        <div class="mobile-nav-icons">
            <div class="icon-wrapper">
                <button class="icon-btn search-trigger" aria-label="Search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <span class="icon-label">Search</span>
            </div>
            <div class="icon-wrapper">
                <a href="{prefix}login.html" class="icon-btn" aria-label="Account">
                    <i class="fa-regular fa-user"></i>
                </a>
                <span class="icon-label">Account</span>
            </div>
            <div class="icon-wrapper">
                <a href="{prefix}cart.html" class="icon-btn" aria-label="Shopping cart">
                    <div style="position: relative;">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span class="cart-count">0</span>
                    </div>
                </a>
                <span class="icon-label">Cart</span>
            </div>
        </div>
"""

def update_html_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Add 'search-trigger' class to desktop search button if not present
        if 'class="icon-btn" id="searchToggle"' in content:
            content = content.replace('class="icon-btn" id="searchToggle"', 'class="icon-btn search-trigger" id="searchToggle"')
        
        # Determine relative path prefix
        rel_path = os.path.relpath(file_path, root_dir)
        depth = rel_path.count(os.sep)
        prefix = "../" * depth if depth > 0 else "./"
        
        # Prepare snippet
        snippet = mobile_icons_template.format(prefix=prefix)

        # 2. Check if mobile icons ALREADY exist and REPLACE them
        # We look for the start and end of the block
        start_marker = '<div class="mobile-nav-icons">'
        end_marker = '</div>' # This is risky if nested divs exist.
        
        # Better: We know the old structure was:
        # <div class="mobile-nav-icons">
        #    ...
        # </div>
        
        # Let's find the start
        start_idx = content.find(start_marker)
        if start_idx != -1:
            # Find the closing div for this block.
            # Since the old block had nested divs (maybe), we need to be careful.
            # But the old block actually didn't have nested divs for wrappers, just buttons/links.
            # Wait, the cart link had a div inside.
            
            # Let's count braces to find the matching closing div
            balance = 1
            curr_idx = start_idx + len(start_marker)
            while balance > 0 and curr_idx < len(content):
                if content[curr_idx:curr_idx+4] == '<div':
                    balance += 1
                    curr_idx += 4
                elif content[curr_idx:curr_idx+6] == '</div>':
                    balance -= 1
                    curr_idx += 6
                else:
                    curr_idx += 1
            
            if balance == 0:
                # Found the end
                end_idx = curr_idx
                
                # Replace the old block with the new snippet
                # We need to strip the newline from the snippet start if we want clean formatting
                clean_snippet = snippet.strip()
                
                # Preserve indentation?
                # The existing block likely starts with indentation.
                # Let's just replace the whole range.
                
                # We want to keep the indentation of the start_marker
                # Find line start
                line_start = content.rfind('\n', 0, start_idx) + 1
                indentation = content[line_start:start_idx]
                
                # Indent the new snippet lines
                indented_snippet = clean_snippet.replace('\n', '\n' + indentation)
                
                content = content[:start_idx] + indented_snippet + content[end_idx:]
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated (Replaced) {file_path}")
                return

        # 3. If not found, Inject mobile icons into mobile drawer (Fallback to previous logic)
        
        # Target the closing of the mobile nav content
        # We know the structure in index.html is:
        #             </nav>
        #         </div>
        #     
        #         <!-- Mobile Nav Backdrop -->
        
        # Let's try to find the mobile nav drawer div
        drawer_start = content.find('id="mobileNavDrawer"')
        if drawer_start == -1:
            print(f"Skipping {file_path}: No mobileNavDrawer found")
            return
            
        # Find the closing div of the drawer.
        # It's usually followed by the backdrop div
        backdrop_start = content.find('id="mobileNavBackdrop"')
        
        if backdrop_start != -1:
            # Find the last </div> before the backdrop
            drawer_end = content.rfind('</div>', drawer_start, backdrop_start)
            
            if drawer_end != -1:
                # Insert BEFORE this closing div
                # We want to insert inside the drawer, at the bottom
                
                # Check if there's a </nav> before this div
                nav_end = content.rfind('</nav>', drawer_start, drawer_end)
                
                if nav_end != -1:
                    # Insert after </nav>
                    # content[nav_end+6] is the character after </nav>
                    
                    # We'll insert it right after the </nav> tag
                    content = content[:nav_end+6] + snippet + content[nav_end+6:]
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated (Injected) {file_path}")
                    return
                else:
                    # No </nav> found (like in account pages). 
                    # Insert before the closing </div> of the drawer.
                    # The structure is: <div ...> ... <button ...></button></div>
                    
                    # We'll insert it right before the closing </div>
                    content = content[:drawer_end] + snippet + content[drawer_end:]
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated (Injected) {file_path}")
                    return
        
        print(f"Could not find injection point in {file_path}")
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Walk through directory
for root, dirs, files in os.walk(root_dir):
    if '.git' in dirs: dirs.remove('.git')
    
    for file in files:
        if file.endswith(".html"):
            update_html_file(os.path.join(root, file))

# Walk through directory
for root, dirs, files in os.walk(root_dir):
    # Skip .git, node_modules, etc.
    if '.git' in dirs: dirs.remove('.git')
    
    for file in files:
        if file.endswith(".html"):
            update_html_file(os.path.join(root, file))
