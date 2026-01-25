# The Kinetic Architect

> A high-performance dual-persona portfolio showcasing technical infrastructure expertise and creative entrepreneurship.

## Project Overview

"The Kinetic Architect" is William Mweemba's professional portfolio demonstrating mastery of both backend infrastructure leadership and frontend engineering. The site features a unique dual-persona system that toggles between **Technical** (Cyber Blue/Void Black) and **Creative** (Organic Espresso/Amber Gold) modes, each with distinct content, physics behavior, and visual aesthetics.

## Architecture

This portfolio is built using a **No-Framework Vanilla JavaScript** approach to demonstrate raw engineering capability:

- **Frontend**: Pure ES6+ JavaScript, Modern CSS with Custom Properties, Semantic HTML5
- **Physics Engine**: HTML5 Canvas particle system with mouse interaction and dual-persona behaviors
- **Performance**: Lighthouse >95 score target, Zero Cumulative Layout Shift (CLS)
- **Theming**: CSS Variables drive dynamic color switching and physics parameters
- **Mobile Optimization**: Reduced particle counts and touch-optimized interactions

### Key Components
```
src/js/physics.js    # Canvas particle system + mouse interaction
src/js/app.js        # Data, UI logic, modal system, cursor effects  
src/css/style.css    # Complete styling with CSS custom properties
index.html           # Clean markup, deferred script loading
```

## Local Development

Start the development server with live-reload:

```bash
npm install
npm start
```

The site will be available at `http://127.0.0.1:3000` with automatic browser refresh on file changes.

## Docker Build

Build the production-ready Docker image:

```bash
docker build -t kinetic-portfolio .
```

Test the container locally:

```bash
docker run -p 80:80 kinetic-portfolio
```

The Dockerfile uses `nginx:alpine` with optimized caching headers and Gzip compression for maximum performance.

## Deployment

### Coolify (Recommended)
1. Connect your GitHub repository to Coolify
2. Select **Dockerfile** as the build method
3. Set the exposed port to **80**
4. Deploy to your Hetzner VPS

The included `nginx.conf` provides:
- Aggressive asset caching (1-year for `/src/` files)
- Gzip compression for text files
- Security headers and SPA routing support

## Credits

**Dual-Persona Concept**: The innovative dual-mode system was designed to showcase the modern professional's need to be a "Swiss Army Knife" - equally capable in technical precision and creative storytelling.

**Philosophy**: Bridging the gap between rigid infrastructure expertise and organic entrepreneurial vision.

---

**Built with ❤️ by William Mweemba**  
*Frontend Architect & ICT Lead*