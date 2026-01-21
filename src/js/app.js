// --- DOM ELEMENT CACHING ---
let scrollerContent, workContainer, modal, backdrop, mTitle, mTags, mBody;
let btnTech, btnCreative;

// --- GLOBAL STATE ---
let currentMode = 'technical'; // Track mode for modal logic

// --- DATA & CONTENT LOGIC ---
const data = {
    technical: {
        about: "Results-driven ICT professional with 12+ years experience in managing banking infrastructure, enforcing ISO 27001 compliance, and leading digital transformation.",
        scroller: `
            <p>Head of ICT</p>
            <p>Network Architecture</p>
            <p>Digital Finance</p>
            <p>Full-Stack Dev</p>
            <p>Head of ICT</p>
        `,
        items: [
            { 
                title: "Head of ICT", 
                company: "Financial Institution",
                tags: ["[Banking Systems]", "[ISO 27001]", "[High Availability]"], 
                desc: "Leading enterprise digital transformation, Core Banking Migrations, and Disaster Recovery protocols.",
                longDesc: `
                    <p>Strategic leadership over banking infrastructure and policy.</p>
                    <ul>
                        <li><strong>Core Banking Migration:</strong> Orchestrated end-to-end migration with zero data loss and <4hr downtime.</li>
                        <li><strong>Infrastructure:</strong> Managed hybrid server environments for 50+ branches with 99% service availability.</li>
                        <li><strong>Cost Reduction:</strong> Reduced operational IT costs by 15% through virtualization and vendor negotiation.</li>
                    </ul>
                `
            },
            { 
                title: "Network Operations", 
                company: "Africonnect",
                tags: ["[ISP Infrastructure]", "[Cisco/Huawei]", "[Routing]"], 
                desc: "Managed Tier-1 ISP infrastructure, ensuring 99.9% uptime for critical enterprise banking clients.",
                longDesc: `
                    <p>Ensuring stability for a Tier-1 ISP network.</p>
                    <ul>
                        <li><strong>Uptime Mastery:</strong> Maintained 99.9% uptime SLA for banking and government clients.</li>
                        <li><strong>Incident Response:</strong> Led rapid response teams, reducing Mean Time To Repair (MTTR) by 30%.</li>
                        <li><strong>Architecture:</strong> Configured core switching/routing for optimal data flow (Cisco/Huawei).</li>
                    </ul>
                `
            },
            { 
                title: "Full-Stack Engineer", 
                company: "MERN Stack Certified",
                tags: ["[React]", "[Node.js]", "[Python]", "[Automation]"], 
                desc: "Bridging legacy banking hardware with modern web architecture using MERN stack and Python automation.",
                longDesc: `
                    <p>Certified Full-Stack Developer (Emurgo).</p>
                    <ul>
                        <li><strong>Modernization:</strong> Building RESTful APIs to expose legacy banking data to modern front-end dashboards.</li>
                        <li><strong>Automation:</strong> Python scripting for daily server health checks and automated reporting.</li>
                        <li><strong>Stack:</strong> MongoDB, Express, React, Node.js.</li>
                    </ul>
                `
            },
            { 
                title: "Digital Finance", 
                company: "CDFP Certified",
                tags: ["[Fintech]", "[Mobile Money]", "[Payment Gateways]"], 
                desc: "Certified Digital Finance Practitioner specializing in mobile money ecosystems and DFS policy.",
                longDesc: `
                    <p>Expertise in the intersection of technology and financial inclusion.</p>
                    <ul>
                        <li><strong>Ecosystem Mapping:</strong> Analyzing gaps in digital service delivery for unbanked populations.</li>
                        <li><strong>Integration:</strong> Deep knowledge of USSD gateways and Mobile Money API standards.</li>
                    </ul>
                `
            }
        ]
    },
    creative: {
        about: "A creative entrepreneur bridging the gap between rigid technology and organic storytelling. Believer in sustainable hustle.",
        scroller: `
            <p>The Mindful Hustler</p>
            <p>Organic Growth</p>
            <p>Digital Strategy</p>
            <p>Brand Builder</p>
            <p>The Mindful Hustler</p>
        `,
        items: [
            { 
                title: "The Mindful Hustler", 
                company: "Author & Philosophy",
                tags: ["[Book]", "[Energy Management]", "[Flow State]"], 
                desc: "Author of 'Balancing Ambition and Well-Being'. A philosophy for high-performance without burnout.",
                longDesc: `
                    <p>A guide for the modern professional.</p>
                    <ul>
                        <li><strong>Ultradian Rhythms:</strong> Implementing the 90-minute flow cycle for peak creative output.</li>
                        <li><strong>Philosophy:</strong> Arguing that 'Energy Management' supersedes 'Time Management' for creators.</li>
                        <li><strong>Outcome:</strong> A framework for sustainable ambition in a high-pressure world.</li>
                    </ul>
                `
            },
            { 
                title: "Mfumu Grooming", 
                company: "Founder",
                tags: ["[eCommerce]", "[Organic]", "[Product Design]"], 
                desc: "Created and scaled a premium organic beard oil brand (Sweet Almond & Peppermint) to 5 retail outlets.",
                longDesc: `
                    <p>Tangible product creation from zero to retail.</p>
                    <ul>
                        <li><strong>Formulation:</strong> Hand-crafted blend using Cold-Pressed Sweet Almond Oil and Organic Peppermint.</li>
                        <li><strong>Growth:</strong> Achieved 40% MoM sales growth in Q1 via social commerce.</li>
                        <li><strong>Retail:</strong> Negotiated shelf space in 5 independent beauty outlets in Lusaka.</li>
                    </ul>
                `
            },
            { 
                title: "Digital Strategy", 
                company: "Google Certified",
                tags: ["[Google Ads]", "[SEO]", "[Video Marketing]"], 
                desc: "Data-driven growth strategies. Certified in Google Display & Video Ads to maximize ROAS.",
                longDesc: `
                    <p>Helping SMEs dominate local search.</p>
                    <ul>
                        <li><strong>Google Ads:</strong> Certified specialist in Display and Video campaigns for high-intent targeting.</li>
                        <li><strong>Local SEO:</strong> Optimizing Google Business Profiles to capture 'Near Me' search traffic.</li>
                        <li><strong>Analytics:</strong> Translating raw data into actionable marketing pivots.</li>
                    </ul>
                `
            },
            { 
                title: "Billu Publishing", 
                company: "Content Platform",
                tags: ["[Creator Economy]", "[Storytelling]"], 
                desc: "A platform sharing the 'Swiss Army Knife' philosophy of skill diversification.",
                longDesc: `
                    <p>Advocating for the polymath professional.</p>
                    <ul>
                        <li><strong>Concept:</strong> Promoting the idea that modern leaders must be versatile—technical yet creative, logical yet empathetic.</li>
                    </ul>
                `
            }
        ]
    }
};

// --- CURSOR LOGIC ---
let appMouseX = 0, appMouseY = 0;
let cursorX = 0, cursorY = 0;
let cursorDot, cursorCircle;

function initCustomCursor() {
    console.log('👆 Initializing custom cursor...');
    cursorDot = document.getElementById('cursor-dot');
    cursorCircle = document.getElementById('cursor-circle');

    console.log('👆 Cursor elements found:', {
        cursorDot: !!cursorDot,
        cursorCircle: !!cursorCircle
    });

    if (!cursorDot || !cursorCircle) {
        console.error('❌ Cursor elements not found!');
        return;
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        appMouseX = e.clientX;
        appMouseY = e.clientY;
        
        // Instant dot positioning
        cursorDot.style.left = appMouseX + 'px';
        cursorDot.style.top = appMouseY + 'px';
    });

    // Animate cursor circle with lag
    function animateCursor() {
        cursorX += (appMouseX - cursorX) * 0.1;
        cursorY += (appMouseY - cursorY) * 0.1;
        
        cursorCircle.style.left = cursorX + 'px';
        cursorCircle.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    // Only activate on desktop
    if (window.innerWidth > 768) {
        animateCursor();
        console.log('✅ Custom cursor animation started');
    } else {
        console.log('📱 Mobile detected - cursor disabled');
    }
}

// GLOBAL HOVER EFFECT FUNCTION
window.hoverEffect = function(isActive) {
    if (window.innerWidth <= 768) return;
    
    if (isActive) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }
}

// --- MAGNETIC BUTTONS ---
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.switch-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// --- CONTENT RENDERING ---
function renderContent(mode) {
    console.log(`🎨 Rendering content for mode: ${mode}`);
    currentMode = mode; // Update global state
    const d = data[mode];
    
    // 1. Theme Logic
    if(mode === 'creative') {
        document.body.classList.add('mode-creative');
        console.log('🟠 Applied creative mode class');
    } else {
        document.body.classList.remove('mode-creative');
        console.log('🔵 Removed creative mode class');
    }

    // 2. Update Scroller
    if (scrollerContent) {
        scrollerContent.innerHTML = d.scroller;
        console.log('📝 Scroller content updated');
    }

    // 3. Update Projects (Fade Effect)
    if (workContainer) {
        workContainer.style.opacity = 0;
        console.log('🔄 Starting fade effect for project items...');
        
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
            console.log(`✅ Rendered ${d.items.length} project items for ${mode} mode`);
        }, 300);
    }
    
    // 4. Hook for Physics Engine
    if (window.updatePhysicsEngine) {
        window.updatePhysicsEngine(mode);
    }
}

// --- MODAL LOGIC ---

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

window.openAboutModal = function() {
    const aboutContent = data[currentMode].about;
    
    // Populate Modal with About Content
    mTitle.innerText = currentMode === 'technical' ? 'Technical Background' : 'Creative Philosophy';
    mTags.innerHTML = currentMode === 'technical' ? '<span>[Professional]</span>' : '<span>[Creative]</span>';
    mBody.innerHTML = `<p>${aboutContent}</p>`;
    
    // Show Modal
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.classList.add('no-scroll');
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
        if (successful && contactText) {
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 The Kinetic Architect - DOM Content Loaded');
    
    // Cache DOM elements
    scrollerContent = document.getElementById('scroller-content');
    workContainer = document.getElementById('work-container');
    modal = document.getElementById('project-modal');
    backdrop = document.getElementById('modal-backdrop');
    mTitle = document.getElementById('m-title');
    mTags = document.getElementById('m-tags');
    mBody = document.getElementById('m-body');
    btnTech = document.getElementById('btn-tech');
    btnCreative = document.getElementById('btn-creative');
    
    console.log('🔍 DOM Elements Found:', {
        scrollerContent: !!scrollerContent,
        workContainer: !!workContainer,
        modal: !!modal,
        backdrop: !!backdrop,
        mTitle: !!mTitle,
        mTags: !!mTags,
        mBody: !!mBody,
        btnTech: !!btnTech,
        btnCreative: !!btnCreative
    });
    
    // Initialize features
    console.log('🎯 Initializing cursor and magnetic buttons...');
    initCustomCursor();
    initMagneticButtons();
    
    // Init default content
    console.log('🎨 Rendering initial technical content...');
    renderContent('technical');
    
    // Toggle Listeners
    btnTech.addEventListener('click', () => {
        console.log('🔵 Technical clicked');
        btnTech.classList.add('active');
        btnCreative.classList.remove('active');
        renderContent('technical');
    });

    btnCreative.addEventListener('click', () => {
        console.log('🟠 Creative clicked');
        btnCreative.classList.add('active');
        btnTech.classList.remove('active');
        renderContent('creative');
    });
    
    console.log('✅ Initialization complete!');
});