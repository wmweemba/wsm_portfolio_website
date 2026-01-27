// --- BACKGROUND PHYSICS ENGINE ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Desktop physics variables
let width, height;
let particles = [];
let particleCount = 80;
let mobileSlowdown = 1;
let mouseX = 0, mouseY = 0;
let velocityFactor = 1; // Dynamic velocity multiplier
let connectionDistance = 100; // Dynamic connection distance
let animationId; // Track animation frame
let isMobile = false;
let performanceCheck = 0;
let lastFrameTime = 0;

// Mobile detection function
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Initialize mobile mode if detected
function initializeMobileMode() {
    console.log('Mobile detected - using static CSS background instead of physics');
    canvas.style.display = 'none';
    document.body.classList.add('mobile-static-bg');
    
    // Still provide theme switching for CSS background
    window.updatePhysicsEngine = function(mode) {
        // No physics to update, but maintain theme switching capability
        const root = document.documentElement;
        if (mode === 'technical') {
            root.style.setProperty('--mobile-bg-primary', '0, 20, 40');
            root.style.setProperty('--mobile-bg-secondary', '0, 40, 60');
            root.style.setProperty('--mobile-accent', '0, 240, 255');
        } else if (mode === 'creative') {
            root.style.setProperty('--mobile-bg-primary', '20, 15, 10');
            root.style.setProperty('--mobile-bg-secondary', '40, 25, 15');
            root.style.setProperty('--mobile-accent', '245, 158, 11');
        }
    };
    
    // Initialize mobile background theme
    window.updatePhysicsEngine('technical');
}

// Track mouse position for particle interaction (desktop only)
if (!isMobileDevice()) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

function resize() {
    // Skip resize for mobile devices as they use CSS background
    if (isMobileDevice()) return;
    
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Desktop optimization settings
    particleCount = 80;
    mobileSlowdown = 1;
    connectionDistance = 100;
    
    initParticles();
    performanceCheck = 0; // Reset performance counter
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5 * mobileSlowdown * velocityFactor;
        this.vy = (Math.random() - 0.5) * 0.5 * mobileSlowdown * velocityFactor;
        // Boosted Size and Alpha for visibility
        this.size = Math.random() * 3; 
        this.alpha = Math.random() * 0.8 + 0.2; // Min 20% opacity
    }

    update() {
        this.x += this.vx * velocityFactor;
        this.y += this.vy * velocityFactor;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repel only on desktop
        if(window.innerWidth > 768) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if(dist < 150) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
                this.alpha = 1;
            } else {
                // Slower fade out
                if(this.alpha > 0.2) this.alpha -= 0.01;
            }
        }
    }

    draw(rgbColor) {
        // Use dynamic RGB color
        ctx.fillStyle = `rgba(${rgbColor}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for(let i=0; i<particleCount; i++) particles.push(new Particle());
}

function animateBg() {
    // This function only runs on desktop now
    ctx.clearRect(0, 0, width, height);
    
    // Get current accent color from CSS
    const computedStyle = getComputedStyle(document.body);
    const particleRgb = computedStyle.getPropertyValue('--particle-color').trim();

    for(let i=0; i<particles.length; i++) {
        particles[i].update();
        particles[i].draw(particleRgb);
        
        for(let j=i+1; j<particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < connectionDistance) {
                // Dynamic connection line color
                ctx.strokeStyle = `rgba(${particleRgb}, ${0.15 - dist/1000})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    animationId = requestAnimationFrame(animateBg);
}

// Cleanup function for performance
window.cleanupPhysics = function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    particles = [];
    ctx.clearRect(0, 0, width, height);
};

// Restart physics engine
window.restartPhysics = function() {
    window.cleanupPhysics();
    initParticles();
    animateBg();
};

// Initialize physics system
window.addEventListener('resize', resize);

// Page visibility optimization - pause physics when page is hidden (desktop only)
document.addEventListener('visibilitychange', function() {
    if (isMobileDevice()) return; // Skip for mobile
    
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    } else {
        if (!animationId) {
            animateBg();
        }
    }
});

// Memory management - cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.cleanupPhysics) {
        window.cleanupPhysics();
    }
});

// Initialize based on device type
function initPhysicsSystem() {
    if (isMobileDevice()) {
        initializeMobileMode();
        return;
    }
    
    // Desktop initialization
    console.log('Desktop detected - initializing physics engine');
    resize(); // Initial call
    animateBg();
}

// Wait for DOM to be ready, then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhysicsSystem);
} else {
    initPhysicsSystem();
}

// Enhanced physics hook - controls velocity and connections
window.updatePhysicsEngine = function(mode) {
    const root = document.documentElement;
    
    if (mode === 'technical') {
        root.style.setProperty('--particle-color', '0, 240, 255');
        velocityFactor = 1.5; // Fast/Data Stream effect
        connectionDistance = 100; // Tight connections
        
        // Apply velocity changes to existing particles immediately
        particles.forEach(particle => {
            particle.vx = particle.vx * (velocityFactor / (velocityFactor === 1.5 ? 1 : 0.6));
            particle.vy = particle.vy * (velocityFactor / (velocityFactor === 1.5 ? 1 : 0.6));
        });
        
    } else if (mode === 'creative') {
        root.style.setProperty('--particle-color', '245, 158, 11');
        velocityFactor = 0.6; // Slow/Floating effect
        connectionDistance = 120; // Loose, organic web
        
        // Apply velocity changes to existing particles immediately
        particles.forEach(particle => {
            particle.vx = particle.vx * (velocityFactor / (velocityFactor === 0.6 ? 1 : 1.5));
            particle.vy = particle.vy * (velocityFactor / (velocityFactor === 0.6 ? 1 : 1.5));
        });
    }
};