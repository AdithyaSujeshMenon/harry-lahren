with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write("""
/* --- LAYOUT OVERHAUL UPDATES --- */
/* Match logo font size on desktop to mobile */
.logo { font-size: 1.5rem !important; }

/* Sticky Filter Sidebar on Desktop */
@media (min-width: 1024px) {
    .shop-layout {
        grid-template-columns: 280px 1fr !important;
        max-width: var(--container-width);
        margin: 0 auto;
        padding: 8rem var(--spacing-md) 4rem !important;
        gap: 3rem;
    }
    
    .filters-sidebar {
        position: sticky !important;
        top: 110px !important;
        height: max-content !important;
        max-height: calc(100vh - 130px);
        transform: none !important;
        width: 100% !important;
        max-width: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        z-index: 10 !important;
        background: transparent !important;
    }
    
    /* Hide scrollbar for filters on desktop for cleaner look */
    .filters-sidebar::-webkit-scrollbar {
        width: 4px;
    }
    .filters-sidebar::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 4px;
    }

    .mobile-filter-btn {
        display: none !important;
    }

    .filter-header-mobile .close-filters {
        display: none !important;
    }
    
    .shop-content {
        padding: 0 !important;
        width: 100% !important;
    }
}

/* Footer Padding Fixes for Desktop */
@media (min-width: 1024px) {
    .footer.section {
        padding-top: 3rem !important; /* Reduced from default large padding */
    }
}
""")
print("CSS updated successfully.")
