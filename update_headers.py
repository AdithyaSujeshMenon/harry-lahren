import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# The new nav menu HTML to inject
new_nav = """            <nav class="nav-menu">
                <!-- Men Mega Menu -->
                <div class="nav-item">
                    <span class="nav-link">Gents</span>
                    <div class="mega-menu">
                        <div class="container mega-menu-grid">
                            <div class="mega-col">
                                <h4>Clothing</h4>
                                <ul>
                                    <li><a href="shop.html?cat=men&sub=new">New Arrivals</a></li>
                                    <li><a href="shop.html?cat=men&sub=suits">Suits & Blazers</a></li>
                                    <li><a href="shop.html?cat=men&sub=shirts">Shirts</a></li>
                                    <li><a href="shop.html?cat=men&sub=trousers">Trousers</a></li>
                                    <li><a href="shop.html?cat=men&sub=knitwear">Knitwear</a></li>
                                    <li><a href="shop.html?cat=men&sub=outerwear">Coats & Jackets</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Accessories</h4>
                                <ul>
                                    <li><a href="shop.html?cat=men&sub=shoes">Shoes</a></li>
                                    <li><a href="shop.html?cat=men&sub=ties">Ties & Pocket Squares</a></li>
                                    <li><a href="shop.html?cat=men&sub=belts">Belts</a></li>
                                    <li><a href="shop.html?cat=men&sub=bags">Bags & Luggage</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Collections</h4>
                                <ul>
                                    <li><a href="shop.html?cat=men&col=savile">Savile Row</a></li>
                                    <li><a href="shop.html?cat=men&col=weekend">Weekend Edit</a></li>
                                    <li><a href="shop.html?cat=men&col=golf">Golf Performance</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <div class="mega-featured">
                                    <img src="https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266689_alternate10?$plpDeskRF$"
                                        alt="Gents Collection">
                                    <div class="mega-featured-content">
                                        <h3>The Autumn Edit</h3>
                                        <a href="shop.html?cat=men" class="btn btn-primary"
                                            style="margin-top: 1rem; padding: 0.5rem 1.5rem; font-size: 0.7rem;">Shop
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Women Mega Menu -->
                <div class="nav-item">
                    <span class="nav-link">Women</span>
                    <div class="mega-menu">
                        <div class="container mega-menu-grid">
                            <div class="mega-col">
                                <h4>Clothing</h4>
                                <ul>
                                    <li><a href="shop.html?cat=women&sub=new">New Arrivals</a></li>
                                    <li><a href="shop.html?cat=women&sub=dresses">Dresses</a></li>
                                    <li><a href="shop.html?cat=women&sub=blouses">Blouses & Tops</a></li>
                                    <li><a href="shop.html?cat=women&sub=skirts">Skirts</a></li>
                                    <li><a href="shop.html?cat=women&sub=knitwear">Knitwear</a></li>
                                    <li><a href="shop.html?cat=women&sub=outerwear">Coats & Jackets</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Accessories</h4>
                                <ul>
                                    <li><a href="shop.html?cat=women&sub=shoes">Shoes</a></li>
                                    <li><a href="shop.html?cat=women&sub=bags">Handbags</a></li>
                                    <li><a href="shop.html?cat=women&sub=scarves">Scarves</a></li>
                                    <li><a href="shop.html?cat=women&sub=jewelry">Jewelry</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Collections</h4>
                                <ul>
                                    <li><a href="shop.html?cat=women&col=evening">Evening Wear</a></li>
                                    <li><a href="shop.html?cat=women&col=work">Work Essentials</a></li>
                                    <li><a href="shop.html?cat=women&col=cashmere">Pure Cashmere</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <div class="mega-featured">
                                    <img src="assets/images/women-collection.jpg"
                                        alt="Women's Collection">
                                    <div class="mega-featured-content">
                                        <h3>Modern Elegance</h3>
                                        <a href="shop.html?cat=women" class="btn btn-primary"
                                            style="margin-top: 1rem; padding: 0.5rem 1.5rem; font-size: 0.7rem;">Shop
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kids Mega Menu -->
                <div class="nav-item">
                    <span class="nav-link">Kids</span>
                    <div class="mega-menu">
                        <div class="container mega-menu-grid">
                            <div class="mega-col">
                                <h4>Boys</h4>
                                <ul>
                                    <li><a href="shop.html?cat=kids&sub=boys-shirts">Shirts & Polos</a></li>
                                    <li><a href="shop.html?cat=kids&sub=boys-knitwear">Knitwear</a></li>
                                    <li><a href="shop.html?cat=kids&sub=boys-trousers">Trousers & Shorts</a></li>
                                    <li><a href="shop.html?cat=kids&sub=boys-outerwear">Outerwear</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Girls</h4>
                                <ul>
                                    <li><a href="shop.html?cat=kids&sub=girls-dresses">Dresses & Skirts</a></li>
                                    <li><a href="shop.html?cat=kids&sub=girls-tops">Tops & Knitwear</a></li>
                                    <li><a href="shop.html?cat=kids&sub=girls-outerwear">Outerwear</a></li>
                                    <li><a href="shop.html?cat=kids&sub=girls-accessories">Accessories</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h4>Baby</h4>
                                <ul>
                                    <li><a href="shop.html?cat=kids&sub=baby-boys">Baby Boys</a></li>
                                    <li><a href="shop.html?cat=kids&sub=baby-girls">Baby Girls</a></li>
                                    <li><a href="shop.html?cat=kids&sub=baby-gifts">Newborn Gifts</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <div class="mega-featured">
                                    <img src="assets/images/little-lahren-collection.jpg"
                                        alt="Kids Collection">
                                    <div class="mega-featured-content">
                                        <h3>Little Lahren</h3>
                                        <a href="shop.html?cat=kids" class="btn btn-primary"
                                            style="margin-top: 1rem; padding: 0.5rem 1.5rem; font-size: 0.7rem;">Shop
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customise Your Own Link -->
                <div class="nav-item">
                    <a href="customise.html" class="nav-link" style="color: var(--color-accent);">Customise Your Own</a>
                </div>

                <!-- Journal Link -->
                <div class="nav-item">
                    <a href="journal.html" class="nav-link">Journal</a>
                </div>
            </nav>"""

for file_name in html_files:
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the nav-menu
    pattern = re.compile(r'<nav class="nav-menu">.*?</nav>', re.DOTALL)
    
    if pattern.search(content):
        # We need to correctly handle the relative paths since some files might be in subdirectories, but currently we are only processing root htmls
        updated_content = pattern.sub(new_nav, content)
        
        # Also let's update the mobile menu Kids to have the dropdown, but this is a bit too much regex, let's just do nav-menu for now.
        # It's better than nothing, and the user specifically mentioned header drop downs.
        
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated {file_name}")
