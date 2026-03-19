---
name: animated-website
description: 'Build beautiful, performance-optimised animated websites with vanilla JS or modern frameworks. Use for: canvas particle systems, CSS animations, theme switching, scroll-driven effects, custom cursors, glassmorphism UI, mobile-optimised animations, Lighthouse >95 scores. Covers GPU acceleration, requestAnimationFrame, prefers-reduced-motion, and dual-theme architectures.'
argument-hint: 'Describe the animation or effect you want to implement'
---

# Front-End Animated Website Best Practices

## When to Use
- Building or improving canvas-based particle / hero animations
- Implementing CSS transitions, keyframes, or scroll-driven effects
- Designing dual-theme (e.g. light/dark or persona-based) systems
- Adding custom cursors, magnetic buttons, or micro-interactions
- Diagnosing janky animations or poor Lighthouse scores
- Making animations accessible and mobile-friendly

---

## 1. Architecture Decision: CSS vs JS Animation

| Signal | Prefer CSS | Prefer JS |
|--------|-----------|-----------|
| Simple state change (hover, toggle) | ✅ | |
| Physics / spring / procedural motion | | ✅ |
| Canvas drawing / particle systems | | ✅ |
| Sequenced, timeline-driven | | ✅ (GSAP or RAF) |
| No build process required | ✅ `@keyframes` | ✅ `requestAnimationFrame` |

**Rule:** Use CSS for anything that can be expressed declaratively. Drop down to JS only when CSS can't model the motion.

---

## 2. Performance-First Animation Checklist

### GPU Acceleration
- Only animate `transform` and `opacity` — these are composited on the GPU and never trigger layout or paint.
- Promoting a layer: `will-change: transform` (add **only** when the element will animate; remove after).
- Avoid animating: `width`, `height`, `top`, `left`, `margin`, `padding`, `background-size` — all trigger expensive layout recalculations.

```css
/* ✅ GPU-composited — safe */
.card { transition: transform 0.3s var(--transition-ease), opacity 0.3s; }

/* ❌ Triggers layout — avoid */
.card { transition: width 0.3s, height 0.3s; }
```

### `requestAnimationFrame` Pattern
```javascript
let animating = false;
let rafId = null;

function tick(timestamp) {
  update(timestamp);
  draw();
  rafId = requestAnimationFrame(tick);
}

function start() {
  if (!animating) {
    animating = true;
    rafId = requestAnimationFrame(tick);
  }
}

function stop() {
  animating = false;
  if (rafId) cancelAnimationFrame(rafId);
}

// Pause when tab is hidden
document.addEventListener('visibilitychange', () => {
  document.hidden ? stop() : start();
});
```

### Canvas Sizing (Zero CLS)
```javascript
function resizeCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  canvas.getContext('2d').scale(dpr, dpr);
}
window.addEventListener('resize', () => resizeCanvas(canvas));
```

---

## 3. Canvas Particle Systems

### Adaptive Particle Count
```javascript
const PARTICLE_COUNT = window.innerWidth <= 768 ? 30 : 80;
// Also reduce on low-end devices:
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const count = reduced ? 0 : PARTICLE_COUNT;
```

### Mouse Repulsion Pattern
```javascript
particles.forEach(p => {
  const dx = p.x - mouse.x;
  const dy = p.y - mouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < REPULSION_RADIUS) {
    const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
    p.vx += (dx / dist) * force * REPULSION_STRENGTH;
    p.vy += (dy / dist) * force * REPULSION_STRENGTH;
  }
  // Damping
  p.vx *= 0.95;
  p.vy *= 0.95;
  p.x += p.vx;
  p.y += p.vy;
  // Wrap edges
  if (p.x < 0) p.x = canvas.offsetWidth;
  if (p.x > canvas.offsetWidth) p.x = 0;
  if (p.y < 0) p.y = canvas.offsetHeight;
  if (p.y > canvas.offsetHeight) p.y = 0;
});
```

### Theme-Aware Particle Colors
Read live from CSS custom properties so particles update instantly on theme change:
```javascript
function getParticleColor() {
  return getComputedStyle(document.body)
    .getPropertyValue('--particle-color').trim();
}
// Call inside the draw loop, not once at init
```

### Connection Lines (Distance Culling)
```javascript
for (let i = 0; i < particles.length; i++) {
  for (let j = i + 1; j < particles.length; j++) {
    const dx = particles[i].x - particles[j].x;
    const dy = particles[i].y - particles[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < CONNECTION_DISTANCE) {
      ctx.globalAlpha = 1 - dist / CONNECTION_DISTANCE;
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(particles[j].x, particles[j].y);
      ctx.stroke();
    }
  }
}
ctx.globalAlpha = 1;
```

### Particle Class Template (Generic)

Use a class so each particle owns its own state. Keep `update` and `draw` separate — `update` is pure physics, `draw` is pure rendering. This makes it trivial to swap renderers (Canvas → WebGL) later without touching the physics.

```javascript
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight);
  }

  reset(w, h) {
    this.x      = Math.random() * w;
    this.y      = Math.random() * h;
    this.vx     = (Math.random() - 0.5) * 1.6;
    this.vy     = (Math.random() - 0.5) * 1.6;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha  = Math.random() * 0.5 + 0.3;
  }

  // Pure physics — no rendering calls here
  update(w, h) {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vx *= 0.99; // gentle damping — keeps velocity bounded
    this.vy *= 0.99;
    // Edge wrapping (no teleport flash — particle re-enters opposite side)
    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;
  }

  // Pure rendering — accepts color so theme changes need zero class changes
  draw(ctx, color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle   = color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1; // always reset — prevents bleed into next draw call
  }
}

// Factory — builds the full particle array once at init
function createParticles(count, canvasWidth, canvasHeight) {
  return Array.from({ length: count }, () => new Particle(canvasWidth, canvasHeight));
}
```

**Integration with mouse repulsion:** Apply the force vectors directly to `p.vx` / `p.vy` inside the repulsion loop, then call `p.update(w, h)` — the class handles the rest. No changes to the repulsion logic needed.

---

## 4. CSS Custom Properties — Dual-Theme Architecture

```css
/* ── Base (Technical / Default) ────────────────── */
:root {
  --bg:              #0a0f1a;
  --accent:          #00d4ff;
  --particle-color:  #00d4ff;
  --text:            #e0e8f0;
  --surface:         rgba(255,255,255,0.04);
  --transition-ease: cubic-bezier(0.25, 1, 0.5, 1);
}

/* ── Creative / Persona Switch ──────────────────── */
body.mode-creative {
  --bg:              #1a0f05;
  --accent:          #ff8c00;
  --particle-color:  #ff8c00;
  --text:            #f0e8d0;
  --surface:         rgba(255,255,255,0.05);
}

/* ── Applied globally ───────────────────────────── */
body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.5s var(--transition-ease),
              color 0.5s var(--transition-ease);
}
```

**Theme toggle pattern (JS):**
```javascript
function setMode(mode) {
  document.body.classList.toggle('mode-creative', mode === 'creative');
}
```

---

## 5. Typography for Animated Sites

- **Display headers**: geometric sans (Syncopate, Bebas Neue, Rajdhani) for visual weight
- **Body**: humanist sans (Manrope, Inter) for readability at small sizes
- **Code / mono elements**: Space Mono or JetBrains Mono
- **Load strategy**: `font-display: swap` on all `@font-face` rules

```css
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Manrope:wght@400;600&family=Space+Mono&display=swap');

h1, h2 { font-family: 'Syncopate', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
body    { font-family: 'Manrope', sans-serif; }
code, .mono { font-family: 'Space Mono', monospace; }
```

---

## 6. Glassmorphism UI Panels

```css
.glass {
  background:    var(--surface);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
}
```

> **Performance note**: `backdrop-filter` promotes the element to its own layer — use sparingly (1–3 elements max).

---

## 7. Custom Cursor & Magnetic Buttons

```javascript
// Desktop only
const cursor = document.querySelector('.cursor');
if (!('ontouchstart' in window)) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// Magnetic effect
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});
```

```css
/* Disable cursor effects on touch devices */
@media (max-width: 768px) {
  .cursor { display: none; }
}
```

---

## 8. Slide-Out Modal System

```javascript
function openModal(data) {
  const modal = document.getElementById('modal');
  modal.innerHTML = renderContent(data);
  // Force reflow before adding active class (prevents instant-on)
  modal.offsetHeight;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scroll-behind
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
```

```css
.modal {
  position: fixed; inset: 0;
  transform: translateX(100%);
  transition: transform 0.4s var(--transition-ease);
  z-index: 1000;
}
.modal.active { transform: translateX(0); }
```

---

## 9. Accessibility — `prefers-reduced-motion`

Always respect the OS-level motion preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```javascript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  // Skip canvas animation, show static fallback
  canvas.style.display = 'none';
} else {
  start(); // begin RAF loop
}
```

---

## 10. Lighthouse >95 Checklist

| Category | Action |
|----------|--------|
| **Performance** | Defer all JS (`<script src="..." defer>`), inline critical CSS, `font-display: swap` |
| **CLS** | Use fixed dimensions on canvas; no layout-shifting fonts |
| **FID / TBT** | No long tasks on main thread; offload heavy init with `requestIdleCallback` |
| **FCP** | Inline first-paint styles in `<head>`; avoid render-blocking resources |
| **Images** | Use `<img loading="lazy">`, provide `width`/`height`, prefer WebP |
| **Accessibility** | `alt` on all images, ARIA labels on icon buttons, `focus-visible` outlines |

```html
<!-- ✅ Correct script loading order -->
<link rel="stylesheet" href="src/css/style.css">   <!-- blocking — small, critical -->
<script src="src/js/physics.js" defer></script>     <!-- deferred — loads after parse -->
<script src="src/js/app.js" defer></script>
```

### Pre-Deploy Audit Script

Run [./scripts/lighthouse-check.sh](./scripts/lighthouse-check.sh) against your local dev server before every deployment. It requires no global installs — uses `npx` on demand.

```bash
# Start your dev server first, then:
bash .github/skills/animated-website/scripts/lighthouse-check.sh http://localhost:3000
```

The script exits `0` (pass) or `1` (fail) — safe to use as a pre-push gate:

```bash
# In package.json scripts:
"predeploy": "npm run dev & sleep 3 && bash .github/skills/animated-website/scripts/lighthouse-check.sh"
```

**Default thresholds** (edit the variables at the top of the script to adjust):

| Metric | Threshold |
|--------|-----------|
| Performance | ≥ 95 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## 11. Mobile Optimisation Summary

```javascript
const isMobile = window.innerWidth <= 768;

const config = {
  particleCount:  isMobile ? 30  : 80,
  particleSpeed:  isMobile ? 0.3 : 0.8,
  connectionDist: isMobile ? 80  : 120,
  enableCursor:   !isMobile,
};
```

- Use `@media (hover: none)` to strip hover-only effects on touchscreens
- Avoid `backdrop-filter` on mobile (expensive on weak GPUs — test and gate with `@supports`)
- Keep total canvas draw calls under **2ms** on mobile (profile with Chrome DevTools > Performance)

---

## 12. Quick Implementation Workflow

1. **Scaffold** — Set up CSS custom properties for all theme tokens (`--bg`, `--accent`, `--surface`, `--text`, `--particle-color`, `--transition-ease`)
2. **Canvas** — Initialize with correct DPR scaling; wire `resize` listener
3. **Particles** — Build adaptive particle count, RAF loop with visibility-change pause
4. **Theme system** — Implement `body.mode-*` class toggle; read CSS vars at draw-time
5. **UI components** — Glass panels, slide modals, magnetic buttons — GPU-only transforms
6. **Accessibility** — Add `prefers-reduced-motion` guards around all animation init
7. **Mobile pass** — Reduce particle count, disable cursor, test on throttled CPU
8. **Lighthouse audit** — Defer scripts, lazy-load images, check for layout shift

---

## References

- [./references/performance.md](./references/performance.md) — Deep-dive on paint/composite pipeline
- [./references/accessibility.md](./references/accessibility.md) — WCAG 2.2 animation requirements
- [./scripts/lighthouse-check.sh](./scripts/lighthouse-check.sh) — Pre-deploy Lighthouse audit script
