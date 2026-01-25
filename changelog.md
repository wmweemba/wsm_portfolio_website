# Changelog

All notable changes to "The Kinetic Architect" portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Image Display System**: Complete modal image functionality for portfolio projects and persona photos
- **Social Media Integration**: Dynamic social links for projects and global personal social media profiles
- **Nexus Consulting Services**: Added company project to technical section with comprehensive business details
- **Enhanced Physics Engine**: Dual-persona physics behavior with velocity control and connection distance variations
- **Velocity Control**: Technical mode (1.5x fast/data stream), Creative mode (0.6x slow/floating) with instant transitions
- **Connection Distance**: Technical mode (100px tight), Creative mode (120px loose/organic) for distinct visual personalities
- **Docker Deployment**: Complete containerization with nginx.conf, Dockerfile, and .dockerignore
- **Professional README**: Comprehensive project documentation with deployment instructions
- **Modular Architecture**: Successfully refactored monolith.md into clean, modular file structure
- **index.html**: Clean HTML structure with proper external CSS and JS links
- **src/css/style.css**: Complete stylesheet extracted from monolith with all typography, layout, and responsive styles
- **src/js/physics.js**: Isolated canvas particle system with mouse interaction and mobile optimization
- **src/js/app.js**: Application logic including data management, UI interactions, and modal system
- Proper script loading with `defer` attributes for optimal performance
- **Development Environment**: Local development setup with live-server
- **package.json**: NPM configuration with dev and start scripts
- **Live Server**: Hot-reload development server on port 3000
- **.gitignore**: Proper exclusion of dependencies and system files
- **GitHub Copilot Instructions**: AI coding agent guidance for project development
- **About Me Modal**: New modal functionality displaying persona-specific background information
- **Physics Engine Integration**: Hook for physics engine to respond to theme changes
- **Professional Content**: Verified portfolio data with specific metrics, certifications, and achievements
- **Mobile Scroll Navigation**: Intelligent navigation hiding/showing based on scroll direction with smooth animations

### Changed
- **Architecture**: Converted single-file monolith to maintainable modular structure
- **Performance**: Separated concerns for better caching and debugging
- **Development**: Improved code organization following separation of concerns principle
- **Portfolio Content**: Updated data object with verified professional achievements and specific technical details
- **Navigation**: Enhanced navigation with additional About button for user engagement
- **Modal System**: Complete modal UX overhaul with glassmorphism effects, proper z-index hierarchy, and mobile optimization
- **Theme System**: Enhanced dual-persona theming with particle system integration and navigation styling
- **CSS Polish**: Added tech tag margin-bottom spacing (0.5rem) for clean mobile wrapping
- **Image Positioning**: Optimized object-fit and object-position for better subject framing in portraits and product photos

### Fixed
- **Variable Name Conflict**: Resolved critical JavaScript error where both physics.js and app.js declared global `mouseX` variables causing "Identifier already declared" syntax error
- **Custom Cursor**: Fixed cursor positioning - now follows mouse movement properly instead of being stuck in top-left
- **Theme Switching**: Creative mode now properly applies brown/amber background theme when clicked  
- **Content Rendering**: Selected Works section now displays portfolio items correctly on page load
- **DOM Element Selection**: Resolved timing issues by ensuring all elements are selected after DOM is ready
- **Event Listeners**: Fixed toggle buttons with proper initialization and error handling
- **JavaScript Initialization**: Completely rewritten initialization flow with proper DOM ready handling
- **Hover Effects**: Fixed `hoverEffect is not defined` errors by ensuring proper function scope and availability
- **Navigation/Modal Collision**: Resolved critical UX issue where navigation buttons interfered with modal close buttons
- **Mobile Modal Accessibility**: Fixed modal interaction issues on mobile devices by properly hiding navigation during modal states
- **Mobile Scroll Behavior**: Implemented smooth disappearing navigation on mobile scroll with proper state management and device rotation handling
- **CSS Syntax Errors**: Fixed orphaned CSS properties around lines 544-547 that were causing compilation errors
- **Close Button Positioning**: Enhanced modal close button with fixed positioning, glassmorphism backdrop, and proper mobile sizing

### Removed
- **monolith.md dependencies**: No longer relying on single file containing HTML, CSS, and JavaScript

---

## Project Setup - 2026-01-20

### Added
- WSM_Portfolio_PRD.md - Product Requirements Document
- Complete project folder structure
- Empty files ready for development
- This changelog to track future changes