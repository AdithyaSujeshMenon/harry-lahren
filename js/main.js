/* Main Logic for Harry Lahren - Production Ready */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCart();
    initAnimations();
    initSearch();
    initShopFilters();
    initMobileMenu();
});

/* Header Scroll Effect */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* Cart Logic with Enhanced Features */
const cartState = {
    items: JSON.parse(localStorage.getItem('hl_cart')) || [],
    isOpen: false
};

const gbpFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
});

function formatPrice(value) {
    return gbpFormatter.format(value || 0);
}

function getProductImage(product) {
    return product?.image || product?.images?.[0] || 'assets/images/hero-fabric-composite.jpg';
}

window.formatPrice = formatPrice;
window.getProductImage = getProductImage;

function initCart() {
    updateCartCount();

    // Expose global functions for other scripts
    window.addToCart = (product) => {
        const cartProduct = {
            ...product,
            image: getProductImage(product)
        };
        const existing = cartState.items.find(item => item.id === cartProduct.id && item.size === cartProduct.size);
        if (existing) {
            existing.quantity += 1;
        } else {
            cartState.items.push({ ...cartProduct, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        showToast(`Added ${cartProduct.name} to cart`);
    };

    window.removeFromCart = (id, size) => {
        cartState.items = cartState.items.filter(item => !(item.id === id && item.size === size));
        saveCart();
        updateCartCount();
    };

    window.updateQuantity = (id, size, quantity) => {
        const item = cartState.items.find(item => item.id === id && item.size === size);
        if (item) {
            item.quantity = Math.max(1, quantity);
            saveCart();
            updateCartCount();
        }
    };

    window.clearCart = () => {
        cartState.items = [];
        saveCart();
        updateCartCount();
    };

    window.getCart = () => cartState.items;
}

function saveCart() {
    localStorage.setItem('hl_cart', JSON.stringify(cartState.items));
}

function updateCartCount() {
    const count = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

/* Toast Notification */
window.showToast = function (message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    toast.offsetHeight; // Trigger reflow

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* Intersection Observer for Animations */
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* Enhanced Search with Overlay */
/* Enhanced Search with Overlay */
function initSearch() {
    const searchBtns = document.querySelectorAll('.search-trigger, .fa-magnifying-glass');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const closeSearchBtn = document.getElementById('closeSearchBtn');

    if (!searchOverlay) return;

    // Open search overlay - Attach to all triggers
    searchBtns.forEach(btn => {
        // If it's the icon, get the parent button
        const trigger = btn.tagName === 'I' ? btn.parentElement : btn;

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);

            // Close mobile menu if open
            const mobileNavDrawer = document.getElementById('mobileNavDrawer');
            const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
            const mobileToggle = document.getElementById('mobileToggle');

            if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
                mobileNavDrawer.classList.remove('active');
                mobileNavBackdrop.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on button click
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Close on overlay click (outside search box)
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Handle search submission
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
            }
        });

        // Live search suggestions
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const suggestions = document.getElementById('searchSuggestions');

            if (!suggestions || !query) {
                if (suggestions) suggestions.innerHTML = '';
                return;
            }

            if (window.products) {
                const matches = window.products
                    .filter(p =>
                        p.name.toLowerCase().includes(query) ||
                        p.category.toLowerCase().includes(query)
                    )
                    .slice(0, 5);

                suggestions.innerHTML = matches.map(p => `
                    <div class="suggestion-item" onclick="window.location.href='product.html?id=${p.id}'">
                        <strong>${p.name}</strong>
                        <span style="color: var(--color-text-muted); font-size: 0.9rem;">${formatPrice(p.price)}</span>
                    </div>
                `).join('');
            }
        });
    }
}

/* Enhanced Shop Filters with Chips and Sliders */
function initShopFilters() {
    if (!window.location.pathname.includes('shop.html')) return;

    const grid = document.getElementById('product-grid');
    const pageTitle = document.getElementById('page-title');
    const resultsCount = document.getElementById('resultsCount');
    if (!grid || !window.products) return;

    // Mobile filter drawer controls
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');
    const filterBackdrop = document.getElementById('filterBackdrop');

    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            filterSidebar.classList.add('active');
            filterBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeFilters() {
        if (filterSidebar) filterSidebar.classList.remove('active');
        if (filterBackdrop) filterBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', closeFilters);
    }

    if (filterBackdrop) {
        filterBackdrop.addEventListener('click', closeFilters);
    }

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const catParam = urlParams.get('cat');

    // Initialize filter state
    let selectedCategories = catParam ? [catParam] : ['men'];
    const productPriceMax = Math.ceil(Math.max(...window.products.map(product => product.price), 500) / 50) * 50;
    let priceMin = 0;
    let priceMax = productPriceMax;

    // Chip toggle handlers
    const categoryChips = document.querySelectorAll('.chip[data-category]');
    categoryChips.forEach(chip => {
        const category = chip.dataset.category;

        // Set initial state
        if (selectedCategories.includes(category)) {
            chip.classList.add('active');
        }

        chip.addEventListener('click', () => {
            chip.classList.toggle('active');

            if (chip.classList.contains('active')) {
                if (!selectedCategories.includes(category)) {
                    selectedCategories.push(category);
                }
            } else {
                selectedCategories = selectedCategories.filter(c => c !== category);
            }

            renderFilteredProducts();
        });
    });

    // Price slider handlers
    const priceMinSlider = document.getElementById('priceMin');
    const priceMaxSlider = document.getElementById('priceMax');
    const priceMinVal = document.getElementById('priceMinVal');
    const priceMaxVal = document.getElementById('priceMaxVal');

    if (priceMinSlider && priceMaxSlider) {
        priceMinSlider.max = productPriceMax;
        priceMaxSlider.max = productPriceMax;
        priceMaxSlider.value = productPriceMax;
        if (priceMaxVal) priceMaxVal.textContent = productPriceMax;

        priceMinSlider.addEventListener('input', (e) => {
            priceMin = parseInt(e.target.value);
            if (priceMin > priceMax - 50) {
                priceMin = priceMax - 50;
                priceMinSlider.value = priceMin;
            }
            priceMinVal.textContent = priceMin;
            renderFilteredProducts();
        });

        priceMaxSlider.addEventListener('input', (e) => {
            priceMax = parseInt(e.target.value);
            if (priceMax < priceMin + 50) {
                priceMax = priceMin + 50;
                priceMaxSlider.value = priceMax;
            }
            priceMaxVal.textContent = priceMax;
            renderFilteredProducts();
        });
    }

    // Sort handlers
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderFilteredProducts();
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset categories
            selectedCategories = [];
            categoryChips.forEach(chip => chip.classList.remove('active'));

            // Reset price
            priceMin = 0;
            priceMax = productPriceMax;
            if (priceMinSlider) priceMinSlider.value = 0;
            if (priceMaxSlider) priceMaxSlider.value = productPriceMax;
            if (priceMinVal) priceMinVal.textContent = 0;
            if (priceMaxVal) priceMaxVal.textContent = productPriceMax;

            renderFilteredProducts();
        });
    }

    // Render products based on filters
    function renderFilteredProducts() {
        const filtered = window.products.filter(p => {
            // Category filter
            const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);

            // Price filter
            const priceMatch = p.price >= priceMin && p.price <= priceMax;

            // Search filter
            let searchMatch = true;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                searchMatch = p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query);
            }

            return catMatch && priceMatch && searchMatch;
        });

        // Update title, subtitle, and description
        const pageSubtitle = document.getElementById('page-subtitle');
        const pageDescription = document.getElementById('page-description');
        
        const descriptions = {
            men: { title: 'Men', subtitle: 'Gents', description: 'Discover our timeless collection of sophisticated menswear, crafted for the discerning gentleman.' },
            women: { title: 'Women', subtitle: 'Women', description: 'Explore our curated selection of elegant womenswear, designed to celebrate modern femininity.' },
            kids: { title: 'Kids', subtitle: 'Kids', description: 'Browse our charming children\'s collection, combining comfort and polish for young wardrobes.' },
            sport: { title: 'Sport', subtitle: 'Sport', description: 'Performance pieces with a refined country-club finish.' },
            accessories: { title: 'Accessories', subtitle: 'Accessories', description: 'Finishing touches crafted for everyday polish.' }
        };

        if (searchQuery) {
            pageTitle.textContent = `Search Results for "${searchQuery}"`;
            if (pageSubtitle) pageSubtitle.textContent = 'Search';
            if (pageDescription) pageDescription.textContent = 'Results for your search query';
        } else if (selectedCategories.length === 1) {
            const cat = selectedCategories[0];
            const catData = descriptions[cat];
            pageTitle.textContent = catData.title;
            if (pageSubtitle) pageSubtitle.textContent = catData.subtitle;
            if (pageDescription) pageDescription.textContent = catData.description;
        } else if (selectedCategories.length > 1) {
            pageTitle.textContent = 'Multiple Categories';
            if (pageSubtitle) pageSubtitle.textContent = 'Shop';
            if (pageDescription) pageDescription.textContent = 'Browse products across multiple categories.';
        } else {
            pageTitle.textContent = 'All Products';
            if (pageSubtitle) pageSubtitle.textContent = 'Shop';
            if (pageDescription) pageDescription.textContent = 'Discover our complete collection of premium fashion.';
        }

        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
        }

        // Apply Sorting
        if (sortSelect) {
            const sortVal = sortSelect.value;
            if (sortVal === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortVal === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortVal === 'newest') {
                filtered.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
            }
            // 'featured' uses default order
        }

        // Render products
        grid.innerHTML = filtered.map(p => {
            const imageSet = p.images?.length ? p.images : [getProductImage(p)];
            const imagesHtml = imageSet.map((img, idx) => `
                <img src="${img}" alt="${p.name}" loading="lazy" class="carousel-img" data-index="${idx}" onerror="this.onerror=null;this.src='assets/images/hero-fabric-composite.jpg';" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; opacity: ${idx === 0 ? 1 : 0}; transition: opacity 0.3s ease;">
            `).join('');
            
            const controlsHtml = (imageSet.length > 1) ? `
                <div class="carousel-controls" style="opacity: 0; transition: opacity 0.3s ease;">
                    <button class="carousel-prev" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.8); border:none; width:30px; height:30px; border-radius:50%; cursor:pointer; z-index:10; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-chevron-left" style="font-size:12px;"></i></button>
                    <button class="carousel-next" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.8); border:none; width:30px; height:30px; border-radius:50%; cursor:pointer; z-index:10; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-chevron-right" style="font-size:12px;"></i></button>
                </div>
            ` : '';

            return `
            <div class="product-card animate-on-scroll" onmouseenter="this.querySelector('.carousel-controls') && (this.querySelector('.carousel-controls').style.opacity = 1)" onmouseleave="this.querySelector('.carousel-controls') && (this.querySelector('.carousel-controls').style.opacity = 0)">
                <div class="product-image-wrapper" style="position:relative; overflow:hidden;">
                    ${imagesHtml}
                    ${controlsHtml}
                </div>
                <div class="product-info">
                    <div class="product-category" style="font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.category}</div>
                    <h3 class="product-name" style="font-size: 1.1rem; margin-bottom: 0.5rem;">${p.name}</h3>
                    <p class="product-price">${formatPrice(p.price)} <span class="compare-price">${formatPrice(p.compareAtPrice)}</span></p>
                    <a href="product.html?id=${p.id}" class="btn btn-primary" style="width:100%; margin-top:auto; padding: 0.75rem 1.5rem; font-size: 0.8rem;">View Details</a>
                </div>
            </div>
        `}).join('');

        // Re-observe for animations
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            observer.observe(el);
        });

        // Close filter drawer after applying filters on mobile
        if (window.innerWidth < 1024) {
            closeFilters();
        }
    }

    // Carousel logic using event delegation
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.carousel-prev') || e.target.closest('.carousel-next');
        if (!btn) return;
        
        e.preventDefault();
        const wrapper = btn.closest('.product-image-wrapper');
        const images = wrapper.querySelectorAll('.carousel-img');
        if (images.length <= 1) return;
        
        let currentIndex = Array.from(images).findIndex(img => parseFloat(img.style.opacity) === 1);
        if (currentIndex === -1) currentIndex = 0;
        
        images[currentIndex].style.opacity = 0;
        
        if (btn.classList.contains('carousel-next')) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        
        images[currentIndex].style.opacity = 1;
    });

    // Initial render
    renderFilteredProducts();
}

/* Mobile Menu Navigation */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileClose = document.getElementById('mobileClose');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (!mobileToggle || !mobileDrawer) return;

    // Open mobile menu
    function openMobileMenu() {
        mobileDrawer.classList.add('active');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileDrawer.classList.remove('active');
        if (mobileBackdrop) mobileBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle button
    mobileToggle.addEventListener('click', openMobileMenu);

    // Close button
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    // Backdrop click
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Accordion submenu toggles
    mobileNavItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');
        const submenu = item.querySelector('.mobile-submenu');

        if (link && submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Close other open submenus
                mobileNavItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current submenu
                item.classList.toggle('active');
            });
        }
    });
}
