// --- BACKGROUND PHYSICS ENGINE ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let particleCount = 80;
let mobileSlowdown = 1;
let mouseX = 0, mouseY = 0;
let velocityFactor = 1; // Dynamic velocity multiplier
let connectionDistance = 100; // Dynamic connection distance

// Track mouse position for particle interaction
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Mobile Optimization Check
    if(width <= 768) {
        particleCount = 30;
        mobileSlowdown = 0.4; // Slower movement
    } else {
        particleCount = 80;
        mobileSlowdown = 1;
    }
    
    initParticles();
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
    ctx.clearRect(0, 0, width, height);
    
    // Get current accent color from CSS
    const computedStyle = getComputedStyle(document.body);
    const particleRgb = computedStyle.getPropertyValue('--particle-color').trim();

    for(let i=0; i<particles.length; i++) {
        particles[i].update();
        particles[i].draw(particleRgb);
        
        for(let j=i; j<particles.length; j++) {
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
    requestAnimationFrame(animateBg);
}

// Initialize physics
window.addEventListener('resize', resize);
resize(); // Initial call
animateBg();

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