document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fabricCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    let dpr = window.devicePixelRatio || 1;
    
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    // Fabric definitions with realistic properties
    const fabricLayers = [
        {
            name: 'silk',
            baseColor: [212, 175, 55],  // Gold
            opacity: 0.35,
            yOffset: 0.30,
            frequency: 0.003,
            amplitude: 80,
            speed: 0.012,
            threadDensity: 3,
            sheen: 0.6,
            weaveScale: 6
        },
        {
            name: 'tweed',
            baseColor: [80, 40, 25],    // Rich brown
            opacity: 0.55,
            yOffset: 0.50,
            frequency: 0.002,
            amplitude: 100,
            speed: 0.008,
            threadDensity: 8,
            sheen: 0.15,
            weaveScale: 4
        },
        {
            name: 'wool',
            baseColor: [15, 23, 42],    // Navy
            opacity: 0.65,
            yOffset: 0.65,
            frequency: 0.0025,
            amplitude: 120,
            speed: 0.01,
            threadDensity: 6,
            sheen: 0.25,
            weaveScale: 5
        },
        {
            name: 'cashmere',
            baseColor: [200, 190, 175], // Cream
            opacity: 0.3,
            yOffset: 0.80,
            frequency: 0.0035,
            amplitude: 60,
            speed: 0.015,
            threadDensity: 2,
            sheen: 0.45,
            weaveScale: 3
        }
    ];

    // Pre-generate fabric texture patterns
    const textureCanvases = fabricLayers.map(fabric => {
        const tc = document.createElement('canvas');
        tc.width = 256;
        tc.height = 256;
        const tctx = tc.getContext('2d');
        
        const [r, g, b] = fabric.baseColor;
        
        // Base fill
        tctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        tctx.fillRect(0, 0, 256, 256);
        
        // Weave pattern
        for (let y = 0; y < 256; y += fabric.weaveScale) {
            for (let x = 0; x < 256; x += fabric.weaveScale) {
                const variation = (Math.random() - 0.5) * 30;
                const lightness = ((x + y) % (fabric.weaveScale * 2) < fabric.weaveScale) ? 15 : -10;
                tctx.fillStyle = `rgba(${Math.min(255, r + lightness + variation)}, ${Math.min(255, g + lightness + variation)}, ${Math.min(255, b + lightness + variation)}, 0.6)`;
                tctx.fillRect(x, y, fabric.weaveScale, fabric.weaveScale);
            }
        }
        
        // Thread lines (horizontal)
        for (let y = 0; y < 256; y += fabric.threadDensity) {
            tctx.beginPath();
            tctx.moveTo(0, y);
            for (let x = 0; x < 256; x += 4) {
                tctx.lineTo(x, y + (Math.random() - 0.5) * 1.5);
            }
            tctx.strokeStyle = `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, 0.15)`;
            tctx.lineWidth = 0.5;
            tctx.stroke();
        }
        
        // Thread lines (vertical)
        for (let x = 0; x < 256; x += fabric.threadDensity) {
            tctx.beginPath();
            tctx.moveTo(x, 0);
            for (let y = 0; y < 256; y += 4) {
                tctx.lineTo(x + (Math.random() - 0.5) * 1.5, y);
            }
            tctx.strokeStyle = `rgba(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)}, 0.12)`;
            tctx.lineWidth = 0.5;
            tctx.stroke();
        }
        
        return tc;
    });

    function resize() {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Mouse tracking
    const heroSection = canvas.closest('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.vx = mouse.x - lastMouse.x;
            mouse.vy = mouse.y - lastMouse.y;
        });
        
        heroSection.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = heroSection.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });
    }
    
    // Ripple system
    const ripples = [];
    let lastRippleTime = 0;
    
    function addRipple(x, y, strength) {
        const now = Date.now();
        if (now - lastRippleTime < 50) return;
        lastRippleTime = now;
        ripples.push({
            x, y,
            radius: 0,
            maxRadius: 250 + Math.random() * 200,
            strength: Math.min(strength, 25),
            life: 1.0
        });
    }

    if (heroSection) {
        heroSection.addEventListener('mousemove', () => {
            const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
            if (speed > 4) {
                addRipple(mouse.x, mouse.y, speed * 0.4);
            }
        });
        
        heroSection.addEventListener('click', (e) => {
            const rect = heroSection.getBoundingClientRect();
            addRipple(e.clientX - rect.left, e.clientY - rect.top, 20);
        });
    }

    function getWaveY(x, baseY, fabric, t) {
        let y = baseY;
        // Primary wave
        y += Math.sin(x * fabric.frequency + t * fabric.speed) * fabric.amplitude;
        // Secondary wave for organic movement
        y += Math.sin(x * fabric.frequency * 2.3 - t * fabric.speed * 1.7) * (fabric.amplitude * 0.3);
        // Tertiary micro-wave
        y += Math.cos(x * fabric.frequency * 4.1 + t * fabric.speed * 0.6) * (fabric.amplitude * 0.08);
        return y;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Dark background
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);
        
        // Update ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].radius += 5;
            ripples[i].life *= 0.985;
            if (ripples[i].life < 0.01 || ripples[i].radius > ripples[i].maxRadius) {
                ripples.splice(i, 1);
            }
        }
        
        // Draw each fabric layer
        fabricLayers.forEach((fabric, layerIndex) => {
            const baseY = height * fabric.yOffset;
            const [r, g, b] = fabric.baseColor;
            const step = 2; // pixel step for smoothness
            
            // Build wave points
            const points = [];
            for (let x = -10; x <= width + 10; x += step) {
                let y = getWaveY(x, baseY, fabric, time);
                
                // Apply ripple distortion
                ripples.forEach(ripple => {
                    const dx = x - ripple.x;
                    const dy = y - ripple.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < ripple.radius && dist > ripple.radius - 120) {
                        const wave = Math.sin((dist - ripple.radius) * 0.06) * ripple.strength * ripple.life;
                        y += wave * (1 + layerIndex * 0.2);
                    }
                });
                
                // Mouse proximity push
                if (mouse.x > -500) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        const push = (1 - dist / 200) * 15 * (1 + layerIndex * 0.15);
                        y += push;
                    }
                }
                
                points.push({ x, y });
            }
            
            // Draw fabric body with texture
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(width + 10, height + 10);
            ctx.lineTo(-10, height + 10);
            ctx.closePath();
            ctx.clip();
            
            // Fill with texture pattern
            const pattern = ctx.createPattern(textureCanvases[layerIndex], 'repeat');
            ctx.globalAlpha = fabric.opacity;
            ctx.fillStyle = pattern;
            ctx.fillRect(-10, 0, width + 20, height + 10);
            
            // Sheen/highlight along the wave crest
            for (let i = 1; i < points.length - 1; i++) {
                const slope = points[i + 1].y - points[i - 1].y;
                if (slope < -2) { // Only on peaks
                    const sheenIntensity = Math.min(Math.abs(slope) * fabric.sheen * 0.02, 0.3);
                    ctx.fillStyle = `rgba(255, 255, 255, ${sheenIntensity})`;
                    ctx.fillRect(points[i].x, points[i].y, step, 8);
                }
            }
            
            ctx.restore();
            
            // Draw the top edge with a thread-like line
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.strokeStyle = `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)}, ${0.4 + fabric.sheen * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Secondary thread line slightly below
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y + 3);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y + 3);
            }
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        // Subtle vignette
        const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.3, width / 2, height / 2, height);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
        
        time += 1;
        requestAnimationFrame(draw);
    }
    
    draw();
});
