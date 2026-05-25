/**
 * Harry Lahren - Premium Homepage Carousel
 * Automatic image rotation with synchronized text changes
 */

class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.isTransitioning = false;

        // Carousel slides data
        this.slides = [
            {
                image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
                subtitle: 'Est. 1981 • London',
                title: 'Refined British<br>Craftsmanship',
                cta1: { text: 'Shop Gents', link: 'shop.html?cat=men', primary: true },
                cta2: { text: 'Shop Women', link: 'shop.html?cat=women', primary: false }
            },
            {
                image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1887&auto=format&fit=crop',
                subtitle: 'Est. 1981',
                title: 'Timeless<br>Elegance',
                cta1: { text: 'Explore Collection', link: 'shop.html?cat=men', primary: true },
                cta2: { text: 'View Lookbook', link: 'journal.html', primary: false }
            },
            {
                image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769&auto=format&fit=crop',
                subtitle: 'New Arrivals',
                title: 'Modern<br>Sophistication',
                cta1: { text: 'Shop Women', link: 'shop.html?cat=women', primary: true },
                cta2: { text: 'Discover More', link: 'about.html', primary: false }
            },
            {
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
                subtitle: 'Heritage & Tradition',
                title: 'Savile Row<br>Excellence',
                cta1: { text: 'Bespoke Tailoring', link: 'shop.html?cat=men&sub=suits', primary: true },
                cta2: { text: 'Our Story', link: 'about.html', primary: false }
            }
        ];

        this.init();
    }

    init() {
        this.createCarouselStructure();
        this.setupEventListeners();
        this.startAutoPlay();
        this.showSlide(0);
    }

    createCarouselStructure() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'carousel-slides';

        // Create slides
        this.slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slideEl.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('${slide.image}')`;
            slidesContainer.appendChild(slideEl);
        });

        // Insert slides at the beginning
        hero.insertBefore(slidesContainer, hero.firstChild);

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        hero.appendChild(dotsContainer);

        // Create arrow controls
        const prevArrow = document.createElement('button');
        prevArrow.className = 'carousel-arrow carousel-arrow-prev';
        prevArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevArrow.setAttribute('aria-label', 'Previous slide');
        prevArrow.addEventListener('click', () => this.previousSlide());

        const nextArrow = document.createElement('button');
        nextArrow.className = 'carousel-arrow carousel-arrow-next';
        nextArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextArrow.setAttribute('aria-label', 'Next slide');
        nextArrow.addEventListener('click', () => this.nextSlide());

        hero.appendChild(prevArrow);
        hero.appendChild(nextArrow);

        // Update hero content
        this.updateContent(0);
    }

    setupEventListeners() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Pause on hover
        hero.addEventListener('mouseenter', () => this.pauseAutoPlay());
        hero.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');

        // Remove active class from all
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Add active class to current
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        // Update content
        this.updateContent(index);

        this.currentSlide = index;

        // Reset transition lock after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    updateContent(index) {
        const slide = this.slides[index];
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        // Fade out
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Update content
            const subtitle = heroContent.querySelector('.hero-subtitle');
            const title = heroContent.querySelector('.hero-title');
            const actions = heroContent.querySelector('.hero-actions');

            if (subtitle) subtitle.textContent = slide.subtitle;
            if (title) title.innerHTML = slide.title;

            if (actions) {
                actions.innerHTML = `
                    <a href="${slide.cta1.link}" class="btn ${slide.cta1.primary ? 'btn-primary' : 'btn-secondary'}">${slide.cta1.text}</a>
                    <a href="${slide.cta2.link}" class="btn ${slide.cta2.primary ? 'btn-primary' : 'btn-secondary'}" 
                       style="${slide.cta2.primary ? '' : 'background: white; color: black; border-color: white;'}">${slide.cta2.text}</a>
                `;
            }

            // Fade in
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 50);
        }, 400);
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;
        this.showSlide(index);
        this.resetAutoPlay();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
        this.resetAutoPlay();
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.hero')) {
            new HeroCarousel();
        }
    });
} else {
    if (document.querySelector('.hero')) {
        new HeroCarousel();
    }
}
