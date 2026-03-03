/* =============================================
   WORLDVIEW MONITOR — WORLD DATASETS v2.0
   data.js  (loaded before app.js)
   ============================================= */

/* ── WORLD CAMERAS (24 feeds) ── */
const WORLD_CAMERAS = [
    { name: 'Times Square', location: 'New York, USA', emoji: '🗽', lat: 40.758, lng: -73.985, color: '#3b82f6' },
    { name: 'Eiffel Tower', location: 'Paris, France', emoji: '🗼', lat: 48.858, lng: 2.294, color: '#ec4899' },
    { name: 'Shibuya Crossing', location: 'Tokyo, Japan', emoji: '🚦', lat: 35.659, lng: 139.700, color: '#f59e0b' },
    { name: 'Big Ben', location: 'London, UK', emoji: '🎡', lat: 51.500, lng: -0.124, color: '#10b981' },
    { name: 'Sydney Harbour', location: 'Sydney, Australia', emoji: '🦘', lat: -33.856, lng: 151.215, color: '#22d3ee' },
    { name: 'Dubai Marina', location: 'Dubai, UAE', emoji: '🏙️', lat: 25.078, lng: 55.139, color: '#fbbf24' },
    { name: 'Colosseum', location: 'Rome, Italy', emoji: '🏛️', lat: 41.890, lng: 12.492, color: '#a78bfa' },
    { name: 'Golden Gate', location: 'San Francisco, USA', emoji: '🌉', lat: 37.819, lng: -122.478, color: '#fb923c' },
    { name: 'Red Square', location: 'Moscow, Russia', emoji: '🏰', lat: 55.753, lng: 37.620, color: '#ef4444' },
    { name: 'Taj Mahal', location: 'Agra, India', emoji: '🕌', lat: 27.175, lng: 78.042, color: '#e2e8f0' },
    { name: 'Christ Redeemer', location: 'Rio, Brazil', emoji: '✝️', lat: -22.951, lng: -43.210, color: '#4ade80' },
    { name: 'Times Square CCTV-2', location: 'New York, USA', emoji: '📷', lat: 40.756, lng: -73.987, color: '#60a5fa' },
    // CCTV feeds
    { name: 'Shanghai Pudong CCTV', location: 'Shanghai, China', emoji: '📹', lat: 31.234, lng: 121.473, color: '#34d399' },
    { name: 'Mumbai Marine Drive', location: 'Mumbai, India', emoji: '🌊', lat: 18.944, lng: 72.823, color: '#f472b6' },
    { name: 'Seoul Gangnam CCTV', location: 'Seoul, South Korea', emoji: '📡', lat: 37.517, lng: 127.047, color: '#818cf8' },
    { name: 'Berlin Brandenburg Gate', location: 'Berlin, Germany', emoji: '🏛️', lat: 52.516, lng: 13.378, color: '#fcd34d' },
    { name: 'Singapore Marina Bay', location: 'Singapore', emoji: '🌃', lat: 1.289, lng: 103.859, color: '#22d3ee' },
    { name: 'Cairo Tahrir Square', location: 'Cairo, Egypt', emoji: '🏺', lat: 30.044, lng: 31.235, color: '#fb923c' },
    { name: 'Toronto CN Tower', location: 'Toronto, Canada', emoji: '🗼', lat: 43.642, lng: -79.387, color: '#60a5fa' },
    { name: 'Amsterdam Canal', location: 'Amsterdam, Netherlands', emoji: '🚲', lat: 52.370, lng: 4.895, color: '#34d399' },
    { name: 'Istanbul Bosphorus', location: 'Istanbul, Turkey', emoji: '🌉', lat: 41.045, lng: 28.999, color: '#f59e0b' },
    { name: 'Buenos Aires Obelisco', location: 'Buenos Aires, Argentina', emoji: '🏙️', lat: -34.603, lng: -58.381, color: '#a78bfa' },
    { name: 'Cape Town V&A', location: 'Cape Town, South Africa', emoji: '⛵', lat: -33.905, lng: 18.419, color: '#10b981' },
    { name: 'Nairobi CBD CCTV', location: 'Nairobi, Kenya', emoji: '📷', lat: -1.286, lng: 36.817, color: '#fbbf24' },
];

/* ── ARMY BASES ── */
const ARMY_BASES = [
    { name: 'Fort Bragg', location: 'North Carolina, USA', lat: 35.139, lng: -79.006, personnel: 53000, tags: ['82nd Airborne', 'SF Command'], strength: 95 },
    { name: 'Camp Humphreys', location: 'South Korea', lat: 36.963, lng: 127.034, personnel: 36000, tags: ['8th Army', 'USFK'], strength: 88 },
    { name: 'Fort Hood', location: 'Texas, USA', lat: 31.134, lng: -97.779, personnel: 36000, tags: ['1st Cavalry', 'Armor'], strength: 90 },
    { name: 'Fort Campbell', location: 'Kentucky, USA', lat: 36.671, lng: -87.469, personnel: 30000, tags: ['101st Airborne'], strength: 87 },
    { name: 'Hohenfels Training Area', location: 'Germany', lat: 49.218, lng: 11.839, personnel: 5000, tags: ['JMTC', 'NATO'], strength: 75 },
    { name: 'Camp Lejeune', location: 'North Carolina, USA', lat: 34.697, lng: -77.440, personnel: 40000, tags: ['USMC', 'Expeditionary'], strength: 92 },
    { name: 'Miramar Air Station', location: 'California, USA', lat: 32.867, lng: -117.147, personnel: 20000, tags: ['Marine Corps Air'], strength: 85 },
    { name: 'Kandahar Military Base', location: 'Afghanistan', lat: 31.505, lng: 65.847, personnel: 8000, tags: ['Coalition', 'Logistics'], strength: 60 },
    { name: 'Al-Udeid Air Base', location: 'Qatar', lat: 25.116, lng: 51.315, personnel: 10000, tags: ['CENTCOM', 'USAF'], strength: 88 },
    { name: 'Joint Base Pearl Harbor', location: 'Hawaii, USA', lat: 21.354, lng: -157.942, personnel: 25000, tags: ['INDOPACOM', 'Navy'], strength: 91 },
    { name: 'Ramstein Air Base', location: 'Germany', lat: 49.437, lng: 7.600, personnel: 22000, tags: ['USAF', 'NATO HQ'], strength: 89 },
    { name: 'Aviano Air Base', location: 'Italy', lat: 46.031, lng: 12.596, personnel: 5000, tags: ['31st FW', 'F-16'], strength: 80 },
    { name: 'Yokosuka Naval Base', location: 'Japan', lat: 35.291, lng: 139.669, personnel: 19000, tags: ['7th Fleet', 'USN'], strength: 88 },
    { name: 'Diego Garcia', location: 'British Indian Ocean', lat: -7.312, lng: 72.411, personnel: 4000, tags: ['B-52', 'Logistics Hub'], strength: 82 },
    { name: 'Djibouti Camp Lemonnier', location: 'Djibouti', lat: 11.547, lng: 43.159, personnel: 4000, tags: ['CJTF-HOA', 'Drone Ops'], strength: 76 },
    { name: 'Bagram Airfield', location: 'Afghanistan', lat: 34.945, lng: 69.264, personnel: 0, tags: ['Former ISAF Base'], strength: 0 },
    { name: 'Fort Wainwright', location: 'Alaska, USA', lat: 64.826, lng: -147.639, personnel: 8000, tags: ['Arctic Warfare'], strength: 78 },
];

/* ── AIR BASES ── */
const AIR_BASES = [
    { name: 'Nellis AFB', location: 'Nevada, USA', lat: 36.236, lng: -115.034, aircraft: ['F-22', 'F-35', 'B-2'], personnel: 12000, strength: 95 },
    { name: 'Edwards AFB', location: 'California, USA', lat: 34.905, lng: -117.884, aircraft: ['X-planes', 'Test Fleet'], personnel: 9000, strength: 90 },
    { name: 'Langley AFB', location: 'Virginia, USA', lat: 37.082, lng: -76.360, aircraft: ['F-22', 'T-38'], personnel: 8000, strength: 88 },
    { name: 'RAF Lakenheath', location: 'UK', lat: 52.409, lng: 0.560, aircraft: ['F-35A', 'HH-60'], personnel: 5000, strength: 85 },
    { name: 'Incirlik Air Base', location: 'Turkey', lat: 37.001, lng: 35.430, aircraft: ['A-10', 'KC-135'], personnel: 5000, strength: 79 },
    { name: 'Kadena Air Base', location: 'Okinawa, Japan', lat: 26.356, lng: 127.769, aircraft: ['F-15', 'KC-135'], personnel: 18000, strength: 91 },
    { name: 'Bagram Air Base', location: 'Afghanistan', lat: 34.945, lng: 69.264, aircraft: ['C-130', 'Drones'], personnel: 2000, strength: 45 },
    { name: 'Area 51 (Groom Lake)', location: 'Nevada, USA', lat: 37.235, lng: -115.808, aircraft: ['Classified'], personnel: -1, strength: 99 },
    { name: 'Fairford RAF', location: 'UK', lat: 51.681, lng: -1.790, aircraft: ['B-2', 'B-52 (visits)'], personnel: 1800, strength: 82 },
    { name: 'Thule AFB', location: 'Greenland', lat: 76.531, lng: -68.703, aircraft: ['C-17', 'Surveillance'], personnel: 600, strength: 70 },
    { name: 'King Khalid AFB', location: 'Saudi Arabia', lat: 24.109, lng: 47.576, aircraft: ['F-15SA', 'Eurofighter'], personnel: 7000, strength: 83 },
    { name: 'Chkalovsk Air Base', location: 'Uzbekistan', lat: 40.310, lng: 69.583, aircraft: ['Su-27', 'MiG-29'], personnel: 4000, strength: 72 },
];

/* ── NAVAL BASES ── */
const NAVAL_BASES = [
    { name: 'Norfolk Naval Station', location: 'Virginia, USA', lat: 36.937, lng: -76.298, ships: 75, personnel: 67000, tags: ['Carrier Strike', 'Atlantic'], strength: 95 },
    { name: 'Pearl Harbor', location: 'Hawaii, USA', lat: 21.354, lng: -157.942, ships: 30, personnel: 30000, tags: ['Pacific Fleet'], strength: 90 },
    { name: 'Rota Naval Base', location: 'Spain', lat: 36.642, lng: -6.349, ships: 15, personnel: 3500, tags: ['NATO', '6th Fleet'], strength: 80 },
    { name: 'Yokosuka Naval Base', location: 'Japan', lat: 35.291, lng: 139.669, ships: 20, personnel: 19000, tags: ['7th Fleet', 'Carrier'], strength: 88 },
    { name: 'Bahrain NSA', location: 'Bahrain', lat: 26.208, lng: 50.591, ships: 12, personnel: 7000, tags: ['5th Fleet', 'Gulf'], strength: 85 },
    { name: 'Guam Naval Base', location: 'Guam', lat: 13.444, lng: 144.720, ships: 8, personnel: 8000, tags: ['Submarines', 'WESTPAC'], strength: 87 },
    { name: 'Sevastopol', location: 'Crimea', lat: 44.616, lng: 33.522, ships: 20, personnel: 25000, tags: ['Black Sea Fleet', 'Russia'], strength: 78 },
    { name: 'Vladivostok Pacific Fleet', location: 'Russia', lat: 43.100, lng: 131.910, ships: 35, personnel: 35000, tags: ['Pacific Fleet RU'], strength: 80 },
];

/* ── SATELLITES ── */
const SATELLITES = [
    { name: 'ISS', type: 'leo', altitude: 408, period: 92, inclination: 51.6, country: 'Intl', purpose: 'Research', operator: 'NASA/ESA/Roscosmos' },
    { name: 'Starlink-1007', type: 'leo', altitude: 550, period: 95, inclination: 53, country: 'USA', purpose: 'Comms', operator: 'SpaceX' },
    { name: 'GPS IIF-10', type: 'meo', altitude: 20200, period: 718, inclination: 55, country: 'USA', purpose: 'Navigation', operator: 'USAF' },
    { name: 'Intelsat-39', type: 'geo', altitude: 35786, period: 1436, inclination: 0, country: 'Intl', purpose: 'Broadcast', operator: 'Intelsat' },
    { name: 'NOAA-20', type: 'leo', altitude: 824, period: 101, inclination: 98.7, country: 'USA', purpose: 'Weather', operator: 'NOAA' },
    { name: 'GOES-16', type: 'geo', altitude: 35786, period: 1436, inclination: 0, country: 'USA', purpose: 'Weather', operator: 'NOAA' },
    { name: 'Sentinel-2A', type: 'leo', altitude: 786, period: 100, inclination: 98.6, country: 'EU', purpose: 'Observation', operator: 'ESA' },
    { name: 'Iridium-NEXTx2', type: 'leo', altitude: 781, period: 100, inclination: 86.4, country: 'USA', purpose: 'Comms', operator: 'Iridium' },
    { name: 'COSMOS-2519 (SPY)', type: 'leo', altitude: 650, period: 97, inclination: 64.8, country: 'Russia', purpose: 'Recon', operator: 'MoD RU' },
    { name: 'Lacrosse-5 (SPY)', type: 'leo', altitude: 718, period: 99, inclination: 57, country: 'USA', purpose: 'Recon', operator: 'NRO' },
    { name: 'BeiDou-3 G1', type: 'geo', altitude: 35786, period: 1436, inclination: 0, country: 'China', purpose: 'Navigation', operator: 'CNSA' },
    { name: 'GLONASS-M 758', type: 'meo', altitude: 19100, period: 676, inclination: 64.8, country: 'Russia', purpose: 'Navigation', operator: 'VKS' },
    { name: 'Hubble Space Telescope', type: 'leo', altitude: 547, period: 95, inclination: 28.5, country: 'USA', purpose: 'Science', operator: 'NASA' },
    { name: 'TerraSAR-X', type: 'leo', altitude: 514, period: 94, inclination: 97.4, country: 'Germany', purpose: 'Radar', operator: 'DLR' },
    { name: 'Yaogan-30-07', type: 'leo', altitude: 600, period: 97, inclination: 35, country: 'China', purpose: 'Recon', operator: 'PLASSF' },
    { name: 'AEHF-6', type: 'geo', altitude: 35786, period: 1436, inclination: 0, country: 'USA', purpose: 'Military Comms', operator: 'USAF' },
    { name: 'Galileo-FOC-14', type: 'meo', altitude: 23222, period: 845, inclination: 56, country: 'EU', purpose: 'Navigation', operator: 'ESA' },
    { name: 'COSMOS-2560', type: 'leo', altitude: 750, period: 100, inclination: 82, country: 'Russia', purpose: 'SIGINT', operator: 'GRU' },
    { name: 'SBIRS GEO-5', type: 'geo', altitude: 35786, period: 1436, inclination: 0, country: 'USA', purpose: 'Missile Warning', operator: 'USSF' },
    { name: 'Chandrayaan-3 Relay', type: 'meo', altitude: 18000, period: 680, inclination: 90, country: 'India', purpose: 'Lunar Comm', operator: 'ISRO' },
];

/* ── MISSILES ── */
const MISSILES = [
    { name: 'DF-41', origin: 'China', originLatLng: [40.2, 116.4], targetLatLng: [38.8, -77.0], type: 'ICBM', range: '14,000 km', warhead: 'Multiple MIRV', status: 'test', progress: 0, speed: 'Mach 25', country: '🇨🇳' },
    { name: 'RS-28 Sarmat', origin: 'Russia', originLatLng: [56.0, 60.5], targetLatLng: [40.7, -74.0], type: 'ICBM', range: '18,000 km', warhead: '10–15 MIRV', status: 'test', progress: 0, speed: 'Mach 20', country: '🇷🇺' },
    { name: 'Minuteman III', origin: 'USA', originLatLng: [47.5, -110.5], targetLatLng: [55.7, 37.6], type: 'ICBM', range: '13,000 km', warhead: '300 kT', status: 'track', progress: 0, speed: 'Mach 23', country: '🇺🇸' },
    { name: 'Agni-V', origin: 'India', originLatLng: [19.0, 73.0], targetLatLng: [39.9, 116.4], type: 'ICBM', range: '5,000 km', warhead: 'Multiple', status: 'test', progress: 0, speed: 'Mach 24', country: '🇮🇳' },
    { name: 'Trident II D5', origin: 'USA (Submarine)', originLatLng: [-30.0, -40.0], targetLatLng: [55.7, 37.6], type: 'SLBM', range: '12,000 km', warhead: 'Eight 475 kT', status: 'track', progress: 0, speed: 'Mach 24', country: '🇺🇸' },
    { name: 'BrahMos II', origin: 'India', originLatLng: [28.6, 77.2], targetLatLng: [24.4, 67.0], type: 'Hypersonic Cruise', range: '1,500 km', warhead: 'Conventional', status: 'test', progress: 0, speed: 'Mach 8', country: '🇮🇳' },
    { name: 'S-500 Prometheus', origin: 'Russia', originLatLng: [55.7, 37.6], targetLatLng: [50.0, 14.4], type: 'ABM/SAM', range: '600 km', warhead: 'Interceptor', status: 'defense', progress: 0, speed: 'Mach 10', country: '🇷🇺' },
    { name: 'THAAD Battery', origin: 'USA (S. Korea)', originLatLng: [36.0, 127.0], targetLatLng: [39.0, 125.7], type: 'ABM', range: '200 km', warhead: 'Hit-to-Kill', status: 'defense', progress: 0, speed: 'Mach 8', country: '🇺🇸' },
    { name: 'Hwasong-17', origin: 'North Korea', originLatLng: [39.0, 125.7], targetLatLng: [21.3, -157.9], type: 'ICBM', range: '15,000 km', warhead: 'Unknown', status: 'test', progress: 0, speed: 'Mach 22', country: '🇰🇵' },
    { name: 'Kinzhal', origin: 'Russia', originLatLng: [56.0, 37.0], targetLatLng: [50.4, 30.5], type: 'Hypersonic Air', range: '2,000 km', warhead: 'Conventional/Nuclear', status: 'active', progress: 0, speed: 'Mach 10', country: '🇷🇺' },
];

/* ── SEA CABLES ── */
const SEA_CABLES = [
    { name: 'FLAG Atlantic-1', route: 'USA → Europe → Middle East → Asia', length: '28,000 km', capacity: '10 Tbps', year: 2001, owners: 'Multiple', status: 'active', color: '#ec4899' },
    { name: 'MAREA', route: 'Virginia Beach → Bilbao, Spain', length: '6,600 km', capacity: '160 Tbps', year: 2017, owners: 'Microsoft/Facebook', status: 'active', color: '#f472b6' },
    { name: 'PEACE Cable', route: 'Pakistan → East Africa → Europe', length: '15,000 km', capacity: '96 Tbps', year: 2021, owners: 'PEACE Cable International', status: 'active', color: '#ec4899' },
    { name: '2Africa', route: 'Africa Ring + Middle East + Europe', length: '45,000 km', capacity: '180 Tbps', year: 2024, owners: 'Meta/Others', status: 'active', color: '#f472b6' },
    { name: 'FASTER', route: 'Japan/Korea → USA (West Coast)', length: '9,000 km', capacity: '60 Tbps', year: 2016, owners: 'Google/Others', status: 'active', color: '#db2777' },
    { name: 'JUPITER', route: 'Japan → Philippines → USA', length: '14,557 km', capacity: '60 Tbps', year: 2020, owners: 'Amazon/Softbank', status: 'active', color: '#ec4899' },
    { name: 'Southern Cross NEXT', route: 'Australia → New Zealand → USA', length: '13,700 km', capacity: '72 Tbps', year: 2022, owners: 'Spark NZ/Telstra', status: 'active', color: '#f472b6' },
    { name: 'Dunant', route: 'Virginia Beach → Saint-Hilaire, France', length: '6,400 km', capacity: '250 Tbps', year: 2021, owners: 'Google', status: 'active', color: '#db2777' },
    { name: 'AAE-1', route: 'Asia → Africa → Europe', length: '25,000 km', capacity: '40 Tbps', year: 2017, owners: 'Consortium', status: 'active', color: '#ec4899' },
    { name: 'Bay of Bengal Gateway', route: 'India → Bangladesh → Sri Lanka → Malaysia', length: '13,000 km', capacity: '54 Tbps', year: 2017, owners: 'Consortium', status: 'active', color: '#f472b6' },
    { name: 'Hawaiki', route: 'Australia → New Zealand → Hawaii → USA', length: '14,000 km', capacity: '67 Tbps', year: 2018, owners: 'Hawaiki Cable', status: 'active', color: '#db2777' },
    { name: 'TAT-14', route: 'USA → Denmark/Netherlands/Germany → UK/France', length: '15,428 km', capacity: '640 Gbps', year: 2001, owners: 'AT&T/Others', status: 'active', color: '#ec4899' },
];

/* ── DATA CENTERS ── */
const DATA_CENTERS = [
    { name: 'The Citadel Campus', company: 'Switch', location: 'Reno, Nevada USA', lat: 39.529, lng: -119.813, power: '650 MW', pue: 1.18, tier: 'IV', uptime: 99.9999, specs: ['7.2M sq ft', 'Renewable Energy', 'Carrier Neutral'] },
    { name: 'QTS Atlanta Metro', company: 'QTS', location: 'Atlanta, Georgia USA', lat: 33.749, lng: -84.388, power: '400 MW', pue: 1.2, tier: 'III+', uptime: 99.999, specs: ['SOC 2 Type II', 'HIPAA', 'FedRAMP'] },
    { name: 'Equinix SG3', company: 'Equinix', location: 'Singapore', lat: 1.352, lng: 103.820, power: '60 MW', pue: 1.5, tier: 'IV', uptime: 99.999, specs: ['Financial Hub', 'SE Asia Hub'] },
    { name: 'Google DC Belgium', company: 'Google', location: 'Saint-Ghislain, Belgium', lat: 50.449, lng: 3.886, power: '300 MW', pue: 1.09, tier: 'N/A', uptime: 99.9999, specs: ['Renewable', 'Carbon Neutral', 'Custom Hardware'] },
    { name: 'Microsoft Azure DC', company: 'Microsoft', location: 'Dublin, Ireland', lat: 53.333, lng: -6.249, power: '250 MW', pue: 1.15, tier: 'III', uptime: 99.999, specs: ['Azure Region', 'GDPR Compliant'] },
    { name: 'Amazon AWS us-east-1', company: 'Amazon', location: 'N. Virginia, USA', lat: 38.918, lng: -77.506, power: '800 MW', pue: 1.2, tier: 'IV', uptime: 99.99, specs: ['Largest AWS Region', 'Multi-AZ'] },
    { name: 'Alibaba DC Shanghai', company: 'Alibaba Cloud', location: 'Shanghai, China', lat: 31.230, lng: 121.473, power: '200 MW', pue: 1.3, tier: 'III', uptime: 99.99, specs: ['T-Head AI Chips', 'Cloud-Native'] },
    { name: 'OVHcloud DC Strasbourg', company: 'OVHcloud', location: 'Strasbourg, France', lat: 48.585, lng: 7.750, power: '80 MW', pue: 1.09, tier: 'III+', uptime: 99.999, specs: ['Water Cooling', 'EU Sovereign'] },
    { name: 'KDDI Telehouse Tokyo', company: 'KDDI', location: 'Tokyo, Japan', lat: 35.688, lng: 139.692, power: '90 MW', pue: 1.4, tier: 'IV', uptime: 99.999, specs: ['Carrier Hotel', 'IX Hub'] },
    { name: 'Tencent IDC Guizhou', company: 'Tencent', location: 'Guizhou, China', lat: 26.600, lng: 106.700, power: '400 MW', pue: 1.25, tier: 'T4', uptime: 99.999, specs: ['AI Infrastructure', 'WeChat Backend'] },
    { name: 'Yandex DC Mäntsälä', company: 'Yandex', location: 'Finland', lat: 60.636, lng: 25.319, power: '100 MW', pue: 1.1, tier: 'III', uptime: 99.999, specs: ['Arctic Cooling', 'EU Compliant'] },
    { name: 'NTT GDC Chennai', company: 'NTT', location: 'Chennai, India', lat: 13.082, lng: 80.270, power: '50 MW', pue: 1.45, tier: 'III+', uptime: 99.99, specs: ['SEACOM Landing', 'India Hub'] },
];

/* ── CLIMATE DATA ── */
const CLIMATE_DATA = [
    { city: 'New York', country: 'USA', lat: 40.71, lng: -74.0, temp: 8, humidity: 65, wind: 22, pressure: 1015, weather: 'Partly Cloudy', icon: '🌤️', aq: 45, uv: 3, alert: null },
    { city: 'London', country: 'UK', lat: 51.50, lng: -0.12, temp: 11, humidity: 80, wind: 18, pressure: 1010, weather: 'Overcast', icon: '☁️', aq: 38, uv: 2, alert: null },
    { city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, temp: 14, humidity: 58, wind: 12, pressure: 1018, weather: 'Clear', icon: '☀️', aq: 52, uv: 5, alert: null },
    { city: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, temp: 32, humidity: 45, wind: 15, pressure: 1011, weather: 'Sunny & Hot', icon: '🌞', aq: 61, uv: 10, alert: null },
    { city: 'Mumbai', country: 'India', lat: 19.07, lng: 72.87, temp: 34, humidity: 82, wind: 20, pressure: 1008, weather: 'Humid & Hazy', icon: '🌫️', aq: 155, uv: 8, alert: 'Air Quality Warning' },
    { city: 'Sydney', country: 'Australia', lat: -33.86, lng: 151.20, temp: 25, humidity: 55, wind: 25, pressure: 1016, weather: 'Sunny', icon: '☀️', aq: 22, uv: 9, alert: null },
    { city: 'Moscow', country: 'Russia', lat: 55.75, lng: 37.61, temp: -5, humidity: 88, wind: 8, pressure: 1022, weather: 'Snowfall', icon: '❄️', aq: 30, uv: 1, alert: null },
    { city: 'Rio de Janeiro', country: 'Brazil', lat: -22.90, lng: -43.17, temp: 36, humidity: 75, wind: 14, pressure: 1012, weather: 'Tropical Heat', icon: '🌡️', aq: 48, uv: 11, alert: 'Heat Warning' },
    { city: 'Cairo', country: 'Egypt', lat: 30.04, lng: 31.23, temp: 28, humidity: 35, wind: 30, pressure: 1014, weather: 'Sandstorm', icon: '🌪️', aq: 180, uv: 9, alert: 'Sandstorm Warning' },
    { city: 'New Delhi', country: 'India', lat: 28.61, lng: 77.20, temp: 22, humidity: 70, wind: 10, pressure: 1013, weather: 'Smoggy', icon: '🌫️', aq: 210, uv: 6, alert: 'Severe Air Quality' },
    { city: 'Hurricane Ian Path', country: 'Atlantic', lat: 26.0, lng: -82.0, temp: 29, humidity: 98, wind: 250, pressure: 940, weather: 'Category 4 Hurricane', icon: '🌀', aq: 0, uv: 0, alert: 'HURRICANE WARNING' },
    { city: 'Typhoon Region', country: 'Pacific', lat: 18.0, lng: 138.0, temp: 30, humidity: 99, wind: 220, pressure: 950, weather: 'Active Typhoon', icon: '🌀', aq: 0, uv: 0, alert: 'TYPHOON WARNING' },
    { city: 'Anchorage', country: 'Alaska USA', lat: 61.21, lng: -149.90, temp: -18, humidity: 75, wind: 35, pressure: 998, weather: 'Arctic Blizzard', icon: '🌨️', aq: 15, uv: 0, alert: 'Blizzard Warning' },
    { city: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, temp: 31, humidity: 85, wind: 12, pressure: 1009, weather: 'Tropical Showers', icon: '🌧️', aq: 40, uv: 7, alert: null },
    { city: 'Paris', country: 'France', lat: 48.85, lng: 2.35, temp: 13, humidity: 72, wind: 16, pressure: 1012, weather: 'Light Rain', icon: '🌦️', aq: 35, uv: 3, alert: null },
    { city: 'Toronto', country: 'Canada', lat: 43.65, lng: -79.38, temp: 2, humidity: 82, wind: 20, pressure: 1005, weather: 'Winter Storm', icon: '🌨️', aq: 28, uv: 1, alert: 'Winter Storm Watch' },
    { city: 'Cape Town', country: 'S. Africa', lat: -33.92, lng: 18.42, temp: 22, humidity: 60, wind: 40, pressure: 1018, weather: 'Strong Winds', icon: '💨', aq: 20, uv: 8, alert: null },
    { city: 'Beijing', country: 'China', lat: 39.90, lng: 116.40, temp: 7, humidity: 55, wind: 18, pressure: 1020, weather: 'Partly Cloudy', icon: '🌤️', aq: 95, uv: 4, alert: 'Moderate Pollution' },
];

/* ── ALERTS (expanded) ── */
const ALERTS_DATA = [
    { type: 'critical', icon: 'fa-solid fa-circle-exclamation', title: 'Flight Emergency — UAL1732', desc: 'Aircraft declared emergency over North Atlantic. Diverting to Shannon, Ireland.', time: '11:08 UTC' },
    { type: 'critical', icon: 'fa-solid fa-skull-crossbones', title: 'Cyber Attack — US CISA', desc: 'Ransomware attack targeting 14 critical infrastructure nodes in Northeast USA.', time: '11:15 UTC' },
    { type: 'critical', icon: 'fa-solid fa-water', title: 'Submarine Contact Lost — SSBN-738', desc: 'LACROSSE acoustic contact lost 400nm south of Iceland. Assets dispatched.', time: '10:58 UTC' },
    { type: 'warning', icon: 'fa-solid fa-rocket', title: 'Ballistic Missile Test — DPRK', desc: 'North Korea launched ballistic missile. Trajectory: over Sea of Japan.', time: '10:45 UTC' },
    { type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Track Obstruction — Tokyo Line 4', desc: 'Debris on track between Shinjuku and Shibuya. Services delayed.', time: '10:55 UTC' },
    { type: 'warning', icon: 'fa-solid fa-cloud-bolt', title: 'Category 4 Hurricane Warning', desc: 'Hurricane active over Gulf of Mexico. 47 flights diverted.', time: '10:30 UTC' },
    { type: 'warning', icon: 'fa-solid fa-server', title: 'Data Center DDoS Attack', desc: 'AWS us-east-1 experiencing DDoS. 2.3 Tbps attack mitigated. Monitoring.', time: '10:20 UTC' },
    { type: 'info', icon: 'fa-solid fa-satellite', title: 'GPS Sync Completed', desc: 'All 1,240 ground vehicles re-synchronized with satellite tracking.', time: '09:45 UTC' },
    { type: 'info', icon: 'fa-solid fa-wave-square', title: 'Cable Cut — MAREA', desc: 'Fishing vessel snagged MAREA cable near Azores. Repair ship dispatched.', time: '09:30 UTC' },
    { type: 'info', icon: 'fa-solid fa-circle-info', title: 'OpenSky Network Sync', desc: '8,423 aircraft positions updated. Record high.', time: '09:00 UTC' },
];
