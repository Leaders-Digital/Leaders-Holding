import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Recruitment from './Recruitment.jsx';
import heroImg from './assets/hero-project.webp';

/* ============================================================
   LOGOS — resolved from src/assets/logos via Vite glob
   ============================================================ */
const logoUrls = import.meta.glob('./assets/logos/*.{webp,png}', { eager: true, query: '?url', import: 'default' });
const logo = (f) => (f ? logoUrls['./assets/logos/' + f] || null : null);
const holdingLogo = logo('leaders-logo.webp');

/* ============================================================
   DATA — 23 societies across 12 sectors.
   society = [name, blurb, logoFile|null, P(primary), A(accent), B(bg tint)]
   ============================================================ */
const SECTORS = [
  { key: 'realestate', name: 'Real Estate & Property', short: 'Real Estate', accent: '#2f6fb0',
    tag: 'Property, reimagined as portfolio.',
    about: 'The largest arm of the group — development, brokerage, investment and digital marketplaces across residential and commercial property.',
    svc: [['Development', 'Ground-up residential and mixed-use projects, end to end.'], ['Brokerage', 'Advisory and transactions for buyers, sellers, investors.'], ['Investment', 'Portfolios structured for long-horizon returns.'], ['Marketplace', 'Digital platforms connecting property to people.']],
    societies: [
      ['Leaders Immobilier', 'Flagship development & sales.', 'immobilier.webp', '#2f6fb0', '#6b7178', '#eef3f9'],
      ['Le Portail Immobilier', 'Digital property marketplace.', 'port.webp', '#16294d', '#1a9fd4', '#edf1f8'],
      ['Le Coin Immobilier', 'Neighborhood-scale listings.', 'lecoin.webp', '#1f2d5a', '#f0b21f', '#f1f3f9'],
      ['Negoce Immobilier', 'Transactions & negotiation.', 'negoce.webp', '#1c2d54', '#c8202e', '#f3f3f7'],
      ['Inna Immobilier', 'Boutique acquisitions.', 'inna.webp', '#1a1a1a', '#e2231a', '#f5f3f3'],
      ['Global Leaders Trade', 'Investment & global trade.', 'global-trade.png', '#1f3566', '#d4a431', '#eff2f8'],
      ['Gratia Immobilier', 'Residential advisory.', null, '#2f6fb0', '#8aa6c4', '#eef3f9'],
      ['Sté Promotion Ben Ismail', 'Property promotion & development.', null, '#1c2d54', '#9aa6b8', '#eef2f8'],
    ] },
  { key: 'construction', name: 'Construction & Materials', short: 'Construction', accent: '#c9a24a',
    tag: 'We build what the city stands on.',
    about: 'General contracting and the fabrication that makes modern façades possible — structure, aluminium, and glazing systems.',
    svc: [['General Contracting', 'Large-scale construction, residential and commercial.'], ['Aluminium & Glazing', 'Curtain-wall systems and precision-cut façades.'], ['Structural Works', 'Foundations and frames engineered to last.'], ['Finishing', 'The details that turn structure into architecture.']],
    societies: [
      ['Leaders Building', 'General contracting at scale.', 'building.webp', '#1f2228', '#c9a24a', '#f4f3ee'],
      ['Leaders Diamant Aluminium', 'Aluminium & curtain-wall fabrication.', 'diamant.webp', '#1c1f24', '#2f8fd4', '#eef2f6'],
    ] },
  { key: 'energy', name: 'Energy & Electric', short: 'Energy', accent: '#2f4fd0',
    tag: 'The current that runs through it all.',
    about: 'Electrical installation and infrastructure for every Leaders project, end to end — power, distribution, and smart systems.',
    svc: [['Installation', 'Electrical fit-out for residential & commercial.'], ['Infrastructure', 'Distribution, substations, and grid ties.'], ['Smart Systems', 'Automation and energy management.'], ['Maintenance', 'Inspection and upkeep, group-wide.']],
    societies: [['Leaders Extra Electric', 'Electrical installation & infrastructure.', 'extra.webp', '#2f4fd0', '#5bc23a', '#eef1fb']] },
  { key: 'technology', name: 'Technology & Digital', short: 'Technology', accent: '#6a3fb5',
    tag: 'The systems behind the buildings.',
    about: 'Software, digital infrastructure, and the engineering backbone that keeps every society connected and running.',
    svc: [['Software', 'Custom platforms and internal systems.'], ['Infrastructure', 'Cloud, networks, and digital backbone.'], ['Product', 'Customer-facing digital experiences.'], ['Data', 'Analytics that inform every decision.']],
    societies: [['Leaders Digital', 'Software & digital infrastructure.', 'digital.webp', '#6a3fb5', '#4db4e8', '#f3f0fa']] },
  { key: 'commerce', name: 'Import / Export & Commerce', short: 'Commerce', accent: '#1f7ab0',
    tag: 'Goods, moving with intent.',
    about: 'General commerce, import and export — sourcing, logistics, and trade linking the group’s products to markets at home and abroad.',
    svc: [['Import', 'Sourcing quality goods from global partners.'], ['Export', 'Bringing group products to new markets.'], ['Logistics', 'Freight, customs, and last-mile coordination.'], ['Distribution', 'Wholesale and retail networks.']],
    societies: [['Leaders Import Export', 'Import, export & logistics.', 'import-export.webp', '#173042', '#1f9ad6', '#eef2f5']] },
  { key: 'seafood', name: 'Seafood & Fishing', short: 'Seafood', accent: '#1d8aa0',
    tag: 'From the sea, responsibly.',
    about: 'A fishing and seafood operation built on responsible sourcing — fresh supply, cold-chain integrity, and coastal partnerships.',
    svc: [['Fishing', 'Responsible catch and sourcing.'], ['Cold Chain', 'Integrity from boat to buyer.'], ['Processing', 'Cleaning, grading, and packing.'], ['Distribution', 'Fresh supply to market.']],
    societies: [['Leaders Fish', 'Responsible fishing & seafood supply.', 'fish.webp', '#1d7a8c', '#28b6c8', '#ecf5f7']] },
  { key: 'agriculture', name: 'Agriculture & Agribusiness', short: 'Agriculture', accent: '#8a8f4d',
    tag: 'Growth that starts at the root.',
    about: 'Sustainable agriculture and elite farmland management — productive land, responsible practice, and long-term supply chains.',
    svc: [['Farmland', 'Elite farmland acquisition and stewardship.'], ['Production', 'Sustainable, high-yield output.'], ['Agritech', 'Data-led practice for healthier yields.'], ['Supply', 'Distribution from field to market.']],
    societies: [['Leaders Agro Elite', 'Sustainable farmland & agribusiness.', 'agro.webp', '#4a5a3a', '#8a8f4d', '#f1f2ec']] },
  { key: 'cosmetics', name: 'Cosmetics & Beauty', short: 'Cosmetics', accent: '#c9a24a',
    tag: 'Beauty, formulated.',
    about: 'A cosmetics and beauty line — formulation, brand, and retail for a modern, discerning customer.',
    svc: [['Formulation', 'Clean, considered product development.'], ['Brand', 'Identity and storytelling.'], ['Retail', 'Boutique and digital presence.'], ['Care', 'After-sale and community.']],
    societies: [['Leaders Makeup', 'Cosmetics & beauty line.', 'makeup.webp', '#1a1a1a', '#c9a24a', '#f6f4ef']] },
  { key: 'consulting', name: 'Consulting, Studies & Services', short: 'Consulting', accent: '#2f5fa8',
    tag: 'Every project starts as a study.',
    about: 'Engineering studies, feasibility, strategy, climate works and operational services — the professional layer that de-risks and shapes everything the group builds.',
    svc: [['Studies', 'Engineering, feasibility, and technical design.'], ['Strategy', 'Corporate and project advisory.'], ['Multi-Trade', 'HVAC, climate, and integrated works.'], ['Services', 'Operational support across the group.']],
    societies: [
      ['Nexting Etude', 'Engineering & feasibility studies.', 'nexting.webp', '#1f3a66', '#5b6770', '#eef1f6'],
      ['Gratia Service', 'Operational support services.', 'gratia.webp', '#2f5fa8', '#d23b3b', '#f1f3f8'],
      ['Leaders Business', 'Corporate strategy & advisory.', 'business.webp', '#5b626b', '#9aa0a8', '#f2f3f5'],
      ['Leaders Multiworks', 'HVAC, climate & multi-trade works.', 'multi.webp', '#1a4f8b', '#e23b2e', '#eef2f7'],
    ] },
  { key: 'automotive', name: 'Automotive & Luxury Transport', short: 'Automotive', accent: '#b25b49',
    tag: 'Mobility, curated.',
    about: 'Luxury vehicles and bespoke transport — a curated fleet and acquisition service for a clientele that expects the exceptional.',
    svc: [['Luxury Sales', 'Curated inventory of exceptional vehicles.'], ['Acquisition', 'Sourcing rare and bespoke models worldwide.'], ['Concierge', 'White-glove ownership and delivery.'], ['Fleet', 'Managed fleets for partners and developments.']],
    societies: [['Leaders Luxury Cars', 'Luxury vehicles & acquisition.', null, '#1f2228', '#b25b49', '#f6f1ef']] },
  { key: 'timber', name: 'Timber & Woodworking', short: 'Timber', accent: '#8a5a2b',
    tag: 'Working with the grain.',
    about: 'Timber sourcing and fine woodworking — raw material to finished joinery for the group’s developments and beyond.',
    svc: [['Sourcing', 'Responsibly sourced timber stock.'], ['Milling', 'Cutting and treatment to spec.'], ['Joinery', 'Bespoke furniture and fit-out.'], ['Supply', 'Material for group projects.']],
    societies: [['Leaders Wood', 'Timber sourcing & fine woodworking.', null, '#8a5a2b', '#4a7c3a', '#f4f1eb']] },
  { key: 'travel', name: 'Travel & Tourism', short: 'Travel', accent: '#2f9ad0',
    tag: 'The world, well arranged.',
    about: 'Travel and tourism services — journeys, stays, and experiences organised to the group’s standard.',
    svc: [['Travel', 'Curated journeys and packages.'], ['Stays', 'Hand-picked accommodation.'], ['Corporate', 'Business travel management.'], ['Experiences', 'Bespoke itineraries.']],
    societies: [['Leaders Travel', 'Travel & tourism services.', null, '#2f9ad0', '#f0a51f', '#eef4f9']] },
  { key: 'holdings', name: 'Holdings & Luxury', short: 'Holdings', accent: '#C5A039',
    tag: 'The address behind the addresses.',
    about: 'The corporate core — the holding company and its luxury lifestyle brand that set the standard for the entire ecosystem.',
    svc: [['Governance', 'Direction and oversight for the group.'], ['Capital', 'Allocation across the portfolio.'], ['Luxury', 'Lifestyle and high-end residences.'], ['Brand', 'The Leaders standard, group-wide.']],
    societies: [
      ['Leaders Holding', 'The corporate nucleus of the group.', 'leaders-logo.webp', '#b8901f', '#14181f', '#fbf8ef'],
      ['Leaders Luxury', 'Lifestyle & high-end residences.', 'luxury.webp', '#b9923a', '#1f2228', '#f8f5ee'],
    ] },
];

const hexA = (hex, a) => {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substr(0, 2), 16)},${parseInt(h.substr(2, 2), 16)},${parseInt(h.substr(4, 2), 16)},${a})`;
};
const initials = (name) => {
  const w = name.split(' ').filter(Boolean);
  return ((w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : '')).toUpperCase();
};

// Radial geometry + resolved society objects (computed once)
const GEO = (() => {
  const n = SECTORS.length, R = 39;
  return SECTORS.map((s, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const societies = s.societies.map(([name, blurb, lf, P, A, B]) => ({
      name, blurb, P, A, B, logoUrl: logo(lf), hasLogo: !!lf, initials: initials(name),
      softA: hexA(P, 0.4), glowA: hexA(P, 0.45),
    }));
    return {
      ...s,
      x: +(50 + R * Math.cos(a)).toFixed(2),
      y: +(50 + R * Math.sin(a)).toFixed(2),
      count: s.societies.length,
      countPad: String(s.societies.length).padStart(2, '0'),
      societies,
    };
  });
})();

function buildWorld(name) {
  let sec = null, soc = null;
  for (const s of SECTORS) for (const arr of s.societies) if (arr[0] === name) { sec = s; soc = arr; }
  if (!sec) return null;
  const [sname, blurb, lf, P, A, B] = soc;
  const isLux = name === 'Leaders Luxury';
  const baseLayout = [
    { gc: 'span 7', gr: 'span 2', minh: 300, size: 30 },
    { gc: 'span 5', gr: 'span 1', minh: 200, size: 23 },
    { gc: 'span 5', gr: 'span 1', minh: 200, size: 23 },
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 },
  ];
  const luxLayout = [...baseLayout,
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 },
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 }];
  const svcSrc = isLux ? [
    ['Signature Residences', 'Limited-edition towers and private villas designed in-house and built by the group, from masterplan to handover.'],
    ['Private Advisory', 'Discreet acquisition and portfolio counsel for principals and family offices.'],
    ['Interiors Atelier', 'A bespoke studio finishing every residence to a single, exacting standard.'],
    ['Asset Management', 'Long-horizon stewardship of residences and rental portfolios.'],
    ['Concierge', 'A standing service desk for owners, on call.'],
    ['Acquisitions', 'Sourcing land and landmark addresses worldwide.'],
  ] : sec.svc;
  const services = svcSrc.map((p, i) => ({
    no: String(i + 1).padStart(2, '0'), name: p[0], desc: p[1],
    ...((isLux ? luxLayout : baseLayout)[i] || { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 }),
  }));
  const founded = { 'Leaders Immobilier': '2020', 'Negoce Immobilier': '2021', 'Le Portail Immobilier': '2021', 'Leaders Digital': '2021', 'Leaders Fish': '2021', 'Le Coin Immobilier': '2022', 'Leaders Building': '2022', 'Inna Immobilier': '2023', 'Sté Promotion Ben Ismail': '2023', 'Leaders Business': '2023', 'Leaders Makeup': '2024', 'Gratia Immobilier': '2024', 'Leaders Import Export': '2024', 'Gratia Service': '2024', 'Leaders Travel': '2024', 'Leaders Holding': '2020' }[name] || '—';
  const statLabels = isLux ? ['Founded', 'Residences', 'Cities', 'Sqm Delivered'] : ['Founded', 'Projects', 'Reach', 'Team'];
  const stats = statLabels.map((k, i) => ({ k, v: i === 0 ? founded : '—', color: i === 0 ? P : '#14181f' }));
  const bars = [38, 52, 44, 63, 57, 74, 68, 82, 76, 90, 85, 98].map((v) => ({ h: Math.round((v / 98) * 100) }));
  const ix = FLAT_NAMES.indexOf(name); const nextName = FLAT_NAMES[(ix + 1) % FLAT_NAMES.length];
  let nx = null;
  for (const s of SECTORS) for (const a of s.societies) if (a[0] === nextName) nx = { name: a[0], sector: s.name, P: a[3], logoUrl: logo(a[2]), hasLogo: !!a[2], initials: initials(a[0]) };
  return {
    name: sname, sector: sec.name, eyebrow: `${sec.short} Sector`,
    nextName, next: nx,
    logoUrl: logo(lf), hasLogo: !!lf, initials: initials(sname),
    P, A, softA: hexA(P, 0.4), glowA: hexA(P, 0.5),
    bg: `linear-gradient(180deg,#ffffff 0%,${B} 100%)`,
    navFade: hexA(B, 0.92),
    title: isLux ? 'Where craftsmanship meets address.' : sec.tag,
    about: isLux ? 'Leaders Luxury is the lifestyle and residential flagship of the group — limited-edition towers, private villas, and the services that surround a life lived well.' : `${blurb} ${sec.about}`,
    services, stats, bars,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    projects: [{ tag: 'Project · 2024', name: 'In development' }, { tag: 'Project · 2023', name: 'Delivered' }, { tag: 'Project · 2025', name: 'Upcoming' }],
  };
}

const MONO = "'IBM Plex Mono', monospace";
const goldText = { background: 'linear-gradient(115deg,#E9C879,#C5A039)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const plate = (size, radius) => ({ flex: 'none', width: size, height: size, borderRadius: radius, background: '#fff', boxShadow: '0 4px 12px -6px rgba(30,45,70,0.4), inset 0 0 0 1px rgba(20,24,31,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' });
const logoFill = (url, pad) => ({ width: '100%', height: '100%', backgroundImage: `url("${url}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'content-box', backgroundClip: 'content-box', padding: pad });
const reveal = (range) => ({ animation: 'lh-reveal both', animationTimeline: 'view()', animationRange: range });

const TIMELINE = [
  { year: '2020', items: ['Leaders Immobilier'] },
  { year: '2021', items: ['Négoce Immobilier', 'Le Portail Immobilier', 'Leaders Digital', 'Leaders Fish'] },
  { year: '2022', items: ['Le Coin Immobilier', 'Leaders Building'] },
  { year: '2023', items: ['Inna Immobilier', 'Sté Promotion Ben Ismail', 'Leaders Business'] },
  { year: '2024', items: ['Leaders Makeup', 'Gratia Immobilier', 'Leaders Import Export', 'Gratia Service', 'Leaders Travel'] },
];
const GROUP_STATS = [{ v: '25', k: 'Societies' }, { v: '13', k: 'Sectors' }, { v: '2020', k: 'Established' }, { v: 'Tunis', k: 'Headquarters' }];
const CONTACT = { address: 'Cité des Pins, Les Berges du Lac 2 — 1053 Tunis, Tunisie', email: 'contact@leadersholding.tn', phone: '+216 27 360 038' };

/* ============================================================
   3D NEXUS FIELD
   ============================================================ */
function useNexusField(canvasRef, { nodeDensity = 66, showCore = true } = {}) {
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    inited.current = true;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 1, 600);
    camera.position.set(0, 0, 95);
    const tx = document.createElement('canvas'); tx.width = tx.height = 128;
    const g = tx.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(255,255,255,0.95)'); rg.addColorStop(0.38, 'rgba(255,255,255,0.42)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.beginPath(); g.arc(64, 64, 64, 0, Math.PI * 2); g.fill();
    const tex = new THREE.CanvasTexture(tx);
    const group = new THREE.Group(); scene.add(group);
    const tints = ['#ffffff', '#ffffff', '#f2f6fb', '#E9C879', '#dfe7f1', '#E9C879', '#cdd9e8'];
    const density = Math.max(20, Math.min(110, nodeDensity));
    const orbs = [];
    for (let i = 0; i < density; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.NormalBlending });
      mat.color = new THREE.Color(tints[i % tints.length]);
      const isGold = i % tints.length === 3 || i % tints.length === 5;
      mat.opacity = isGold ? 0.26 + Math.random() * 0.22 : 0.12 + Math.random() * 0.26;
      const spr = new THREE.Sprite(mat);
      const x = (Math.random() - 0.5) * 190, y = (Math.random() - 0.5) * 120, z = -130 + Math.random() * 150;
      spr.position.set(x, y, z);
      const sc = 6 + Math.random() * 24; spr.scale.set(sc, sc, 1);
      spr.userData = { baseY: y, ph: Math.random() * Math.PI * 2, sp: 0.2 + Math.random() * 0.4, amp: 1.5 + Math.random() * 3 };
      group.add(spr); orbs.push(spr);
    }
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      mat.color = new THREE.Color('#C5A039'); mat.opacity = 0.7;
      const spr = new THREE.Sprite(mat);
      spr.position.set((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 95, -40 + Math.random() * 70);
      const sc = 1 + Math.random() * 1.8; spr.scale.set(sc, sc, 1);
      spr.userData = { baseY: spr.position.y, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.5, amp: 2 + Math.random() * 3 };
      group.add(spr); orbs.push(spr);
    }
    let core = null;
    if (showCore) {
      core = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(30, 1)), new THREE.LineBasicMaterial({ color: 0xc5a039, transparent: true, opacity: 0.1 }));
      scene.add(core);
    }
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => { mouse.tx = e.clientX / window.innerWidth - 0.5; mouse.ty = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove);
    const onResize = () => { const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', onResize); onResize();
    const clock = new THREE.Clock();
    let raf; let spLerp = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.04) * 0.18; group.rotation.x = Math.cos(t * 0.03) * 0.08;
      for (const o of orbs) o.position.y = o.userData.baseY + Math.sin(t * o.userData.sp + o.userData.ph) * o.userData.amp;
      if (core) { core.rotation.y += 0.0011; core.rotation.x += 0.0006; }
      const hs = document.getElementById('hub-scroll');
      const sp = hs ? hs.scrollTop / Math.max(hs.clientHeight, 1) : 0;
      spLerp += (sp - spLerp) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.045; mouse.y += (mouse.ty - mouse.y) * 0.045;
      camera.position.x = mouse.x * 22; camera.position.y = -mouse.y * 14;
      camera.position.z = 95 - Math.min(spLerp, 2.2) * 17;
      if (core) core.scale.setScalar(1 + Math.min(spLerp, 2) * 0.22);
      camera.lookAt(0, 0, -10);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', onResize); tex.dispose(); renderer.dispose(); };
  }, [canvasRef, nodeDensity, showCore]);
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [route, setRoute] = useState(() => (window.location.hash || '').replace('#', '') || 'home');
  useEffect(() => {
    const onHash = () => setRoute((window.location.hash || '').replace('#', '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  if (route === 'recrutement') return <Recruitment />;
  return <Home />;
}

function Home() {
  const [view, setView] = useState('hub');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectorKey, setActiveSectorKey] = useState(null);
  const [activeWorldName, setActiveWorldName] = useState(null);
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const suppress = useGlobe(globeRef);
  const lastNav = useRef(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introExit, setIntroExit] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const introVidRef = useRef(null);
  useEffect(() => {
    if (!showIntro) return;
    const v = introVidRef.current; if (!v) return;
    const ready = () => setVideoReady(true);
    if (v.readyState >= 3) ready();
    else { v.addEventListener('playing', ready, { once: true }); v.addEventListener('canplaythrough', ready, { once: true }); }
    const t = setTimeout(ready, 7000);
    return () => clearTimeout(t);
  }, [showIntro]);
  const warp = () => {
    document.querySelectorAll('.lh-warp').forEach((e) => e.remove());
    const el = document.createElement('div');
    el.className = 'lh-warp';
    el.innerHTML = '<div class="lh-warp-core"></div>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 980);
  };
  const enterSite = () => { warp(); setIntroExit(true); setTimeout(() => { setShowIntro(false); setIntroExit(false); }, 780); };
  useNexusField(canvasRef, { nodeDensity: 66, showCore: true });

  useEffect(() => {
    let raf, hp = null;
    const loop = () => {
      const scroller = document.getElementById('hub-scroll');
      const sec = document.getElementById('hscroll-section');
      const pin = document.getElementById('hscroll-pin');
      const track = document.getElementById('hscroll-track');
      if (scroller && sec && pin && track) {
        const vh = scroller.clientHeight;
        const top = sec.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
        const len = Math.max(1, sec.offsetHeight - vh);
        const p = Math.max(0, Math.min(1, (-top) / len));
        hp = hp == null ? p : hp + (p - hp) * 0.12;
        const vw = pin.clientWidth;
        const maxX = Math.max(0, track.scrollWidth - vw);
        track.style.transform = `translateX(${(-hp * maxX).toFixed(1)}px)`;
        const N = track.children.length;
        const idx = Math.max(0, Math.min(N - 1, Math.round(hp * (N - 1))));
        const ac = track.children[idx] && track.children[idx].getAttribute('data-accent');
        pin.style.background = ac ? `linear-gradient(125deg,${hexA(ac, 0.18)} 0%,#f4f6fa 62%)` : 'linear-gradient(125deg,rgba(197,160,57,0.16) 0%,#f4f6fa 62%)';
        const pf = hp * (N - 1);
        for (let i = 0; i < N; i++) { const c = track.children[i].querySelector('.lh-hpanel-c'); if (c) { const d = Math.abs(i - pf); const op = d < 0.4 ? 1 : Math.max(0, Math.min(1, 1 - (d - 0.4) * 1.05)); c.style.opacity = op.toFixed(3); c.style.transform = `translateY(${((i - pf) * 22).toFixed(1)}px)`; } }
        const prog = document.getElementById('hscroll-prog'); if (prog) prog.style.width = `${(hp * 100).toFixed(1)}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const worldWheel = (e) => {
    const el = e.currentTarget;
    if (e.deltaY > 4 && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
      const now = Date.now();
      if (now - lastNav.current > 900) { lastNav.current = now; const i = FLAT_NAMES.indexOf(activeWorldName); openWorld(FLAT_NAMES[(i + 1) % FLAT_NAMES.length]); }
    }
  };

  const openSector = (k) => { setActiveSectorKey(k); setMenuOpen(false); };
  const openWorld = (n) => { warp(); setActiveWorldName(n); setView('world'); setMenuOpen(false); setActiveSectorKey(null); setTimeout(() => { const el = document.getElementById('world-scroll'); if (el) el.scrollTop = 0; }, 30); };
  const backToHub = () => { setView('hub'); setActiveWorldName(null); setActiveSectorKey(null); setMenuOpen(false); };

  const activeSector = activeSectorKey ? GEO.find((s) => s.key === activeSectorKey) : null;
  const world = view === 'world' ? buildWorld(activeWorldName) : null;

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'radial-gradient(120% 100% at 50% 0%,#fbfcfe 0%,#eef1f6 55%,#e4e9f1 100%)', fontFamily: "'Inter Tight', sans-serif", color: '#14181f' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, background: 'radial-gradient(ellipse at 50% 42%,rgba(255,255,255,0) 40%,rgba(160,180,205,0.18) 100%)' }} />

      {showIntro && (
        <div className={introExit ? 'lh-introwrap lh-warpout' : 'lh-introwrap'} style={{ position: 'fixed', inset: 0, zIndex: 300, background: '#0b0b0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video ref={introVidRef} src="/intro.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className={videoReady ? 'lh-loader lh-loader-hidden' : 'lh-loader'} style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, background: '#0b0b0d' }}>
            <img src={holdingLogo} alt="Leaders Holding" style={{ height: 78, width: 'auto', display: 'block', animation: 'lh-logopulse 2.2s ease-in-out infinite', filter: 'drop-shadow(0 6px 26px rgba(197,160,57,0.4))' }} />
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(233,200,121,0.85)' }}>Many companies · one vision</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out 0.18s infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-loaddot 1.2s ease-in-out 0.36s infinite' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%,rgba(11,11,13,0) 38%,rgba(11,11,13,0.55) 100%)' }} />
          <div onClick={enterSite} style={{ position: 'absolute', bottom: '8vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: MONO, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#0b0b0d', padding: '16px 34px', borderRadius: 100, background: 'linear-gradient(115deg,#E9C879,#C5A039)', boxShadow: '0 16px 40px -12px rgba(197,160,57,0.6)' }}>Enter the Nexus →</div>
          <div onClick={enterSite} style={{ position: 'absolute', top: 28, right: 34, zIndex: 6, cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Skip →</div>
        </div>
      )}

      {/* HUD */}
      <header className="lh-hud" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px', pointerEvents: 'none' }}>
        <div onClick={backToHub} style={{ display: 'flex', alignItems: 'center', gap: 13, pointerEvents: 'auto', cursor: 'pointer' }}>
          <img src={holdingLogo} alt="Leaders Holding" style={{ height: 46, width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 14px rgba(160,120,30,0.22))' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#14181f', lineHeight: 1 }}>Leaders Holding</span>
            <span className="lh-hud-sub" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', lineHeight: 1 }}>Many companies · one vision</span>
          </div>
        </div>
        <div className="lh-hud-actions" style={{ display: 'flex', alignItems: 'center', gap: 18, pointerEvents: 'auto' }}>
          <span className="lh-hud-count" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>25 Societies · 13 Sectors</span>
          <a href="#recrutement" className="lh-pill" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#14181f', textDecoration: 'none', padding: '11px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', boxShadow: '0 8px 24px -10px rgba(30,45,70,0.3), inset 0 1px 0 rgba(255,255,255,0.8)' }}>Carrières</a>
          <button className="lh-pill" onClick={() => setMenuOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#14181f', padding: '11px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', boxShadow: '0 8px 24px -10px rgba(30,45,70,0.3), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
            <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3, width: 14 }}>
              <span style={{ height: 1.5, width: 14, background: '#C5A039', display: 'block' }} />
              <span style={{ height: 1.5, width: 9, background: '#C5A039', display: 'block' }} />
              <span style={{ height: 1.5, width: 14, background: '#C5A039', display: 'block' }} />
            </span>
            Nexus Index
          </button>
        </div>
      </header>

      {/* HUB */}
      {view === 'hub' && (
        <main id="hub-scroll" style={{ position: 'absolute', inset: 0, zIndex: 10, overflowY: 'auto', overflowX: 'hidden', animation: 'lh-fade 0.8s ease both' }}>
          <section style={{ position: 'relative', height: '100vh', minHeight: 660 }}>
          <div ref={globeRef} id="nexus-globe" style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)', width: 'min(86vmin,860px)', height: 'min(86vmin,860px)', cursor: 'grab', touchAction: 'pan-y' }}>
            <div onClick={() => setMenuOpen(true)} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 3, width: 118, height: 118, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', animation: 'lh-drift 7s ease-in-out infinite', background: 'radial-gradient(circle at 50% 35%,rgba(255,255,255,0.9),rgba(255,255,255,0.5))', backdropFilter: 'blur(20px) saturate(170%)', WebkitBackdropFilter: 'blur(20px) saturate(170%)', border: '1.5px solid rgba(197,160,57,0.5)', boxShadow: '0 20px 50px -22px rgba(160,120,30,0.45), inset 0 2px 4px rgba(255,255,255,0.9)' }}>
              <img src={holdingLogo} alt="" style={{ height: 44, width: 'auto', display: 'block' }} />
              <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>Index</span>
            </div>
            {ALL_SOC.map((soc) => (
              <div key={soc.idx} data-soc-node={soc.idx} className="lh-globe-node" onClick={() => { if (!suppress.current) openWorld(soc.name); }} style={{ position: 'absolute', left: '50%', top: '50%', width: 74, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer', willChange: 'transform' }}>
                <div className="lh-globe-plate" style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', boxShadow: '0 10px 26px -12px rgba(30,45,70,0.5), inset 0 0 0 1px rgba(20,24,31,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'box-shadow .35s, transform .35s', '--soft': soc.softA, '--glow': soc.glowA }}>
                  {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 9)} /> : <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                </div>
                <span data-soc-label style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: '0.01em', textAlign: 'center', color: '#14181f', lineHeight: 1.1, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.72)', padding: '2px 7px', borderRadius: 6, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>{soc.shortName}</span>
              </div>
            ))}
          </div>

          <div className="lh-hero-panel" style={{ position: 'absolute', left: 40, bottom: 40, maxWidth: 392, padding: '30px 32px 32px', borderRadius: 22, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(26px) saturate(160%)', WebkitBackdropFilter: 'blur(26px) saturate(160%)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 30px 70px -28px rgba(30,45,70,0.4), inset 0 1px 0 rgba(255,255,255,0.7)', animation: 'lh-rise 0.9s cubic-bezier(.22,1,.36,1) both' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 16 }}>The Holding Map</div>
            <h1 style={{ fontSize: 38, lineHeight: 1.04, fontWeight: 600, letterSpacing: '-0.035em', color: '#14181f' }}>Many companies.<br />One <span style={goldText}>vision.</span></h1>
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.62, fontWeight: 400, color: 'rgba(20,24,31,0.66)' }}>A single ecosystem of 25 societies across 13 sectors. Each carries its own brand and world — explore the map, then scroll for the full story.</p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C5A039', display: 'block', animation: 'lh-pulse 2.6s ease-out infinite' }} />
              Drag the nexus · click a company
            </div>
          </div>

          <div style={{ position: 'absolute', left: '50%', bottom: 26, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, pointerEvents: 'none', fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)' }}>
            Scroll to explore
            <span style={{ width: 1, height: 36, background: 'linear-gradient(180deg,rgba(197,160,57,0.7),transparent)' }} />
          </div>
          </section>

          <div style={{ position: 'relative', background: 'linear-gradient(180deg,rgba(238,241,246,0) 0%,rgba(238,241,246,0.97) 7%,#eef1f6 16%,#e9edf3 100%)' }}>

            {/* ONE VISION */}
            <section className="lh-sec" style={{ maxWidth: 1080, margin: '0 auto', padding: '130px 40px 80px' }}>
              <div style={reveal('entry 2% cover 20%')}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>The Group</div>
                <h2 style={{ fontSize: 'clamp(34px,5vw,62px)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f', maxWidth: '17ch' }}>One holding.<br />Twenty-five <span style={goldText}>companies.</span></h2>
                <p style={{ marginTop: 26, fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.6, fontWeight: 400, color: 'rgba(20,24,31,0.62)', maxWidth: '60ch' }}>Leaders Holding is a Tunis-based diversified group. Founded in 2020, it now spans real estate, construction, technology, commerce, agriculture and more — each society its own brand and world, united by a single standard.</p>
              </div>
              <div className="lh-grid-4" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, borderTop: '1px solid rgba(20,24,31,0.1)', paddingTop: 42, ...reveal('entry 0% cover 24%') }}>
                {GROUP_STATS.map((g) => (
                  <div key={g.k}>
                    <div style={{ fontSize: 'clamp(30px,3.6vw,50px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: '#14181f' }}>{g.v}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginTop: 12 }}>{g.k}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* TIMELINE */}
            <section className="lh-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 96px' }}>
              <div style={reveal('entry 0% cover 18%')}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 16 }}>Our story</div>
                <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.04, fontWeight: 600, letterSpacing: '-0.035em', color: '#14181f', maxWidth: '18ch' }}>Built, year by year.</h2>
              </div>
              <div style={{ marginTop: 52, position: 'relative', display: 'flex', gap: 22, overflowX: 'auto', paddingBottom: 16 }}>
                <div style={{ position: 'absolute', left: 6, right: 6, top: 34, height: 2, background: 'linear-gradient(90deg,rgba(197,160,57,0.55),rgba(197,160,57,0.1))' }} />
                {TIMELINE.map((yr) => (
                  <div key={yr.year} style={{ flex: 'none', width: 216, position: 'relative', ...reveal('entry 0% cover 26%') }}>
                    <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, ...goldText }}>{yr.year}</div>
                    <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#C5A039', margin: '14px 0 22px', boxShadow: '0 0 0 5px rgba(197,160,57,0.18)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {yr.items.map((it) => (
                        <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.82)', boxShadow: '0 8px 22px -16px rgba(30,45,70,0.4)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', flex: 'none' }} />
                          <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.01em', color: '#14181f', lineHeight: 1.25 }}>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HORIZONTAL PINNED GALLERY */}
            <section id="hscroll-section" style={{ position: 'relative', height: '480vh' }}>
              <div id="hscroll-pin" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'linear-gradient(125deg,rgba(197,160,57,0.16) 0%,#f4f6fa 62%)', transition: 'background 0.6s ease' }}>
                <div style={{ position: 'absolute', top: 98, left: 40, right: 40, zIndex: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039' }}>The ecosystem · in motion</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)' }}>Keep scrolling ↓</div>
                </div>
                <div style={{ position: 'absolute', bottom: 38, left: 40, right: 40, zIndex: 6, height: 2, background: 'rgba(20,24,31,0.1)', pointerEvents: 'none' }}>
                  <div id="hscroll-prog" style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,#E9C879,#C5A039)', transition: 'width 0.1s linear' }} />
                </div>
                <div id="hscroll-track" style={{ display: 'flex', height: '100%', willChange: 'transform' }}>
                  <div style={{ flex: 'none', width: '100vw', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8vw', boxSizing: 'border-box' }}>
                    <div className="lh-hpanel-c" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', willChange: 'opacity,transform' }}>
                      <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 24 }}>Thirteen sectors</div>
                      <h2 style={{ fontSize: 'clamp(40px,7vw,104px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.96, color: '#14181f', maxWidth: '16ch' }}>An ecosystem<br />in motion.</h2>
                      <p style={{ marginTop: 26, fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(20,24,31,0.58)', maxWidth: '46ch', lineHeight: 1.5 }}>Keep scrolling — the map glides sideways through every sector, each with its own world and mood, then returns you to the vertical story.</p>
                    </div>
                  </div>
                  {GEO.map((s) => (
                    <div key={s.key} data-accent={s.accent} onClick={() => openSector(s.key)} className="lh-sector-card" style={{ flex: 'none', width: '100vw', height: '100%', display: 'flex', alignItems: 'center', gap: '5vw', padding: '0 9vw', boxSizing: 'border-box', cursor: 'pointer', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', right: '5vw', transform: 'translateY(-50%)', width: '40vw', height: '40vw', maxWidth: 560, maxHeight: 560, borderRadius: '50%', background: `radial-gradient(circle,${hexA(s.accent, 0.18)},transparent 68%)`, pointerEvents: 'none' }} />
                      <div className="lh-hpanel-c lh-sector-row" style={{ display: 'flex', alignItems: 'center', gap: '5vw', flex: 1, minWidth: 0, width: '100%', willChange: 'opacity,transform' }}>
                      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                          <span style={{ width: 50, height: 4, borderRadius: 3, background: s.accent, display: 'block' }} />
                          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.24em', color: s.accent }}>{s.countPad} / 13</span>
                        </div>
                        <div style={{ fontSize: 'clamp(46px,7.5vw,120px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#14181f' }}>{s.short}</div>
                        <div style={{ fontSize: 'clamp(15px,1.6vw,21px)', color: 'rgba(20,24,31,0.6)', marginTop: 22, maxWidth: '32ch', lineHeight: 1.4 }}>{s.name}</div>
                        <div style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.accent }}>Enter sector →</div>
                      </div>
                      <div className="lh-sector-logos" style={{ flex: 'none', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 16, maxWidth: 240, justifyContent: 'flex-end' }}>
                        {s.societies.map((soc) => (
                          <div key={soc.name} style={{ width: 88, height: 88, borderRadius: 18, background: '#fff', boxShadow: '0 16px 40px -18px rgba(30,45,70,0.4), inset 0 0 0 1px rgba(20,24,31,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 14)} /> : <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED WORK */}
            <section style={{ position: 'relative', height: '86vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,14,20,0.12) 0%,rgba(10,14,20,0) 28%,rgba(10,14,20,0.74) 100%)' }} />
              <div className="lh-feat" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 40px 70px', ...reveal('entry 6% cover 42%') }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E9C879', marginBottom: 18 }}>Featured work</div>
                <h2 style={{ fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.035em', color: '#fff', maxWidth: '20ch' }}>Finished to a standard the market follows.</h2>
                <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>Private residence · Les Berges du Lac 2, Tunis</div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="lh-sec" style={{ maxWidth: 1080, margin: '0 auto', padding: '104px 40px 48px' }}>
              <div className="lh-grid-contact" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end', ...reveal('entry 0% cover 22%') }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Get in touch</div>
                  <h2 style={{ fontSize: 'clamp(34px,5vw,62px)', lineHeight: 1.0, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f' }}>Let's build<br />together.</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Address</div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: '#14181f' }}>{CONTACT.address}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Email</div>
                    <a href="mailto:contact@leadersholding.tn" style={{ fontSize: 15, color: '#14181f', textDecoration: 'none', borderBottom: '1px solid rgba(197,160,57,0.5)', paddingBottom: 2 }}>{CONTACT.email}</a>
                  </div>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginBottom: 7 }}>Phone</div>
                    <div style={{ fontSize: 15, color: '#14181f' }}>{CONTACT.phone}</div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="lh-foot" style={{ borderTop: '1px solid rgba(20,24,31,0.1)', maxWidth: 1080, margin: '0 auto', padding: '30px 40px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <img src={holdingLogo} alt="" style={{ height: 30, width: 'auto', display: 'block' }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>© 2026 Leaders Holding</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.4)' }}>Tunis · Tunisie</span>
            </footer>

          </div>

          {activeSector && (
            <aside className="lh-drawer" style={{ position: 'fixed', top: 96, right: 24, bottom: 24, width: 392, maxWidth: 'calc(100vw - 48px)', zIndex: 30, borderRadius: 24, padding: '30px 28px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.66)', backdropFilter: 'blur(30px) saturate(170%)', WebkitBackdropFilter: 'blur(30px) saturate(170%)', border: '1px solid rgba(255,255,255,0.78)', boxShadow: '0 40px 90px -34px rgba(30,45,70,0.5), inset 0 1px 0 rgba(255,255,255,0.8)', animation: 'lh-rise 0.5s cubic-bezier(.22,1,.36,1) both', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginBottom: 11 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeSector.accent, display: 'block' }} />
                    Sector · {activeSector.count} societies
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#14181f' }}>{activeSector.name}</h2>
                </div>
                <button className="lh-close" onClick={() => setActiveSectorKey(null)} style={{ flex: 'none', width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(20,24,31,0.12)', background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 17, color: 'rgba(20,24,31,0.55)', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingRight: 4 }}>
                {activeSector.societies.map((soc) => (
                  <div key={soc.name} className="lh-soc" onClick={() => openWorld(soc.name)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 15, cursor: 'pointer', background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 8px 22px -14px rgba(30,45,70,0.35)', '--accentSoft': soc.softA, '--accentGlow': soc.glowA }}>
                    <div style={plate(46, 11)}>
                      {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 6)} /> : <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#14181f', lineHeight: 1.2 }}>{soc.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(20,24,31,0.55)', marginTop: 3, lineHeight: 1.4 }}>{soc.blurb}</div>
                    </div>
                    <span style={{ flex: 'none', color: soc.P, fontSize: 16 }}>→</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </main>
      )}

      {/* NEXUS INDEX MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 130, background: 'rgba(238,241,246,0.74)', backdropFilter: 'blur(28px) saturate(150%)', WebkitBackdropFilter: 'blur(28px) saturate(150%)', animation: 'lh-fade 0.4s ease both', overflowY: 'auto' }}>
          <div className="lh-menu-wrap" style={{ maxWidth: 1220, margin: '0 auto', padding: '108px 40px 80px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderBottom: '1px solid rgba(20,24,31,0.1)', paddingBottom: 26, marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 12 }}>Global Index</div>
                <h2 style={{ fontSize: 46, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: '#14181f' }}>All <span style={goldText}>societies</span></h2>
              </div>
              <button className="lh-close" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(20,24,31,0.14)', background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#14181f', padding: '13px 20px', borderRadius: 100 }}>Close ×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '34px 44px' }}>
              {GEO.map((s) => (
                <div key={s.key}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 13, marginBottom: 8, borderBottom: '1px solid rgba(20,24,31,0.1)' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.accent, display: 'block' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', color: '#14181f' }}>{s.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(20,24,31,0.4)', marginLeft: 'auto' }}>{s.countPad}</span>
                  </div>
                  {s.societies.map((soc) => (
                    <div key={soc.name} className="lh-menu-row" onClick={() => openWorld(soc.name)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 4px', cursor: 'pointer', borderBottom: '1px solid rgba(20,24,31,0.05)' }}>
                      <div style={plate(34, 9)}>
                        {soc.hasLogo ? <div style={logoFill(soc.logoUrl, 5)} /> : <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: soc.P }}>{soc.initials}</span>}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em', color: '#14181f', flex: 1 }}>{soc.name}</span>
                      <span style={{ flex: 'none', color: 'rgba(20,24,31,0.3)', fontSize: 13 }}>→</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WORLD */}
      {world && (
        <div id="world-scroll" onWheel={worldWheel} style={{ position: 'fixed', inset: 0, zIndex: 100, overflowY: 'auto', background: world.bg, animation: 'lh-worldin 0.55s cubic-bezier(.22,1,.36,1) both', '--accent': world.P, '--accentSoft': world.softA, '--accentGlow': world.glowA }}>
          <div className="lh-world-nav" style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '78px 40px 18px', background: `linear-gradient(180deg,${world.navFade} 35%,rgba(255,255,255,0))`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <button className="lh-back" onClick={backToHub} style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${world.softA}`, background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: world.P, padding: '12px 20px', borderRadius: 100, boxShadow: '0 8px 22px -12px rgba(30,45,70,0.3)' }}>← Return to Nexus</button>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>{world.sector}</span>
          </div>

          <div className="lh-world-wrap" style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 40px 90px', position: 'relative' }}>
            {/* Hero */}
            <section style={{ padding: '30px 0 56px', borderBottom: `1px solid ${world.softA}`, position: 'relative', overflow: 'hidden' }}>
              {world.hasLogo && <div style={{ position: 'absolute', top: -20, right: -50, width: 340, height: 340, backgroundImage: `url("${world.logoUrl}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.06, pointerEvents: 'none' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, position: 'relative' }}>
                <div style={{ ...plate(96, 20), boxShadow: '0 18px 44px -20px rgba(30,45,70,0.45), inset 0 0 0 1px rgba(20,24,31,0.05)' }}>
                  {world.hasLogo ? <div style={logoFill(world.logoUrl, 14)} /> : <span style={{ fontFamily: MONO, fontSize: 30, fontWeight: 500, color: world.P }}>{world.initials}</span>}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: world.P, display: 'block', boxShadow: `0 0 0 5px ${world.softA}` }} />
                    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: world.P }}>{world.eyebrow}</span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f' }}>{world.name}</div>
                </div>
              </div>
              <h1 style={{ fontSize: 'clamp(38px,6vw,76px)', lineHeight: 0.99, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f', maxWidth: '17ch', position: 'relative' }}>{world.title}</h1>
              <p style={{ marginTop: 24, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.55, fontWeight: 400, color: 'rgba(20,24,31,0.62)', maxWidth: '60ch', position: 'relative' }}>{world.about}</p>
            </section>

            {/* Bento services */}
            <section style={{ padding: '56px 0' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>What we do</div>
              <div className="lh-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 18, gridAutoFlow: 'row dense' }}>
                {world.services.map((sv) => (
                  <div key={sv.no} className="lh-tile" style={{ gridColumn: sv.gc, gridRow: sv.gr, position: 'relative', overflow: 'hidden', borderRadius: 22, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: sv.minh, background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 22px 54px -28px rgba(30,45,70,0.35)' }}>
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle,${world.softA},transparent 70%)`, pointerEvents: 'none' }} />
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: world.P, position: 'relative' }}>{sv.no}</div>
                    <div style={{ position: 'relative' }}>
                      <h3 style={{ fontSize: sv.size, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#14181f', marginTop: 16 }}>{sv.name}</h3>
                      <p style={{ marginTop: 11, fontSize: 14, lineHeight: 1.6, color: 'rgba(20,24,31,0.6)', maxWidth: '48ch' }}>{sv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats + chart */}
            <section className="lh-statschart" style={{ padding: '8px 0 56px', borderTop: `1px solid ${world.softA}`, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'start' }}>
              <div style={{ paddingTop: 34 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>By the numbers</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px 30px' }}>
                  {world.stats.map((st) => (
                    <div key={st.k}>
                      <div style={{ fontSize: 'clamp(30px,3.4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: st.color }}>{st.v}</div>
                      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', marginTop: 11 }}>{st.k}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 34, borderRadius: 22, padding: '26px 28px 22px', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 22px 54px -30px rgba(30,45,70,0.35)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: world.P, display: 'block' }} /><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', color: '#14181f' }}>Annual activity</span></div>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.4)' }}>Indicative · awaiting figures</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 160, borderBottom: '1px solid rgba(20,24,31,0.1)' }}>
                  {world.bars.map((b, i) => (
                    <div key={i} style={{ flex: 1, height: `${b.h}%`, borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg,${world.A},${world.P})`, transformOrigin: 'bottom', animation: 'lh-grow 0.7s cubic-bezier(.22,1,.36,1) both' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  {world.months.map((m) => <span key={m} style={{ flex: 1, textAlign: 'center', fontFamily: MONO, fontSize: 8, letterSpacing: '0.04em', color: 'rgba(20,24,31,0.38)' }}>{m}</span>)}
                </div>
              </div>
            </section>

            {/* Projects */}
            <section style={{ padding: '48px 0', borderTop: `1px solid ${world.softA}` }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 26 }}>Selected work</div>
              <div className="lh-proj" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                {world.projects.map((pj) => (
                  <div key={pj.name} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 5', backgroundImage: `repeating-linear-gradient(135deg,${world.softA} 0 2px,transparent 2px 12px)`, backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)', display: 'flex', alignItems: 'flex-end', padding: 22 }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: world.P, marginBottom: 8 }}>{pj.tag}</div>
                      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f' }}>{pj.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section style={{ marginTop: 24, borderRadius: 26, padding: '52px 46px', overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg,${world.P},#14181f 85%)`, boxShadow: '0 40px 90px -40px rgba(20,24,31,0.6)' }}>
              <div style={{ position: 'absolute', top: -80, right: -60, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${world.glowA},transparent 70%)` }} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>Work with {world.name}</div>
                  <h2 style={{ fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.04, color: '#fff', maxWidth: '18ch' }}>Let's build the next chapter together.</h2>
                </div>
                <button className="lh-cta" style={{ flex: 'none', border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: world.P, padding: '16px 30px', borderRadius: 100, background: '#fff', boxShadow: '0 14px 34px -12px rgba(0,0,0,0.4)', transition: 'transform .3s' }}>Start a conversation →</button>
              </div>
            </section>

            <section onClick={() => openWorld(world.nextName)} className="lh-teaser" style={{ marginTop: 40, borderRadius: 26, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: `linear-gradient(135deg,${world.next.P},#0f1318 92%)`, padding: '44px 46px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 'none', width: 74, height: 74, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 14px 30px -14px rgba(0,0,0,0.5)' }}>
                  {world.next.hasLogo ? <div style={logoFill(world.next.logoUrl, 11)} /> : <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 500, color: world.next.P }}>{world.next.initials}</span>}
                </div>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 9 }}>Next world</div>
                  <div style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.04 }}>{world.next.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{world.next.sector}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff' }}>Continue<span style={{ fontSize: 18 }}>↓</span></div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
