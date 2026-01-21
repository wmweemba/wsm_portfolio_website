# Changelog

All notable changes to "The Kinetic Architect" portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Changed
- **Architecture**: Converted single-file monolith to maintainable modular structure
- **Performance**: Separated concerns for better caching and debugging
- **Development**: Improved code organization following separation of concerns principle

### Fixed
- **Variable Name Conflict**: Resolved critical JavaScript error where both physics.js and app.js declared global `mouseX` variables causing "Identifier already declared" syntax error
- **Custom Cursor**: Fixed cursor positioning - now follows mouse movement properly instead of being stuck in top-left
- **Theme Switching**: Creative mode now properly applies brown/amber background theme when clicked  
- **Content Rendering**: Selected Works section now displays portfolio items correctly on page load
- **DOM Element Selection**: Resolved timing issues by ensuring all elements are selected after DOM is ready
- **Event Listeners**: Fixed toggle buttons with proper initialization and error handling
- **JavaScript Initialization**: Completely rewritten initialization flow with proper DOM ready handling
- **Hover Effects**: Fixed `hoverEffect is not defined` errors by ensuring proper function scope and availability

### Removed
- **monolith.md dependencies**: No longer relying on single file containing HTML, CSS, and JavaScript

---

## Project Setup - 2026-01-20

### Added
- WSM_Portfolio_PRD.md - Product Requirements Document
- Complete project folder structure
- Empty files ready for development
- This changelog to track future changes