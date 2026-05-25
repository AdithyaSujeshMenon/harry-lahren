// motion-animations.js - Global animations using Motion (Vanilla Framer Motion)

document.addEventListener('DOMContentLoaded', () => {
    const motion = window.Motion;

    if (!motion || !motion.animate) {
        return;
    }

    // 1. Interactive Hero Fabrics Parallax
    const heroSection = document.querySelector('.hero');
    const fabricStrips = document.querySelectorAll('.fabric-strip');

    if (heroSection && fabricStrips.length > 0) {
        // Initial intro animation for fabric strips
        motion.animate(
            fabricStrips,
            { y: [100, 0], opacity: [0, 0.85] },
            { delay: motion.stagger ? motion.stagger(0.1) : 0, duration: 1.2, easing: [0.22, 1, 0.36, 1] }
        );

        // Mouse and Touch parallax
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        
        const updateParallax = () => {
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;
            
            fabricStrips.forEach((strip, index) => {
                const depth = (index % 3) + 1; // Different depth feeling
                const moveX = currentX * depth * 0.02;
                const moveY = currentY * depth * 0.02;
                
                strip.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
            
            requestAnimationFrame(updateParallax);
        };
        
        requestAnimationFrame(updateParallax);

        const handleMove = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth / 2;
            const y = e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight / 2;
            
            targetX = x - window.innerWidth / 2;
            targetY = y - window.innerHeight / 2;
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: true });
    }

    // 2. Scroll Reveal Animations
    const animatedElements = document.querySelectorAll('.collection-card, .product-card, .footer-col');
    
    if (motion.inView) {
        animatedElements.forEach(element => {
            motion.inView(element, () => {
                motion.animate(
                    element,
                    { opacity: [0, 1], y: [50, 0] },
                    { duration: 0.8, easing: [0.22, 1, 0.36, 1] }
                );
            }, { margin: "-50px" });
        });
    }

    // 3. Hover Spring Animations for Buttons & Cards
    const hoverElements = document.querySelectorAll('.btn, .collection-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            motion.animate(el, { scale: 1.02 }, { type: "spring", stiffness: 300, damping: 20 });
        });
        
        el.addEventListener('mouseleave', () => {
            motion.animate(el, { scale: 1 }, { type: "spring", stiffness: 300, damping: 20 });
        });
    });
});
