# GitHub Copilot Instructions

## Project Overview
**"The Kinetic Architect"** is a high-performance dual-persona portfolio showcasing both technical infrastructure expertise and creative entrepreneurship. Built with vanilla JavaScript to demonstrate raw engineering capability.

## Essential Reference Files
- **`WSM_Portfolio_PRD.md`**: Complete product requirements and technical constraints
- **`monolith.md`**: Original Gemini Canvas prototype - reference for design intent and complete working code
- **`changelog.md`**: Project evolution tracking - ALWAYS update when making changes

## Architecture & Key Components

### Dual-Theme System
- **Theme Toggle**: Technical (Cyber Blue) vs Creative (Amber/Espresso) modes
- **CSS Variables**: `--bg`, `--accent`, `--particle-color` drive dynamic theming
- **State Management**: `currentMode` in `app.js` controls content switching

### Modular Structure
```
src/js/physics.js    # Canvas particle system + mouse interaction
src/js/app.js        # Data, UI logic, modal system, cursor effects
src/css/style.css    # Complete styling with CSS custom properties
index.html           # Clean markup, deferred script loading
```

### Physics Engine (`physics.js`)
- Canvas-based particle system with mouse repulsion
- **Mobile Optimization**: Reduced particle count (30 vs 80) and slower movement
- **Dynamic Colors**: Reads CSS `--particle-color` for theme-aware particles
- **Performance**: `requestAnimationFrame` loop with connection line rendering

### Content System (`app.js`)
- **Data Object**: Structured technical/creative portfolio items with `longDesc` for modals
- **Render Pipeline**: Fade transitions when switching personas (300ms delay)
- **Modal System**: Slide-out panels with glassmorphism backdrop
- **Custom Cursor**: Magnetic button effects (desktop only)

## Development Patterns

### CSS Architecture
- **CSS Custom Properties**: Theme variables in `:root` and `body.mode-creative`
- **Mobile-First**: `@media (max-width: 768px)` disables cursor effects
- **Typography**: Syncopate (headers), Manrope (body), Space Mono (mono)
- **Transitions**: `--transition-ease: cubic-bezier(0.25, 1, 0.5, 1)`

### Performance Constraints
- **Lighthouse >95**: No heavy frameworks, optimized particle counts
- **Zero CLS**: Fixed positioning and careful layout measurements
- **Vanilla JS**: ES6+ features, no build process required

### Global Function Pattern
```javascript
window.hoverEffect = function(isActive) { ... }  // For inline HTML handlers
window.openProject = function(index) { ... }    // Modal triggers
window.closeProject = function() { ... }        // Modal close
```

## Development Workflow

### Local Development
```bash
npm run dev        # Start live-server on port 3000
npm start          # Alternative start command
```

### File Modification Guidelines
- **Content Changes**: Edit `data` object in `app.js` for portfolio items
- **Theme Tweaks**: Modify CSS custom properties in `style.css`
- **Physics Adjustments**: Tune particle behavior in `physics.js`
- **Reference Only**: `monolith.md` (original design prototype - do not modify)
- **Always Update**: `changelog.md` when making any project changes

### Development History Context
- **Refactoring Journey**: Project evolved from single-file `monolith.md` to modular structure
- **Change Tracking**: All modifications documented in `changelog.md` following Keep a Changelog format
- **Design Source**: `monolith.md` contains original complete working implementation for reference

### Key Integration Points
- **Physics ↔ Theme**: Particle colors read from CSS variables dynamically
- **App ↔ Content**: Modal system populates from structured data object
- **CSS ↔ JS**: Body class toggle (`mode-creative`) triggers theme cascade

## Deployment Context
- **Target**: Dockerized Nginx on Hetzner VPS via Coolify
- **Static Files**: No build process, direct file serving
- **Assets**: `assets/` folder for images, docs, icons (future)

When modifying this codebase, maintain the performance-first vanilla approach and ensure mobile optimization remains intact.