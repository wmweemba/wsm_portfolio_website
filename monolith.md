<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>William Mweemba | Kinetic Portfolio</title>
    <style>
        /* --- HIGH-END TYPOGRAPHY & RESET --- */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;800&family=Syncopate:wght@700&family=Space+Mono:wght@400;700&display=swap');

        :root {
            /* DEFAULT: TECHNICAL MODE (Cyber / Cool) */
            --bg: #050505;
            --text: #e1e1e1;
            --accent: #00F0FF; /* Cyan */
            --particle-color: 0, 240, 255; /* RGB for JS injection */
            --grid: rgba(255,255,255,0.05);
            --transition-ease: cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* CREATIVE MODE OVERRIDES (Organic Espresso) */
        body.mode-creative {
            --bg: #271C19; /* Organic Espresso */
            --text: #f5f5f4;
            --accent: #F59E0B; /* Amber Gold */
            --particle-color: 245, 158, 11; /* Amber RGB */
        }

        * { box-sizing: border-box; margin: 0; padding: 0; cursor: none; /* Custom Cursor */ }

        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Manrope', sans-serif;
            overflow-x: hidden;
            width: 100vw;
            transition: background-color 0.8s var(--transition-ease), color 0.8s var(--transition-ease);
        }

        body.no-scroll { overflow: hidden; }

        /* --- NOISE GRAIN OVERLAY --- */
        .noise {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
            opacity: 0.05;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* --- CUSTOM CURSOR --- */
        .cursor-dot, .cursor-circle {
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: 3000; /* Higher than modal */
            pointer-events: none;
        }

        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--text);
            transition: background 0.8s var(--transition-ease);
        }

        .cursor-circle {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255,255,255,0.5);
            transition: width 0.3s, height 0.3s, background 0.3s, border-color 0.8s;
        }

        /* Hover State for Cursor */
        body.hovering .cursor-circle {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(2px);
            border-color: transparent;
        }

        /* --- BACKGROUND CANVAS --- */
        #bg-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.6; /* Boosted opacity for better visibility */
            transition: opacity 0.8s;
        }

        /* --- MAIN LAYOUT --- */
        main {
            position: relative;
            z-index: 10;
            padding: 0 5vw;
        }

        header {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: 1px solid var(--grid);
        }

        .pre-title {
            font-family: 'Syncopate', sans-serif;
            font-size: 0.8rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--accent);
            margin-bottom: 20px;
            display: block;
            transition: color 0.8s var(--transition-ease);
        }

        /* KINETIC TYPE */
        .hero-title {
            font-family: 'Syncopate', sans-serif;
            font-size: clamp(3rem, 10vw, 8rem);
            font-weight: 700;
            line-height: 0.9;
            text-transform: uppercase;
            mix-blend-mode: exclusion;
            position: relative;
        }

        .hero-title span {
            display: block;
            transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .hero-title:hover span {
            transform: translateX(20px);
            color: transparent;
            -webkit-text-stroke: 1px var(--text);
        }

        .role-scroller {
            margin-top: 40px;
            font-size: 1.5rem;
            color: #888;
            overflow: hidden;
            height: 1.5em;
        }

        .role-scroller div {
            animation: scrollUp 6s infinite cubic-bezier(0.8, 0, 0.2, 1);
        }

        @keyframes scrollUp {
            0%, 20% { transform: translateY(0); }
            25%, 45% { transform: translateY(-100%); }
            50%, 70% { transform: translateY(-200%); }
            75%, 95% { transform: translateY(-300%); }
            100% { transform: translateY(-400%); }
        }

        /* --- HUD SWITCH --- */
        .hud-switch {
            position: fixed;
            top: 40px;
            right: 5vw;
            z-index: 100;
            display: flex;
            gap: 30px;
            font-family: 'Syncopate', sans-serif;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
        }

        .switch-btn {
            position: relative;
            padding: 10px 10px;
            color: #555;
            cursor: none;
            text-transform: uppercase;
            transition: color 0.3s ease-out;
            display: inline-block;
        }

        .switch-btn::before {
            content: '';
            position: absolute;
            bottom: 10px;
            left: 10px;
            width: 0%;
            height: 1px;
            background: var(--accent);
            transition: width 0.3s ease, background 0.8s var(--transition-ease);
        }

        .switch-btn.active { color: var(--text); }
        .switch-btn.active::before { width: calc(100% - 20px); }
        .switch-btn:hover { color: var(--text); }

        /* --- SECTIONS --- */
        .grid-section {
            display: grid;
            grid-template-columns: 1fr 2fr;
            border-bottom: 1px solid var(--grid);
        }
        
        .grid-label {
            padding: 80px 0;
            border-right: 1px solid var(--grid);
            font-family: 'Syncopate', sans-serif;
            text-transform: uppercase;
            font-size: 0.9rem;
            color: #666;
            position: sticky;
            top: 0;
            height: fit-content;
        }

        .grid-content {
            padding: 80px 0 80px 60px;
            transition: opacity 0.3s ease;
        }

        .project-item {
            margin-bottom: 100px;
            position: relative;
        }

        .project-title {
            font-size: 3rem;
            font-weight: 300;
            margin-bottom: 16px;
            transition: letter-spacing 0.3s;
        }
        
        .project-item:hover .project-title {
            letter-spacing: 2px;
            color: var(--accent);
        }

        .project-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
            font-family: 'Space Mono', monospace;
            font-size: 0.75rem;
            color: #888;
            align-items: center;
        }
        
        .company-label {
            color: var(--accent);
            font-weight: 700;
            margin-right: 8px;
            transition: color 0.8s var(--transition-ease);
        }

        .tag { 
            border: 1px solid rgba(255,255,255,0.2); 
            padding: 4px 12px; 
            border-radius: 4px; 
            background: rgba(255,255,255,0.02);
            transition: border-color 0.3s;
        }

        .project-item:hover .tag { border-color: var(--accent); }

        .project-desc {
            max-width: 600px;
            font-size: 1.1rem;
            font-weight: 300;
            line-height: 1.8;
            color: #ccc;
        }

        /* --- MODAL (SLIDE-OUT) --- */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 1999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.6s var(--transition-ease);
        }

        .modal-backdrop.active {
            opacity: 1;
            pointer-events: all;
        }

        .project-modal {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            max-width: 700px;
            height: 100vh;
            background: var(--bg);
            border-left: 1px solid var(--accent);
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.6s var(--transition-ease), background-color 0.8s var(--transition-ease);
            padding: 80px 5vw;
            overflow-y: auto;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
        }

        .project-modal.active {
            transform: translateX(0);
        }

        .close-btn {
            position: absolute;
            top: 40px;
            right: 40px;
            font-size: 2rem;
            color: var(--text);
            cursor: none;
            transition: color 0.3s;
        }
        
        .close-btn:hover { color: var(--accent); }

        .modal-title {
            font-family: 'Syncopate', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 20px;
            text-transform: uppercase;
        }

        .modal-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 40px;
            font-family: 'Space Mono', monospace;
            font-size: 0.85rem;
            color: var(--accent);
        }

        .modal-image-placeholder {
            width: 100%;
            height: 300px;
            background: rgba(255,255,255,0.05);
            border: 1px dashed var(--grid);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            font-family: 'Space Mono', monospace;
            margin-bottom: 40px;
        }

        .modal-body {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #ddd;
        }
        
        .modal-body ul {
            padding-left: 20px;
            margin-top: 20px;
        }
        
        .modal-body li {
            margin-bottom: 12px;
            list-style-type: square;
        }
        
        .modal-body strong {
            color: var(--text);
        }

        /* --- FOOTER --- */
        footer {
            padding: 100px 5vw;
            border-top: 1px solid var(--grid);
        }
        
        #contact-trigger {
            text-decoration: none;
            color: inherit;
        }

        h2.big-link {
            font-size: clamp(2rem, 6vw, 5rem);
            text-transform: uppercase;
            font-weight: 800;
            line-height: 1;
            cursor: none;
            transition: opacity 0.3s;
        }
        
        h2.big-link:hover {
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px var(--text);
        }

        /* --- MOBILE RESPONSIVE --- */
        @media (max-width: 768px) {
            * { cursor: auto !important; } /* Revert to native cursor */
            
            .cursor-dot, .cursor-circle { display: none; }
            
            .grid-section {
                grid-template-columns: 1fr;
            }
            
            .grid-label {
                position: static;
                padding: 40px 0 20px 0;
                border-right: none;
                border-bottom: 1px solid var(--grid);
            }
            
            .grid-content {
                padding: 40px 0;
            }
            
            .hero-title {
                font-size: clamp(2.5rem, 8vw, 4rem);
            }
            
            .hud-switch {
                top: 20px;
                right: 5vw;
                gap: 15px;
            }
            
            .project-modal {
                padding: 60px 20px;
                width: 100%;
            }
            
            .close-btn {
                top: 20px;
                right: 20px;
            }
        }

    </style>
</head>
<body>

    <div class="noise"></div>

    <div class="cursor-dot" id="cursor-dot"></div>
    <div class="cursor-circle" id="cursor-circle"></div>

    <canvas id="bg-canvas"></canvas>

    <nav class="hud-switch">
        <div class="switch-btn active" id="btn-tech" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">[01] Technical</div>
        <div class="switch-btn" id="btn-creative" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">[02] Creative</div>
    </nav>

    <main>
        <header>
            <span class="pre-title">Frontend Architect & ICT Lead</span>
            <h1 class="hero-title" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">
                <span>William</span>
                <span>Mweemba</span>
            </h1>
            
            <div class="role-scroller">
                <div id="scroller-content">
                    <p>Building Digital Infrastructure</p>
                    <p>Scalable MERN Architectures</p>
                    <p>Strategic Banking Systems</p>
                    <p>Mindful Entrepreneurship</p>
                    <p>Building Digital Infrastructure</p>
                </div>
            </div>
        </header>

        <section class="grid-section">
            <div class="grid-label">Selected Works</div>
            <div class="grid-content" id="work-container">
                <!-- Injected via JS -->
            </div>
        </section>

        <footer>
            <span class="pre-title">Next Steps</span>
            <a href="mailto:wmweemba@gmail.com" id="contact-trigger" onclick="copyEmail(event)">
                <h2 class="big-link" id="contact-text" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">Let's Build<br>The Future.</h2>
            </a>
        </footer>
    </main>

    <!-- MODAL ELEMENTS -->
    <div class="modal-backdrop" id="modal-backdrop" onclick="closeProject()"></div>
    <aside id="project-modal" class="project-modal">
        <div class="close-btn" onclick="closeProject()" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">×</div>
        <div class="modal-content-wrapper">
            <h2 class="modal-title" id="m-title">Project Title</h2>
            <div class="modal-tags" id="m-tags">
                <span>[Tag 1]</span> <span>[Tag 2]</span>
            </div>
            <div class="modal-image-placeholder">
                // PROJECT_ASSET_LOADED //
            </div>
            <div class="modal-body" id="m-body">
                Project details go here...
            </div>
        </div>
    </aside>

    <script>
        // --- 1. CURSOR LOGIC ---
        const cursorDot = document.getElementById('cursor-dot');
        const cursorCircle = document.getElementById('cursor-circle');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instant dot
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            // Smooth lag for circle
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursorCircle.style.left = cursorX + 'px';
            cursorCircle.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        if(window.innerWidth > 768) {
            animateCursor();
        }

        // MAKE GLOBAL FOR INLINE HANDLERS
        window.hoverEffect = function(isActive) {
            if(window.innerWidth <= 768) return; // Disable hover effects on mobile
            if(isActive) document.body.classList.add('hovering');
            else document.body.classList.remove('hovering');
        }

        // --- 2. MAGNETIC BUTTON EFFECT ---
        const magneticButtons = document.querySelectorAll('.switch-btn');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                if(window.innerWidth <= 768) return;
                const position = btn.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });


        // --- 3. BACKGROUND PHYSICS ---
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let particleCount = 80;
        let mobileSlowdown = 1;

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
                this.vx = (Math.random() - 0.5) * 0.5 * mobileSlowdown;
                this.vy = (Math.random() - 0.5) * 0.5 * mobileSlowdown;
                // Boosted Size and Alpha for visibility
                this.size = Math.random() * 3; 
                this.alpha = Math.random() * 0.8 + 0.2; // Min 20% opacity
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
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

        window.addEventListener('resize', resize);
        resize(); // Initial call

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
                    if(dist < 100) {
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
        animateBg();


        // --- 4. DATA & CONTENT LOGIC ---
        const btnTech = document.getElementById('btn-tech');
        const btnCreative = document.getElementById('btn-creative');
        const workContainer = document.getElementById('work-container');
        const scrollerContent = document.getElementById('scroller-content');
        
        // Modal Elements
        const modal = document.getElementById('project-modal');
        const backdrop = document.getElementById('modal-backdrop');
        const mTitle = document.getElementById('m-title');
        const mTags = document.getElementById('m-tags');
        const mBody = document.getElementById('m-body');
        
        let currentMode = 'technical'; // Track mode for modal logic

        const data = {
            technical: {
                scroller: `
                    <p>Head of ICT</p>
                    <p>Full-Stack Certified</p>
                    <p>Network Operations</p>
                    <p>Digital Finance</p>
                    <p>Head of ICT</p>
                `,
                items: [
                    { 
                        title: "Head of ICT", 
                        company: "Financial Institution",
                        tags: ["[Strategic Leadership]", "[Cyber Security]", "[Core Banking]"], 
                        desc: "Leading enterprise digital transformation and core banking system changeovers. Developing disaster recovery policies and managing large-scale server environments.",
                        longDesc: `
                            <p>As Head of ICT, I oversee the strategic and operational technology requirements for a major financial institution.</p>
                            <ul>
                                <li><strong>Core Banking Migration:</strong> Orchestrated the migration of the Core Banking System, ensuring zero data loss and minimizing downtime to under 4 hours during the switchover.</li>
                                <li><strong>Policy Development:</strong> Developed and enforced comprehensive ICT security policies aligned with ISO 27001 standards to mitigate risk.</li>
                                <li><strong>Infrastructure:</strong> Managing a hybrid server environment supporting 50+ branches, ensuring high availability and redundancy.</li>
                                <li><strong>Budgeting:</strong> Reduced operational IT costs by 15% through strategic vendor negotiations and cloud resource optimization.</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Network Operations", 
                        company: "Africonnect",
                        tags: ["[ISP Infrastructure]", "[Cisco]", "[99.9% Uptime]"], 
                        desc: "Managed critical ISP infrastructure for enterprise clients. Expert in routing, switching, and maintaining high-availability networks.",
                        longDesc: `
                            <p>Ensured the stability and performance of a Tier-1 ISP network serving enterprise clients across Zambia.</p>
                            <ul>
                                <li><strong>Network Architecture:</strong> Configured and maintained core Cisco routers and switches for optimal data flow.</li>
                                <li><strong>Uptime Guarantee:</strong> Maintained a 99.9% uptime SLA for critical banking and government clients.</li>
                                <li><strong>Troubleshooting:</strong> Led the rapid response team for network outages, reducing mean time to repair (MTTR) by 30%.</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Full-Stack Certified", 
                        company: "MERN Stack",
                        tags: ["[MongoDB]", "[React]", "[Node.js]", "[Python]"], 
                        desc: "Certified Full-Stack Developer bridging the gap between legacy banking hardware and modern, scalable web architecture.",
                        longDesc: `
                            <p>Combining infrastructure knowledge with modern software development to build scalable internal tools.</p>
                            <ul>
                                <li><strong>Stack Proficiency:</strong> Expert in MongoDB, Express.js, React, and Node.js.</li>
                                <li><strong>API Development:</strong> Designed RESTful APIs to expose legacy banking data to modern frontend dashboards.</li>
                                <li><strong>Automation:</strong> Wrote Python scripts to automate daily server health checks and reporting.</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Digital Finance", 
                        company: "Certifications",
                        tags: ["[Digital Money]", "[Mobile Ops]", "[DFI]"], 
                        desc: "Certified Digital Finance Practitioner with expertise in mobile money operations and digital financial ecosystems.",
                        longDesc: `
                            <p>Certified Digital Finance Practitioner (CDFP) focusing on the intersection of technology and financial inclusion.</p>
                            <ul>
                                <li><strong>Ecosystem Analysis:</strong> Mapping digital financial ecosystems to identify gaps in service delivery.</li>
                                <li><strong>Mobile Money:</strong> Deep understanding of USSD gateways and mobile money integration standards.</li>
                            </ul>
                        `
                    }
                ]
            },
            creative: {
                scroller: `
                    <p>The Mindful Hustler</p>
                    <p>Founder & Creator</p>
                    <p>Organic Growth</p>
                    <p>Digital Strategy</p>
                    <p>The Mindful Hustler</p>
                `,
                items: [
                    { 
                        title: "The Mindful Hustler", 
                        company: "Author / Philosophy",
                        tags: ["eBook", "Energy Management"], 
                        desc: "Author of 'Balancing Ambition and Well-Being'. A guide for high-tech professionals to manage energy, not just time.",
                        longDesc: `
                            <p>A philosophy and eBook written for the modern professional who feels the burnout of the "hustle culture."</p>
                            <ul>
                                <li><strong>The 90-Minute Flow Cycle:</strong> Introduces a productivity technique based on ultradian rhythms, advocating for intense work sprints followed by genuine rest.</li>
                                <li><strong>Energy vs. Time:</strong> The book argues that energy management supersedes time management for high-performance creative work.</li>
                                <li><strong>Mindfulness:</strong> Practical meditation techniques adapted for busy corporate environments.</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Mfumu Grooming", 
                        company: "Founder",
                        tags: ["eCommerce", "Organic Product"], 
                        desc: "Created and scaled a premium organic beard oil brand (Sweet Almond & Peppermint) to retail in 5 independent beauty outlets.",
                        longDesc: `
                            <p>Mfumu Grooming represents the "Hustler" spirit—creating a tangible product from scratch.</p>
                            <ul>
                                <li><strong>Ingredients:</strong> Handcrafted using premium cold-pressed Sweet Almond Oil and organic Peppermint essential oils. The blend promotes beard growth and skin health.</li>
                                <li><strong>Retail Expansion:</strong> Successfully negotiated shelf space in 5 major independent beauty outlets across Lusaka.</li>
                                <li><strong>Growth:</strong> Achieved a 40% Month-over-Month sales growth in Q1 2024 through social media marketing.</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Digital Strategy", 
                        company: "Freelance",
                        tags: ["Google Ads", "SEO", "Growth"], 
                        desc: "Google Certified in Display & Video Ads. Helping small businesses dominate local search and optimize ad spend.",
                        longDesc: `
                            <p>Helping local SMEs navigate the digital landscape.</p>
                            <ul>
                                <li><strong>SEO:</strong> Optimizing Google Business Profiles to dominate local "near me" searches.</li>
                                <li><strong>Ad Spend:</strong> Managing monthly ad budgets with a focus on high ROAS (Return on Ad Spend).</li>
                            </ul>
                        `
                    },
                    { 
                        title: "Billu Publishing", 
                        company: "Content Creation",
                        tags: ["Self-Publishing", "Creator Economy"], 
                        desc: "A platform for sharing the 'Swiss Army Knife' philosophy of diversifying skills and income streams.",
                        longDesc: `
                            <p>My personal platform for content creation.</p>
                            <ul>
                                <li><strong>Philosophy:</strong> Promoting the idea that modern professionals should be "Swiss Army Knives"—versatile, adaptable, and skilled in multiple domains.</li>
                            </ul>
                        `
                    }
                ]
            }
        };

        function renderContent(mode) {
            currentMode = mode; // Update global state
            const d = data[mode];
            
            // 1. Theme Logic
            if(mode === 'creative') {
                document.body.classList.add('mode-creative');
            } else {
                document.body.classList.remove('mode-creative');
            }

            // 2. Update Scroller
            scrollerContent.innerHTML = d.scroller;

            // 3. Update Projects (Fade Effect)
            workContainer.style.opacity = 0;
            setTimeout(() => {
                // Note: Added onclick="openProject(index)" to the item
                workContainer.innerHTML = d.items.map((item, index) => `
                    <div class="project-item" onclick="openProject(${index})" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">
                        <div class="project-meta">
                            <span class="company-label">/ ${item.company}</span>
                            ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <h3 class="project-title">${item.title}</h3>
                        <p class="project-desc">${item.desc}</p>
                    </div>
                `).join('');
                workContainer.style.opacity = 1;
            }, 300);
        }

        // --- 5. MODAL LOGIC ---
        
        // MAKE GLOBAL FOR INLINE HANDLERS
        window.openProject = function(index) {
            const item = data[currentMode].items[index];
            
            // Populate Modal
            mTitle.innerText = item.title;
            mTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
            mBody.innerHTML = item.longDesc || item.desc; // Fallback if no longDesc
            
            // Show
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        window.closeProject = function() {
            modal.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // --- 6. FOOTER CONTACT LOGIC (FIXED FOR IFRAME) ---
        window.copyEmail = function(e) {
            e.preventDefault(); // Prevent mailto default behavior
            const email = "wmweemba@gmail.com";
            const contactText = document.getElementById('contact-text');
            
            // Fallback using execCommand for iframe compatibility
            const textArea = document.createElement("textarea");
            textArea.value = email;
            
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    const originalText = contactText.innerHTML;
                    contactText.innerHTML = "Email Copied!";
                    
                    setTimeout(() => {
                        contactText.innerHTML = originalText;
                    }, 2000);
                } else {
                    console.error('Copy failed.');
                }
            } catch (err) {
                console.error('Copy error: ', err);
            }

            document.body.removeChild(textArea);
        }

        // Init
        renderContent('technical');

        // Toggle Listeners
        btnTech.addEventListener('click', () => {
            btnTech.classList.add('active');
            btnCreative.classList.remove('active');
            renderContent('technical');
        });

        btnCreative.addEventListener('click', () => {
            btnCreative.classList.add('active');
            btnTech.classList.remove('active');
            renderContent('creative');
        });

    </script>
</body>
</html>