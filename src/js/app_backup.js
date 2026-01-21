// --- DATA & CONTENT LOGIC ---
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

// --- APPLICATION STATE ---
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

// --- CURSOR LOGIC ---
let cursorDot, cursorCircle;
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

function initCursor() {
    cursorDot = document.getElementById('cursor-dot');
    cursorCircle = document.getElementById('cursor-circle');
    
    if (!cursorDot || !cursorCircle) {
        console.warn('Cursor elements not found');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });

    function animateCursor() {
        // Smooth lag for circle
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        if (cursorCircle) {
            cursorCircle.style.left = cursorX + 'px';
            cursorCircle.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }

    if(window.innerWidth > 768) {
        animateCursor();
    }
}

// MAKE GLOBAL FOR INLINE HANDLERS
window.hoverEffect = function(isActive) {
    if(window.innerWidth <= 768) return; // Disable hover effects on mobile
    if(isActive) document.body.classList.add('hovering');
    else document.body.classList.remove('hovering');
}

// --- MAGNETIC BUTTON EFFECT ---
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

// --- CONTENT RENDERING ---
function renderContent(mode) {
    console.log(`Rendering content for mode: ${mode}`);
    
    if (!data[mode]) {
        console.error(`No data found for mode: ${mode}`);
        return;
    }
    
    currentMode = mode; // Update global state
    const d = data[mode];
    
    // 1. Theme Logic
    if(mode === 'creative') {
        document.body.classList.add('mode-creative');
        console.log('Applied creative mode class');
    } else {
        document.body.classList.remove('mode-creative');
        console.log('Removed creative mode class');
    }

    // 2. Update Scroller
    if (scrollerContent) {
        scrollerContent.innerHTML = d.scroller;
        console.log('Updated scroller content');
    } else {
        console.error('Scroller content element not found');
    }

    // 3. Update Projects (Fade Effect)
    if (workContainer) {
        workContainer.style.opacity = 0;
        setTimeout(() => {
            const projectsHTML = d.items.map((item, index) => `
                <div class="project-item" onclick="openProject(${index})" onmouseenter="hoverEffect(true)" onmouseleave="hoverEffect(false)">
                    <div class="project-meta">
                        <span class="company-label">/ ${item.company}</span>
                        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-desc">${item.desc}</p>
                </div>
            `).join('');
            
            workContainer.innerHTML = projectsHTML;
            workContainer.style.opacity = 1;
            console.log(`Rendered ${d.items.length} project items`);
        }, 300);
    } else {
        console.error('Work container element not found');
    }
}

// --- MODAL LOGIC ---
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

// --- FOOTER CONTACT LOGIC ---
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

// --- INITIALIZATION ---
function initApp() {
    console.log('Initializing app...');
    
    // Initialize cursor
    initCursor();
    
    // Render initial content
    renderContent('technical');
    
    // Setup toggle listeners
    if (btnTech && btnCreative) {
        btnTech.addEventListener('click', () => {
            console.log('Technical mode clicked');
            btnTech.classList.add('active');
            btnCreative.classList.remove('active');
            renderContent('technical');
        });

        btnCreative.addEventListener('click', () => {
            console.log('Creative mode clicked');
            btnCreative.classList.add('active');
            btnTech.classList.remove('active');
            renderContent('creative');
        });
    } else {
        console.error('Toggle buttons not found');
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}