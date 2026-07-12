/**
 * Antony Gilon's Space - Core Logic & GilonOS v3.0 Career Terminal
 * Built with strict secure DOM manipulation principles (zero innerHTML/outerHTML).
 * Tailored with authentic career data from Google Cloud (JAPAC) and NatWest Group.
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

    const numStars = 150;
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

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(248, 250, 252, ${star.alpha})`;
            ctx.fill();

            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(mouseX, mouseY);
                const lineAlpha = (1 - dist / 130) * 0.26;
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
   2. GilonOS v3.0 Interactive Career Terminal
   ========================================================================== */
function initTerminal() {
    const screen = document.getElementById('terminal-screen');
    const input = document.getElementById('terminal-input');
    const chipsContainer = document.getElementById('command-chips');

    if (!screen || !input) return;

    // Safely append line without innerHTML
    function appendTerminalLine(text, className = 'response') {
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.textContent = text;
        screen.appendChild(line);
        screen.scrollTop = screen.scrollHeight;
    }

    // Print welcome header on load
    appendTerminalLine('GilonOS v3.0.0 (google-cloud-kernel-japac) initialized.', 'highlight');
    appendTerminalLine('Welcome! Type "help" or click a command chip below to explore my career experience.', 'response');

    function handleCommand(cmdString) {
        const raw = cmdString.trim();
        if (!raw) return;

        appendTerminalLine(`antony@google-cloud:~$ ${raw}`, 'user-cmd');
        const lower = raw.toLowerCase();

        switch (lower) {
            case 'help':
                appendTerminalLine('AVAILABLE SYSTEM COMMANDS:', 'highlight');
                appendTerminalLine('  help        - Display this command reference manual.');
                appendTerminalLine('  google      - View my role as Strategic Cloud Engineer @ Google Cloud (JAPAC).');
                appendTerminalLine('  natwest     - View achievements as Java Backend Engineer @ NatWest Group.');
                appendTerminalLine('  ai-gateway  - Inspect my AI Gateway & Model Armor security architecture.');
                appendTerminalLine('  mcp         - Explore Model Context Protocol (MCP) servers & agentic workflows.');
                appendTerminalLine('  awards      - Output Google Peer Bonuses & NatWest LOV Awards.');
                appendTerminalLine('  cert        - Show Google Cloud Certifications & Anna University Education.');
                appendTerminalLine('  matrix      - Initiate high-throughput AI telemetry simulation.');
                appendTerminalLine('  clear       - Clear terminal buffer.');
                break;

            case 'google':
                appendTerminalLine('GOOGLE CLOUD // STRATEGIC CLOUD ENGINEER (08/2025 - PRESENT):', 'highlight');
                appendTerminalLine('Location: Bangalore, India | Team: Global Services Delivery (JAPAC)');
                appendTerminalLine('Role Profile: Customer & Partner Technical Solutions Engineer specializing in API Management & AI Gateways.');
                appendTerminalLine('  [+] SGX (Cloud Architect): Built async Cloud Run + BigQuery compose pipeline tree-merging GCS shards; 10 App Integration flows & 10 Apigee proxies; automated Terraform IaC.');
                appendTerminalLine('  [+] GPN (AI Gateway Architect): Semantic caching cutting upstream API costs; standalone MCP servers for agent-to-tool comms; custom JS safety policies within Apigee extending Model Armor.');
                appendTerminalLine('  [+] Prudential (AI Gateway Architect): Multi-tenant perimeter for enterprise LLM traffic; specialized Apigee proxies for MCP tools; Sensitive Data Protection (SDP) PII redaction; out-of-the-box Model Armor prompt sanitization.');
                break;

            case 'natwest':
                appendTerminalLine('NATWEST GROUP // JAVA BACKEND SOFTWARE ENGINEER (07/2021 - 2025):', 'highlight');
                appendTerminalLine('Location: Chennai, India');
                appendTerminalLine('  [+] Automated report generation with Spring Scheduler & multithreading, reducing manual effort by 2-3 days.');
                appendTerminalLine('  [+] Built REST endpoints using Spring Boot deployed on AWS EKS & EC2 with MongoDB aggregation scripts.');
                appendTerminalLine('  [+] Developed Customer Verification API with 100% JUnit test coverage and onboarded 10+ APIs to Apigee.');
                appendTerminalLine('  [+] Built Google Custom Search microservice (< 300ms latency) and generic OpenAI chatbot endpoint.');
                appendTerminalLine('  [+] Automated migration of over 250 project repositories from Bitbucket to GitLab.');
                appendTerminalLine('  [+] Upgraded systems to remediate critical vulnerabilities (Log4j) & resolved PROD incidents.');
                break;

            case 'ai-gateway':
                appendTerminalLine('ENTERPRISE AI GATEWAY ARCHITECTURE BLUEPRINT:', 'highlight');
                appendTerminalLine('  1. Ingress Layer: Apigee API Gateway enforcing OAuth 2.0, mTLS, and rate-limiting.');
                appendTerminalLine('  2. Data Privacy: Google Cloud SDP automatically detecting and redacting PII before LLM dispatch.');
                appendTerminalLine('  3. Prompt Security: Model Armor out-of-the-box and custom JS policies blocking prompt injections.');
                appendTerminalLine('  4. Performance: Semantic caching catching high-intent queries, slashing latency and upstream costs.');
                break;

            case 'mcp':
                appendTerminalLine('MODEL CONTEXT PROTOCOL (MCP) & AGENTIC ORCHESTRATION:', 'highlight');
                appendTerminalLine('  [+] Developed custom, standalone MCP servers to execute autonomous agent-to-tool & agent-to-agent communication patterns.');
                appendTerminalLine('  [+] Built specialized Apigee proxies to securely expose, throttle, and govern MCP tools for client applications.');
                appendTerminalLine('  [+] Designed gateway governance with real-time token rate-limiting, dynamic routing, and payload logging.');
                break;

            case 'awards':
                appendTerminalLine('HONORS, PEER BONUSES & RECOGNITION:', 'highlight');
                appendTerminalLine('  [+] Google Peer Bonus (Cohort 1): Instructor for Agent Cloud Upskilling Program, sharing technical expertise.');
                appendTerminalLine('  [+] Google Peer Bonus (Owner): Created Apigee internal guides & demonstrations (Hybrid Guide, Model Armor Guide).');
                appendTerminalLine('  [+] 5x Living Our Values (LOV) Awards at NatWest Group for excellence in project deliverables and reliability.');
                break;

            case 'cert':
                appendTerminalLine('CERTIFICATIONS & ACADEMIC BACKGROUND:', 'highlight');
                appendTerminalLine('  [+] Certification: Google Cloud Certified, Professional Cloud Architect');
                appendTerminalLine('  [+] Education: B.Tech in Information Technology from Anna University (08/2017 - 06/2021) | Overall GPA: 8.91 / 10.00');
                break;

            case 'clear':
                screen.replaceChildren();
                appendTerminalLine('Terminal buffer cleared.', 'response');
                break;

            case 'matrix':
                appendTerminalLine('Synchronizing global AI Gateway data streams...', 'highlight');
                for (let i = 0; i < 6; i++) {
                    const hash = Math.random().toString(16).substring(2, 10).toUpperCase();
                    const latency = (Math.random() * 15 + 5).toFixed(1);
                    appendTerminalLine(`[STREAM-${i+1}] APIGEE_SHARD_0x${hash} -> PII_REDACTED -> MODEL_ARMOR_PASS (${latency}ms)`, 'response');
                }
                appendTerminalLine('Stream synchronization complete.', 'highlight');
                break;

            default:
                appendTerminalLine(`Command not recognized: "${raw}". Type "help" to view available career commands.`, 'error');
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
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCategory = btn.getAttribute('data-category');

            skillCards.forEach((card) => {
                const cardCat = card.getAttribute('data-category');
                if (targetCategory === 'all' || cardCat === targetCategory) {
                    card.style.display = 'flex';
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
   4. Project Architecture Modal (Safe DOM Manipulation)
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
            title: 'Enterprise AI Gateways Specification (Prudential & GPN)',
            architecture: 'Strategic AI Gateway architecture built on Google Cloud Apigee, providing a secure, multi-tenant governance layer for all enterprise LLM communications and Model Context Protocol (MCP) agents.',
            highlights: [
                'Sensitive Data Protection (SDP): Automatically inspects and redacts Personally Identifiable Information (PII) at the gateway before reaching external LLM providers.',
                'Model Armor Integration: Out-of-the-box and custom JavaScript Apigee policies block prompt injections, jailbreaks, and enforce content safety boundaries.',
                'Semantic Caching: High-intent query deduplication drastically reduces upstream LLM token costs and cuts response latencies.',
                'MCP Governance: Specialized proxies securely expose, manage, and throttle Model Context Protocol servers for autonomous agent-to-tool interactions.'
            ]
        },
        '2': {
            title: 'Async Tree-Merge Data Pipeline Spec (SGX)',
            architecture: 'High-performance asynchronous data pipeline utilizing Google Cloud Run and BigQuery compose to orchestrate parallel tree-merging of Google Cloud Storage (GCS) shards for massive-scale exports.',
            highlights: [
                'Parallel Shard Processing: Tree-merging algorithm enables rapid consolidation of high-volume data exports without memory bottlenecks.',
                'Application Integration & Apigee: Designed and deployed 10 integration flows and 10 Apigee proxies automating intraday and historical signed URL generation.',
                'Infrastructure as Code (IaC): Authored comprehensive Terraform scripts to provision secure authentication profiles, client credentials, and Cloud Run authentication.',
                'Onsite Technical Leadership: Authored Technical Design Document (TDD) and led onsite deployment fast-track in Singapore.'
            ]
        },
        '3': {
            title: 'Banking Microservices & Repo Automation Spec (NatWest)',
            architecture: 'Enterprise Java backend architecture spanning AWS EKS and EC2 nodes, leveraging Spring Boot, Spring Scheduler, multithreading, and MongoDB aggregations.',
            highlights: [
                'Automated Report Generation: Java multithreading and database locking prevented duplicates and reduced 2-3 days of manual effort.',
                'Customer Verification API: Streamlined verification with 100% JUnit test coverage and secure Apigee API Gateway onboarding across 10+ APIs.',
                'High-Speed Search & Chatbot: Google Custom Search microservice achieving < 300ms average response and generic OpenAI chatbot integration.',
                'DevOps & Security Remediation: Automated migration of 250+ project repositories from Bitbucket to GitLab and upgraded systems against Log4j vulnerabilities.'
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
        hHighlights.textContent = 'Technical Implementation Details:';
        hHighlights.style.color = '#38bdf8';
        hHighlights.style.marginTop = '14px';
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
    const cacheVal = document.getElementById('cache-hit-val');
    const cacheBar = document.getElementById('cache-hit-bar');
    const threatVal = document.getElementById('threat-shield-val');
    const threatBar = document.getElementById('threat-shield-bar');
    const latencyVal = document.getElementById('gateway-latency-val');
    const latencyBar = document.getElementById('gateway-latency-bar');

    if (!cacheVal || !cacheBar) return;

    setInterval(() => {
        const newCache = Math.floor(82 + Math.random() * 12);
        cacheVal.textContent = `${newCache}%`;
        cacheBar.style.width = `${newCache}%`;

        const newThreat = (99.95 + Math.random() * 0.04).toFixed(2);
        if (threatVal && threatBar) {
            threatVal.textContent = `${newThreat}%`;
            threatBar.style.width = `100%`;
        }

        const newLatency = (12 + Math.random() * 6).toFixed(1);
        if (latencyVal && latencyBar) {
            latencyVal.textContent = `${newLatency} ms`;
            latencyBar.style.width = `${Math.min(100, newLatency * 2.5)}%`;
        }
    }, 3500);
}
