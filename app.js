/* =============================================
   WORLDVIEW MONITOR — CORE APP  v2.0
   app.js  (depends on data.js)
   ============================================= */
'use strict';

const STATE = {
    map: null, tileLayers: {}, currentStyle: 'dark',
    layers: {
        flights: { group: null, visible: true }, trains: { group: null, visible: true },
        buses: { group: null, visible: true }, cars: { group: null, visible: true },
        ships: { group: null, visible: true }, subs: { group: null, visible: true },
        sats: { group: null, visible: true }, missiles: { group: null, visible: true },
        military: { group: null, visible: true }, dc: { group: null, visible: true },
        cables: { group: null, visible: true }, cameras: { group: null, visible: true },
    },
    flights: [], vehicles: { trains: [], buses: [], cars: [] },
    ships: [], currentVehicleType: 'trains', currentShipType: 'cargo',
    currentMilType: 'army', attacksToday: 0, cyberPerSec: 0,
    satellites: [], eventLog: [],
};

const TILE = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    topo: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
};

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initNav();
    initLayerToggles();
    initStyleBtns();
    initClock();
    initRefreshBtn();
    fetchFlights();
    renderVehicles();
    renderCameras();
    renderAlerts();
    startRefreshCycles();
    // New modules
    renderMissiles();
    renderMilitary('army');
    renderClimate();
    renderDataCenters();
    renderSeaCables();
    renderShips('cargo');
    renderSubmarines();
    renderAnalytics();
    initCyberModule();
    addCameraMarkersToMap();
    addMilitaryMarkersToMap();
    addDataCenterMarkersToMap();
    addSeaCableLayersToMap();
    startSatelliteCanvas();
    startCyberMapOverlay();
    // vehicles already drawn inside renderVehicles() above
    spawnShipsOnMap();
    spawnSubsOnMap();
    spawnSatMarkersOnMap();
    setTimeout(() => addEvent('green', 'WorldView Monitor v2.0 initialized — 15 modules active'), 400);
    setTimeout(() => addEvent('blue', 'Connecting to OpenSky, AIS, SpaceTrack feeds…'), 1100);
    setTimeout(() => addEvent('red', 'Cyber threat level: HIGH — monitoring 47 attack vectors'), 1800);
    setTimeout(() => addEvent('orange', 'Live tracking: flights, ships, submarines, satellites online'), 2500);
});

// ── MAP ───────────────────────────────────────────────────────────────────────
function initMap() {
    STATE.map = L.map('worldMap', { center: [20, 0], zoom: 3, zoomControl: false, attributionControl: false });
    STATE.tileLayers.dark = L.tileLayer(TILE.dark, { maxZoom: 18, subdomains: 'abcd' });
    STATE.tileLayers.satellite = L.tileLayer(TILE.satellite, { maxZoom: 18 });
    STATE.tileLayers.topo = L.tileLayer(TILE.topo, { maxZoom: 17 });
    STATE.tileLayers.dark.addTo(STATE.map);
    L.control.zoom({ position: 'bottomright' }).addTo(STATE.map);
    Object.keys(STATE.layers).forEach(k => {
        STATE.layers[k].group = L.layerGroup().addTo(STATE.map);
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    // Resize canvas on map resize
    STATE.map.on('resize', syncCyberCanvas);
    STATE.map.on('moveend zoomend', syncCyberCanvas);
}

function divIcon(html, cls) { return L.divIcon({ html, className: cls || '', iconSize: [22, 22], iconAnchor: [11, 11] }); }

// ── CAMERA MAP MARKERS ────────────────────────────────────────────────────────
function addCameraMarkersToMap() {
    WORLD_CAMERAS.forEach(c => {
        const ic = divIcon(`<div style="font-size:16px;filter:drop-shadow(0 0 6px ${c.color});cursor:pointer">📷</div>`);
        L.marker([c.lat, c.lng], { icon: ic }).addTo(STATE.layers.cameras.group)
            .bindPopup(`<div class="popup-title">📷 ${c.name}</div><div class="popup-row"><span>Location</span><strong>${c.location}</strong></div><div class="popup-row"><span>Status</span><strong style="color:#10b981">● LIVE</strong></div>`);
    });
}

// ── MILITARY MAP MARKERS ──────────────────────────────────────────────────────
function addMilitaryMarkersToMap() {
    const allBases = [
        ...ARMY_BASES.map(b => ({ ...b, emoji: '🪖', col: '#10b981' })),
        ...AIR_BASES.map(b => ({ ...b, emoji: '✈️', col: '#3b82f6' })),
        ...NAVAL_BASES.map(b => ({ ...b, emoji: '⚓', col: '#22d3ee' })),
    ];
    allBases.forEach(b => {
        const ic = divIcon(`<div style="font-size:14px;filter:drop-shadow(0 0 6px ${b.col});cursor:pointer">${b.emoji}</div>`);
        L.marker([b.lat, b.lng], { icon: ic }).addTo(STATE.layers.military.group)
            .bindPopup(`<div class="popup-title">${b.emoji} ${b.name}</div><div class="popup-row"><span>Location</span><strong>${b.location}</strong></div>`);
    });
}

// ── DATA CENTER MAP MARKERS ───────────────────────────────────────────────────
function addDataCenterMarkersToMap() {
    DATA_CENTERS.forEach(dc => {
        const ic = divIcon(`<div style="font-size:13px;filter:drop-shadow(0 0 7px #22d3ee);cursor:pointer">🖥️</div>`);
        L.marker([dc.lat, dc.lng], { icon: ic }).addTo(STATE.layers.dc.group)
            .bindPopup(`<div class="popup-title">🖥️ ${dc.name}</div><div class="popup-row"><span>Owner</span><strong>${dc.company}</strong></div><div class="popup-row"><span>Power</span><strong>${dc.power}</strong></div><div class="popup-row"><span>PUE</span><strong>${dc.pue}</strong></div>`);
    });
}

// ── SEA CABLE MAP POLYLINES ───────────────────────────────────────────────────
const CABLE_ROUTES = [
    [[40.7, -74.0], [51.5, -0.1]], [[40.7, -74.0], [43.4, -8.4]],
    [[35.6, 139.7], [37.8, -122.4]], [[34.0, -118.2], [21.3, -157.9], [35.6, 139.7]],
    [[-33.8, 151.2], [-36.8, 174.8], [21.3, -157.9]],
    [[1.3, 103.8], [25.2, 55.2]], [[51.5, -0.1], [53.3, -6.2]],
    [[19.0, 72.8], [1.3, 103.8]], [[-1.3, 36.8], [25.2, 55.2]],
    [[48.8, 2.3], [31.2, 29.9], [19.0, 72.8], [1.3, 103.8]],
];

function addSeaCableLayersToMap() {
    const colors = ['#ec4899', '#f472b6', '#db2777', '#be185d', '#9d174d'];
    CABLE_ROUTES.forEach((pts, i) => {
        L.polyline(pts, { color: colors[i % colors.length], weight: 1.5, opacity: 0.55, dashArray: '6,4' })
            .addTo(STATE.layers.cables.group);
    });
}

// ── SPAWN SHIPS ON MAP ────────────────────────────────────────────────────────
function spawnShipsOnMap() {
    STATE.layers.ships.group.clearLayers();
    const emojis = { cargo: '🚢', tanker: '🛢️', warship: '⚓', cruise: '🛳️' };
    generateShips().forEach(s => {
        const ic = divIcon(`<div style="font-size:13px;filter:drop-shadow(0 0 6px #38bdf8);cursor:pointer">${emojis[s.type] || '🚢'}</div>`);
        L.marker([s.lat, s.lng], { icon: ic }).addTo(STATE.layers.ships.group)
            .bindPopup(`<div class="popup-title">🚢 ${s.name}</div><div class="popup-row"><span>Type</span><strong>${s.type}</strong></div><div class="popup-row"><span>Speed</span><strong>${s.speed} kn</strong></div><div class="popup-row"><span>Heading</span><strong>${s.heading}°</strong></div>`);
    });
}

// ── SPAWN SUBMARINES ──────────────────────────────────────────────────────────
function spawnSubsOnMap() {
    STATE.layers.subs.group.clearLayers();
    SUBMARINES_DATA.forEach(s => {
        const ic = divIcon(`<div style="font-size:13px;filter:drop-shadow(0 0 8px #818cf8);cursor:pointer">🔱</div>`);
        L.marker([s.lat, s.lng], { icon: ic }).addTo(STATE.layers.subs.group)
            .bindPopup(`<div class="popup-title">🔱 ${s.name}</div><div class="popup-row"><span>Class</span><strong>${s.cls}</strong></div><div class="popup-row"><span>Depth</span><strong>${s.depth} m</strong></div><div class="popup-row"><span>Country</span><strong>${s.country}</strong></div>`);
    });
}

// ── SPAWN SATELLITE MARKERS ───────────────────────────────────────────────────
function spawnSatMarkersOnMap() {
    STATE.layers.sats.group.clearLayers();
    SATELLITES.forEach((s, i) => {
        const lat = -70 + Math.random() * 140;
        const lng = -170 + Math.random() * 340;
        const ic = divIcon(`<div style="font-size:12px;filter:drop-shadow(0 0 7px #a78bfa);cursor:pointer">🛰️</div>`);
        L.marker([lat, lng], { icon: ic }).addTo(STATE.layers.sats.group)
            .bindPopup(`<div class="popup-title">🛰️ ${s.name}</div><div class="popup-row"><span>Orbit</span><strong>${s.type.toUpperCase()}</strong></div><div class="popup-row"><span>Alt</span><strong>${s.altitude} km</strong></div><div class="popup-row"><span>Purpose</span><strong>${s.purpose}</strong></div>`);
    });
}

// ── CYBER CANVAS ON MAP ───────────────────────────────────────────────────────
const CITY_NODES = [
    { name: 'New York', x: 0.18, y: 0.30 }, { name: 'London', x: 0.46, y: 0.25 },
    { name: 'Moscow', x: 0.56, y: 0.22 }, { name: 'Beijing', x: 0.73, y: 0.29 },
    { name: 'Dubai', x: 0.58, y: 0.37 }, { name: 'Mumbai', x: 0.63, y: 0.40 },
    { name: 'São Paulo', x: 0.27, y: 0.60 }, { name: 'Johannesburg', x: 0.53, y: 0.60 },
    { name: 'Sydney', x: 0.82, y: 0.67 }, { name: 'Tokyo', x: 0.80, y: 0.30 },
    { name: 'Toronto', x: 0.19, y: 0.27 }, { name: 'Paris', x: 0.48, y: 0.26 },
];

let cyberArcs = [];
function startCyberMapOverlay() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    syncCyberCanvas();
    spawnMapArc();
    setInterval(spawnMapArc, 1200);
    requestAnimationFrame(drawCyberArcs);
}

function syncCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas || !STATE.map) return;
    const cont = STATE.map.getContainer();
    canvas.width = cont.offsetWidth;
    canvas.height = cont.offsetHeight;
}

function spawnMapArc() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const W = canvas.width, H = canvas.height;
    const src = CITY_NODES[Math.floor(Math.random() * CITY_NODES.length)];
    const dst = CITY_NODES[Math.floor(Math.random() * CITY_NODES.length)];
    if (src === dst) return;
    const colors = ['rgba(239,68,68', 'rgba(251,146,60', 'rgba(250,204,21', 'rgba(239,68,68'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    cyberArcs.push({ x1: src.x * W, y1: src.y * H, x2: dst.x * W, y2: dst.y * H, prog: 0, speed: 0.012 + Math.random() * 0.018, col, alpha: 1 });
    STATE.attacksToday += Math.floor(Math.random() * 8) + 1;
    STATE.cyberPerSec = Math.floor(Math.random() * 120) + 40;
    const el = document.getElementById('attackCount');
    if (el) el.textContent = STATE.attacksToday.toLocaleString();
}

function drawCyberArcs() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) { requestAnimationFrame(drawCyberArcs); return; }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cyberArcs = cyberArcs.filter(a => {
        a.prog = Math.min(1, a.prog + a.speed);
        const px = a.x1 + (a.x2 - a.x1) * a.prog;
        const py = a.y1 + (a.y2 - a.y1) * a.prog;
        const cpx = (a.x1 + a.x2) / 2;
        const cpy = Math.min(a.y1, a.y2) - 60;
        ctx.save();
        ctx.globalAlpha = a.alpha * (1 - a.prog * 0.5);
        ctx.strokeStyle = `${a.col},0.8)`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `${a.col},1)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(a.x1, a.y1);
        const t2 = a.prog;
        const bx = (1 - t2) * (1 - t2) * a.x1 + 2 * (1 - t2) * t2 * cpx + t2 * t2 * a.x2;
        const by = (1 - t2) * (1 - t2) * a.y1 + 2 * (1 - t2) * t2 * cpy + t2 * t2 * a.y2;
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${a.col},1)`;
        ctx.fill();
        ctx.restore();
        return a.prog < 1;
    });
    requestAnimationFrame(drawCyberArcs);
}

// ── FLIGHTS ───────────────────────────────────────────────────────────────────
async function fetchFlights() {
    try {
        const r = await fetch('https://opensky-network.org/api/states/all?lamin=-60&lomin=-180&lamax=85&lomax=180');
        if (!r.ok) throw new Error();
        const d = await r.json();
        STATE.flights = (d.states || []).filter(s => s[5] && s[6] && !s[8]).slice(0, 300);
        drawFlightMarkers(STATE.flights);
        updateCounters(); renderFlightGrid(STATE.flights.slice(0, 80));
        addEvent('blue', `Synced ${STATE.flights.length} live flights`); updateLastSync();
    } catch { useFallbackFlights(); }
}

function useFallbackFlights() {
    const cs = ['UAL1732', 'DAL2901', 'AAL455', 'BAW224', 'AFR1234', 'DLH9007', 'JAL8800', 'SIA322', 'QFA9', 'AIC144', 'KLM661', 'EK241', 'QR781', 'TK1', 'LH400'];
    const countries = ['United States', 'Germany', 'France', 'United Kingdom', 'Japan', 'China', 'Australia', 'India', 'Brazil', 'Canada', 'Russia'];
    const fl = Array.from({ length: 200 }, (_, i) => {
        const lat = -50 + Math.random() * 120, lng = -160 + Math.random() * 320;
        const h = Math.random() * 360, spd = 600 + Math.random() * 400, alt = 5000 + Math.random() * 10000;
        return [i, cs[i % cs.length], countries[i % countries.length], null, null, lng, lat, alt, false, spd / 3.6, h, null, null, null, null, null, null];
    });
    STATE.flights = fl;
    drawFlightMarkers(fl); updateCounters(); renderFlightGrid(fl.slice(0, 80));
    addEvent('blue', `Loaded ${fl.length} simulated flights (API fallback)`); updateLastSync();
}

function drawFlightMarkers(flights) {
    STATE.layers.flights.group.clearLayers();
    flights.forEach(f => {
        const rot = f[10] || 0;
        const ic = divIcon(`<div style="transform:rotate(${rot}deg);font-size:13px;filter:drop-shadow(0 0 5px #3b82f6);cursor:pointer">✈️</div>`);
        L.marker([f[6], f[5]], { icon: ic }).addTo(STATE.layers.flights.group)
            .bindPopup(`<div class="popup-title">✈️ ${(f[1] || 'N/A').trim()}</div><div class="popup-row"><span>Country</span><strong>${f[2] || '–'}</strong></div><div class="popup-row"><span>Altitude</span><strong>${f[7] ? Math.round(f[7]) : 0} m</strong></div><div class="popup-row"><span>Speed</span><strong>${f[9] ? Math.round(f[9] * 3.6) : 0} km/h</strong></div>`);
    });
}

function renderFlightGrid(flights) {
    const grid = document.getElementById('flightGrid'); if (!grid) return;
    const FLAGS = { 'United States': '🇺🇸', 'Germany': '🇩🇪', 'France': '🇫🇷', 'United Kingdom': '🇬🇧', 'Japan': '🇯🇵', 'China': '🇨🇳', 'Australia': '🇦🇺', 'India': '🇮🇳', 'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Russia': '🇷🇺' };
    grid.innerHTML = flights.map(f => {
        const cs = (f[1] || 'N/A').trim() || 'N/A';
        const co = f[2] || 'Unknown';
        const alt = f[7] ? `${Math.round(f[7])}m` : '–';
        const spd = f[9] ? `${Math.round(f[9] * 3.6)}km/h` : '–';
        return `<div class="flight-card" onclick="panTo(${f[6]},${f[5]})">
      <div class="fc-top"><span class="fc-callsign">✈ ${cs}</span><span class="fc-flag">${FLAGS[co] || '🌐'}</span></div>
      <div class="fc-route"><span>${co}</span></div>
      <div class="fc-stats">
        <div class="fc-stat"><div class="fc-stat-label">Altitude</div><div class="fc-stat-val">${alt}</div></div>
        <div class="fc-stat"><div class="fc-stat-label">Speed</div><div class="fc-stat-val">${spd}</div></div>
      </div>
      <span class="fc-status ${f[8] ? 'ground' : 'airborne'}">${f[8] ? '⬛ GROUND' : '✈ AIRBORNE'}</span>
    </div>`;
    }).join('');
}

// ── VEHICLES ──────────────────────────────────────────────────────────────────
function generateVehicles() {
    const trainRoutes = [
        ['Tokyo→Osaka', 35.67, 139.65, 34.69, 135.50], ['London→Manchester', 51.50, -0.12, 53.48, -2.24],
        ['Paris→Lyon', 48.85, 2.35, 45.76, 4.83], ['NYC→Boston', 40.71, -74.00, 42.36, -71.05],
        ['Berlin→Munich', 52.52, 13.40, 48.13, 11.58], ['Moscow→St Pete', 55.75, 37.61, 59.93, 30.36],
        ['Sydney→Melbourne', -33.86, 151.20, -37.81, 144.96], ['Delhi→Mumbai', 28.61, 77.20, 19.07, 72.87],
        ['LA→SF', 34.05, -118.24, 37.77, -122.41], ['Beijing→Shanghai', 39.90, 116.40, 31.23, 121.47],
        ['Chicago→Detroit', 41.87, -87.62, 42.33, -83.04], ['Cairo→Alex', 30.04, 31.23, 31.20, 29.91],
    ];
    const busRoutes = [
        ['Downtown→Airport', 51.50, -0.12, 51.47, -0.45], ['Midtown→Brooklyn', 40.75, -73.98, 40.65, -73.94],
        ['Shinjuku→Shibuya', 35.69, 139.70, 35.65, 139.70], ['CBD→Bondi', -33.86, 151.20, -33.89, 151.27],
        ['Marina→Downtown', 25.07, 55.13, 25.20, 55.27], ['Gangnam→Itaewon', 37.49, 127.02, 37.53, 126.99],
        ['Centro→Colosseo', 41.89, 12.48, 41.89, 12.49], ['SF→Oakland', 37.77, -122.41, 37.80, -122.27],
    ];
    const carIds = ['MUM-TN-2891', 'DL-BX-4412', 'KA-01-7745', 'NYC-CAB-3344', 'LA-RIDX-9087', 'LDN-PHV-2210', 'TOK-TAX-8800', 'AUH-UAE-441', 'SYD-RDE-119', 'BLR-OLA-22'];
    const trains = trainRoutes.map((r, i) => { const t = Math.random(); return { id: `TRN-${String(i + 1).padStart(3, '0')}`, route: r[0], lat: r[1] + (r[3] - r[1]) * t, lng: r[2] + (r[4] - r[2]) * t, speed: 120 + Math.floor(Math.random() * 200), delay: Math.floor(Math.random() * 8), passengers: 200 + Math.floor(Math.random() * 800), vt: 'train', color: '#10b981' }; });
    const buses = busRoutes.map((r, i) => { const t = Math.random(); return { id: `BUS-${String(i + 1).padStart(3, '0')}`, route: r[0], lat: r[1] + (r[3] - r[1]) * t, lng: r[2] + (r[4] - r[2]) * t, speed: 20 + Math.floor(Math.random() * 60), delay: Math.floor(Math.random() * 12), passengers: 10 + Math.floor(Math.random() * 80), vt: 'bus', color: '#f59e0b' }; });
    const cars = carIds.map(id => ({ id, route: 'GPS Tracked', lat: -30 + Math.random() * 80, lng: -120 + Math.random() * 240, speed: 10 + Math.floor(Math.random() * 100), delay: 0, passengers: 1 + Math.floor(Math.random() * 4), vt: 'car', color: '#a78bfa' }));
    return { trains, buses, cars };
}

function renderVehicles() {
    const v = generateVehicles(); STATE.vehicles = v;
    drawVehicleMarkersOnMap(v); renderVehicleGrid(STATE.currentVehicleType); updateCounters();
}

function drawVehicleMarkersOnMap(v) {
    const emojis = { train: '🚄', bus: '🚌', car: '🚗' };
    const lk = { train: 'trains', bus: 'buses', car: 'cars' };
    ['trains', 'buses', 'cars'].forEach(t => STATE.layers[t].group.clearLayers());
    [...v.trains, ...v.buses, ...v.cars].forEach(veh => {
        const ic = divIcon(`<div style="font-size:13px;filter:drop-shadow(0 0 5px ${veh.color});cursor:pointer">${emojis[veh.vt]}</div>`);
        L.marker([veh.lat, veh.lng], { icon: ic }).addTo(STATE.layers[lk[veh.vt]].group)
            .bindPopup(`<div class="popup-title">${emojis[veh.vt]} ${veh.id}</div><div class="popup-row"><span>Route</span><strong>${veh.route}</strong></div><div class="popup-row"><span>Speed</span><strong>${veh.speed} km/h</strong></div><div class="popup-row"><span>Passengers</span><strong>${veh.passengers}</strong></div>`);
    });
}

function renderVehicleGrid(type) {
    const grid = document.getElementById('vehicleGrid'); if (!grid) return;
    const emojis = { trains: '🚄', buses: '🚌', cars: '🚗' };
    const vc = STATE.vehicles[type] || [];
    grid.innerHTML = vc.map((v, i) => `
    <div class="vehicle-card" style="animation-delay:${i * 0.04}s" onclick="panTo(${v.lat},${v.lng})">
      <div class="vc-icon ${type.slice(0, -1)}">${emojis[type]}</div>
      <div class="vc-info">
        <div class="vc-id">${v.id}</div>
        <div class="vc-route">${v.route}</div>
        <div class="vc-stats">
          <span class="vc-stat"><strong>${v.speed}</strong> km/h</span>
          <span class="vc-stat"><strong>${v.passengers}</strong> aboard</span>
          ${v.delay > 0 ? `<span class="vc-stat" style="color:#f59e0b">+${v.delay}min</span>` : ''}
        </div>
      </div>
      <span class="vc-signal"></span>
    </div>`).join('');
}

// ── CAMERAS ───────────────────────────────────────────────────────────────────
function renderCameras() {
    const grid = document.getElementById('cameraGrid'); if (!grid) return;
    grid.innerHTML = WORLD_CAMERAS.map((cam, i) => `
    <div class="camera-card" style="animation-delay:${i * 0.05}s">
      <div class="cam-fallback">
        <div class="cam-scan-line"></div>
        <div style="font-size:32px;filter:drop-shadow(0 0 12px ${cam.color})">${cam.emoji}</div>
        <div style="font-size:11px;color:var(--text-secondary)">📡 ${Math.floor(Math.random() * 800 + 100)}p Feed</div>
        <div class="cam-overlay-live"><span class="pulse-dot"></span>LIVE</div>
      </div>
      <div class="cam-footer"><div><div class="cam-name">📷 ${cam.name}</div><div class="cam-loc">📍 ${cam.location}</div></div><div class="cam-status">● ONLINE</div></div>
    </div>`).join('');
}

// ── ALERTS ────────────────────────────────────────────────────────────────────
function renderAlerts() {
    const list = document.getElementById('alertsList'); if (!list) return;
    list.innerHTML = ALERTS_DATA.map((a, i) => `
    <div class="alert-item ${a.type}" style="animation-delay:${i * 0.07}s">
      <i class="${a.icon} alert-icon"></i>
      <div class="alert-content"><div class="alert-title">${a.title}</div><div class="alert-desc">${a.desc}</div><div class="alert-time">${a.time}</div></div>
    </div>`).join('');
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
function renderAnalytics() {
    const grid = document.getElementById('analyticsGrid'); if (!grid) return;
    const total = STATE.vehicles.trains.length + STATE.vehicles.buses.length + STATE.vehicles.cars.length;
    const regions = [{ n: 'North America', p: 34, c: '#3b82f6' }, { n: 'Europe', p: 28, c: '#10b981' }, { n: 'Asia Pacific', p: 24, c: '#f59e0b' }, { n: 'Middle East', p: 8, c: '#a78bfa' }, { n: 'Africa', p: 4, c: '#ec4899' }, { n: 'Other', p: 2, c: '#22d3ee' }];
    grid.innerHTML = `
    <div class="analytics-card"><div class="ac-title">LIVE FLIGHTS</div><div class="ac-big-number blue" id="ac-fl">${STATE.flights.length.toLocaleString()}</div><div class="ac-sub">↑ 4.2% · Global airspace</div></div>
    <div class="analytics-card"><div class="ac-title">OCEAN SHIPS</div><div class="ac-big-number cyan">${STATE.ships.length || 68}</div><div class="ac-sub">Cargo · Tanker · Warship · Cruise</div></div>
    <div class="analytics-card"><div class="ac-title">SATELLITES TRACKED</div><div class="ac-big-number purple">${SATELLITES.length}</div><div class="ac-sub">LEO · MEO · GEO · SPY</div></div>
    <div class="analytics-card"><div class="ac-title">CYBER ATTACKS TODAY</div><div class="ac-big-number red" id="ac-cy">${STATE.attacksToday.toLocaleString()}</div><div class="ac-sub">↑ Ransomware · DDoS · APT</div></div>
    <div class="analytics-card"><div class="ac-title">DATA CENTERS</div><div class="ac-big-number green">${DATA_CENTERS.length}</div><div class="ac-sub">Across 14 countries · 99.99% uptime</div></div>
    <div class="analytics-card"><div class="ac-title">ACTIVE ALERTS</div><div class="ac-big-number orange">${ALERTS_DATA.length}</div><div class="ac-sub">3 Critical · 4 Warning · 3 Info</div></div>
    <div class="analytics-card" style="grid-column:span 2"><div class="ac-title">FLIGHTS BY REGION</div>
      <div class="chart-bar-container">${regions.map(r => `<div class="chart-row"><span class="chart-label">${r.n}</span><div class="chart-track"><div class="chart-fill" style="width:${r.p}%;background:${r.c}"></div></div><span class="chart-val">${r.p}%</span></div>`).join('')}</div>
    </div>
    <div class="analytics-card" style="grid-column:span 2"><div class="ac-title">SEA CABLES MONITORED</div>
      <div class="chart-bar-container">${SEA_CABLES.slice(0, 6).map(c => `<div class="chart-row"><span class="chart-label" style="font-size:9px">${c.name.slice(0, 12)}</span><div class="chart-track"><div class="chart-fill" style="width:${70 + Math.random() * 30}%;background:#ec4899"></div></div><span class="chart-val">${c.capacity}</span></div>`).join('')}</div>
    </div>`;
}

// ── COUNTERS ──────────────────────────────────────────────────────────────────
function updateCounters() {
    animNum(document.getElementById('flightCount'), STATE.flights.length);
    animNum(document.getElementById('shipCount'), STATE.ships.length || 68);
    animNum(document.getElementById('satCount'), SATELLITES.length);
    animNum(document.getElementById('attackCount'), STATE.attacksToday);
    animNum(document.getElementById('stormCount'), 3);
    const ov = { flights: 'ov-flights', ships: 'ov-ships', subs: 'ov-subs', sats: 'ov-sats', cyber: 'ov-cyber', missiles: 'ov-missiles' };
    const ovv = { flights: STATE.flights.length, ships: 68, subs: SUBMARINES_DATA.length, sats: SATELLITES.length, cyber: STATE.cyberPerSec, missiles: MISSILES.filter(m => m.status === 'active').length };
    Object.entries(ov).forEach(([k, id]) => { const el = document.getElementById(id); if (el) el.textContent = ovv[k]; });
}

function animNum(el, target) {
    if (!el) return;
    const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
    const diff = target - start; const dur = 800; const st = performance.now();
    const step = now => { const p = Math.min((now - st) / dur, 1); const e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(start + diff * e).toLocaleString(); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function initNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            const p = document.getElementById(`panel-${btn.dataset.panel}`);
            if (p) p.classList.add('active');
            if (btn.dataset.panel === 'map' && STATE.map) setTimeout(() => STATE.map.invalidateSize(), 100);
            if (btn.dataset.panel === 'flights') renderFlightGrid(STATE.flights.slice(0, 80));
            if (btn.dataset.panel === 'analytics') renderAnalytics();
            if (btn.dataset.panel === 'satellites') startSatelliteCanvas();
            if (btn.dataset.panel === 'cyber') startCyberGlobe();
            if (btn.dataset.panel === 'ground') renderVehicleGrid(STATE.currentVehicleType);
            if (btn.dataset.panel === 'ships') renderShips(STATE.currentShipType);
        });
    });
    // ground tabs
    document.querySelectorAll('.gtab').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.gtab').forEach(x => x.classList.remove('active')); b.classList.add('active');
        STATE.currentVehicleType = b.dataset.type; renderVehicleGrid(STATE.currentVehicleType);
    }));
}

// ── LAYER TOGGLES ─────────────────────────────────────────────────────────────
const TOGGLE_MAP = { toggleFlights: 'flights', toggleTrains: 'trains', toggleShips: 'ships', toggleSubs: 'subs', toggleSats: 'sats', toggleMissiles: 'missiles', toggleMilitary: 'military', toggleDC: 'dc', toggleCables: 'cables', toggleCameras: 'cameras' };
function initLayerToggles() {
    Object.entries(TOGGLE_MAP).forEach(([id, lk]) => {
        const cb = document.getElementById(id); if (!cb) return;
        cb.addEventListener('change', () => {
            if (cb.checked) STATE.layers[lk].group.addTo(STATE.map);
            else STATE.layers[lk].group.remove();
        });
    });
}

// ── STYLE BUTTONS ─────────────────────────────────────────────────────────────
function initStyleBtns() {
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.style === STATE.currentStyle) return;
            STATE.map.removeLayer(STATE.tileLayers[STATE.currentStyle]);
            STATE.tileLayers[btn.dataset.style].addTo(STATE.map);
            STATE.currentStyle = btn.dataset.style;
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ── CLOCK ─────────────────────────────────────────────────────────────────────
function initClock() {
    const tick = () => { const el = document.getElementById('clockUTC'); if (el) el.textContent = new Date().toUTCString().split(' ')[4]; };
    tick(); setInterval(tick, 1000);
}

function updateLastSync() { const el = document.getElementById('lastUpdate'); if (el) el.textContent = `Last sync: ${new Date().toLocaleTimeString('en-GB', { hour12: false })} UTC`; }

// ── REFRESH ───────────────────────────────────────────────────────────────────
function initRefreshBtn() {
    const btn = document.getElementById('refreshBtn'); if (!btn) return;
    btn.addEventListener('click', () => {
        btn.classList.add('spinning'); setTimeout(() => btn.classList.remove('spinning'), 900);
        fetchFlights(); renderVehicles(); addEvent('green', 'Manual data refresh triggered');
    });
}

// ── EVENTS FEED ───────────────────────────────────────────────────────────────
function addEvent(color, text) {
    const t = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    STATE.eventLog.unshift({ color, text, time: t });
    if (STATE.eventLog.length > 30) STATE.eventLog.pop();
    renderEventsFeed();
}
function renderEventsFeed() {
    const feed = document.getElementById('eventsFeed'); if (!feed) return;
    feed.innerHTML = STATE.eventLog.slice(0, 15).map(e => `
    <div class="event-item"><div class="event-dot ${e.color}"></div><div class="event-text">${e.text}</div><div class="event-time">${e.time}</div></div>`).join('');
}

// ── REFRESH CYCLES ────────────────────────────────────────────────────────────
function startRefreshCycles() {
    setInterval(() => { fetchFlights(); addEvent('blue', 'Flight positions updated'); }, 15000);
    setInterval(() => { nudgeVehicles(); drawVehicleMarkersOnMap(STATE.vehicles); renderVehicleGrid(STATE.currentVehicleType); }, 3000);
    setInterval(() => { nudgeShips(); spawnShipsOnMap(); }, 5000);
    setInterval(() => { nudgeSubs(); spawnSubsOnMap(); }, 8000);
    setInterval(spawnRandomEvent, 6000);
}

function nudgeVehicles() {
    const n = (list, s) => list.forEach(v => { v.lat = Math.max(-85, Math.min(85, v.lat + (Math.random() - .5) * s)); v.lng = v.lng + (Math.random() - .5) * s; v.speed = Math.max(5, v.speed + (Math.random() - .5) * 10); });
    n(STATE.vehicles.trains, 0.06); n(STATE.vehicles.buses, 0.02); n(STATE.vehicles.cars, 0.015);
}
function nudgeShips() { STATE.ships.forEach(s => { s.lat = Math.max(-80, Math.min(80, s.lat + (Math.random() - .5) * 0.08)); s.lng = s.lng + (Math.random() - .5) * 0.1; }); }
function nudgeSubs() { SUBMARINES_DATA.forEach(s => { s.lat = Math.max(-80, Math.min(80, s.lat + (Math.random() - .5) * 0.1)); s.lng = s.lng + (Math.random() - .5) * 0.1; }); }

function spawnRandomEvent() {
    const evts = [
        ['red', `Cyber attack: ${rndCs()} targeted from ${rndCountry()}`],
        ['blue', `Flight ${rndCs()} entered restricted airspace`],
        ['green', `Satellite ${SATELLITES[rnd(SATELLITES.length) - 1].name} orbit confirmed`],
        ['orange', `Ship MMSI-${Math.floor(Math.random() * 9e8 + 1e8)} entered traffic lane`],
        ['purple', `Sub contact detected — grid ${rnd(9)}${String.fromCharCode(64 + rnd(9))}`],
        ['pink', `Cable ${SEA_CABLES[rnd(SEA_CABLES.length) - 1].name} — signal optimal`],
        ['red', `DDoS: ${Math.floor(Math.random() * 3 + 1)}.${Math.floor(Math.random() * 9)}Tbps against DC cluster`],
        ['green', `GPS resync: ${rnd(80) + 120} vehicles realigned`],
    ];
    const [col, txt] = evts[Math.floor(Math.random() * evts.length)];
    addEvent(col, txt);
    STATE.attacksToday += Math.floor(Math.random() * 50) + 10;
    const el = document.getElementById('ac-cy'); if (el) el.textContent = STATE.attacksToday.toLocaleString();
    const alt = document.getElementById('attackCount'); if (alt) alt.textContent = STATE.attacksToday.toLocaleString();
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
window.panTo = (lat, lng) => {
    document.querySelector('.nav-btn[data-panel="map"]')?.click();
    if (STATE.map && lat && lng) STATE.map.flyTo([lat, lng], 7, { duration: 1.5 });
};
function rnd(n) { return Math.floor(Math.random() * n) + 1; }
function rndCs() { const a = ['UAL', 'DAL', 'AAL', 'BAW', 'DLH', 'JAL', 'EK', 'QR', 'LH']; return a[Math.floor(Math.random() * a.length)] + (1000 + Math.floor(Math.random() * 9000)); }
function rndCountry() { const c = ['China', 'Russia', 'North Korea', 'Iran', 'Anonymous', 'Unknown Actor']; return c[Math.floor(Math.random() * c.length)]; }
const styleSpin = document.createElement('style');
styleSpin.textContent = '.spinning i{animation:spin 0.6s linear infinite}';
document.head.appendChild(styleSpin);
