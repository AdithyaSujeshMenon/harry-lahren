class QuickView {
    constructor() {
        this.modal = document.getElementById('quick-view-modal');
        this.content = document.getElementById('quick-view-content');
        this.closeBtn = document.querySelector('.close-modal');

        if (this.modal) {
            this.init();
        }
    }

    init() {
        this.closeBtn.onclick = () => this.close();
        window.onclick = (e) => {
            if (e.target === this.modal) this.close();
        };

        // Delegate click for dynamic product cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view-btn')) {
                const btn = e.target.closest('.quick-view-btn');
                const id = parseInt(btn.dataset.id);
                this.open(id);
            }
        });
    }

    open(id) {
        const product = window.products.find(p => p.id === id);
        if (!product) return;
        const image = window.getProductImage ? window.getProductImage(product) : (product.images?.[0] || product.image || 'assets/images/hero-fabric-composite.jpg');
        const price = window.formatPrice ? window.formatPrice(product.price) : `£${product.price}`;
        const compareAtPrice = product.compareAtPrice && product.compareAtPrice > product.price
            ? `<s style="font-size: 0.95rem; color: var(--color-text-muted); margin-left: 0.5rem;">${window.formatPrice ? window.formatPrice(product.compareAtPrice) : `£${product.compareAtPrice}`}</s>`
            : '';

        this.content.innerHTML = `
      <div class="quick-view-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <img src="${image}" alt="${product.name}" onerror="this.onerror=null;this.src='assets/images/hero-fabric-composite.jpg';" style="width: 100%; height: 100%; object-fit: cover;">
        <div class="quick-view-details">
          <h2 style="margin-bottom: 0.5rem;">${product.name}</h2>
          <p style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 1rem;">${price}${compareAtPrice}</p>
          <p style="margin-bottom: 1.5rem; color: var(--color-text-muted);">${product.description}</p>
          
          <div style="margin-bottom: 1.5rem;">
            <strong style="display: block; margin-bottom: 0.5rem;">Size</strong>
            <div class="size-options" id="qv-sizes">
              ${product.sizes.map(size => `<button class="size-btn" onclick="this.classList.toggle('active'); Array.from(this.parentNode.children).forEach(c => c !== this && c.classList.remove('active'))">${size}</button>`).join('')}
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%;" onclick="addToCartFromQuickView(${product.id})">Add to Bag</button>
          <a href="product.html?id=${product.id}" style="display: block; text-align: center; margin-top: 1rem; font-size: 0.9rem; text-decoration: underline;">View Full Details</a>
        </div>
      </div>
    `;

        this.modal.style.display = 'block';
        setTimeout(() => this.modal.classList.add('show'), 10);
    }

    close() {
        this.modal.classList.remove('show');
        setTimeout(() => this.modal.style.display = 'none', 300);
    }
}

// Helper for inline onclick
window.addToCartFromQuickView = (id) => {
    const product = window.products.find(p => p.id === id);
    const sizeBtn = document.querySelector('#qv-sizes .size-btn.active');

    if (!sizeBtn) {
        alert('Please select a size');
        return;
    }

    window.addToCart({ ...product, size: sizeBtn.textContent });
    document.getElementById('quick-view-modal').classList.remove('show');
    setTimeout(() => document.getElementById('quick-view-modal').style.display = 'none', 300);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new QuickView();
});
