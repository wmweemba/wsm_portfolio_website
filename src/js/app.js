// --- DOM ELEMENT CACHING ---
let scrollerContent, workContainer, modal, backdrop, mTitle, mTags, mBody, mImage;
let btnTech, btnCreative;

// --- GLOBAL SOCIAL LINKS ---
const globalSocials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/william-s-mweemba/' },
    { label: 'X (Twitter)', url: 'https://x.com/jrwill_m' },
    { label: 'Facebook', url: 'https://www.facebook.com/william.mweemba' },
    { label: 'Instagram', url: 'https://www.instagram.com/wzmii/' }
];

// --- GLOBAL STATE ---
let currentMode = 'technical'; // Track mode for modal logic

// --- DATA & CONTENT LOGIC ---
const data = {
    technical: {
        about: "Results-driven ICT professional with 12+ years experience in managing banking infrastructure, enforcing ITIL ITSM standards, and leading digital transformation.",
        image: "./src/images/william-tech.jpeg",
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
                tags: ["[Banking Systems]", "[ITIL ITSM]", "[High Availability]"], 
                desc: "Leading enterprise digital transformation, Core Banking Migrations, and Disaster Recovery protocols.",
                image: "./src/images/core-banking.jpeg",
                longDesc: `
                    <p>Strategic leadership over banking infrastructure and policy.</p>
                    <ul>
                        <li><strong>Core Banking Migration:</strong> Orchestrated end-to-end migration with zero data loss and minimal downtime.</li>
                        <li><strong>Infrastructure:</strong> Managed hybrid server environments servicing 30+ branches with over 95% service availability.</li>
                        <li><strong>Cost Reduction:</strong> Reduced operational IT costs by 15% through innovative solutions and vendor negotiation.</li>
                        <li><strong>Governance & Policy:</strong> Authored and implemented enduring enterprise policies (including Disaster Recovery & Data Protection) that continue to govern daily operations.</li>
                    </ul>
                `
            },
            { 
                title: "Network Operations", 
                company: "Africonnect",
                tags: ["[ISP Infrastructure]", "[Cisco/Huawei]", "[Routing]"], 
                desc: "Served on team that managed Tier-1 ISP infrastructure, ensuring 99% uptime for critical enterprise clients.",
                image: "./src/images/network-operations.jpeg",
                longDesc: `
                    <p>Ensuring stability for a Tier-1 ISP network.</p>
                    <ul>
                        <li><strong>Uptime Mastery:</strong> Searved on teams that maintained 99.9% uptime SLA for banking and government clients.</li>
                        <li><strong>Incident Response:</strong> Led contact center teams, reducing Mean Time To Repair (MTTR) by 30%.</li>
                        <li><strong>Architecture:</strong> Configured core switching/routing for optimal data flow (Cisco/Huawei).</li>
                    </ul>
                `
            },
            { 
                title: "Full-Stack Engineer", 
                company: "MERN Stack Certified",
                tags: ["[React]", "[Node.js]", "[Python]", "[API Development]"], 
                desc: "Bridging legacy systems with modern web architecture using MERN stack tools and frameworks.",
                image: "./src/images/cert-mern.png",
                longDesc: `
                    <p>Certified Full-Stack Developer (MERN).</p>
                    <ul>
                        <li><strong>Modernization:</strong> Building RESTful APIs to expose legacy systems to modern front-end dashboards.</li>
                        <li><strong>Monitoring:</strong> Python scripting for network monitoring, health checks and reporting.</li>
                        <li><strong>Stack:</strong> MongoDB, Express, React, Node.js.</li>
                    </ul>
                `
            },
            { 
                title: "Digital Finance", 
                company: "CDFP Certified",
                tags: ["[Fintech]", "[Mobile Money]", "[Payment Gateways]"], 
                desc: "Certified Digital Finance Practitioner specializing in mobile money ecosystems and DFS policy.",
                image: "./src/images/digital-finance.jpeg",
                longDesc: `
                    <p>Expertise in the intersection of technology and financial inclusion.</p>
                    <ul>
                        <li><strong>Ecosystem Mapping:</strong> Analyzing gaps in digital service delivery for unbanked populations.</li>
                        <li><strong>Integration:</strong> Deep knowledge of USSD gateways and Mobile Money API standards.</li>
                    </ul>
                `
            },
            { 
                title: "Nexus Consulting Services", 
                company: "CEO & Founder",
                tags: ["[ICT Consultancy]", "[Network Infrastructure]", "[Managed Services]"], 
                desc: "Founded in 2017, providing high-quality digital solutions to SMEs and large organizations across Zambia.",
                image: "./src/images/nexus-tech.jpeg",
                socials: [
                    { label: 'Website', url: 'https://mynexusgroup.com/' },
                    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/nexus-consulting-zambia/' },
                    { label: 'Facebook', url: 'https://www.facebook.com/NexusGroupZambia/' }
                ],
                longDesc: `
                    <p>CEO and Founder of Nexus Consulting Services Limited - "Your missing link to achieve your goals."</p>
                    <ul>
                        <li><strong>Company Vision:</strong> Founded in 2017 to bridge the technology gap for Zambian businesses with expertise in telecommunications, networking, and collaboration solutions.</li>
                        <li><strong>Service Portfolio:</strong> Call center implementation, ICT consultancy, network infrastructure, outsourced IT departments, and managed services.</li>
                        <li><strong>Client Base:</strong> Serving major clients including Madison Insurance, Vision Fund Zambia, and Zambia National Building Society with enterprise-grade solutions.</li>
                        <li><strong>Strategic Partnerships:</strong> Authorized partner with Sophos, 3CX, Bitrix24, Juniper Networks, HP, and Lenovo for comprehensive technology solutions.</li>
                        <li><strong>Mission:</strong> Delivering quality products and services at affordable costs while maintaining the highest levels of customer satisfaction.</li>
                    </ul>
                `
            }
        ]
    },
    creative: {
        about: "A creative entrepreneur bridging the gap between rigid technology and organic storytelling. Believer in sustainable hustle.",
        image: "./src/images/william-creative.jpeg",
        scroller: `
            <p>The Mindful Hustler</p>
            <p>Organic Skin Care</p>
            <p>Digital Strategy</p>
            <p>Brand Builder</p>
            <p>The Mindful Hustler</p>
        `,
        items: [
            { 
                title: "The Mindful Hustler", 
                company: "Author & Philosophy",
                tags: ["[Book]", "[Energy Management]", "[Flow State]"], 
                desc: "Author of 'The Mindful Hustler - Balancing Ambition and Well-Being'. A philosophy for high-performance without burnout.",
                image: "./src/images/hustler-book.jpeg",
                socials: [
                    { label: 'Gumroad Store', url: 'https://wmweemble.gumroad.com/l/themindfulhustler' },
                    { label: 'Facebook', url: 'https://www.facebook.com/kineticmotivation/' }
                ],
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
                tags: ["[eCommerce]", "[Organic Skin Care]", "[Product Design]"], 
                desc: "Created and scaled a premium organic beard oil brand (Sweet Almond & Peppermint) to 3 retail outlets.",
                image: "./src/images/mfumu-product.jpeg",
                socials: [
                    { label: 'Instagram', url: 'https://www.instagram.com/mfumugrooming/' },
                    { label: 'Facebook', url: 'https://www.facebook.com/mfumugrooming/' }
                ],
                longDesc: `
                    <p>Tangible product creation from zero to retail.</p>
                    <ul>
                        <li><strong>Formulation:</strong> Hand-crafted blend using Cold-Pressed Sweet Almond Oil and Organic Peppermint.</li>
                        <li><strong>Growth:</strong> Achieved 30% MoM sales growth in Q1 via social commerce.</li>
                        <li><strong>Retail:</strong> Negotiated shelf space in 3 independent beauty outlets in Lusaka.</li>
                    </ul>
                `
            },
            { 
                title: "Digital Strategy", 
                company: "Google Certified",
                tags: ["[Google Ads]", "[SEO]", "[Video Marketing]"], 
                desc: "Data-driven growth strategies. Certified in Google Display & Video Ads to maximize ROAS.",
                image: "./src/images/google-ads.jpeg",
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
                image: "./src/images/billu-publishing.jpeg",
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
    
    // Hook for Physics Engine
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
    
    // Add social links if available
    if (item.socials && item.socials.length > 0) {
        const socialLinksHtml = `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--grid);">
                <h4 style="color: var(--accent); font-family: 'Syncopate', sans-serif; font-size: 0.9rem; margin-bottom: 15px; text-transform: uppercase;">Connect</h4>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    ${item.socials.map(social => `
                        <a href="${social.url}" target="_blank" class="btn-social-project" style="
                            color: var(--text);
                            text-decoration: none;
                            padding: 8px 16px;
                            border: 1px solid rgba(255,255,255,0.2);
                            border-radius: 20px;
                            font-size: 0.85rem;
                            transition: border-color 0.3s, color 0.3s;
                            display: inline-block;
                        " onmouseover="this.style.borderColor='var(--accent)'; this.style.color='var(--accent)'" 
                           onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='var(--text)'">
                            ${social.label}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        mBody.innerHTML += socialLinksHtml;
    }
    
    // Handle Image with specific styling for different projects
    if (item.image && mImage) {
        let imageStyle = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
        
        // Special handling for specific projects
        if (item.title === 'Mfumu Grooming') {
            imageStyle = 'width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 8px;';
        }
        
        mImage.innerHTML = `<img src="${item.image}" alt="${item.title} - William Mweemba Portfolio" class="project-hero-image" style="${imageStyle}">`;
    } else if (mImage) {
        mImage.innerHTML = '// PROJECT_ASSET_LOADED //';
    }
    
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
    const aboutData = data[currentMode];
    const aboutContent = aboutData.about;
    
    // Populate Modal with About Content
    mTitle.innerText = currentMode === 'technical' ? 'Technical Background' : 'Creative Philosophy';
    mTags.innerHTML = currentMode === 'technical' ? '<span>[Professional]</span>' : '<span>[Creative]</span>';
    mBody.innerHTML = `<p>${aboutContent}</p>`;
    
    // Add global social links for About modal
    const socialLinksHtml = `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--grid);">
            <h4 style="color: var(--accent); font-family: 'Syncopate', sans-serif; font-size: 0.9rem; margin-bottom: 15px; text-transform: uppercase;">Follow Me</h4>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                ${globalSocials.map(social => `
                    <a href="${social.url}" target="_blank" style="
                        color: var(--text);
                        text-decoration: none;
                        padding: 8px 16px;
                        border: 1px solid rgba(255,255,255,0.2);
                        border-radius: 20px;
                        font-size: 0.85rem;
                        transition: border-color 0.3s, color 0.3s;
                        display: inline-block;
                    " onmouseover="this.style.borderColor='var(--accent)'; this.style.color='var(--accent)'" 
                       onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='var(--text)'">
                        ${social.label}
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    mBody.innerHTML += socialLinksHtml;
    
    // Handle About Image with top positioning to show subject's head
    if (aboutData.image && mImage) {
        const imageStyle = 'width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 8px;';
        const modalTitle = currentMode === 'technical' ? 'Technical Background' : 'Creative Philosophy';
        mImage.innerHTML = `<img src="${aboutData.image}" alt="${modalTitle} - William Mweemba" class="modal-hero-image" style="${imageStyle}">`;
    } else if (mImage) {
        mImage.innerHTML = '// PROJECT_ASSET_LOADED //';
    }
    
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

// --- GLOBAL SOCIALS FOOTER ---
function renderGlobalSocials() {
    // Mobile-friendly label mapping
    const getMobileLabel = (label) => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) return label.toUpperCase();
        
        const mobileLabels = {
            'LinkedIn': 'IN',
            'X (Twitter)': 'X',
            'Facebook': 'FB',
            'Instagram': 'IG'
        };
        return mobileLabels[label] || label.substring(0, 2).toUpperCase();
    };
    
    const globalCommsHtml = `
        <div id="global-comms">
            ${globalSocials.map(social => `
                <a href="${social.url}" target="_blank" 
                   onmouseover="this.style.color='var(--text)'" 
                   onmouseout="this.style.color='var(--accent)'">
                    [${getMobileLabel(social.label)}]
                </a>
            `).join('')}
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', globalCommsHtml);
    
    // Update labels on window resize
    window.addEventListener('resize', () => {
        const globalComms = document.getElementById('global-comms');
        if (globalComms) {
            globalComms.remove();
            renderGlobalSocials();
        }
    });
}

// --- MOBILE SCROLL NAVIGATION ---
function initMobileScrollNav() {
    const nav = document.querySelector('.hud-switch');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    let isScrolling = false;
    
    function checkMobile() {
        return window.innerWidth <= 768;
    }
    
    function handleScroll() {
        if (!checkMobile()) return; // Only for mobile
        
        const currentScrollY = window.scrollY;
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Don't hide nav if modal is open
        if (document.body.classList.contains('no-scroll')) return;
        
        // Hide/show based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Scrolling down - hide nav
            nav.classList.add('hide-on-scroll');
            isScrolling = true;
        } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
            // Scrolling up or near top - show nav
            nav.classList.remove('hide-on-scroll');
            isScrolling = false;
        }
        
        lastScrollY = currentScrollY;
        
        // Show nav after scroll stops
        scrollTimeout = setTimeout(() => {
            if (isScrolling && checkMobile()) {
                nav.classList.remove('hide-on-scroll');
                isScrolling = false;
            }
        }, 1500);
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (!checkMobile()) {
            nav.classList.remove('hide-on-scroll');
            isScrolling = false;
        }
    });
    
    console.log('📱 Mobile scroll navigation initialized');
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
    mImage = document.querySelector('.modal-image-placeholder');
    btnTech = document.getElementById('btn-tech');
    btnCreative = document.getElementById('btn-creative');
    
    console.log('🔍 DOM Elements Found:', {
        scrollerContent: !!scrollerContent,
        workContainer: !!workContainer,
        modal: !!modal,
        backdrop: !!backdrop,
        mTitle: !!mTitle,
        mTags: !!mTags,
        mImage: !!mImage,
        btnTech: !!btnTech,
        btnCreative: !!btnCreative
    });
    
    // Initialize features
    console.log('🎯 Initializing cursor and magnetic buttons...');
    initCustomCursor();
    initMagneticButtons();
    initMobileScrollNav();
    renderGlobalSocials();
    
    // Init default content
    console.log('🎨 Rendering initial technical content...');
    renderContent('technical');
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