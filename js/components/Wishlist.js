class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('hl_wishlist')) || [];
        this.init();
    }

    init() {
        this.updateButtons();

        // Delegate click for wishlist toggles
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-toggle')) {
                const btn = e.target.closest('.wishlist-toggle');
                const id = parseInt(btn.dataset.id);
                this.toggle(id, btn);
            }
        });
    }

    toggle(id, btn) {
        const index = this.items.indexOf(id);
        if (index === -1) {
            this.items.push(id);
            btn.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            showToast('Added to Wishlist');
        } else {
            this.items.splice(index, 1);
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            showToast('Removed from Wishlist');
        }
        this.save();
    }

    save() {
        localStorage.setItem('hl_wishlist', JSON.stringify(this.items));
    }

    updateButtons() {
        document.querySelectorAll('.wishlist-toggle').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            if (this.items.includes(id)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.wishlist = new Wishlist();
});
