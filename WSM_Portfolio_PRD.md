Part 1: The Product Requirements Document (PRD)
Project Name: "The Kinetic Architect" (William Mweemba Portfolio) Version: 1.0 Status: In Development Owner: William Mweemba

1. Executive Summary
A high-performance, dual-persona portfolio website designed to showcase William Mweemba as a "Swiss Army Knife" professional. The site uses kinetic typography and canvas physics to demonstrate frontend mastery while the content proves deep backend/infrastructure leadership.

2. User Personas
The Corporate Recruiter (CTO/VP): Looking for "Technical Stability." Wants to see the CV, certifications (Zanaco, Cisco), and leadership history.

The Creative Client: Looking for "Modern Design." Wants to see the "Mindful Hustler" brand, organic products, and digital marketing skills.

3. Core Features
The Dual Engine: A global state toggle switching between [01] Technical (Cyber Blue / Void Black) and [02] Creative (Organic Espresso / Amber Gold).

Kinetic Physics: A fluid particle system on HTML5 Canvas that reacts to mouse movement and state changes (color/velocity).

The HUD Interface: "Heads-Up Display" aesthetic with monospace typography for technical details.

Deep Dive Modals: Clicking a project item triggers a slide-out "Data File" panel with a glassmorphism backdrop, preventing page reloads (SPA feel).

Mobile Physics: Optimized particle count and interaction model for touch devices to preserve battery and frame rate.

4. Technical Constraints
Performance: Lighthouse score must be >95. Zero layout shifts (CLS).

Stack: Vanilla JavaScript (ES6+), Semantic HTML5, Modern CSS (Variables/Flex/Grid). No heavy frameworks (React/Vue) to demonstrate raw engineering capability.

Infrastructure: Dockerized Nginx container deployed via Coolify on Hetzner VPS.