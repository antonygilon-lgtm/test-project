/**
 * Antony Gilon's Space - Core Logic & Interactive OS
 * Built with strict secure DOM manipulation principles (zero innerHTML/outerHTML).
 */

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initTerminal();
    initSkillsFilter();
    initProjectModals();
    initTelemetrySimulator();
});

/* ==========================================================================
   1. Interactive Starfield Canvas
   ========================================================================== */
function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numStars = 140;
    const stars = [];
    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.8 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0) star.x = width;
            if (star.x > width) star.x = 0;
            if (star.y < 0) star.y = height;
            if (star.y > height) star.y = 0;

            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(248, 250, 252, ${star.alpha})`;
            ctx.fill();

            // Connect nearby stars near mouse cursor
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(mouseX, mouseY);
                const lineAlpha = (1 - dist / 130) * 0.25;
                ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. GilonOS Interactive Terminal Simulator
   ========================================================================== */
function initTerminal() {
    const screen = document.getElementById('terminal-screen');
    const input = document.getElementById('terminal-input');
    const chipsContainer = document.getElementById('command-chips');

    if (!screen || !input) return;

    // Helper: Safely append line without innerHTML
    function appendTerminalLine(text, className = 'response') {
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.textContent = text;
        screen.appendChild(line);
        screen.scrollTop = screen.scrollHeight;
    }

    // Print welcome header on load
    appendTerminalLine('GilonOS v2.6.4 (quantum-x86_64-cosmic)', 'highlight');
    appendTerminalLine('Type "help" or click a command chip below to begin exploration.', 'response');

    function handleCommand(cmdString) {
        const raw = cmdString.trim();
        if (!raw) return;

        appendTerminalLine(`antony@space:~$ ${raw}`, 'user-cmd');
        const lower = raw.toLowerCase();

        switch (lower) {
            case 'help':
                appendTerminalLine('AVAILABLE COMMANDS:', 'highlight');
                appendTerminalLine('  help      - Display this command reference manual.');
                appendTerminalLine('  bio       - View Antony Gilon\'s engineering background.');
                appendTerminalLine('  skills    - List core systems competencies & mastery metrics.');
                appendTerminalLine('  projects  - Inspect active AI & software modules.');
                appendTerminalLine('  status    - Run diagnostics on station vitals & security checks.');
                appendTerminalLine('  contact   - Retrieve secure communication coordinates.');
                appendTerminalLine('  matrix    - Initiate cosmic data stream simulation.');
                appendTerminalLine('  clear     - Clear terminal buffer.');
                break;

            case 'bio':
                appendTerminalLine('ANTONY GILON // PROFILE:', 'highlight');
                appendTerminalLine('Role: Software Engineer, Architect & Technical Innovator.');
                appendTerminalLine('Mission: Building autonomous AI systems, secure scalable pipelines, and high-fidelity web experiences.');
                appendTerminalLine('Philosophy: "Simplicity in architecture, security in code, and magic in the user interface."');
                break;

            case 'skills':
                appendTerminalLine('TECHNICAL MASTERY INDEX:', 'highlight');
                appendTerminalLine('  [+] Distributed Systems Architecture (95%)');
                appendTerminalLine('  [+] Agentic AI & Neural Orchestration (96%)');
                appendTerminalLine('  [+] Secure Web Backend & BFF Hardening (98%)');
                appendTerminalLine('  [+] Python, Go & TypeScript Server Engineering (94%)');
                appendTerminalLine('  [+] Modern Glassmorphism & UI/UX Design (92%)');
                break;

            case 'projects':
                appendTerminalLine('ACTIVE EXPEDITIONS:', 'highlight');
                appendTerminalLine('  01. Autonomous AI Agent Hub - Multi-agent orchestration framework.');
                appendTerminalLine('  02. Premium Glassmorphism Calculator - Sleek CSS/JS interactive tool.');
                appendTerminalLine('  03. SecureCoder Zero-Trust Pipeline - Automated vulnerability prevention.');
                break;

            case 'status':
                appendTerminalLine('RUNNING STATION DIAGNOSTICS...', 'highlight');
                appendTerminalLine('  [OK] Quantum Kernel Vitals: NORMAL');
                appendTerminalLine('  [OK] CSP & XSS Shielding: ACTIVE (Zero-Trust Mode)');
                appendTerminalLine('  [OK] Neural Memory Latency: 0.84ms');
                appendTerminalLine('  [OK] SSL/TLS Interstellar Encryption: ENABLED');
                break;

            case 'contact':
                appendTerminalLine('ESTABLISH COMM TRANSMISSION:', 'highlight');
                appendTerminalLine('  GitHub: https://github.com/antonygilon-lgtm');
                appendTerminalLine('  Email:  antonygilon@google.com');
                break;

            case 'clear':
                screen.replaceChildren();
                appendTerminalLine('Terminal buffer cleared.', 'response');
                break;

            case 'matrix':
                appendTerminalLine('Initiating cosmic data stream...', 'highlight');
                for (let i = 0; i < 6; i++) {
                    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    appendTerminalLine(`[STREAM ${i+1}/6] 0x${hash.toUpperCase()} -> SYNCHRONIZED`, 'response');
                }
                appendTerminalLine('Matrix simulation complete.', 'highlight');
                break;

            default:
                appendTerminalLine(`Command not recognized: "${raw}". Type "help" for valid syntax.`, 'error');
                break;
        }

        input.value = '';
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleCommand(input.value);
        }
    });

    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains('cmd-chip')) {
                const cmd = target.getAttribute('data-command');
                if (cmd) handleCommand(cmd);
            }
        });
    }
}

/* ==========================================================================
   3. Technical Radar Category Filter
   ========================================================================== */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!filterButtons.length || !skillCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCategory = btn.getAttribute('data-category');

            skillCards.forEach((card) => {
                const cardCat = card.getAttribute('data-category');
                if (targetCategory === 'all' || cardCat === targetCategory) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   4. Project Architecture Modal (Accessible & Safe DOM Manipulation)
   ========================================================================== */
function initProjectModals() {
    const modalOverlay = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const btnClose = document.getElementById('btn-close-modal');
    const btnDone = document.getElementById('btn-modal-done');
    const actionButtons = document.querySelectorAll('.btn-card-action');

    if (!modalOverlay || !modalTitle || !modalBody) return;

    const projectData = {
        '1': {
            title: 'Autonomous AI Agent Hub Specification',
            architecture: 'Multi-tiered autonomous agent architecture utilizing high-frequency WebSocket event streams, consolidated memory buffers, and secure subagent task synthesis.',
            highlights: [
                'Zero-latency real-time reactive wakeup without polling loops.',
                'Subagent isolation for specialized codebase analysis and debugging.',
                'Strict AST validation before executing dynamically synthesized tasks.'
            ]
        },
        '2': {
            title: 'Premium Glassmorphism Calculator Spec',
            architecture: 'Ultra-responsive single-page web app built with semantic HTML5, pure CSS custom variables, and vanilla JavaScript floating point math execution.',
            highlights: [
                'Curated dark mode HSL palette with glassmorphism backdrop filters.',
                'Floating micro-animations and neon accent buttons.',
                'Robust error handling and precision floating point arithmetic.'
            ]
        },
        '3': {
            title: 'SecureCoder Zero-Trust Pipeline Spec',
            architecture: 'Enterprise-grade security enforcement pipeline integrating automated vulnerability scanners, threat modeling, and strict Content Security Policy verification.',
            highlights: [
                'Zero-trust validation of all untrusted input payloads.',
                'Automated prevention of XSS, SQL Injection, and Path Traversal.',
                'Secure session hardening via HttpOnly and SameSite=Lax headers.'
            ]
        }
    };

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        modalTitle.textContent = data.title;
        
        // Safely clear and build modal body using DOM methods (ZERO innerHTML!)
        modalBody.replaceChildren();

        const pArch = document.createElement('p');
        pArch.textContent = data.architecture;
        modalBody.appendChild(pArch);

        const hHighlights = document.createElement('h4');
        hHighlights.textContent = 'Key Engineering Highlights:';
        hHighlights.style.color = '#38bdf8';
        hHighlights.style.marginTop = '12px';
        modalBody.appendChild(hHighlights);

        const ul = document.createElement('ul');
        ul.style.paddingLeft = '20px';
        ul.style.display = 'flex';
        ul.style.flexDirection = 'column';
        ul.style.gap = '8px';

        data.highlights.forEach((itemText) => {
            const li = document.createElement('li');
            li.textContent = itemText;
            ul.appendChild(li);
        });
        modalBody.appendChild(ul);

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    actionButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const pid = btn.getAttribute('data-project-id');
            if (pid) openModal(pid);
        });
    });

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnDone) btnDone.addEventListener('click', closeModal);

    // Close on background click or Esc key
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   5. Real-Time Telemetry Simulation
   ========================================================================== */
function initTelemetrySimulator() {
    const cpuVal = document.getElementById('cpu-load-val');
    const cpuBar = document.getElementById('cpu-load-bar');
    const memVal = document.getElementById('memory-pool-val');
    const memBar = document.getElementById('memory-pool-bar');
    const netVal = document.getElementById('network-flux-val');
    const netBar = document.getElementById('network-flux-bar');

    if (!cpuVal || !cpuBar) return;

    setInterval(() => {
        // Simulate minor telemetry variations
        const newCpu = Math.floor(28 + Math.random() * 20);
        cpuVal.textContent = `${newCpu}%`;
        cpuBar.style.width = `${newCpu}%`;

        const newMem = Math.floor(58 + Math.random() * 12);
        if (memVal && memBar) {
            memVal.textContent = `${newMem}%`;
            memBar.style.width = `${newMem}%`;
        }

        const newNet = (1.1 + Math.random() * 0.5).toFixed(2);
        if (netVal && netBar) {
            netVal.textContent = `${newNet} Gbps`;
            netBar.style.width = `${Math.min(100, newNet * 50)}%`;
        }
    }, 3500);
}
