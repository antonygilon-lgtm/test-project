# 🚀 Welcome to Antony Gilon's Space

A state-of-the-art, visually captivating digital dimension showcasing advanced software engineering, AI orchestration, and futuristic web design. Built with zero-trust secure coding practices, glassmorphism aesthetics, and responsive micro-animations.

🌐 **Live at Custom Domain**: [https://antonygilon.com](https://antonygilon.com) (Fallback: [https://antonygilon-lgtm.github.io/test-project/](https://antonygilon-lgtm.github.io/test-project/))

---

## ✨ Key Features & Architecture

### 1. 🌌 Interactive Starfield & Constellation Canvas
- Dynamic HTML5 Canvas rendering 140+ drifting celestial particles (`requestAnimationFrame` 60fps).
- Responsive constellation line synthesis when hovering near stars.
- Ambient floating neon background orbs (`#38bdf8`, `#a78bfa`, `#f472b6`) with CSS `filter: blur(120px)`.

### 2. 💻 GilonOS Command Center (Terminal Simulator)
- An interactive developer terminal simulating a quantum engineering OS (`GilonOS v2.6.4`).
- Support for safe commands: `help`, `bio`, `skills`, `projects`, `status`, `contact`, `clear`, and `matrix`.
- Quick-command interactive chips for instant execution.
- **Strictly Secure DOM Generation**: Built without a single `innerHTML` or `outerHTML` call. All terminal lines are dynamically created via `document.createElement()` and `textContent` to prevent XSS vulnerabilities.

### 3. 🎯 Technical Radar & Mastery Matrix
- Multi-tiered categorization (`Core Engineering`, `AI & Agentic Systems`, `Cloud & Security`, `Modern UI/UX`).
- Smooth category filtering tabs with animated opacity/transform transitions.
- Visual mastery progress bars with custom gradients.

### 4. 🛰️ Real-Time Station Telemetry Simulator
- Simulated live station diagnostics: CPU Core Load, Neural Memory Pool, and Cosmic Network Flux.
- Periodic telemetry updates reflecting active computational state.

### 5. 🛡️ Enterprise-Grade Frontend Hardening
- **Framework-Native & Safe Vanilla JS**: Fully protected against XSS injection by eliminating unsafe DOM APIs.
- **Accessible Custom Modals**: Replaces native browser `alert()` and `confirm()` dialogues with responsive, keyboard-accessible (`Escape` key, focus trapped) glassmorphism modals.
- **Content Security Policy Ready**: Clean separation of structure (`HTML`), presentation (`Vanilla CSS3`), and logic (`Vanilla JS`).

---

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) with unique element IDs.
- **Styling**: Vanilla CSS3 (Custom properties, `backdrop-filter: blur(20px)`, responsive Grid & Flexbox, Google Fonts `Outfit` & `Space Grotesk`).
- **Logic**: Pure Vanilla JavaScript (`ES6+`, Canvas 2D Context, Safe DOM APIs).

---

## 📦 Local Deployment & Testing

To test the application locally, start any simple HTTP server in the repository root (e.g. Ruby, Python, or Node):

```bash
# Python 3
python3 -m http.server 8080

# Ruby
ruby -run -e httpd . -p 8080
```

Then open your browser and navigate to `http://localhost:8080`.

---

## ⚡ GitHub Pages Automatic Deployment

This repository is configured to deploy automatically via GitHub Pages:
1. Pushes to `main` branch trigger continuous integration and deployment.
2. The `gh-pages` branch is synchronized for maximum compatibility with both branch-based and Actions-based GitHub Pages configurations.
3. Access your space instantly at `https://antonygilon-lgtm.github.io/test-project/`.
