/* =============================================
   WORLDVIEW MONITOR — NEW MODULES  v2.0
   modules.js  (depends on data.js + app.js)
   ============================================= */
'use strict';

// ── SUBMARINES DATA ───────────────────────────────────────────────────────────
const SUBMARINES_DATA = [
    { name: 'USS Connecticut (SSN-22)', cls: 'Seawolf', country: '🇺🇸 USA', lat: 35.0, lng: -140.0, depth: 350, speed: 25, status: 'Patrol', mission: 'Strike' },
    { name: 'USS Missouri (SSN-780)', cls: 'Virginia', country: '🇺🇸 USA', lat: -20.0, lng: -30.0, depth: 280, speed: 28, status: 'Patrol', mission: 'ISR' },
    { name: 'HMS Astute (S119)', cls: 'Astute', country: '🇬🇧 UK', lat: 62.0, lng: -15.0, depth: 300, speed: 29, status: 'Patrol', mission: 'SSBN Escort' },
    { name: 'K-560 Severodinsk', cls: 'Yasen-M', country: '🇷🇺 Russia', lat: 72.0, lng: 30.0, depth: 400, speed: 31, status: 'Exercise', mission: 'Anti-Carrier' },
    { name: 'Le Téméraire (S617)', cls: 'Triomphant', country: '🇫🇷 France', lat: 48.0, lng: -20.0, depth: 350, speed: 25, status: 'Deterrent Patrol', mission: 'Nuclear' },
    { name: 'INS Arihant (S2)', cls: 'Arihant', country: '🇮🇳 India', lat: 12.0, lng: 80.0, depth: 200, speed: 24, status: 'Patrol', mission: 'SSBN' },
    { name: 'Type 094 Jin-class #3', cls: 'Type 094', country: '🇨🇳 China', lat: 22.0, lng: 120.0, depth: 300, speed: 22, status: 'Patrol', mission: 'SSBN' },
    { name: 'DPRK Romeo-class #8', cls: 'Romeo', country: '🇰🇵 N. Korea', lat: 38.5, lng: 128.0, depth: 100, speed: 13, status: 'Near-shore', mission: 'Recon' },
];

// ── SHIPS DATA ────────────────────────────────────────────────────────────────
function generateShips() {
    const cargo = [
        { name: 'MSC OSCAR', mmsi: '636016432', flag: '🇵🇦', lat: 36.0, lng: -6.0, speed: 18, heading: 270, draught: 16.0, dest: 'Rotterdam', eta: '2d 14h', type: 'cargo' },
        { name: 'EVER GIVEN', mmsi: '353136000', flag: '🇵🇦', lat: 29.9, lng: 32.5, speed: 12, heading: 315, draught: 14.5, dest: 'Port Said', eta: '6h', type: 'cargo' },
        { name: 'CMA CGM MARCO POLO', mmsi: '228337000', flag: '🇫🇷', lat: 22.0, lng: 114.0, speed: 19, heading: 90, draught: 15.8, dest: 'Yantian', eta: '1d 8h', type: 'cargo' },
        { name: 'MAERSK EMMA', mmsi: '218165000', flag: '🇩🇰', lat: -10.0, lng: 40.0, speed: 17, heading: 200, draught: 15.2, dest: 'Durban', eta: '3d', type: 'cargo' },
        { name: 'CSCL GLOBE', mmsi: '477008500', flag: '🇨🇳', lat: 35.0, lng: 130.0, speed: 20, heading: 60, draught: 16.0, dest: 'Busan', eta: '18h', type: 'cargo' },
    ];
    const tanker = [
        { name: 'HIMALAYA', mmsi: '477304200', flag: '🇭🇰', lat: 26.0, lng: 56.0, speed: 14, heading: 180, draught: 21.0, dest: 'Fujairah', eta: '12h', type: 'tanker' },
        { name: 'TI EUROPE', mmsi: '205230000', flag: '🇧🇪', lat: -34.0, lng: 18.0, speed: 13, heading: 270, draught: 22.0, dest: 'Saldanha Bay', eta: '6h', type: 'tanker' },
        { name: 'PACIFIC EMERALD', mmsi: '636092540', flag: '🇵🇦', lat: 15.0, lng: 60.0, speed: 15, heading: 270, draught: 18.5, dest: 'Oman', eta: '2d', type: 'tanker' },
        { name: 'NORDIC LUNA', mmsi: '219022000', flag: '🇩🇰', lat: 60.0, lng: 5.0, speed: 12, heading: 0, draught: 14.0, dest: 'Stavanger', eta: '8h', type: 'tanker' },
    ];
    const warship = [
        { name: 'USS Gerald R. Ford (CVN-78)', mmsi: '338234631', flag: '🇺🇸', lat: 36.0, lng: -14.0, speed: 28, heading: 90, draught: 11.3, dest: 'Med Sea', eta: 'Classified', type: 'warship' },
        { name: 'HMS Queen Elizabeth (R08)', mmsi: '232003819', flag: '🇬🇧', lat: 55.0, lng: -3.0, speed: 25, heading: 180, draught: 11.0, dest: 'FOST Exercise', eta: '3d', type: 'warship' },
        { name: 'PLA Liaoning (CV-16)', mmsi: '413911000', flag: '🇨🇳', lat: 22.0, lng: 122.0, speed: 22, heading: 90, draught: 10.5, dest: 'Pacific Ex.', eta: 'Unknown', type: 'warship' },
        { name: 'INS Vikrant (R11)', mmsi: '419000001', flag: '🇮🇳', lat: 15.0, lng: 74.0, speed: 18, heading: 270, draught: 8.4, dest: 'Arabian Sea', eta: '2d', type: 'warship' },
    ];
    const cruise = [
        { name: 'Wonder of the Seas', mmsi: '311000238', flag: '🇧🇸', lat: 25.7, lng: -80.1, speed: 22, heading: 270, draught: 9.3, dest: 'Nassau', eta: '14h', type: 'cruise' },
        { name: 'MSC World Europa', mmsi: '255806260', flag: '🇵🇹', lat: 25.2, lng: 55.2, speed: 20, heading: 90, draught: 9.2, dest: 'Dubai', eta: '2h', type: 'cruise' },
        { name: 'Resilient Lady', mmsi: '319174900', flag: '🇰🇾', lat: 14.0, lng: -61.0, speed: 18, heading: 0, draught: 8.8, dest: 'Bridgetown', eta: '1d', type: 'cruise' },
    ];
    return [...cargo, ...tanker, ...warship, ...cruise];
}

STATE.ships = generateShips();

function renderShips(type) {
    const grid = document.getElementById('shipGrid'); if (!grid) return;
    const all = generateShips();
    const filtered = all.filter(s => s.type === type);
    const emojis = { cargo: '🚢', tanker: '🛢️', warship: '⚓', cruise: '🛳️' };
    grid.innerHTML = filtered.map((s, i) => `
    <div class="ship-card" style="animation-delay:${i * 0.06}s" onclick="panTo(${s.lat},${s.lng})">
      <div class="ship-icon ${type}">${emojis[type] || '🚢'}</div>
      <div class="ship-info">
        <div class="ship-name">${s.name}</div>
        <div class="ship-mmsi">${s.flag} MMSI: ${s.mmsi}</div>
        <div class="ship-stats">
          <span class="ship-stat"><strong>${s.speed}</strong> kn</span>
          <span class="ship-stat"><strong>${s.heading}°</strong> heading</span>
          <span class="ship-stat">Draught <strong>${s.draught}m</strong></span>
        </div>
        <div class="ship-route-badge">→ ${s.dest} · ETA ${s.eta}</div>
      </div>
    </div>`).join('');
    // tab listeners
    document.querySelectorAll('.stab').forEach(b => {
        b.onclick = () => { document.querySelectorAll('.stab').forEach(x => x.classList.remove('active')); b.classList.add('active'); STATE.currentShipType = b.dataset.stype; renderShips(b.dataset.stype); };
    });
}

// ── SUBMARINES PANEL ──────────────────────────────────────────────────────────
function renderSubmarines() {
    const grid = document.getElementById('subGrid'); if (!grid) return;
    grid.innerHTML = SUBMARINES_DATA.map((s, i) => `
    <div class="sub-card" style="animation-delay:${i * 0.08}s" onclick="panTo(${s.lat},${s.lng})">
      <span class="sub-classified">CLASSIFIED</span>
      <div class="sub-top">
        <div class="sub-icon">🔱</div>
        <div><div class="sub-name">${s.name}</div><div class="sub-class">${s.cls}-class · ${s.country}</div></div>
      </div>
      <div class="sub-stats">
        <div class="sub-stat"><div class="sub-stat-label">Depth</div><div class="sub-stat-val">${s.depth} m</div></div>
        <div class="sub-stat"><div class="sub-stat-label">Speed</div><div class="sub-stat-val">${s.speed} kn</div></div>
        <div class="sub-stat"><div class="sub-stat-label">Status</div><div class="sub-stat-val">${s.status}</div></div>
        <div class="sub-stat"><div class="sub-stat-label">Mission</div><div class="sub-stat-val">${s.mission}</div></div>
      </div>
      <div class="sub-ping"><div class="sub-ping-wave"></div><span>SONAR ACTIVE — TRACKING</span></div>
    </div>`).join('');
}

// ── MISSILES PANEL ────────────────────────────────────────────────────────────
function renderMissiles() {
    const grid = document.getElementById('missileGrid'); if (!grid) return;
    // Animate progress values
    MISSILES.forEach(m => { m.progress = Math.floor(Math.random() * 90) + 5; });
    grid.innerHTML = MISSILES.map((m, i) => `
    <div class="missile-card" style="animation-delay:${i * 0.07}s">
      <div class="mc-top">
        <div><span style="font-size:22px">${m.country}</span> <span class="mc-name">${m.name}</span></div>
        <span class="mc-type">${m.type}</span>
      </div>
      <div class="mc-stats">
        <div class="mc-stat"><div class="mc-stat-label">Origin</div><div class="mc-stat-val">${m.origin}</div></div>
        <div class="mc-stat"><div class="mc-stat-label">Range</div><div class="mc-stat-val">${m.range}</div></div>
        <div class="mc-stat"><div class="mc-stat-label">Speed</div><div class="mc-stat-val">${m.speed}</div></div>
        <div class="mc-stat"><div class="mc-stat-label">Warhead</div><div class="mc-stat-val" style="font-size:10px">${m.warhead}</div></div>
      </div>
      <div class="mc-progress"><div class="mc-progress-fill" style="width:${m.progress}%"></div></div>
      <span class="mc-status-badge ${m.status}">${m.status.toUpperCase()}</span>
    </div>`).join('');
}

// ── MILITARY PANEL ────────────────────────────────────────────────────────────
function renderMilitary(type) {
    const grid = document.getElementById('militaryGrid'); if (!grid) return;
    let data, icon, cls;
    if (type === 'army') { data = ARMY_BASES; icon = '🪖'; cls = 'army'; }
    else if (type === 'airbase') { data = AIR_BASES.map(b => ({ ...b, tags: b.aircraft, personnel: b.personnel, strength: b.strength })); icon = '✈️'; cls = 'air'; }
    else { data = NAVAL_BASES.map(b => ({ ...b, tags: b.tags, personnel: b.personnel, strength: b.strength })); icon = '⚓'; cls = 'naval'; }
    grid.innerHTML = data.map((b, i) => `
    <div class="military-card" style="animation-delay:${i * 0.05}s" onclick="panTo(${b.lat},${b.lng})">
      <div class="mil-icon ${cls}">${icon}</div>
      <div class="mil-info">
        <div class="mil-name">${b.name}</div>
        <div class="mil-loc">📍 ${b.location}</div>
        <div class="mil-tags">${(b.tags || []).map(t => `<span class="mil-tag">${t}</span>`).join('')}</div>
        <div class="mil-strength">
          <span>Readiness:</span>
          <div class="mil-str-bar"><div class="mil-str-fill" style="width:${b.strength}%"></div></div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:10px">${b.strength}%</span>
        </div>
        ${b.personnel > 0 ? `<div style="font-size:10px;color:var(--text-dim);margin-top:4px">👥 ${b.personnel.toLocaleString()} personnel</div>` : '<div style="font-size:10px;color:#60a5fa;margin-top:4px">🔒 CLASSIFIED</div>'}
      </div>
    </div>`).join('');
    // tab listeners
    document.querySelectorAll('.mtab').forEach(b => {
        b.onclick = () => { document.querySelectorAll('.mtab').forEach(x => x.classList.remove('active')); b.classList.add('active'); renderMilitary(b.dataset.mtype); };
    });
}

// ── SATELLITE CANVAS ──────────────────────────────────────────────────────────
let satAnimId = null;
const SAT_ORBS = [];

function startSatelliteCanvas() {
    const canvas = document.getElementById('satCanvas'); if (!canvas) return;
    if (satAnimId) cancelAnimationFrame(satAnimId);
    const W = canvas.width = canvas.offsetWidth || 700;
    const H = canvas.height = canvas.offsetHeight || 480;
    const cx = W / 2, cy = H / 2;
    // Build orbiting objects from data
    const orbData = SATELLITES.map((s, i) => {
        const orbitR = s.type === 'geo' ? Math.min(cx, cy) * 0.88 : s.type === 'meo' ? Math.min(cx, cy) * 0.65 : Math.min(cx, cy) * (0.3 + i * 0.02);
        return { ...s, r: Math.max(80, Math.min(orbitR, Math.min(cx, cy) * 0.88)), angle: Math.random() * Math.PI * 2, speed: (s.type === 'geo' ? 0.0002 : s.type === 'meo' ? 0.0008 : 0.002 + Math.random() * 0.003), col: s.type === 'geo' ? '#22d3ee' : s.type === 'meo' ? '#f59e0b' : s.type === 'spy' ? '#ef4444' : '#a78bfa' };
    });
    const draw = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);
        // Earth
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
        grad.addColorStop(0, '#1e3a5f'); grad.addColorStop(0.7, '#0f2540'); grad.addColorStop(1, '#060e1a');
        ctx.beginPath(); ctx.arc(cx, cy, 70, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = 'rgba(34,211,238,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
        // Orbit rings
        const rings = [80, 130, 185, 240];
        rings.forEach(r => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(59,130,246,0.08)'; ctx.lineWidth = 1; ctx.stroke(); });
        // Draw each satellite
        orbData.forEach(s => {
            s.angle += s.speed;
            const x = cx + Math.cos(s.angle) * s.r, y = cy + Math.sin(s.angle) * s.r * 0.45;
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fillStyle = s.col; ctx.fill();
            ctx.shadowBlur = 8; ctx.shadowColor = s.col; ctx.fill(); ctx.shadowBlur = 0;
            if (s.r > 100) {
                ctx.font = '9px Outfit'; ctx.fillStyle = 'rgba(148,163,184,0.7)'; ctx.fillText(s.name, x + 5, y - 4);
            }
        });
        satAnimId = requestAnimationFrame(draw);
    };
    draw();
    // Render list
    const list = document.getElementById('satList'); if (!list) return;
    list.innerHTML = SATELLITES.map((s, i) => `
    <div class="sat-item" style="animation-delay:${i * 0.04}s">
      <div class="sat-item-top">
        <span class="sat-name">${s.name}</span>
        <span class="sat-type-badge ${s.purpose === 'Recon' || s.purpose === 'SIGINT' ? 'spy' : s.type}">${s.type.toUpperCase()}</span>
      </div>
      <div class="sat-info">
        <span>${s.altitude} km</span>
        <span>${s.period} min orbit</span>
        <span>${s.purpose}</span>
        <span>${s.country}</span>
      </div>
    </div>`).join('');
}

// ── CYBER GLOBE CANVAS ────────────────────────────────────────────────────────
const cyberSources = [
    { c: 'China', x: 0.73, y: 0.33, flag: '🇨🇳', cnt: 0, col: '#ef4444' },
    { c: 'Russia', x: 0.60, y: 0.25, flag: '🇷🇺', cnt: 0, col: '#f59e0b' },
    { c: 'North Korea', x: 0.79, y: 0.31, flag: '🇰🇵', cnt: 0, col: '#f87171' },
    { c: 'Iran', x: 0.60, y: 0.37, flag: '🇮🇷', cnt: 0, col: '#fb923c' },
    { c: 'Anonymous', x: 0.30, y: 0.50, flag: '🏴', cnt: 0, col: '#a78bfa' },
    { c: 'Unknown', x: 0.50, y: 0.60, flag: '❓', cnt: 0, col: '#94a3b8' },
];
const cyberTargets = [
    { c: 'USA', x: 0.18, y: 0.30 }, { c: 'UK', x: 0.46, y: 0.26 }, { c: 'Germany', x: 0.50, y: 0.27 },
    { c: 'Ukraine', x: 0.55, y: 0.28 }, { c: 'Israel', x: 0.57, y: 0.37 }, { c: 'Taiwan', x: 0.78, y: 0.38 },
    { c: 'Japan', x: 0.80, y: 0.31 }, { c: 'Australia', x: 0.82, y: 0.66 },
];
const cyberTypes = [
    { t: 'Ransomware', pct: 32, col: '#ef4444' }, { t: 'DDoS', pct: 28, col: '#f59e0b' },
    { t: 'Phishing / APT', pct: 20, col: '#fb923c' }, { t: 'Data Exfiltration', pct: 12, col: '#a78bfa' },
    { t: 'Zero-Day Exploit', pct: 8, col: '#22d3ee' },
];
let cyberGlobeArcs = [];
let cyberGlobeId = null;

function initCyberModule() {
    setInterval(() => {
        STATE.attacksToday += Math.floor(Math.random() * 200) + 50;
        STATE.cyberPerSec = Math.floor(Math.random() * 200) + 60;
        cyberSources.forEach(s => s.cnt += Math.floor(Math.random() * 500) + 100);
        updateCyberStats();
    }, 2000);
    renderCyberList();
    renderCyberFeed();
    setInterval(renderCyberFeed, 4000);
}

function startCyberGlobe() {
    const canvas = document.getElementById('cyberGlobe'); if (!canvas) return;
    if (cyberGlobeId) cancelAnimationFrame(cyberGlobeId);
    const W = canvas.width = canvas.offsetWidth || 700;
    const H = canvas.height = canvas.offsetHeight || 520;
    updateCyberStats();

    const spawnArc = () => {
        const src = cyberSources[Math.floor(Math.random() * cyberSources.length)];
        const dst = cyberTargets[Math.floor(Math.random() * cyberTargets.length)];
        cyberGlobeArcs.push({ x1: src.x * W, y1: src.y * H, x2: dst.x * W, y2: dst.y * H, prog: 0, speed: 0.008 + Math.random() * 0.015, col: src.col });
        src.cnt += Math.floor(Math.random() * 50) + 5;
        STATE.attacksToday += Math.floor(Math.random() * 10) + 1;
    };
    const arcInterval = setInterval(spawnArc, 600);

    const draw = () => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#020912'; ctx.fillRect(0, 0, W, H);
        // World map grid silhouette
        ctx.strokeStyle = 'rgba(34,211,238,0.06)'; ctx.lineWidth = 0.5;
        for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
        for (let j = 0; j < H; j += 30) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke(); }
        // Source nodes
        cyberSources.forEach(s => {
            const x = s.x * W, y = s.y * H;
            ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = s.col; ctx.globalAlpha = 0.9; ctx.fill();
            ctx.globalAlpha = 0.3; ctx.beginPath(); ctx.arc(x, y, 12 + Math.sin(Date.now() / 400) * 4, 0, Math.PI * 2); ctx.fillStyle = s.col; ctx.fill();
            ctx.globalAlpha = 1; ctx.font = '11px Outfit'; ctx.fillStyle = 'rgba(226,232,240,0.8)'; ctx.fillText(`${s.flag}${s.c}`, x + 14, y + 4);
        });
        // Target nodes
        cyberTargets.forEach(t => {
            const x = t.x * W, y = t.y * H;
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = 'rgba(59,130,246,0.8)'; ctx.fill();
            ctx.font = '10px Outfit'; ctx.fillStyle = 'rgba(148,163,184,0.7)'; ctx.fillText(t.c, x + 7, y + 3);
        });
        // Arcs
        cyberGlobeArcs = cyberGlobeArcs.filter(a => {
            a.prog = Math.min(1, a.prog + a.speed);
            const t = a.prog, cpx = (a.x1 + a.x2) / 2, cpy = Math.min(a.y1, a.y2) - 70;
            const bx = (1 - t) * (1 - t) * a.x1 + 2 * (1 - t) * t * cpx + t * t * a.x2;
            const by = (1 - t) * (1 - t) * a.y1 + 2 * (1 - t) * t * cpy + t * t * a.y2;
            ctx.save(); ctx.globalAlpha = 0.85 * (1 - a.prog * 0.4);
            ctx.strokeStyle = a.col; ctx.lineWidth = 1.5;
            ctx.shadowColor = a.col; ctx.shadowBlur = 10;
            ctx.beginPath(); ctx.moveTo(a.x1, a.y1); ctx.lineTo(bx, by); ctx.stroke();
            ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fillStyle = a.col; ctx.fill();
            ctx.restore();
            return a.prog < 1;
        });
        cyberGlobeId = requestAnimationFrame(draw);
    };
    draw();
    canvas._arcInterval = arcInterval;
}

function updateCyberStats() {
    const total = cyberSources.reduce((a, s) => a + s.cnt, 0);
    [document.getElementById('cyAttacksToday'), document.getElementById('ac-cy'), document.getElementById('attackCount')].forEach(el => { if (el) el.textContent = (STATE.attacksToday + total).toLocaleString(); });
    const ps = document.getElementById('cyPerSecond'); if (ps) ps.textContent = STATE.cyberPerSec;
    const cc = document.getElementById('cyCountries'); if (cc) cc.textContent = cyberTargets.length;
    renderCyberList();
}

function renderCyberList() {
    const srcEl = document.getElementById('cyTopSources');
    if (srcEl) {
        const sorted = [...cyberSources].sort((a, b) => b.cnt - a.cnt);
        const max = sorted[0]?.cnt || 1;
        srcEl.innerHTML = sorted.map(s => `
      <div class="cy-list-item">
        <span class="cy-country">${s.flag} ${s.c}</span>
        <div class="cy-bar"><div class="cy-bar-fill" style="width:${Math.min(100, (s.cnt / max) * 100)}%;background:${s.col}"></div></div>
        <span class="cy-count">${s.cnt.toLocaleString()}</span>
      </div>`).join('');
    }
    const typEl = document.getElementById('cyTopTypes');
    if (typEl) {
        typEl.innerHTML = cyberTypes.map(t => `
      <div class="cy-list-item">
        <span class="cy-country">${t.t}</span>
        <div class="cy-bar"><div class="cy-bar-fill" style="width:${t.pct}%;background:${t.col}"></div></div>
        <span class="cy-count">${t.pct}%</span>
      </div>`).join('');
    }
}

function renderCyberFeed() {
    const feed = document.getElementById('cyFeed'); if (!feed) return;
    const incidents = [
        { col: '#ef4444', t: 'Ransomware deployed — US Hospital Network — 23 facilities encrypted' },
        { col: '#f59e0b', t: 'APT28 exfiltrating NATO documents from Brussels endpoint' },
        { col: '#ef4444', t: 'SCADA injection attempt — German power grid — BLOCKED by IDS' },
        { col: '#fb923c', t: 'Lazarus Group targeting South Korean crypto exchanges' },
        { col: '#a78bfa', t: 'Zero-day CVE-2024-XXXX exploited — Microsoft Exchange' },
        { col: '#22d3ee', t: 'DDoS: 3.8Tbps absorbed by Cloudflare — Largest ever recorded' },
        { col: '#ef4444', t: 'Supply chain attack detected — 43 npm packages compromised' },
        { col: '#f59e0b', t: 'Cobalt Strike beacon active — UK Ministry of Defence network' },
    ];
    const now = new Date();
    feed.innerHTML = incidents.slice(0, 6).map((inc, i) => {
        const t = new Date(now.getTime() - i * 47000);
        const ts = t.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
        return `<div class="cy-feed-item"><div class="cy-feed-dot" style="background:${inc.col}"></div><span style="flex:1;color:var(--text-secondary)">${inc.t}</span><span style="color:var(--text-dim);font-size:9px;font-family:'JetBrains Mono',monospace;flex-shrink:0">${ts}</span></div>`;
    }).join('');
}

// ── CLIMATE PANEL ─────────────────────────────────────────────────────────────
function renderClimate() {
    const grid = document.getElementById('climateGrid'); if (!grid) return;
    const tempClass = t => t > 35 ? 'hot' : t > 20 ? 'warm' : t > 5 ? 'cool' : 'cold';
    const isStorm = c => c.alert && (c.alert.includes('HURRICANE') || c.alert.includes('TYPHOON'));
    const isExtreme = c => c.alert && (c.alert.includes('Blizzard') || c.alert.includes('Severe'));
    grid.innerHTML = CLIMATE_DATA.map((c, i) => `
    <div class="climate-card ${isStorm(c) ? 'storm' : ''} ${isExtreme(c) ? 'extreme' : ''}" style="animation-delay:${i * 0.05}s" onclick="panTo(${c.lat},${c.lng})">
      <div class="cc-top">
        <div>
          <div class="cc-city">${c.city}</div>
          <div style="font-size:10px;color:var(--text-dim)">${c.country}</div>
        </div>
        <div class="cc-icon">${c.icon}</div>
      </div>
      <div class="cc-temp ${tempClass(c.temp)}">${c.temp}°C</div>
      <div class="cc-desc">${c.weather}</div>
      ${c.alert ? `<div style="font-size:10px;font-weight:700;color:${isStorm(c) ? '#ef4444' : isExtreme(c) ? '#ef4444' : '#f59e0b'};background:rgba(239,68,68,0.1);border-radius:4px;padding:3px 8px;margin-bottom:6px">⚠️ ${c.alert}</div>` : ''}
      <div class="cc-stats">
        <div class="cc-stat"><strong>${c.humidity}%</strong>Humidity</div>
        <div class="cc-stat"><strong>${c.wind} km/h</strong>Wind</div>
        <div class="cc-stat"><strong>${c.pressure} hPa</strong>Pressure</div>
        <div class="cc-stat"><strong>${c.aq}</strong>Air Quality</div>
      </div>
    </div>`).join('');
}

// ── DATA CENTERS PANEL ────────────────────────────────────────────────────────
function renderDataCenters() {
    const grid = document.getElementById('dcGrid'); if (!grid) return;
    grid.innerHTML = DATA_CENTERS.map((dc, i) => `
    <div class="dc-card" style="animation-delay:${i * 0.06}s" onclick="panTo(${dc.lat},${dc.lng})">
      <div class="dc-icon">🖥️</div>
      <div class="dc-info">
        <div class="dc-name">${dc.name}</div>
        <div class="dc-company">${dc.company}</div>
        <div class="dc-loc">📍 ${dc.location}</div>
        <div class="dc-specs">${dc.specs.map(s => `<span class="dc-spec">${s}</span>`).join('')}</div>
        <div class="dc-uptime">
          <span style="color:var(--text-dim);font-size:10px">Uptime</span>
          <div class="dc-up-bar"><div class="dc-up-fill" style="width:${dc.uptime}%"></div></div>
          <span class="dc-up-val">${dc.uptime}%</span>
        </div>
        <div style="font-size:10px;color:var(--text-secondary);margin-top:4px">⚡ ${dc.power} · Tier ${dc.tier} · PUE ${dc.pue}</div>
      </div>
    </div>`).join('');
}

// ── SEA CABLES PANEL ──────────────────────────────────────────────────────────
function renderSeaCables() {
    const grid = document.getElementById('cableGrid'); if (!grid) return;
    grid.innerHTML = SEA_CABLES.map((c, i) => `
    <div class="cable-card" style="animation-delay:${i * 0.06}s">
      <div class="cable-top">
        <div class="cable-name">🌊 ${c.name}</div>
        <div class="cable-year">${c.year}</div>
      </div>
      <div class="cable-route">🗺️ ${c.route}</div>
      <div class="cable-specs">
        <div class="cable-spec"><div class="cable-spec-label">Length</div><div class="cable-spec-val">${c.length}</div></div>
        <div class="cable-spec"><div class="cable-spec-label">Capacity</div><div class="cable-spec-val">${c.capacity}</div></div>
        <div class="cable-spec" style="grid-column:span 2"><div class="cable-spec-label">Owner(s)</div><div class="cable-spec-val" style="font-size:11px">${c.owners}</div></div>
      </div>
      <div class="cable-status-row">
        <span class="cable-status-dot active"></span>
        <span style="color:var(--accent-green)">ACTIVE</span>
        <span style="color:var(--text-dim);margin-left:8px">Carrying ${Math.floor(Math.random() * 85 + 15)}% capacity</span>
      </div>
    </div>`).join('');
}
